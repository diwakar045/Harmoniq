import React from 'react';

const VerticalSlider = ({ label, value, min, max, step, onChange, color = 'var(--primary)', theme }) => {
    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            height: '250px',
            padding: '1rem 0',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '20px',
            width: '80px',
            border: 'none',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            transition: 'all var(--transition-speed)',
            backdropFilter: 'blur(10px)',
            position: 'relative'
        }}>
            <div style={{
                height: '160px',
                width: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                cursor: 'pointer'
            }}>
                {/* Active Track */}
                <div style={{
                    width: '100%',
                    height: `${percentage}%`,
                    backgroundColor: color,
                    borderRadius: '10px',
                    boxShadow: theme === 'dark' ? `0 0 15px ${color}` : 'none',
                    transition: 'height 0.1s ease-out'
                }} />

                {/* Knob */}
                <div style={{
                    position: 'absolute',
                    bottom: `${percentage}%`,
                    left: '50%',
                    transform: 'translate(-50%, 50%)',
                    width: '16px',
                    height: '16px',
                    backgroundColor: '#fff',
                    borderRadius: '50%',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
                    zIndex: 2,
                    pointerEvents: 'none',
                    transition: 'bottom 0.1s ease-out'
                }} />

                {/* Hidden Input for interaction */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(parseFloat(e.target.value))}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: '-20px',
                        width: '46px',
                        height: '160px',
                        cursor: 'pointer',
                        opacity: 0,
                        WebkitAppearance: 'slider-vertical', // Still need it for vertical interaction handling
                        appearance: 'slider-vertical',
                        margin: 0,
                        padding: 0,
                        zIndex: 3
                    }}
                />
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.2rem'
            }}>
                <span style={{
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    color: 'rgba(255, 255, 255, 0.5)',
                    fontWeight: '700'
                }}>
                    {label}
                </span>
                <span className="numeric-mono" style={{
                    fontSize: '0.8rem',
                    color: '#f2f2f2',
                    fontWeight: '700'
                }}>
                    {Math.round(value * 100)}%
                </span>
            </div>
        </div>
    );
};

export default VerticalSlider;
