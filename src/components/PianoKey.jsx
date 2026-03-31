import React from 'react';
import { getNoteType } from '../utils/noteUtils';

const PianoKey = ({ note, label, isActive, onPlay, onStop }) => {
    const type = getNoteType(note);

    // Handlers for mouse/touch interaction
    const handleStart = (e) => {
        e.preventDefault(); // Prevent text selection/scrolling
        onPlay(note);
    };

    const handleEnd = (e) => {
        e.preventDefault();
        onStop(note);
    };

    const baseStyle = {
        position: 'relative',
        userSelect: 'none',
        cursor: 'pointer',
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
        // Quick press (0.05s) and snappy release (0.4s) for a modern feel
        transition: isActive ? 'background-color 0.05s ease-out, transform 0.05s ease-out' : 'background-color 0.4s ease-out, transform 0.1s ease-out',
    };

    const whiteKeyParams = {
        backgroundColor: isActive ? 'var(--primary)' : 'var(--key-white)',
        width: '4.8rem',
        height: '16rem',
        zIndex: 1,
        border: '1px solid var(--key-stroke)',
        borderTop: isActive ? '1px solid var(--key-stroke)' : 'var(--key-white-border-top)',
        borderLeft: isActive ? '1px solid var(--key-stroke)' : 'var(--key-white-border-left)',
        backdropFilter: 'var(--key-blur)',
        boxShadow: isActive
            ? 'none' // Removed glow
            : 'var(--key-shadow), var(--key-glow-white)',
        transform: isActive ? 'translateY(2px)' : 'none',
    };

    const blackKeyParams = {
        backgroundColor: isActive ? 'var(--secondary)' : 'var(--key-black)',
        width: '2.8rem',
        height: '10.5rem',
        zIndex: 2,
        position: 'absolute',
        left: '-1.4rem',
        top: 0,
        border: 'none', // Removed border
        borderTop: 'none',
        borderLeft: 'none',
        backdropFilter: 'var(--key-blur)',
        color: 'white',
        boxShadow: isActive
            ? 'none' // Removed glow
            : 'var(--key-shadow)',
        transform: isActive ? 'translateY(2px)' : 'none',
    };

    // We will layout keys using flexbox for white keys, and absolute positioning for black keys mapping
    // Actually, standard list approach in Keyboard component is better. 
    // Here we just render the div with correct class/style if provided, 
    // but let's assume Keyboard handles the "is black key" positioning logic 
    // or we render them simply in a specific DOM structure.

    // Strategy: Render black keys inside the flow or absolute?
    // Common strategy: Flexbox for white keys. Black keys absolute placed on top.
    // BUT, to keep it simple, checking "type" here is good.

    // NOTE: If this component is responsible for its own style, we play nicely with the parent.
    // The styled parameters above are just inline for reference, let's use className for cleaner CSS?
    // No, inline or CSS Modules is fine. Let's stick to inline for dynamic stuff + className for base.

    // However, mapping black keys usually requires them to sit "between" white keys.
    // Simple HTML structure: A container of keys. Black keys have negative margin or absolute pos.

    return (
        <div
            className={`piano-key ${type}`}
            data-note={note}
            onMouseDown={handleStart}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchEnd={handleEnd}
            style={{
                ...baseStyle,
                ...(type === 'white' ? whiteKeyParams : blackKeyParams),
                // If it's a black key, the parent Keyboard needs to position it. 
                // We will assume "static" flow for white keys and "absolute" for black keys 
                // but that requires knowing "which" key it is. 
                // Let's defer positioning to the Keyboard component via a wrapper or passed styles.
            }}
        >
            <div style={{
                position: 'absolute',
                bottom: '8px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
                pointerEvents: 'none'
            }}>
                <span style={{
                    fontSize: '1rem',
                    color: type === 'white' ? 'var(--text-dim)' : '#fff',
                    fontWeight: type === 'white' ? '800' : '600'
                }}>
                    {note.replace(/\d+/, '')}
                </span>
                <span style={{
                    fontSize: '0.75rem',
                    color: type === 'white' ? '#999' : '#888',
                    textTransform: 'uppercase'
                }}>
                    {label}
                </span>
            </div>
        </div>
    );
};

export default PianoKey;
