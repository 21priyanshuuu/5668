"use client";
import { useState } from "react";

const Timetable = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [day, setDay] = useState("Monday");
  const [time, setTime] = useState("08:00");

  const handleAddTask = () => {
    setTasks([...tasks, { task, day, time }]);
    setTask("");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Weekly Timetable</h1>
      <div className="mb-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Task"
          className="border p-2 mr-2"
        />
        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="border p-2 mr-2"
        >
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={handleAddTask} className="bg-green-500 text-white p-2">
          Add Task
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ].map((d) => (
          <div key={d} className="border p-4">
            <h2 className="text-xl font-bold">{d}</h2>
            <ul>
              {tasks
                .filter((t) => t.day === d)
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((t, index) => (
                  <li key={index} className="p-1 border-b">
                    <span className="font-semibold">{t.time}</span> - {t.task}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timetable;
