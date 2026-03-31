import React from 'react';

const HarmoniumKey = ({ note, label, left, type, activeNotes, onPlay, onStop }) => {
    const isWhite = type === 'white';
    const isPressed = activeNotes.has(note);

    const handleStart = (e) => { e.preventDefault(); onPlay(note); };
    const handleEnd = (e) => { e.preventDefault(); onStop(note); };

    return (
        <div
            className={`${isWhite ? 'white-key' : 'black-key'} ${isPressed ? 'pressed' : ''}`}
            style={{ left: `${left}px` }}
            data-note={note}
            onMouseDown={handleStart}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchEnd={handleEnd}
        >
            <span className="key-label">{label}</span>
            <div className="key-flash"></div>
        </div>
    );
};

const HarmoniumLayout = ({ activeNotes, onPlay, onStop }) => {
    return (
        <div className="harmonium-wrap">
            <div className="keys-row" id="keyboard">
                {/* White Keys */}
                <HarmoniumKey note="C4" label="`" left={0} type="white" activeNotes={activeNotes} onPlay={onPlay} onStop={onStop} />
                <HarmoniumKey note="D4" label="q" left={76} type="white" activeNotes={activeNotes} onPlay={onPlay} onStop={onStop} />
                <HarmoniumKey note="E4" label="w" left={152} type="white" activeNotes={activeNotes} onPlay={onPlay} onStop={onStop} />
                <HarmoniumKey note="F4" label="e" left={228} type="white" activeNotes={activeNotes} onPlay={onPlay} onStop={onStop} />
                <HarmoniumKey note="G4" label="r" left={304} type="white" activeNotes={activeNotes} onPlay={onPlay} onStop={onStop} />
                <HarmoniumKey note="A4" label="t" left={380} type="white" activeNotes={activeNotes} onPlay={onPlay} onStop={onStop} />
                <HarmoniumKey note="B4" label="y" left={456} type="white" activeNotes={activeNotes} onPlay={onPlay} onStop={onStop} />
                <HarmoniumKey note="C5" label="u" left={532} type="white" activeNotes={activeNotes} onPlay={onPlay} onStop={onStop} />
                <HarmoniumKey note="D5" label="i" left={608} type="white" activeNotes={activeNotes} onPlay={onPlay} onStop={onStop} />
                <HarmoniumKey note="E5" label="o" left={684} type="white" activeNotes={activeNotes} onPlay={onPlay} onStop={onStop} />
                <HarmoniumKey note="F5" label="p" left={760} type="white" activeNotes={activeNotes} onPlay={onPlay} onStop={onStop} />
                <HarmoniumKey note="G5" label="[" left={836} type="white" activeNotes={activeNotes} onPlay={onPlay} onStop={onStop} />
                <HarmoniumKey note="A5" label="]" left={912} type="white" activeNotes={activeNotes} onPlay={onPlay} onStop={onStop} />
                <HarmoniumKey note="B5" label="\" left={988} type="white" activeNotes={activeNotes} onPlay={onPlay} onStop={onStop} />

                {/* Black Keys */}
                <HarmoniumKey note="C#4" label="1" left={50} type="black" activeNotes={activeNotes} onPlay={onPlay} onStop={onStop} />
                <HarmoniumKey note="D#4" label="2" left={126} type="black" activeNotes={activeNotes} onPlay={onPlay} onStop={onStop} />
                <HarmoniumKey note="F#4" label="4" left={277} type="black" activeNotes={activeNotes} onPlay={onPlay} onStop={onStop} />
                <HarmoniumKey note="G#4" label="5" left={354} type="black" activeNotes={activeNotes} onPlay={onPlay} onStop={onStop} />
                <HarmoniumKey note="C#5" label="7" left={504} type="black" activeNotes={activeNotes} onPlay={onPlay} onStop={onStop} />
                <HarmoniumKey note="D#5" label="8" left={581} type="black" activeNotes={activeNotes} onPlay={onPlay} onStop={onStop} />
                <HarmoniumKey note="F#5" label="9" left={656} type="black" activeNotes={activeNotes} onPlay={onPlay} onStop={onStop} />
                <HarmoniumKey note="G#5" label="-" left={810} type="black" activeNotes={activeNotes} onPlay={onPlay} onStop={onStop} />
                <HarmoniumKey note="A#5" label="=" left={886} type="black" activeNotes={activeNotes} onPlay={onPlay} onStop={onStop} />

                {/* Note Labels */}
                <div className="note-labels">
                    <span className="note-label" style={{ left: '255px' }}>C</span>
                    <span className="note-label" style={{ left: '331px' }}>D</span>
                    <span className="note-label" style={{ left: '409px' }}>E</span>
                    <span className="note-label" style={{ left: '485px' }}>F</span>
                    <span className="note-label" style={{ left: '559px' }}>G</span>
                    <span className="note-label" style={{ left: '634px' }}>A</span>
                    <span className="note-label" style={{ left: '712px' }}>B</span>
                </div>
            </div>
        </div>
    );
};

export default HarmoniumLayout;
