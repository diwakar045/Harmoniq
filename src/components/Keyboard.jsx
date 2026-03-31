import React, { useMemo } from 'react';
import PianoKey from './PianoKey';
import { getNotesBetween, getNoteType, HARMONIUM_MAP } from '../utils/noteUtils';

const Keyboard = ({ startNote = 'C3', endNote = 'E5', activeNotes, onPlay, onStop }) => {
    const notes = useMemo(() => getNotesBetween(startNote, endNote), [startNote, endNote]);

    // Create a map for Key Labels (Computer Keyboard)
    const keyLabels = useMemo(() => {
        const map = {};
        Object.entries(HARMONIUM_MAP).forEach(([k, v]) => {
            map[v] = k.toUpperCase();
        });
        return map;
    }, []);

    // Filter notes into whites and blacks for rendering strategy
    // We render a container. 
    // White keys are static relative.
    // Black keys are absolute, positioned based on the index of the preceding white key.

    // List of notes is used to render the keys in order.

    return (
        <div className="keyboard" style={{
            display: 'flex',
            position: 'relative',
            padding: '1.2rem 2.5rem',
            backgroundColor: 'var(--bg-panel)',
            borderRadius: 'var(--border-radius)',
            boxShadow: 'var(--panel-shadow)',
            marginTop: '2rem',
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
                            />
                        </div>
                    );
                } else {
                    // Black key
                    // It should be positioned relative to the previous white key?
                    // Actually, if we put black keys inside the previous white key's div, z-ordering is easy?
                    // Or just render it absolutely.
                    // Since we are iterating:
                    // A black key always follows a white key (except maybe if starting on black, but typically we start C).
                    // If we are mapping, we can return the black key adjacent to the previous white one.

                    // Better: The black key belongs "between" this slot and the next?
                    // Note: "C" is white. "C#" comes next.
                    // If I render C# absolutely inside the specific spot, I need to know where.

                    // Let's use the fact that I'm iterating. I can't easily nest "C#" inside "C" without reshaping data.
                    // BUT, I can render it as a 0-width element that overflows?

                    return (
                        <div key={note} style={{ width: 0, position: 'relative', zIndex: 10 }}>
                            <div style={{ position: 'absolute', left: '-1.2rem' }}>
                                <PianoKey
                                    note={note}
                                    type="black"
                                    label={label}
                                    isActive={isActive}
                                    onPlay={onPlay}
                                    onStop={onStop}
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
