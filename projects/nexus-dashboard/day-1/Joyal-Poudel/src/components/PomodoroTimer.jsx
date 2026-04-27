import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Coffee, Zap } from 'lucide-react';

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [progress, setProgress] = useState(100);

  const TOTAL_WORK_TIME = 25 * 60;
  const TOTAL_BREAK_TIME = 5 * 60;

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(25);
    setSeconds(0);
    setProgress(100);
  }, []);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          // Timer finished
          const nextIsBreak = !isBreak;
          setIsBreak(nextIsBreak);
          setMinutes(nextIsBreak ? 5 : 25);
          setSeconds(0);
          // Play notification sound if possible or alert
          if (Notification.permission === 'granted') {
            new Notification(nextIsBreak ? 'Time for a break!' : 'Back to work!');
          }
        }

        // Update progress
        const currentTotalSeconds = minutes * 60 + seconds;
        const total = isBreak ? TOTAL_BREAK_TIME : TOTAL_WORK_TIME;
        setProgress((currentTotalSeconds / total) * 100);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, isBreak, TOTAL_BREAK_TIME, TOTAL_WORK_TIME]);

  const toggleTimer = () => {
    setIsActive(!isActive);
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  // SVG Circle properties
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="glass-panel" style={{ 
      padding: '2rem', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '320px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '1.5rem' }}>
        <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {isBreak ? <Coffee size={16} color="#10b981" /> : <Zap size={16} color="#f59e0b" />}
          {isBreak ? 'Break Phase' : 'Focus Session'}
        </h3>
      </div>

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
        <svg width="180" height="180" viewBox="0 0 180 180" style={{ transform: 'rotate(-90deg)' }}>
          {/* Background Circle */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="transparent"
            stroke="var(--bg-tertiary)"
            strokeWidth="8"
          />
          {/* Progress Circle */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="transparent"
            stroke={isBreak ? '#10b981' : 'var(--accent-primary)'}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s ease' }}
          />
        </svg>
        
        <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
            {isActive ? 'Flowing' : 'Paused'}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button 
          onClick={toggleTimer}
          className="timer-btn"
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: 'none',
            background: isActive ? 'var(--bg-tertiary)' : 'var(--accent-primary)',
            color: isActive ? 'var(--text-primary)' : 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: isActive ? 'none' : 'var(--shadow-glow)',
            transition: 'all 0.2s ease'
          }}
        >
          {isActive ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" style={{ marginLeft: '2px' }} />}
        </button>

        <button 
          onClick={resetTimer}
          className="timer-btn"
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: '1px solid var(--border-color)',
            background: 'transparent',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <RotateCcw size={20} />
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .timer-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }
        .timer-btn:active {
          transform: translateY(0);
        }
      `}} />
    </div>
  );
};

export default PomodoroTimer;
