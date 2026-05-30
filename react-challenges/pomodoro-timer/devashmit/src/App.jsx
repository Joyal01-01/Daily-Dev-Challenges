import { useEffect, useReducer, useCallback } from "react";

// ── Constants ────────────────────────────────────────────────────────────────
const MODES = {
  work: { label: "Work", duration: 25 * 60 },
  break: { label: "Short Break", duration: 5 * 60 },
};

// ── Reducer ──────────────────────────────────────────────────────────────────
const initialState = {
  mode: "work",
  timeLeft: MODES.work.duration,
  isRunning: false,
  sessions: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "START":
      return { ...state, isRunning: true };

    case "PAUSE":
      return { ...state, isRunning: false };

    case "RESET":
      return {
        ...state,
        isRunning: false,
        timeLeft: MODES[state.mode].duration,
      };

    case "TICK":
      if (state.timeLeft <= 1) {
        // Session complete — switch modes
        const nextMode = state.mode === "work" ? "break" : "work";
        const newSessions =
          state.mode === "work" ? state.sessions + 1 : state.sessions;
        return {
          mode: nextMode,
          timeLeft: MODES[nextMode].duration,
          isRunning: false,
          sessions: newSessions,
        };
      }
      return { ...state, timeLeft: state.timeLeft - 1 };

    case "SET_MODE":
      return {
        ...state,
        mode: action.payload,
        timeLeft: MODES[action.payload].duration,
        isRunning: false,
      };

    default:
      return state;
  }
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

// ── Component ────────────────────────────────────────────────────────────────
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { mode, timeLeft, isRunning, sessions } = state;

  // Update document title with timer
  useEffect(() => {
    document.title = `${formatTime(timeLeft)} — ${MODES[mode].label}`;
    return () => { document.title = "Pomodoro Timer"; };
  }, [timeLeft, mode]);

  // Countdown interval — cleaned up on unmount and when paused
  useEffect(() => {
    if (!isRunning) return;

    const id = setInterval(() => dispatch({ type: "TICK" }), 1000);

    // Cleanup: clear interval when component unmounts or isRunning changes
    return () => clearInterval(id);
  }, [isRunning]);

  const handleModeChange = useCallback((newMode) => {
    dispatch({ type: "SET_MODE", payload: newMode });
  }, []);

  // Render up to 4 session dots
  const dots = Array.from({ length: 4 }, (_, i) => i < (sessions % 4 || (sessions > 0 && sessions % 4 === 0 ? 4 : 0)));

  return (
    <div className="app">
      {/* Mode selector */}
      <div className="mode-tabs" role="tablist" aria-label="Timer mode">
        {Object.entries(MODES).map(([key, { label }]) => (
          <button
            key={key}
            role="tab"
            aria-selected={mode === key}
            className={`mode-tab ${mode === key ? "active" : ""}`}
            onClick={() => handleModeChange(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Timer card */}
      <div className="timer-card">
        <p className="timer-mode-label">{MODES[mode].label}</p>

        <div
          className={`timer-display ${mode}`}
          role="timer"
          aria-live="polite"
          aria-label={`${formatTime(timeLeft)} remaining`}
        >
          {formatTime(timeLeft)}
        </div>

        {/* Controls */}
        <div className="controls">
          {!isRunning ? (
            <button
              className="btn btn--start"
              onClick={() => dispatch({ type: "START" })}
              aria-label="Start timer"
            >
              ▶ Start
            </button>
          ) : (
            <button
              className="btn btn--pause"
              onClick={() => dispatch({ type: "PAUSE" })}
              aria-label="Pause timer"
            >
              ⏸ Pause
            </button>
          )}
          <button
            className="btn btn--reset"
            onClick={() => dispatch({ type: "RESET" })}
            aria-label="Reset timer"
          >
            ↺ Reset
          </button>
        </div>

        {/* Session counter */}
        <div className="session-counter">
          <p className="session-counter__label">Sessions</p>
          <div className="session-dots" aria-label={`${sessions} sessions completed`}>
            {Array.from({ length: 4 }, (_, i) => (
              <div
                key={i}
                className={`session-dot ${i < (sessions % 4 === 0 && sessions > 0 ? 4 : sessions % 4) ? "filled" : ""}`}
              />
            ))}
          </div>
          <p className="session-count-text">{sessions} completed</p>
        </div>
      </div>
    </div>
  );
}
