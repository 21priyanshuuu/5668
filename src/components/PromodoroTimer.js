"use client";
import { useState, useEffect } from "react";

const PomodoroTimer = () => {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [time, setTime] = useState(sessionLength * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    if (time === 0) {
      if (!isBreak) {
        setIsBreak(true);
        setTime(breakLength * 60);
      } else {
        setIsBreak(false);
        setTime(sessionLength * 60);
      }
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, time, isBreak, breakLength, sessionLength]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setTime(sessionLength * 60);
  };

  const adjustSessionLength = (amount) => {
    const newLength = sessionLength + amount;
    if (newLength > 0 && newLength <= 60) {
      setSessionLength(newLength);
      setTime(newLength * 60);
    }
  };

  const adjustBreakLength = (amount) => {
    const newLength = breakLength + amount;
    if (newLength > 0 && newLength <= 30) {
      setBreakLength(newLength);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 max-w-sm mx-auto bg-white text-blue-900 dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">React Pomodoro Timer</h1>
      <div className="text-center mb-4">
        <h2 className="text-lg">{isBreak ? "Break" : "Session"}</h2>
        <div className="text-6xl font-mono">{formatTime(time)}</div>
      </div>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setIsActive(!isActive)}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          {isActive ? "Pause" : "Start"}
        </button>
        <button
          onClick={resetTimer}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Reset
        </button>
      </div>
      <div className="flex justify-between w-full">
        <div className="flex flex-col items-center">
          <h3 className="mb-2">Break Length</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => adjustBreakLength(-1)}
              className="px-2 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              -
            </button>
            <span>{breakLength}</span>
            <button
              onClick={() => adjustBreakLength(1)}
              className="px-2 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="mb-2">Session Length</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => adjustSessionLength(-1)}
              className="px-2 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              -
            </button>
            <span>{sessionLength}</span>
            <button
              onClick={() => adjustSessionLength(1)}
              className="px-2 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
