export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

/**
 * Get frequency for a given note (e.g., "C4", "A#5").
 * A4 is 440Hz.
 */
export function getFrequency(note) {
    if (!note) return 0;
    const octave = parseInt(note.slice(-1));
    const noteName = note.slice(0, -1);
    const semiToneIndex = NOTES.indexOf(noteName);

    if (semiToneIndex === -1) return 0;

    // MIDI Note Number calculation
    // C4 is 60. A4 is 69.
    // Formula: f = 440 * 2^((n - 69) / 12)
    const midiNote = (octave + 1) * 12 + semiToneIndex;
    return 440 * Math.pow(2, (midiNote - 69) / 12);
}

export function getNoteFromMidi(midi) {
    const octave = Math.floor(midi / 12) - 1;
    const semiTone = midi % 12;
    return `${NOTES[semiTone]}${octave}`;
}

export function getNotesBetween(startNote, endNote) {
    const getMidi = (n) => {
        const oct = parseInt(n.slice(-1));
        const name = n.slice(0, -1);
        return (oct + 1) * 12 + NOTES.indexOf(name);
    };

    const start = getMidi(startNote);
    const end = getMidi(endNote);

    const notes = [];
    for (let i = start; i <= end; i++) {
        notes.push(getNoteFromMidi(i));
    }
    return notes;
}

/**
 * Map computer keyboard keys to piano notes.
 * Covering range from C3 to E5 approx.
 */
export const KEYBOARD_MAP = {
    // Lower octave (starting Z -> C3)
    'z': 'C3', 's': 'C#3', 'x': 'D3', 'd': 'D#3', 'c': 'E3', 'v': 'F3', 'g': 'F#3', 'b': 'G3', 'h': 'G#3', 'n': 'A3', 'j': 'A#3', 'm': 'B3',
    // Upper octave (starting Q -> C4)
    'q': 'C4', '2': 'C#4', 'w': 'D4', '3': 'D#4', 'e': 'E4', 'r': 'F4', '5': 'F#4', 't': 'G4', '6': 'G#4', 'y': 'A4', '7': 'A#4', 'u': 'B4', 'i': 'C5', '9': 'C#5', 'o': 'D5', '0': 'D#5', 'p': 'E5'
};

export const HARMONIUM_MAP = {
    '`': 'C4', 'q': 'D4', 'w': 'E4', 'e': 'F4', 'r': 'G4',
    't': 'A4', 'y': 'B4', 'u': 'C5', 'i': 'D5', 'o': 'E5',
    'p': 'F5', '[': 'G5', ']': 'A5', '\\': 'B5',
    '1': 'C#4', '2': 'D#4', '4': 'F#4', '5': 'G#4', '6': 'A#4',
    '7': 'C#5', '8': 'D#5', '9': 'F#5', '-': 'G#5', '=': 'A#5'
};

export const getNoteType = (note) => {
    return note.includes('#') ? 'black' : 'white';
};
