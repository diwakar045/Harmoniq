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
 * Mapping for the Harmonium layout (The row of letters and numbers).
 * This is now the unified mapping for all keyboard views.
 */
export const HARMONIUM_MAP = {
    '`': 'C4', 'q': 'D4', 'w': 'E4', 'e': 'F4', 'r': 'G4',
    't': 'A4', 'y': 'B4', 'u': 'C5', 'i': 'D5', 'o': 'E5',
    'p': 'F5', '[': 'G5', ']': 'A5', '\\': 'B5',
    '1': 'C#4', '2': 'D#4', '4': 'F#4', '5': 'G#4', '6': 'A#4',
    '7': 'C#5', '8': 'D#5', '9': 'F#5', '-': 'G#5', '=': 'A#5'
};

/**
 * These are the black keys specifically rendered in the HarmoniumLayout.
 * They follow a specific 2-2-3-2 grouping pattern (Missing A#4, grouping D#5-F#5).
 */
export const HARMONIUM_BLACK_KEYS = [
    'C#4', 'D#4', // Group 1 (2)
    'F#4', 'G#4', // Group 2 (2)
    'C#5', 'D#5', 'F#5', // Group 3 (3)
    'G#5', 'A#5' // Group 4 (2)
];

export const getNoteType = (note) => {
    return note.includes('#') ? 'black' : 'white';
};
