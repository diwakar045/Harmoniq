import React from 'react';

const UserMenu = ({ user, logout, onClose }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            height: '100%',
            color: '#f2f2f2'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '500', color: '#f2f2f2' }}>Account</h2>
                <button
                    onClick={onClose}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'rgba(255, 255, 255, 0.6)',
                        cursor: 'pointer',
                        padding: '4px'
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
            </div>

            <div style={{ marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                    Logged in as
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#f2f2f2' }}>
                    {user?.username}
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                    style={{
                        padding: '1rem',
                        borderRadius: '12px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: 'none',
                        color: 'rgba(255, 255, 255, 0.6)',
                        textAlign: 'left',
                        cursor: 'not-allowed',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s'
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                    </svg>
                    Profile Settings
                    <span style={{ fontSize: '0.7rem', backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '2px 6px', borderRadius: '4px', marginLeft: 'auto' }}>Soon</span>
                </button>

                <button
                    onClick={() => {
                        logout();
                        onClose();
                    }}
                    style={{
                        padding: '1rem',
                        borderRadius: '12px',
                        background: 'rgba(239, 68, 68, 0.05)',
                        border: '1px solid rgba(239, 68, 68, 0.1)',
                        color: '#ef4444',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        marginTop: '1rem',
                        transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.05)'}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default UserMenu;
