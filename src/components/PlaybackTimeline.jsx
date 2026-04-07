import React from 'react';

const PlaybackTimeline = ({ currentTime, duration, onSeek, isPaused, recordingName, onPlayPause, onStop, theme }) => {
    const isClassic = theme === 'classic';
    const isDark = theme === 'dark';
    const formatTime = (ms) => {
        const seconds = Math.floor(ms / 1000);
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = (currentTime / duration) * 100;

    return (
        <div style={{
            width: '100%',
            maxWidth: '600px',
            backgroundColor: isClassic ? 'rgb(65, 38, 25)' : 'var(--bg-panel)',
            backdropFilter: isClassic ? 'none' : 'blur(20px)',
            padding: '1.2rem 2rem',
            borderRadius: isClassic ? '8px' : '24px',
            border: isClassic ? '1px solid rgba(255,238,196,0.44)' : '1px solid var(--border-color)',
            boxShadow: isClassic ? '0 15px 40px -10px rgba(0, 0, 0, 0.45)' : 'var(--panel-shadow)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            animation: 'slideUp 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
            zIndex: 100,
            position: 'relative',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
        }}>
            {/* ... other parts ... */}
            <button
                onClick={onStop}
                style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'var(--border-color)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-dim)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    zIndex: 10
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                    e.currentTarget.style.color = '#ef4444';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.background = 'var(--border-color)';
                    e.currentTarget.style.color = 'var(--text-dim)';
                }}
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>

            {/* Play/Pause Control */}
            <button
                onClick={onPlayPause}
                style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: isPaused ? 'var(--primary)' : 'rgba(255, 161, 79, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    flexShrink: 0,
                    color: isPaused ? 'white' : 'var(--primary)'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                {isPaused ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                )}
            </button>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: isPaused ? '#eab308' : 'var(--primary)',
                            boxShadow: theme === 'dark' ? `0 0 10px ${isPaused ? '#eab308' : 'var(--primary)'}` : 'none'
                        }} />
                        <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-main)' }}>
                            Replaying: {recordingName}
                        </span>
                    </div>
                    <div style={{
                        fontFamily: isClassic ? 'inherit' : "'Roboto Mono', monospace",
                        fontSize: '0.8rem',
                        color: isClassic ? 'rgba(255,238,196,0.5)' : 'var(--text-dim)',
                        backgroundColor: isClassic ? 'rgba(255,238,196,0.05)' : 'var(--bg-sidebar)',
                        padding: '4px 10px',
                        borderRadius: isClassic ? '4px' : '8px'
                    }}>
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                </div>

                <div style={{ position: 'relative', width: '100%', height: '6px', cursor: 'pointer' }}>
                    {/* Custom Track */}
                    <div style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'var(--border-color)',
                        borderRadius: '3px'
                    }} />
                    {/* Active Progress */}
                    <div style={{
                        position: 'absolute',
                        width: `${progress}%`,
                        height: '100%',
                        backgroundColor: 'var(--primary)',
                        borderRadius: '3px',
                        transition: 'width 0.1s linear'
                    }} />
                    {/* Range Input Overlay */}
                    <input
                        type="range"
                        min="0"
                        max={duration}
                        value={currentTime}
                        onChange={(e) => onSeek(Number(e.target.value))}
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
                        left: `${progress}%`,
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '14px',
                        height: '14px',
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                        pointerEvents: 'none',
                        transition: 'left 0.1s linear'
                    }} />
                </div>

                <style>{`
                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
            </div>
        </div>
    );
};

export default PlaybackTimeline;
