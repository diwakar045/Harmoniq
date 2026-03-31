import { useState, useRef, useCallback, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

export function useRecorder(playNote, stopNote, user) {
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);

    // Playback state
    const [activeRecordingId, setActiveRecordingId] = useState(null);
    const [isPlaybackPaused, setIsPlaybackPaused] = useState(false);
    const [playbackTime, setPlaybackTime] = useState(0);

    const [recordings, setRecordings] = useState([]);
    const events = useRef([]);
    const startTime = useRef(0);
    const pauseTime = useRef(0);
    const timerRef = useRef(null);
    const playNoteRef = useRef(playNote);
    const stopNoteRef = useRef(stopNote);

    // Playback internals
    const playbackTimeouts = useRef([]);
    const playbackStartTime = useRef(0);
    const playbackOffset = useRef(0);
    const [currentRecording, setCurrentRecording] = useState(null);
    const playbackTimerRef = useRef(null);

    // Sync refs
    useEffect(() => {
        playNoteRef.current = playNote;
        stopNoteRef.current = stopNote;
    }, [playNote, stopNote]);

    // Real-time listener for user's recordings - Fixes bug where recordings didn't show immediately
    useEffect(() => {
        if (!user) {
            setRecordings([]);
            return;
        }
        
        const q = query(collection(db, "recordings"), where("userId", "==", user.id));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const userRecordings = [];
            querySnapshot.forEach((docSnapshot) => {
                userRecordings.push({ id: docSnapshot.id, ...docSnapshot.data() });
            });
            // Sort locally to avoid Firestore index requirement
            setRecordings(userRecordings.sort((a, b) => b.timestamp - a.timestamp));
        }, (error) => {
            console.error("Error fetching recordings:", error);
        });

        return () => unsubscribe();
    }, [user]);

    // Keep an empty function for referential stability in case components expect it
    const refreshRecordings = useCallback(() => {}, []);

    const startRecording = useCallback(() => {
        if (!user) return;
        events.current = [];
        startTime.current = Date.now();
        setIsRecording(true);
        setIsPaused(false);
        setElapsedTime(0);
        timerRef.current = setInterval(() => {
            setElapsedTime(Date.now() - startTime.current);
        }, 100);
    }, [user]);

    const pauseRecording = useCallback(() => {
        if (isPaused) {
            startTime.current += (Date.now() - pauseTime.current);
            setIsPaused(false);
            timerRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTime.current);
            }, 100);
        } else {
            clearInterval(timerRef.current);
            pauseTime.current = Date.now();
            setIsPaused(true);
        }
    }, [isPaused]);

    const stopCapturing = useCallback(() => {
        clearInterval(timerRef.current);
        setIsRecording(false);
        setIsPaused(false);
    }, []);

    const stopRecording = useCallback(async (name) => {
        // Ensure state is stopped if it wasn't already (e.g. from stopCapturing)
        clearInterval(timerRef.current);
        setIsRecording(false);
        setIsPaused(false);

        if (events.current.length > 0 && user) {
            try {
                await addDoc(collection(db, "recordings"), {
                    name: name || `Recording ${new Date().toLocaleString()}`,
                    timestamp: Date.now(),
                    duration: elapsedTime,
                    events: [...events.current], // Snapshot the events
                    userId: user.id
                });
            } catch (error) {
                console.error("Firestore Write Error:", error);
                alert("Failed to save to Database: " + error.message);
            }
        }
        setElapsedTime(0);
        events.current = []; // Clear for next session
    }, [elapsedTime, user]);

    const recordEvent = useCallback((note, type) => {
        if (isRecording && !isPaused) {
            events.current.push({
                time: Date.now() - startTime.current,
                note,
                type
            });
        }
    }, [isRecording, isPaused]);

    const stopPlayback = useCallback(() => {
        playbackTimeouts.current.forEach(t => clearTimeout(t));
        playbackTimeouts.current = [];
        clearInterval(playbackTimerRef.current);
        setActiveRecordingId(null);
        setIsPlaybackPaused(false);
        setPlaybackTime(0);
        playbackOffset.current = 0;
        setCurrentRecording(null);
    }, []);

    const playWithOffset = useCallback((recording, offset) => {
        playbackTimeouts.current.forEach(t => clearTimeout(t));
        playbackTimeouts.current = [];
        clearInterval(playbackTimerRef.current);

        playbackStartTime.current = Date.now();
        playbackOffset.current = offset;
        setPlaybackTime(offset);

        // Start visual timer
        playbackTimerRef.current = setInterval(() => {
            const current = offset + (Date.now() - playbackStartTime.current);
            if (current >= recording.duration) {
                stopPlayback();
            } else {
                setPlaybackTime(current);
            }
        }, 50);

        recording.events.forEach(event => {
            if (event.time >= offset) {
                const timeoutId = setTimeout(() => {
                    if (event.type === 'start') {
                        playNoteRef.current?.(event.note, true);
                    } else {
                        stopNoteRef.current?.(event.note);
                    }
                    playbackTimeouts.current = playbackTimeouts.current.filter(id => id !== timeoutId);
                }, event.time - offset);
                playbackTimeouts.current.push(timeoutId);
            }
        });
    }, [stopPlayback]);

    const playRecording = useCallback((recording) => {
        if (!recording || !recording.events) return;

        if (activeRecordingId === recording.id) {
            if (!isPlaybackPaused) {
                // Pause
                playbackTimeouts.current.forEach(t => clearTimeout(t));
                playbackTimeouts.current = [];
                clearInterval(playbackTimerRef.current);
                playbackOffset.current += (Date.now() - playbackStartTime.current);
                setIsPlaybackPaused(true);
            } else {
                // Resume
                setIsPlaybackPaused(false);
                playWithOffset(recording, playbackOffset.current);
            }
        } else {
            // New selection
            stopPlayback();
            setActiveRecordingId(recording.id);
            setCurrentRecording(recording);
            setIsPlaybackPaused(false);
            playWithOffset(recording, 0);
        }
    }, [activeRecordingId, isPlaybackPaused, stopPlayback, playWithOffset]);

    const seekTo = useCallback((timeMs) => {
        if (!currentRecording) return;
        const clampedTime = Math.max(0, Math.min(timeMs, currentRecording.duration));

        if (isPlaybackPaused) {
            playbackOffset.current = clampedTime;
            setPlaybackTime(clampedTime);
        } else {
            playWithOffset(currentRecording, clampedTime);
        }
    }, [isPlaybackPaused, playWithOffset, currentRecording]);

    const deleteRecording = useCallback(async (id) => {
        if (activeRecordingId === id) stopPlayback();
        await deleteDoc(doc(db, "recordings", id));
    }, [activeRecordingId, stopPlayback]);

    return {
        isRecording,
        isPaused,
        elapsedTime,
        recordings,
        activeRecordingId,
        isPlaybackPaused,
        playbackTime,
        currentRecording,
        startRecording,
        pauseRecording,
        stopRecording,
        stopCapturing,
        recordEvent,
        playRecording,
        deleteRecording,
        seekTo,
        stopPlayback
    };
}
