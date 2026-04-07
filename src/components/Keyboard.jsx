import React, { useMemo } from 'react';
import PianoKey from './PianoKey';
import { getNotesBetween, getNoteType, HARMONIUM_MAP, HARMONIUM_BLACK_KEYS } from '../utils/noteUtils';

const Keyboard = ({ startNote = 'C4', endNote = 'B5', activeNotes, onPlay, onStop, theme = 'classic' }) => {
    const notes = useMemo(() => getNotesBetween(startNote, endNote), [startNote, endNote]);
    const isMinimal = theme === 'minimal';

    // Create a map for Key Labels (Unified)
    const keyLabels = useMemo(() => {
        const map = {};
        Object.entries(HARMONIUM_MAP).forEach(([k, v]) => {
            map[v] = k.toUpperCase();
        });
        return map;
    }, []);

    return (
        <div className="keyboard" style={{
            display: 'flex',
            position: 'relative',
            padding: isMinimal ? '1.25rem 2rem' : '1.25rem 2.5rem',
            backgroundColor: 'var(--bg-panel)',
            borderRadius: 'var(--border-radius)',
            transition: 'all var(--transition-speed)'
        }}>
            {notes.map((note) => {
                const type = getNoteType(note);
                const label = keyLabels[note] || '';
                const isActive = activeNotes.has(note);

                if (type === 'white') {
                    return (
                        <div key={note} style={{ position: 'relative' }}>
                            <PianoKey
                                note={note}
                                type="white"
                                label={label}
                                isActive={isActive}
                                onPlay={onPlay}
                                onStop={onStop}
                                showNoteNames={!isMinimal}
                            />
                        </div>
                    );
                } else {
                    // Black key logic: Filter and Nudge (Piano Mode Refinements)
                    if (!HARMONIUM_BLACK_KEYS.includes(note)) return null;

                    // Custom Grouping Logic
                    let offset = '-1.2rem'; // Default centered
                    
                    if (isMinimal) {
                        if (note === 'C#5' || note === 'D#5' || note === 'G#5' || note === 'A#5') {
                            // Move 7, 8, -, and = left by exactly 1 white key (4.8rem)
                            offset = '-6.0rem';
                        } else if (note === 'F#5') {
                            // Move 9 left by exactly 2 white keys (9.6rem) to sit between i and o
                            offset = '-10.8rem';
                        }
                    } else if (note === 'F#5') {
                        // Original Harmonium nudging for Classic theme
                        offset = '-3.85rem';
                    }

                    return (
                        <div key={note} style={{ width: 0, position: 'relative', zIndex: 10 }}>
                            <div style={{ position: 'absolute', left: offset }}>
                                <PianoKey
                                    note={note}
                                    type="black"
                                    label={label}
                                    isActive={isActive}
                                    onPlay={onPlay}
                                    onStop={onStop}
                                    showNoteNames={!isMinimal}
                                />
                            </div>
                        </div>
                    );
                }
            })}
        </div>
    );
};

export default Keyboard;
