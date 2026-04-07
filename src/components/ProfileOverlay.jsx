import React, { useEffect, useRef } from 'react';

const MenuItem = ({ icon: Icon, label, onClick, theme, isDanger = false }) => {
    const isDark = theme === 'dark';
    const isClassic = theme === 'classic';
    return (
        <button
            onClick={onClick}
            style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                color: isDanger ? '#ef4444' : (isClassic ? '#ffeec4' : (isDark ? '#e2e8f0' : '#1e293b')),
                borderRadius: '8px'
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = isClassic ? 'rgba(255,238,196,0.1)' : (isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)');
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
            }}
        >
            <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>{label}</span>
            <Icon size={18} strokeWidth={2} opacity={0.6} />
        </button>
    );
};

const ProfileOverlay = ({ user, logout, theme, onClose }) => {
    const isDark = theme === 'dark';
    const isClassic = theme === 'classic';
    const overlayRef = useRef(null);

    // Simple Icons

    const LogoutIcon = ({ size, strokeWidth, opacity }) => (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{ opacity }}>
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
        </svg>
    );

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (overlayRef.current && !overlayRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    return (
        <div
            ref={overlayRef}
            style={{
                position: 'absolute',
                top: '54px',
                right: '0',
                width: '300px',
                backgroundColor: isClassic ? 'rgb(65, 38, 25)' : (isDark ? 'rgba(20, 20, 31, 0.7)' : '#ffffff'),
                backdropFilter: isClassic ? 'none' : (isDark ? 'blur(40px) saturate(180%)' : 'none'),
                borderRadius: isClassic ? '8px' : '24px',
                padding: '12px',
                boxShadow: isClassic 
                    ? '0 25px 50px -12px rgba(0, 0, 0, 0.8)'
                    : (isDark
                        ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.1)'
                        : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'),
                border: isClassic ? '1px solid rgba(255,238,196,0.44)' : (isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)'),
                zIndex: 2000,
                transformOrigin: 'top right',
                animation: 'overlayAppear 0.3s cubic-bezier(0.19, 1, 0.22, 1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
            }}
        >
            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px 12px',
                borderBottom: isClassic ? '1px solid rgba(255,238,196,0.2)' : (isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.04)'),
                marginBottom: '4px'
            }}>
                <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isClassic ? '#412619' : '#fff',
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    boxShadow: '0 4px 12px rgba(255, 161, 79, 0.3)'
                }}>
                    {user?.username?.charAt(0).toUpperCase()}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                    <span style={{
                        fontSize: '1rem',
                        fontWeight: '700',
                        color: isClassic ? '#ffeec4' : (isDark ? '#fff' : '#1e293b'),
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                        {user?.username?.toUpperCase()}
                    </span>
                    <span style={{
                        fontSize: '0.8rem',
                        color: isClassic ? 'rgba(255,238,196,0.5)' : (isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)'),
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                        {user?.email}
                    </span>
                </div>
            </div>

            {/* Logout */}
            <MenuItem
                label="Log out"
                icon={LogoutIcon}
                theme={theme}
                isDanger={true}
                onClick={logout}
            />

            <style>{`
                @keyframes overlayAppear {
                    from { opacity: 0; transform: scale(0.95) translateY(-10px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default ProfileOverlay;
