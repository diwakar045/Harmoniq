import React from 'react';

const HorizontalSlider = ({ label, value, min, max, step, onChange, color = 'var(--primary)', theme }) => {
    const isClassic = theme === 'classic';
    const isDark = theme === 'dark';

    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', opacity: 0.6, letterSpacing: '0.05em' }}>
                    {label}
                </span>
                <span className="numeric-mono" style={{ fontSize: '0.9rem', fontWeight: '700' }}>
                    {Math.round(percentage)}%
                </span>
            </div>
            
            <div style={{ position: 'relative', width: '100%', height: '8px', cursor: 'pointer' }}>
                {/* Track Background */}
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundColor: isClassic ? 'rgba(255,238,196,0.1)' : 'var(--panel-item-bg)',
                    borderRadius: '4px'
                }} />
                
                {/* Active Progress */}
                <div style={{
                    position: 'absolute',
                    width: `${percentage}%`,
                    height: '100%',
                    backgroundColor: isClassic ? '#ffeec4' : color,
                    borderRadius: '4px',
                    boxShadow: isClassic ? 'none' : `0 0 10px ${color}33`
                }} />
                
                {/* Range Input Overlay */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(parseFloat(e.target.value))}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        cursor: 'pointer',
                        zIndex: 2
                    }}
                />
                
                {/* Knob */}
                <div style={{
                    position: 'absolute',
                    left: `${percentage}%`,
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '18px',
                    height: '18px',
                    backgroundColor: isClassic ? '#ffeec4' : '#fff',
                    borderRadius: isClassic ? '2px' : '50%',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                    pointerEvents: 'none',
                    zIndex: 3,
                    border: isClassic ? 'none' : '2px solid #fff'
                }} />
            </div>
        </div>
    );
};

export default HorizontalSlider;
