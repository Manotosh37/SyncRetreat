"use client";
import { useState } from "react";

export default function BurnCalc() {
  // State for the sliders
  const [engineers, setEngineers] = useState(4);
  const [hourlyRate, setHourlyRate] = useState(75);
  const [hoursLost, setHoursLost] = useState(15); // Hours lost per week to meetings/distractions

  // The brutal math
  const weeklyBurn = engineers * hourlyRate * hoursLost;
  const monthlyBurn = weeklyBurn * 4;

  return (
    <div className="bg-[#111111] border border-red-900/30 rounded-lg p-8 max-w-2xl mx-auto my-12 font-mono">
      <div className="mb-6 border-b border-gray-800 pb-4">
        <h2 className="text-2xl font-bold text-white mb-2">
          The Context-Switching Tax
        </h2>
        <p className="text-gray-400 text-sm">
          Calculate the capital your pod is burning on synchronous friction
          (Slack/Zoom) every month.
        </p>
      </div>

      <div className="space-y-6 mb-8">
        {/* Slider 1: Engineers */}
        <div>
          <label className="flex justify-between text-gray-300 text-sm mb-2">
            <span>Core Pod Size (Engineers)</span>
            <span className="text-white font-bold">{engineers}</span>
          </label>
          <input
            type="range"
            min="2"
            max="10"
            value={engineers}
            onChange={(e) => setEngineers(Number(e.target.value))}
            className="w-full accent-red-600"
          />
        </div>

        {/* Slider 2: Hourly Rate */}
        <div>
          <label className="flex justify-between text-gray-300 text-sm mb-2">
            <span>Average Blended Hourly Rate ($)</span>
            <span className="text-white font-bold">${hourlyRate}/hr</span>
          </label>
          <input
            type="range"
            min="40"
            max="150"
            step="5"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(Number(e.target.value))}
            className="w-full accent-red-600"
          />
        </div>

        {/* Slider 3: Hours Lost */}
        <div>
          <label className="flex justify-between text-gray-300 text-sm mb-2">
            <span>Hours lost per week to synchronous tasks</span>
            <span className="text-white font-bold">{hoursLost} hrs</span>
          </label>
          <input
            type="range"
            min="5"
            max="30"
            value={hoursLost}
            onChange={(e) => setHoursLost(Number(e.target.value))}
            className="w-full accent-red-600"
          />
        </div>
      </div>

      {/* The FOMO Output */}
      <div className="bg-black p-6 rounded border border-gray-800 text-center">
        <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">
          Current Monthly Burn
        </p>
        <p className="text-5xl font-bold text-red-500 mb-4">
          ${monthlyBurn.toLocaleString()}
        </p>

        <div className="bg-green-900/20 border border-green-800/50 p-4 rounded mt-4">
          <p className="text-green-400 text-sm">
            <strong>The SyncRetreat Cure:</strong> Deploying this pod to our
            Himalayan Node costs ~${(engineers * 1799).toLocaleString()}. You
            achieve immediate ROI in week one by enforcing strict asynchronous
            Ghost Mode.
          </p>
        </div>
      </div>
    </div>
  );
}
