import React, { useState, useEffect } from 'react';

const PomodoroTimer = () => {
  const WORK_DURATION = 25 * 60; // 25 minutes in seconds
  const BREAK_DURATION = 5 * 60; // 5 minutes in seconds

  const [timeLeft, setTimeLeft] = useState(WORK_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  // Timer logic with useEffect
  useEffect(() => {
    let intervalId;

    if (isRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      // Timer ended - play notification sound
      playNotificationSound();
      
      // Switch between work and break
      if (isWorkTime) {
        setSessionsCompleted((prev) => prev + 1);
        setIsWorkTime(false);
        setTimeLeft(BREAK_DURATION);
      } else {
        setIsWorkTime(true);
        setTimeLeft(WORK_DURATION);
      }
    }

    return () => clearInterval(intervalId);
  }, [isRunning, timeLeft, isWorkTime]);

  const playNotificationSound = () => {
    // Use Web Audio API to create a simple beep
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800; // Frequency in Hz
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(isWorkTime ? WORK_DURATION : BREAK_DURATION);
  };

  const skipSession = () => {
    setIsRunning(false);
    if (isWorkTime) {
      setSessionsCompleted((prev) => prev + 1);
      setIsWorkTime(false);
      setTimeLeft(BREAK_DURATION);
    } else {
      setIsWorkTime(true);
      setTimeLeft(WORK_DURATION);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const totalDuration = isWorkTime ? WORK_DURATION : BREAK_DURATION;
  const circumference = 440;
  const strokeDashoffset = circumference - (timeLeft / totalDuration) * circumference;

  return (
    <div className="glass-card p-8 flex flex-col items-center justify-center h-96">
      <h2 className="text-2xl font-bold mb-2">{isWorkTime ? '🔴 Work Time' : '🟢 Break Time'}</h2>
      <p className="text-sm text-gray-400 mb-8">Sessions Completed: {sessionsCompleted}</p>

      {/* Circular Progress Timer */}
      <svg width="200" height="200" viewBox="0 0 200 200" className="mb-8">
        {/* Background circle */}
        <circle
          cx="100"
          cy="100"
          r="70"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="8"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx="100"
          cy="100"
          r="70"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className="timer-circle"
          style={{ color: isWorkTime ? '#ef4444' : '#22c55e', strokeDashoffset }}
        />
      </svg>

      {/* Time Display */}
      <div className="timer-label mb-8" style={{ color: isWorkTime ? '#ef4444' : '#22c55e' }}>
        {formatTime(timeLeft)}
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <button
          onClick={toggleTimer}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
        >
          {isRunning ? '⏸ Pause' : '▶ Start'}
        </button>
        <button
          onClick={resetTimer}
          className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-semibold transition-colors"
        >
          🔄 Reset
        </button>
        <button
          onClick={skipSession}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors"
        >
          ⏭ Skip
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
