import React, { useState } from 'react';
import { LibraryNavIcon, SettingsNavIcon, RecordNavIcon, ShareNavIcon, ThemeNavIcon } from './ClassicSVGs';

const NavItem = ({ icon: Icon, onClick, title, color = '#9E9EAA', activeColor = '#f2f2f2', hoverBg = '#333648', isPrimary = false, primaryColor = '#EB5757', isTabActive = false, hideTitle = false }) => {
    const [isHovered, setIsHovered] = useState(false);

    const showTitle = title && !hideTitle && (isHovered || isTabActive);

    const buttonStyle = {
        minWidth: '42px',
        height: '42px',
        borderRadius: '100px',
        padding: showTitle ? '0 16px' : '0',
        backgroundColor: isPrimary ? primaryColor : (isTabActive ? 'rgba(255, 255, 255, 0.1)' : (isHovered ? hoverBg : 'transparent')),
        color: isPrimary ? '#fff' : (isTabActive || isHovered ? activeColor : color),
        cursor: 'pointer',
        border: isTabActive && !isPrimary ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: showTitle ? 'flex-start' : 'center',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        position: 'relative'
    };

    return (
        <button
            style={buttonStyle}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Icon size={24} strokeWidth={1.5} />
            {title && (
                <span style={{
                    maxWidth: showTitle ? '120px' : '0',
                    opacity: showTitle ? 1 : 0,
                    marginLeft: showTitle ? '8px' : '0',
                    overflow: 'hidden',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                }}>
                    {title}
                </span>
            )}
        </button>
    );
};

// Simple Curvy Icons
const LibraryIcon = ({ size, strokeWidth }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 21h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H9L7 3H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2z" />
        <circle cx="12" cy="13" r="2" />
        <path d="M14 13V9" />
    </svg>
);

const SettingsIcon = ({ size, strokeWidth }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3" />
        <circle cx="4" cy="12" r="2" />
        <circle cx="12" cy="10" r="2" />
        <circle cx="20" cy="14" r="2" />
    </svg>
);

const RecordIcon = ({ size, strokeWidth }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="currentColor" />
        <circle cx="12" cy="12" r="3" fill="#fff" />
    </svg>
);

const UserIcon = ({ size, strokeWidth }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const ConnectIcon = ({ size, strokeWidth }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
);

const ThemeIcon = ({ size, strokeWidth }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v18" />
        <path d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9V3z" fill="currentColor" fillOpacity="0.4" />
    </svg>
);

const NavigationBar = ({
    onLibraryToggle,
    onSettingsToggle,
    onRecordToggle,
    onConnectToggle,
    onThemeToggle,
    isRecording,
    theme,
    activeTab,
    onClose,
    children
}) => {
    const isExpanded = !!activeTab;

    // Theme specific Nav styles:
    const isClassic = theme === 'classic';
    const isDark = theme === 'dark';
    
    // Classic colors match old nav
    const classicBgColor = 'rgb(65, 38, 25)';
    const classicBorder = '1px solid rgba(255,238,196,0.44)';
    const classicItemColor = 'rgba(255,238,196,0.72)';
    const classicActiveColor = '#ffeec4';
    const classicHoverBg = 'rgba(255,238,196,0.13)';

    // Minimal colors
    const minimalBgColor = '#13141F';
    const minimalItemColor = '#9E9EAA'; 
    const minimalActiveColor = '#f2f2f2'; 
    const minimalHoverBg = '#333648';

    const navBgColor = isClassic ? classicBgColor : minimalBgColor;
    const navItemColor = isClassic ? classicItemColor : minimalItemColor; 
    const navActiveColor = isClassic ? classicActiveColor : minimalActiveColor; 
    const navHoverBg = isClassic ? classicHoverBg : minimalHoverBg;

    return (
        <>
            {/* Click-outside Backdrop */}
            {isExpanded && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 1000,
                        backgroundColor: 'transparent'
                    }}
                    onClick={onClose}
                />
            )}

            <div style={{
                position: 'fixed',
                bottom: '32px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: isExpanded ? '400px' : 'auto',
                minWidth: isExpanded ? '400px' : '0',
                height: isExpanded ? 'calc(100vh - 100px)' : '54px',
                maxHeight: '800px',
                backgroundColor: isDark ? 'rgba(19, 20, 31, 0.45)' : navBgColor,
                backdropFilter: isDark ? 'blur(40px) saturate(180%) contrast(100%)' : (isClassic ? 'none' : 'blur(24px)'),
                borderRadius: isExpanded ? (isClassic ? '8px' : '32px') : '100px',
                padding: '4px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxShadow: isDark
                    ? (isExpanded ? '0 30px 90px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.15)' : '0 10px 30px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.15)')
                    : (isExpanded ? '0 30px 90px rgba(0, 0, 0, 0.6)' : (isClassic ? 'none' : '0 10px 30px rgba(0, 0, 0, 0.4)')),
                zIndex: 1001,
                border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : (isClassic ? classicBorder : 'none'),
                transition: 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
                overflow: 'hidden'
            }}>
                {/* Scrollable Content Area */}
                <div style={{
                    flex: isExpanded ? 1 : 0,
                    opacity: isExpanded ? 1 : 0,
                    visibility: isExpanded ? 'visible' : 'hidden',
                    transition: 'all 0.3s ease',
                    overflowY: 'auto',
                    padding: isExpanded ? '24px' : '0',
                    marginBottom: isExpanded ? '54px' : '0',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    {children}
                </div>

                {/* Bottom Controls */}
                <div style={{
                    position: isExpanded ? 'absolute' : 'relative',
                    bottom: isExpanded ? '6px' : 'auto',
                    left: isExpanded ? '50%' : 'auto',
                    transform: isExpanded ? 'translateX(-50%)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '0 10px',
                    backgroundColor: isDark ? 'transparent' : navBgColor,
                    borderRadius: '100px',
                    zIndex: 2,
                    height: '42px' // Match NavItem height
                }}>
                    <NavItem
                        icon={LibraryIcon}
                        title="Library"
                        onClick={onLibraryToggle}
                        isTabActive={activeTab === 'library'}
                        hideTitle={isExpanded}
                        color={navItemColor}
                        activeColor={navActiveColor}
                        hoverBg={navHoverBg}
                    />
                    <NavItem
                        icon={SettingsIcon}
                        title="Settings"
                        onClick={onSettingsToggle}
                        isTabActive={activeTab === 'settings'}
                        hideTitle={isExpanded}
                        color={navItemColor}
                        activeColor={navActiveColor}
                        hoverBg={navHoverBg}
                    />

                    <div style={{ margin: '0 10px' }}>
                        <NavItem
                            icon={RecordIcon}
                            title={isRecording ? "Stop Recording" : "Start Recording"}
                            onClick={onRecordToggle}
                            isPrimary={true}
                            primaryColor={isClassic ? 'rgb(240 72 46)' : '#EB5757'}
                            activeColor="transparent"
                            hideTitle={isExpanded}
                        />
                    </div>

                    <NavItem
                        icon={ConnectIcon}
                        title="Socials"
                        onClick={onConnectToggle}
                        isTabActive={activeTab === 'connect'}
                        hideTitle={isExpanded}
                        color={navItemColor}
                        activeColor={navActiveColor}
                        hoverBg={navHoverBg}
                    />
                    <NavItem
                        icon={ThemeIcon}
                        title="Themes"
                        onClick={onThemeToggle}
                        isTabActive={activeTab === 'themes'}
                        hideTitle={isExpanded}
                        color={navItemColor}
                        activeColor={navActiveColor}
                        hoverBg={navHoverBg}
                    />
                </div>
            </div>
        </>
    );
};

export default NavigationBar;
