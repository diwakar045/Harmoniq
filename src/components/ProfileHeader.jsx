import React, { useState } from 'react';
import ProfileOverlay from './ProfileOverlay';

const ProfileHeader = ({ user, logout, theme, onAuthClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleToggle = () => {
        if (!user) {
            onAuthClick();
        } else {
            setIsDropdownOpen(!isDropdownOpen);
        }
    };

    // Profile Icon SVG for logged out state
    const ProfileIcon = ({ size = 16 }) => (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );

    const isClassic = theme === 'classic';
    const isDark = theme === 'dark';

    const bgColor = isClassic ? 'var(--cream-05)' : (isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)');
    const iconColor = isClassic ? 'var(--cream)' : (isDark ? 'rgba(255, 255, 255, 0.6)' : '#4a5568');
    const borderStyle = isClassic ? '1px solid var(--cream-44)' : (isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)');

    return (
        <div
            style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Subtle Tooltip */}
            {!isDropdownOpen && (
                <div style={{
                    position: 'absolute',
                    right: '54px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: isClassic ? '#412619' : (theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)'),
                    color: isClassic ? '#ffeec4' : (theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)'),
                    border: isClassic ? '1px solid rgba(255,238,196,0.2)' : 'none',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '0.7rem',
                    fontWeight: '600',
                    letterSpacing: '0.5px',
                    pointerEvents: 'none',
                    opacity: isHovered ? 1 : 0,
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    whiteSpace: 'nowrap',
                    zIndex: 100
                }}>
                    {user ? user.username : 'PROFILE'}
                </div>
            )}

            <button
                onClick={handleToggle}
                style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: isClassic ? '2px' : '50%',
                    backgroundColor: bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: iconColor,
                    border: borderStyle,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    padding: 0,
                    overflow: 'hidden',
                    zIndex: 2001
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = isClassic ? 'var(--cream-07)' : (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)');
                    e.currentTarget.style.transform = isClassic ? 'none' : 'scale(1.05)';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = bgColor;
                    e.currentTarget.style.transform = isClassic ? 'none' : 'scale(1)';
                }}
            >
                {user ? (
                    <span style={{
                        fontSize: '1.2rem',
                        fontWeight: '700',
                        color: isClassic ? 'var(--cream)' : (isDark ? 'var(--primary)' : '#4a5568')
                    }}>
                        {user.username.charAt(0).toUpperCase()}
                    </span>
                ) : (
                    <ProfileIcon size={20} />
                )}
            </button>

            {isDropdownOpen && user && (
                <ProfileOverlay
                    user={user}
                    logout={logout}
                    theme={theme}
                    onClose={() => setIsDropdownOpen(false)}
                />
            )}
        </div>
    );
};

export default ProfileHeader;

