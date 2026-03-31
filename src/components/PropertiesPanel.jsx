import React from 'react';
import HorizontalSlider from './HorizontalSlider';

const PropertiesPanel = ({ onClose, volume, setVolume, isReverbEnabled, setIsReverbEnabled, octave, setOctave, onReset, theme }) => {
    const isClassic = theme === 'classic';
    const isDark = theme === 'dark';
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            height: '100%',
            color: 'var(--panel-text)'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '500', color: 'var(--panel-text)' }}>Audio Settings</h2>
                <button
                    onClick={onClose}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--panel-text-dim)',
                        cursor: 'pointer',
                        padding: '4px'
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Horizontal Volume */}
                <HorizontalSlider 
                    label="Volume" 
                    value={volume} 
                    min={0} 
                    max={1} 
                    step={0.01} 
                    onChange={setVolume} 
                    theme={theme} 
                />

                {/* Side by Side: Reverb & Octave */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    {/* Reverb Toggle */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', opacity: 0.6, letterSpacing: '0.05em' }}>
                            Reverb
                        </span>
                        <button
                            onClick={() => setIsReverbEnabled(!isReverbEnabled)}
                            style={{
                                width: '100%',
                                padding: '0.8rem',
                                borderRadius: isClassic ? '8px' : '12px',
                                backgroundColor: isReverbEnabled 
                                    ? (isClassic ? 'var(--primary)' : 'rgba(255, 161, 79, 0.15)')
                                    : 'var(--panel-item-bg)',
                                border: isReverbEnabled && isClassic ? 'none' : '1px solid transparent',
                                color: isReverbEnabled 
                                    ? (isClassic ? '#412619' : 'var(--primary)')
                                    : 'var(--panel-text-dim)',
                                fontWeight: '700',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                            }}
                        >
                            <div style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: isReverbEnabled ? (isClassic ? '#412619' : 'var(--primary)') : 'transparent',
                                border: !isReverbEnabled ? '2px solid currentColor' : 'none'
                            }} />
                            {isReverbEnabled ? 'ENABLED' : 'DISABLED'}
                        </button>
                    </div>

                    {/* Octave Stepper */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', opacity: 0.6, letterSpacing: '0.05em' }}>
                            Octave
                        </span>
                        <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            backgroundColor: 'var(--panel-item-bg)', 
                            borderRadius: isClassic ? '8px' : '12px',
                            padding: '4px',
                            border: isClassic ? '1px solid rgba(255,238,196,0.1)' : 'none'
                        }}>
                            <button
                                onClick={() => setOctave(Math.max(1, octave - 1))}
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: isClassic ? '4px' : '8px',
                                    backgroundColor: 'transparent',
                                    color: 'var(--panel-text)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '1.2rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--panel-item-hover)'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                -
                            </button>
                            <div className="numeric-mono" style={{ 
                                flex: 1, 
                                textAlign: 'center', 
                                fontWeight: '700', 
                                fontSize: '1.1rem',
                                color: isClassic ? '#ffeec4' : 'var(--primary)'
                            }}>
                                {octave}
                            </div>
                            <button
                                onClick={() => setOctave(Math.min(8, octave + 1))}
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: isClassic ? '4px' : '8px',
                                    backgroundColor: 'transparent',
                                    color: 'var(--panel-text)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '1.2rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--panel-item-hover)'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>

                <button
                    onClick={onReset}
                    style={{
                        padding: '0.8rem',
                        backgroundColor: 'var(--panel-item-bg)',
                        border: 'none',
                        borderRadius: '12px',
                        color: 'var(--panel-text)',
                        fontSize: '0.85rem',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        marginTop: '1rem'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--panel-item-hover)'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--panel-item-bg)'}
                >
                    Reset to Default
                </button>
            </div>
        </div>
    );
};

export default PropertiesPanel;
