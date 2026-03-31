import React, { useState } from 'react';
import Modal from './Modal';

const Sidebar = ({ recordings, onPlay, onDelete, activeRecordingId, onClose, theme }) => {
    const isClassic = theme === 'classic';
    const isDark = theme === 'dark';
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletingRecId, setDeletingRecId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const handleDeleteClick = (id) => {
        setDeletingRecId(id);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (deletingRecId) {
            onDelete(deletingRecId);
            setIsDeleteModalOpen(false);
            setDeletingRecId(null);
        }
    };

    const filteredRecordings = recordings.filter(rec =>
        rec.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '500', color: 'var(--panel-text)' }}>Library</h2>
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

            <div style={{ position: 'relative' }}>
                <input
                    type="text"
                    placeholder="Search recordings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '0.75rem 1rem 0.75rem 2.5rem',
                        backgroundColor: 'var(--panel-item-bg)',
                        border: 'none',
                        borderRadius: '12px',
                        color: 'var(--panel-text)',
                        fontSize: '0.9rem',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                    }}
                />
                <svg
                    style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--panel-text-dim)' }}
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                >
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                </svg>
            </div>

            <div style={{
                flex: 1,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                marginRight: '-12px',
                paddingRight: '8px'
            }}>
                {filteredRecordings.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--panel-text-dim)' }}>
                        {searchQuery ? 'No recordings found' : 'Your library is empty'}
                    </div>
                ) : (
                    filteredRecordings.map(rec => (
                        <div
                            key={rec.id}
                            style={{
                                padding: '1rem',
                                backgroundColor: activeRecordingId === rec.id ? 'var(--panel-item-hover)' : 'var(--panel-item-bg)',
                                borderRadius: '12px',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                position: 'relative',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                            onClick={() => {
                                onPlay(rec);
                                onClose();
                            }}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                                <span style={{
                                    fontWeight: '400',
                                    fontSize: '16px',
                                    color: activeRecordingId === rec.id ? 'var(--primary)' : 'var(--panel-text)'
                                }}>
                                    {rec.name}
                                </span>
                                <span className="numeric-mono" style={{ fontSize: '13px', fontWeight: '400', color: 'var(--panel-text-dim)' }}>
                                    {new Date(rec.timestamp).toLocaleDateString()} • {Math.round(rec.duration / 1000)}s
                                </span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onPlay(rec);
                                        onClose();
                                    }}
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
                                    className="play-btn"
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
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteClick(rec.id);
                                    }}
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
                                    className="delete-btn"
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

                            <style>{`
                                div:hover .delete-btn, div:hover .play-btn { opacity: 1 !important; }
                            `}</style>
                        </div>
                    ))
                )}
            </div>

            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                theme={theme}
                title="Delete Recording?"
                footer={(
                    <div style={{ display: 'flex', gap: '1rem', width: '100%', justifyContent: 'flex-end' }}>
                        <button
                            onClick={() => setIsDeleteModalOpen(false)}
                            style={{
                                padding: '0.8rem 1.5rem',
                                borderRadius: isClassic ? '8px' : '12px',
                                background: isClassic ? 'rgba(255,238,196,0.1)' : 'var(--panel-item-bg)',
                                color: isClassic ? 'rgba(255,238,196,0.7)' : 'var(--text-dim)',
                                cursor: 'pointer',
                                fontWeight: '600',
                                border: isClassic ? '1px solid rgba(255,238,196,0.2)' : 'none'
                            }}
                        >
                            No, Keep it
                        </button>
                        <button
                            onClick={handleConfirmDelete}
                            style={{
                                padding: '0.8rem 1.5rem',
                                borderRadius: isClassic ? '8px' : '12px',
                                background: isClassic ? 'var(--primary)' : '#ef4444',
                                color: isClassic ? '#412619' : 'white',
                                cursor: 'pointer',
                                fontWeight: '600',
                                border: 'none',
                                boxShadow: isClassic ? 'none' : '0 4px 15px rgba(239, 68, 68, 0.3)'
                            }}
                        >
                            Yes, Delete Permanently
                        </button>
                    </div>
                )}
            >
                <p style={{ color: isClassic ? 'rgba(255,238,196,0.8)' : 'var(--text-dim)', lineHeight: '1.6' }}>
                    Are you sure you want to delete this recording? This action cannot be undone and your masterpiece will be lost forever.
                </p>
            </Modal>
        </div>
    );
};

export default Sidebar;
