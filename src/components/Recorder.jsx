import React, { useState } from 'react';
import Modal from './Modal';

export const RecorderBar = ({ isRecording, isPaused, elapsedTime, onStart, onPause, onStop, onStopLogic }) => {
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [recordingName, setRecordingName] = useState('');

    const formatTime = (ms) => {
        const seconds = Math.floor(ms / 1000);
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleStopClick = () => {
        onStopLogic?.(); // Stop capturing immediately
        setRecordingName(`Session ${new Date().toLocaleTimeString()}`);
        setIsSaveModalOpen(true);
    };

    const handleConfirmSave = () => {
        onStop(recordingName);
        setIsSaveModalOpen(false);
        setRecordingName('');
    };

    return (
        <>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.8rem',
                backgroundColor: 'var(--bg-panel)',
                padding: '1.2rem 3rem',
                borderRadius: '60px',
                border: 'none',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
                marginBottom: '2rem',
                transition: 'all var(--transition-speed)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    {!isRecording ? (
                        <button
                            onClick={onStart}
                            style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                backgroundColor: '#ef4444',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'transform 0.2s',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white' }} />
                        </button>
                    ) : (
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                onClick={onPause}
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    backgroundColor: isPaused ? '#22c55e' : '#eab308',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                {isPaused ? (
                                    <div style={{ marginLeft: '5px', borderLeft: '17px solid white', borderTop: '12px solid transparent', borderBottom: '12px solid transparent' }} />
                                ) : (
                                    <div style={{ display: 'flex', gap: '5px' }}>
                                        <div style={{ width: '6px', height: '20px', backgroundColor: 'white' }} />
                                        <div style={{ width: '6px', height: '20px', backgroundColor: 'white' }} />
                                    </div>
                                )}
                            </button>
                            <button
                                onClick={handleStopClick}
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    backgroundColor: '#ef4444',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                <div style={{ width: '17px', height: '17px', backgroundColor: 'white' }} />
                            </button>
                        </div>
                    )}
                </div>

                <div className="numeric-mono" style={{
                    fontSize: '1.7rem',
                    color: isRecording ? '#ef4444' : 'var(--text-dim)',
                    minWidth: '100px',
                    textAlign: 'center',
                    fontWeight: '600'
                }}>
                    {formatTime(elapsedTime)}
                </div>

                {isRecording && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.7rem',
                        fontSize: '1rem',
                        color: '#ef4444',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        letterSpacing: '1px'
                    }}>
                        <div className="pulse" style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: '#ef4444',
                            animation: 'pulse 1.5s infinite'
                        }} />
                        {isPaused ? 'Paused' : 'Recording'}
                    </div>
                )}
            </div>

            <Modal
                isOpen={isSaveModalOpen}
                onClose={() => setIsSaveModalOpen(false)}
                title="Save Your Masterpiece"
                footer={(
                    <>
                        <button
                            onClick={() => setIsSaveModalOpen(false)}
                            style={{
                                padding: '0.8rem 1.5rem',
                                borderRadius: '12px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                color: 'rgba(255, 255, 255, 0.6)',
                                cursor: 'pointer',
                                fontWeight: '500'
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirmSave}
                            style={{
                                padding: '0.8rem 1.5rem',
                                borderRadius: '12px',
                                background: 'var(--primary)',
                                color: 'white',
                                cursor: 'pointer',
                                fontWeight: '500',
                                boxShadow: 'none'
                            }}
                        >
                            Save Recording
                        </button>
                    </>
                )}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.5)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Recording Name
                    </label>
                    <input
                        type="text"
                        value={recordingName}
                        onChange={(e) => setRecordingName(e.target.value)}
                        placeholder="Enter name..."
                        autoFocus
                        style={{
                            width: '100%',
                            padding: '1rem',
                            borderRadius: '12px',
                            backgroundColor: 'rgba(245, 249, 253, 0.09) !important',
                            border: '1px solid rgba(255, 255, 255, 0.1) !important',
                            color: 'rgba(242, 242, 242, 0.8) !important',
                            fontSize: '1rem',
                            outline: 'none',
                            transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                    />
                </div>
            </Modal>
        </>
    );
};

export const RecordingList = ({ recordings, onPlay, onDelete }) => {
    return (
        <div style={{
            width: '100%',
            maxWidth: '800px',
            marginTop: '3rem',
            backgroundColor: 'var(--bg-panel)',
            borderRadius: '20px',
            padding: '1.5rem',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--panel-shadow)',
            transition: 'all var(--transition-speed)'
        }}>
            <h3 style={{
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: 'var(--text-dim)',
                marginBottom: '1.5rem',
                textAlign: 'center'
            }}>
                Library
            </h3>
            {recordings.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    No recordings yet. Hit the red button to start!
                </p>
            ) : (
                <div style={{ display: 'grid', gap: '0.8rem' }}>
                    {recordings.map(rec => (
                        <div key={rec.id} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '1rem 1.5rem',
                            backgroundColor: 'var(--item-bg)',
                            borderRadius: '12px',
                            border: '1px solid var(--border-color)',
                            transition: 'all 0.2s'
                        }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <div style={{ fontWeight: '400', fontSize: '16px', color: 'var(--text-main)' }}>{rec.name}</div>
                                <div className="numeric-mono" style={{ fontSize: '13px', fontWeight: '400', color: 'var(--text-dim)' }}>
                                    {new Date(rec.timestamp).toLocaleDateString()} • {Math.round(rec.duration / 1000)}s
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                                <button
                                    onClick={() => onPlay(rec)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: 'rgba(255, 161, 79, 0.4)',
                                        cursor: 'pointer',
                                        padding: '10px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.2s',
                                        backgroundColor: 'rgba(255, 161, 79, 0.07)',
                                        opacity: 0.8
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.color = '#FFA14F';
                                        e.currentTarget.style.backgroundColor = 'rgba(255, 161, 79, 0.15)';
                                        e.currentTarget.style.opacity = '1';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.color = 'rgba(255, 161, 79, 0.4)';
                                        e.currentTarget.style.backgroundColor = 'rgba(255, 161, 79, 0.07)';
                                        e.currentTarget.style.opacity = '0.8';
                                    }}
                                >
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => onDelete(rec.id)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: 'rgba(239, 68, 68, 0.4)',
                                        cursor: 'pointer',
                                        padding: '10px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.2s',
                                        backgroundColor: 'rgba(239, 68, 68, 0.07)',
                                        opacity: 0.8
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.color = '#ef4444';
                                        e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
                                        e.currentTarget.style.opacity = '1';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.color = 'rgba(239, 68, 68, 0.4)';
                                        e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.07)';
                                        e.currentTarget.style.opacity = '0.8';
                                    }}
                                >
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
