import { useRef, useState, useCallback } from 'react';

export function useAudio() {
    const audioContext = useRef(null);
    const [isReady, setIsReady] = useState(false);

    // Store active oscillators to stop them later
    const activeNotes = useRef(new Map());
    const masterGain = useRef(null);

    // Effect Nodes
    const reverbNode = useRef(null);
    const reverbWet = useRef(null);
    const bassLevel = useRef(0.5); // Default bass scale (0 to 1)
    const reverbLevel = useRef(0.3); // Default reverb wetness (0 to 1)
    const [isReverbEnabled, setIsReverbEnabled] = useState(true);

    // Generate a simple impulse for the convolver (reverb)
    const createImpulseResponse = (ctx, duration = 3, decay = 2) => {
        const sampleRate = ctx.sampleRate;
        const length = sampleRate * duration;
        const impulse = ctx.createBuffer(2, length, sampleRate);
        const impulseL = impulse.getChannelData(0);
        const impulseR = impulse.getChannelData(1);

        for (let i = 0; i < length; i++) {
            const n = length - i;
            const envelope = Math.pow(n / length, decay);
            impulseL[i] = (Math.random() * 2 - 1) * envelope;
            impulseR[i] = (Math.random() * 2 - 1) * envelope;
        }
        return impulse;
    };

    const initAudio = useCallback(() => {
        if (!audioContext.current) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            audioContext.current = new AudioCtx();

            // Master Gain
            masterGain.current = audioContext.current.createGain();
            masterGain.current.gain.value = 0.5;
            masterGain.current.connect(audioContext.current.destination);

            // Reverb setup
            reverbNode.current = audioContext.current.createConvolver();
            reverbNode.current.buffer = createImpulseResponse(audioContext.current);

            reverbWet.current = audioContext.current.createGain();
            reverbWet.current.gain.value = reverbLevel.current;

            // Connect reverb chain: input -> reverb -> wet -> master
            // We'll connect specific sounds to this
            reverbNode.current.connect(reverbWet.current);
            reverbWet.current.connect(masterGain.current);

            setIsReady(true);
        }

        if (audioContext.current.state === 'suspended') {
            audioContext.current.resume();
        }
    }, []);

    const setMasterVolume = useCallback((vol) => {
        if (masterGain.current && audioContext.current) {
            masterGain.current.gain.setTargetAtTime(vol, audioContext.current.currentTime, 0.05);
        }
    }, []);

    const setBass = useCallback((level) => {
        bassLevel.current = level;
    }, []);

    const setReverb = useCallback((level) => {
        reverbLevel.current = level;
        if (reverbWet.current && audioContext.current) {
            reverbWet.current.gain.setTargetAtTime(level, audioContext.current.currentTime, 0.05);
        }
    }, []);

    const resetAudio = useCallback(() => {
        setMasterVolume(0.5);
        setBass(0.5);
        setReverb(0.3);
        return { volume: 0.5, bass: 0.5, reverb: 0.3 };
    }, [setMasterVolume, setBass, setReverb]);

    const playTone = useCallback((frequency, isHarmonium = false) => {
        if (!audioContext.current) initAudio();
        const ctx = audioContext.current;

        if (activeNotes.current.has(frequency)) return;

        // Create nodes
        const gainNode = ctx.createGain();
        const filterNode = ctx.createBiquadFilter();

        filterNode.type = 'lowpass';
        // Broaden the filter so lower notes don't sound muffled, slightly brighter for harmonium
        filterNode.frequency.value = frequency * (isHarmonium ? 6.0 : 4.0);
        if (isHarmonium) filterNode.Q.value = 1.2; // Slight resonance for the reeds

        // Sound source connections
        filterNode.connect(gainNode);

        // Connect to Master and Reverb bus
        if (masterGain.current) {
            gainNode.connect(masterGain.current);
            if (reverbNode.current && isReverbEnabled) {
                gainNode.connect(reverbNode.current);
            }
        }

        // Oscillators mix
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const osc3 = ctx.createOscillator(); // Sub-octave (controlled by Bass slider)

        if (isHarmonium) {
            osc1.type = 'sawtooth'; // Rich harmonics for reed sound
            osc2.type = 'square';   // Hollow depth
            osc3.type = 'sawtooth'; // Thick bass presence
            osc2.detune.value = 8;  // Natural chorus/beating effect characteristics of bellows
        } else {
            osc1.type = 'triangle';
            osc2.type = 'sine';
            osc3.type = 'triangle';
            osc2.detune.value = 3;
        }

        osc1.frequency.setValueAtTime(frequency, ctx.currentTime);
        osc2.frequency.setValueAtTime(frequency, ctx.currentTime);
        osc3.frequency.setValueAtTime(frequency * 0.5, ctx.currentTime);

        const osc3Gain = ctx.createGain();
        // Harmonium gets a slightly louder sub-octave for that deep drone element
        osc3Gain.gain.value = isHarmonium ? (0.2 + (bassLevel.current * 0.5)) : (0.1 + (bassLevel.current * 0.4));

        osc1.connect(filterNode);
        osc2.connect(filterNode);
        osc3.connect(osc3Gain);
        osc3Gain.connect(filterNode);

        const now = ctx.currentTime;

        // Peak target gain with frequency compensation
        const normalizationFactor = Math.pow(261.63 / (frequency || 261.63), 0.25);
        let peakGain = (isHarmonium ? 0.6 : 0.4) * normalizationFactor; // Harmonium plays a bit louder

        // Safety bounds for gain
        if (isNaN(peakGain) || !isFinite(peakGain)) peakGain = 0.4;
        peakGain = Math.min(0.8, Math.max(0.1, peakGain));

        // Volume ADSR
        gainNode.gain.setValueAtTime(0, now);
        
        if (isHarmonium) {
            // Harmonium envelope: Bellows swell up slightly slower, and sustain infinitely while held
            gainNode.gain.linearRampToValueAtTime(peakGain, now + 0.1); 
        } else {
            // Piano envelope: Sharp strike attack, exponential decay into a long release
            gainNode.gain.linearRampToValueAtTime(peakGain, now + 0.02);
            gainNode.gain.exponentialRampToValueAtTime(peakGain * 0.5, now + 0.3);
            gainNode.gain.setTargetAtTime(0, now + 0.3, 3.0);
        }

        osc1.start(now);
        osc2.start(now);
        osc3.start(now);

        activeNotes.current.set(frequency, {
            oscillators: [osc1, osc2, osc3],
            gain: gainNode,
            isHarmonium
        });
    }, [initAudio]);

    const stopTone = useCallback((frequency) => {
        if (!audioContext.current) return;
        const active = activeNotes.current.get(frequency);
        if (active) {
            const { oscillators, gain, isHarmonium } = active;
            const ctx = audioContext.current;
            const now = ctx.currentTime;

            // Harmoniums stop much more abruptly when bellows lose pressure or reed closes
            const releaseTime = isHarmonium ? 0.3 : 1.5; 
            
            gain.gain.cancelScheduledValues(now);
            gain.gain.setValueAtTime(gain.gain.value, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + releaseTime);
            gain.gain.linearRampToValueAtTime(0, now + releaseTime + 0.1);

            oscillators.forEach(osc => {
                osc.stop(now + releaseTime + 0.2);
            });

            activeNotes.current.delete(frequency);
        }
    }, []);

    return {
        isReady,
        initAudio,
        playTone,
        stopTone,
        setMasterVolume,
        setBass,
        setReverb,
        isReverbEnabled,
        setIsReverbEnabled,
        resetAudio
    };
}
