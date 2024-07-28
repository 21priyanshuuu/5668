"use client";
import { useEffect, useState } from "react";
import PomodoroTimer from "@/components/PromodoroTimer";

const StudyTips = () => {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await fetch("/study-tips.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTips(data);
      } catch (error) {
        console.error("Error fetching the tips:", error);
      }
    };

    fetchTips();
  }, []);

  return (
    <>
      <div className="flex justify-center mt-8">
        <PomodoroTimer />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <h1 className="text-3xl font-bold mb-8 text-blue-900 dark:text-white">
          Study Tips
        </h1>
        <div className="flex flex-col space-y-6 w-full max-w-3xl">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-xl font-bold mb-2 text-blue-900 dark:text-white">
                {tip.tip}
              </h2>
              <p className="text-blue-900 dark:text-white">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default StudyTips;
