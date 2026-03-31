import React, { useState, useEffect, useCallback, useRef } from 'react';
import './index.css';
import './harmonium.css';
import Keyboard from './components/Keyboard';
import Sidebar from './components/Sidebar';
import PropertiesPanel from './components/PropertiesPanel';
import { RecorderBar } from './components/Recorder';
import AuthModal from './components/AuthModal';
import NoticeModal from './components/NoticeModal';
import UserMenu from './components/UserMenu';
import PlaybackTimeline from './components/PlaybackTimeline';
import { useAuth } from './context/AuthContext';
import { useAudio } from './hooks/useAudio';
import { useRecorder } from './hooks/useRecorder';
import { KEYBOARD_MAP, getFrequency, HARMONIUM_MAP } from './utils/noteUtils';
import HarmoniumLayout from './components/HarmoniumLayout';
import { HarmoniqLogoClassic } from './components/ClassicSVGs';

import NavigationBar from './components/NavigationBar';
import Modal from './components/Modal';
import ThemeMenu from './components/ThemeMenu';
import ConnectPanel from './components/ConnectPanel';
import ProfileHeader from './components/ProfileHeader';



function App() {
  const [activeNotes, setActiveNotes] = useState(new Set());
  const [volume, setVolume] = useState(0.5);
  const [octave, setOctave] = useState(4);

  // UI States
  const [activeTab, setActiveTab] = useState(null); // 'library', 'settings', 'connect', 'themes'
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthNoticeOpen, setIsAuthNoticeOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [recordingName, setRecordingName] = useState('');
  const [theme, setTheme] = useState(() => {
    // Check localStorage or default to 'classic'
    const saved = localStorage.getItem('theme');
    if (saved === 'minimal' || saved === 'classic') return saved;
    return 'classic'; // Default fallback
  });

  const themeRef = useRef(theme);
  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  const { user, logout } = useAuth();

  const {
    playTone,
    stopTone,
    setMasterVolume,
    setBass: setAudioBass,
    setReverb: setAudioReverb,
    isReverbEnabled,
    setIsReverbEnabled,
    resetAudio,
    initAudio
  } = useAudio();

  const activeNoteFrequencies = useRef(new Map());

  const recordEventRef = useRef(null);

  const playNote = useCallback((note, isPlayback = false) => {
    if (activeNotes.has(note)) return;

    // Shift octave: Default is 4. If octave setting is 5, C4 becomes C5.
    const octaveShift = octave - 4;
    const actualNote = note.replace(/\d+$/, (m) => parseInt(m) + octaveShift);
    const freq = getFrequency(actualNote);

    if (freq) {
      initAudio();
      playTone(freq, themeRef.current === 'classic');
      setActiveNotes(prev => new Set(prev).add(note));
      activeNoteFrequencies.current.set(note, freq);
      if (!isPlayback) recordEventRef.current?.(note, 'start');
    }
  }, [activeNotes, playTone, initAudio, octave]);

  const stopNote = useCallback((note) => {
    if (!activeNotes.has(note)) return;

    const freq = activeNoteFrequencies.current.get(note);
    if (freq) {
      stopTone(freq);
      setActiveNotes(prev => {
        const next = new Set(prev);
        next.delete(note);
        return next;
      });
      activeNoteFrequencies.current.delete(note);
      recordEventRef.current?.(note, 'stop');
    }
  }, [activeNotes, stopTone]);

  const {
    isRecording,
    isPaused,
    elapsedTime,
    recordings,
    activeRecordingId,
    isPlaybackPaused,
    startRecording,
    pauseRecording,
    stopRecording,
    stopCapturing,
    recordEvent,
    playRecording,
    deleteRecording,
    seekTo,
    stopPlayback,
    playbackTime,
    currentRecording
  } = useRecorder(playNote, stopNote, user);

  const handleRecordToggle = () => {
    if (!user) {
      setIsAuthNoticeOpen(true);
      return;
    }

    setActiveTab(null); // Collapse nav bar on interaction

    if (isRecording) {
      stopCapturing?.();
      setRecordingName(`Session ${new Date().toLocaleTimeString()}`);
      setIsSaveModalOpen(true);
    } else {
      startRecording();
    }
  };

  const handleConfirmSave = () => {
    stopRecording(recordingName);
    setIsSaveModalOpen(false);
    setRecordingName('');
  };

  useEffect(() => {
    recordEventRef.current = recordEvent;
  }, [recordEvent]);

  useEffect(() => { if (setMasterVolume) setMasterVolume(volume); }, [volume, setMasterVolume]);

  const handleReset = () => {
    const defaults = resetAudio();
    setVolume(defaults.volume);
    setOctave(4);
    setIsReverbEnabled(true);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.repeat) return;
      // Don't trigger if user is typing in an input or textarea
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      const key = e.key.toLowerCase();
      const note = HARMONIUM_MAP[key];
      if (note) playNote(note);
    };
    const handleKeyUp = (e) => {
      // Don't trigger if user is typing in an input or textarea
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      const key = e.key.toLowerCase();
      const note = HARMONIUM_MAP[key];
      if (note) stopNote(note);
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [playNote, stopNote]);

  return (
    <div className="app-layout" data-theme={theme} style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: 'var(--bg-gradient)',
      color: 'var(--text-main)',
      transition: 'all var(--transition-speed)',
      overflow: 'hidden'
    }}>


      {/* Main Mode Swapper */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', transition: 'all var(--transition-speed)' }}>
      {theme === 'classic' ? (
        <div style={{
          width: '1440px',
          height: '781px',
          position: 'relative',
          margin: 'auto',
          transformOrigin: 'top center',
          transform: 'scale(1)',
          fontFamily: "'DM Sans', sans-serif"
        }}>
          {activeRecordingId && currentRecording && (
              <div style={{ 
                position: 'absolute', 
                top: '160px', 
                left: '50%', 
                transform: 'translateX(-50%)', 
                width: '800px', 
                display: 'flex',
                justifyContent: 'center',
                zIndex: 100 
              }}>
                <PlaybackTimeline currentTime={playbackTime} duration={currentRecording.duration} onSeek={seekTo} isPaused={isPlaybackPaused} recordingName={currentRecording.name} onPlayPause={() => playRecording(currentRecording)} onStop={stopPlayback} theme={theme} />
              </div>
          )}
          <div className="top-border"></div>
          <div className="top-bar">
            <div className="logo"><HarmoniqLogoClassic /></div>
            <ProfileHeader
              user={user}
              logout={logout}
              theme={theme}
              onAuthClick={() => setIsAuthModalOpen(true)}
            />
          </div>
          <HarmoniumLayout activeNotes={activeNotes} onPlay={playNote} onStop={stopNote} />
        </div>
      ) : (
      <>

        {/* Top Bar - Logo and Profile, aligned with Piano Width */}
        <div style={{
          position: 'absolute',
          top: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1248px',
          maxWidth: '1248px',
          padding: '0',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'all var(--transition-speed)'
        }}>
          {/* Logo Section */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            height: '43px',
            paddingTop: '12px',
          }}>
            <HarmoniqLogoClassic fill={theme === 'dark' ? '#ffffff' : '#000000'} />
          </div>

          {/* Profile Section */}
          <ProfileHeader
            user={user}
            logout={logout}
            theme={theme}
            onAuthClick={() => setIsAuthModalOpen(true)}
          />
        </div>



        {/* Dynamic Center Area */}
        < main style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          paddingBottom: '4rem', // Adjusted to balance with piano shift
          position: 'relative',
          zIndex: 1
        }}>
          {/* Playback Timeline (YouTube-style) */}
          {
            activeRecordingId && currentRecording && (
              <div style={{
                position: 'absolute',
                top: '100px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100%',
                maxWidth: '800px',
                padding: '0 2rem',
                display: 'flex',
                justifyContent: 'center',
                zIndex: 100
              }}>
                <PlaybackTimeline
                  currentTime={playbackTime}
                  duration={currentRecording.duration}
                  onSeek={seekTo}
                  isPaused={isPlaybackPaused}
                  recordingName={currentRecording.name}
                  onPlayPause={() => playRecording(currentRecording)}
                  onStop={stopPlayback}
                  theme={theme}
                />
              </div>
            )
          }

          {/* Piano Area */}
          <div style={{
            padding: '1.25rem', // Reduced padding to slim the "border"
            backgroundColor: 'var(--piano-base)',
            backgroundImage: 'var(--piano-texture)',
            borderRadius: 'var(--border-radius-lg)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--panel-shadow)',
            transition: 'all var(--transition-speed)',
            transform: 'scale(0.88)' // Removed translateY(-40px) to move it down
          }}>
            <div style={{
              borderRadius: '16px', // Rounded inner corner
              overflow: 'hidden',
              display: 'flex'
            }}>
              <Keyboard
                activeNotes={activeNotes}
                onPlay={playNote}
                onStop={stopNote}
                startNote="C4"
                endNote="B5"
              />
            </div>
          </div>
        </main>
      </>
      )}

        {/* Integrated Navigation Bar */}
        <NavigationBar
          activeTab={activeTab}
          onClose={() => setActiveTab(null)}
          onLibraryToggle={() => setActiveTab(activeTab === 'library' ? null : 'library')}
          onSettingsToggle={() => setActiveTab(activeTab === 'settings' ? null : 'settings')}
          onRecordToggle={handleRecordToggle}
          onConnectToggle={() => setActiveTab(activeTab === 'connect' ? null : 'connect')}
          onThemeToggle={() => setActiveTab(activeTab === 'themes' ? null : 'themes')}
          isRecording={isRecording}
          theme={theme}
        >
          {activeTab === 'library' && (
            <Sidebar
              recordings={recordings}
              onPlay={playRecording}
              onDelete={deleteRecording}
              activeRecordingId={activeRecordingId}
              onClose={() => setActiveTab(null)}
              theme={theme}
            />
          )}

          {activeTab === 'settings' && (
            <PropertiesPanel
              volume={volume}
              setVolume={setVolume}
              isReverbEnabled={isReverbEnabled}
              setIsReverbEnabled={setIsReverbEnabled}
              octave={octave}
              setOctave={setOctave}
              onReset={handleReset}
              onClose={() => setActiveTab(null)}
              theme={theme}
            />
          )}

          {activeTab === 'connect' && (
            <ConnectPanel
              onClose={() => setActiveTab(null)}
            />
          )}

          {activeTab === 'themes' && (
            <ThemeMenu
              currentTheme={theme}
              onSelect={(newTheme) => {
                setTheme(newTheme);
                localStorage.setItem('theme', newTheme);
              }}
              onClose={() => setActiveTab(null)}
            />
          )}
        </NavigationBar>

        {/* Recording Controls Overlay */}
        {isRecording && (
          <div style={{
            position: 'fixed',
            bottom: '100px', // Right above the 54px nav bar + spacing
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: theme === 'classic' ? 'var(--primary)' : 'rgba(19, 20, 31, 0.95)',
            backdropFilter: 'blur(20px)',
            padding: '10px 20px',
            borderRadius: theme === 'classic' ? '8px' : '100px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            boxShadow: theme === 'classic' ? '0 10px 30px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.5)',
            border: theme === 'classic' ? '1px solid rgba(65, 38, 25, 0.1)' : '1px solid rgba(255, 255, 255, 0.1)',
            zIndex: 1002,
            animation: 'slideUpPanel 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            color: theme === 'classic' ? '#412619' : '#fff'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: theme === 'classic' ? 'var(--record-red)' : '#EB5757',
                animation: isPaused ? 'none' : 'pulseRecording 1.5s infinite'
              }} />
              <span className="numeric-mono" style={{
                fontSize: '1rem',
                fontWeight: '700',
                color: 'inherit',
                minWidth: '55px'
              }}>
                {Math.floor(elapsedTime / 60000).toString().padStart(2, '0')}:
                {Math.floor((elapsedTime % 60000) / 1000).toString().padStart(2, '0')}
              </span>
            </div>

            <div style={{ width: '1px', height: '20px', backgroundColor: theme === 'classic' ? 'rgba(65, 38, 25, 0.1)' : 'rgba(255,255,255,0.1)' }} />

            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              <button
                onClick={pauseRecording}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '5px',
                  opacity: 0.8,
                  transition: 'opacity 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '0.8'}
              >
                {isPaused ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                ) : (
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <div style={{ width: '4px', height: '20px', backgroundColor: 'currentColor', borderRadius: '2px' }} />
                    <div style={{ width: '4px', height: '20px', backgroundColor: 'currentColor', borderRadius: '2px' }} />
                  </div>
                )}
              </button>

              <button
                onClick={handleRecordToggle}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: theme === 'classic' ? 'var(--record-red)' : '#EB5757',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '5px',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2" /></svg>
              </button>
            </div>

            <style>{`
              @keyframes pulseRecording {
                0% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.5; transform: scale(0.8); }
                100% { opacity: 1; transform: scale(1); }
              }
            `}</style>
          </div>
        )}


      </div >

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        theme={theme}
      />

      <NoticeModal
        isOpen={isAuthNoticeOpen}
        onClose={() => setIsAuthNoticeOpen(false)}
        onAction={() => {
          setIsAuthNoticeOpen(false);
          setIsAuthModalOpen(true);
        }}
        title="Ready to Capture? ✨"
        message="Sign in to save and share your musical masterpieces with the world!"
        actionLabel="Join the Club"
        theme={theme}
      />

      <Modal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        theme={theme}
        title="Save Your Masterpiece"
        footer={(
          <>
            <button
              onClick={() => setIsSaveModalOpen(false)}
              style={{
                padding: '0.8rem 1.5rem',
                borderRadius: '12px',
                background: 'var(--item-bg)',
                color: 'var(--text-dim)',
                cursor: 'pointer',
                fontWeight: '600',
                border: 'none'
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
                color: theme === 'classic' ? '#412619' : 'white',
                cursor: 'pointer',
                fontWeight: '600',
                border: 'none',
                boxShadow: '0 4px 15px rgba(255, 161, 79, 0.3)'
              }}
            >
              Save Recording
            </button>
          </>
        )}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
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
              backgroundColor: 'var(--bg-sidebar)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
          />
        </div>
      </Modal>
    </div >
  );
}

export default App;
