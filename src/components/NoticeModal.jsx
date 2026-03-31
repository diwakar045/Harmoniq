import React from 'react';
import Modal from './Modal';

const NoticeModal = ({ isOpen, onClose, onAction, title, message, actionLabel, theme }) => {
    const isDark = theme === 'dark';
    const isClassic = theme === 'classic';
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            theme={theme}
            title={title || "Just a Quick Note"}
            footer={(
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                    <button
                        onClick={onAction}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            borderRadius: isClassic ? '8px' : '12px',
                            background: 'var(--primary)',
                            color: isClassic ? '#412619' : 'white',
                            cursor: 'pointer',
                            fontWeight: '600',
                            border: 'none',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                            fontSize: '0.9rem'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        {actionLabel || "Got it!"}
                    </button>
                    <button
                        onClick={onClose}
                        style={{
                            width: '100%',
                            padding: '0.8rem',
                            borderRadius: isClassic ? '8px' : '12px',
                            background: 'transparent',
                            color: isClassic ? 'rgba(255,238,196,0.5)' : (isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)'),
                            cursor: 'pointer',
                            fontWeight: '600',
                            border: isClassic ? '1px solid rgba(255,238,196,0.3)' : (isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)'),
                            fontSize: '0.85rem',
                            transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.color = isClassic ? '#ffeec4' : (isDark ? '#fff' : '#000')}
                        onMouseOut={(e) => e.currentTarget.style.color = isClassic ? 'rgba(255,238,196,0.5)' : (isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)')}
                    >
                        Maybe Later
                    </button>
                </div>
            )}
        >
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div style={{
                    fontSize: '3.5rem',
                    marginBottom: '1.5rem',
                    animation: 'float 3s ease-in-out infinite'
                }}>
                    ✨
                </div>
                <p style={{
                    color: isClassic ? 'rgba(255,238,196,0.8)' : (isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(30, 41, 59, 0.8)'),
                    lineHeight: '1.6',
                    fontSize: '1.1rem',
                    fontWeight: '500'
                }}>
                    {message}
                </p>
            </div>
            <style>{`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }
            `}</style>
        </Modal>
    );
};

export default NoticeModal;
