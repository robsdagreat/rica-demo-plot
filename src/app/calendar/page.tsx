"use client";
import React, { useState } from 'react';
import CropCard from '@/components/CropCard';
import Nav from '@/components/Nav';
import { PieChart } from '@/components/Chart';
import type { ChartOptions, ChartData } from 'chart.js';

interface Plot {
  plot: string;
  crop: string;
  short: string;
}
interface SeasonData {
  plantingDate: string;
  plots: Plot[];
}
interface CropCalendarData {
  [season: string]: SeasonData;
}

const cropCalendarData: CropCalendarData = {
  "A-2025": {
    plantingDate: "23rd September 2024",
    plots: [
      { plot: "CT-Monocropping", crop: "Maize", short: "Maize" },
      { plot: "CT-Intercropping", crop: "Maize & Beans", short: "M+B" },
      { plot: "CA-Rotation", crop: "Maize", short: "Maize" },
      { plot: "CA-Intercropping", crop: "Maize & Beans", short: "M+B" },
      { plot: "CA-Rotation with anti-erosion barriers", crop: "Maize and Napier as barrier", short: "M+Napier" }
    ]
  },
  "B-2025": {
    plantingDate: "20th March 2025",
    plots: [
      { plot: "CT-Monocropping", crop: "Maize", short: "Maize" },
      { plot: "CT-Intercropping", crop: "Maize & Beans", short: "M+B" },
      { plot: "CA-Rotation", crop: "Beans", short: "Beans" },
      { plot: "CA-Intercropping", crop: "Maize & Beans", short: "M+B" },
      { plot: "CA-Rotation with anti-erosion barriers", crop: "Beans and Napier as barrier", short: "B+Napier" }
    ]
  }
};

const seasonOptions = Object.keys(cropCalendarData);

export default function CalendarPage() {
  const [selectedSeason, setSelectedSeason] = useState<string>(seasonOptions[0]);
  const seasonData: SeasonData = cropCalendarData[selectedSeason];

  // Pie chart data
  const pieData: ChartData<'pie'> = {
    labels: seasonData.plots.map((p: Plot) => p.short),
    datasets: [
      {
        data: seasonData.plots.map(() => 1), // Each plot is one segment
        backgroundColor: [
          '#22c55e', // green-500
          '#16a34a', // green-600
          '#facc15', // yellow-400
          '#f59e42', // orange-400
          '#6366f1', // indigo-500
        ],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };
  const pieOptions: ChartOptions<'pie'> = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: '#166534',
          font: { size: 14, weight: 'bold' },
          generateLabels: (chart: any) => {
            const data = chart.data;
            return (data.labels as string[]).map((label: string, i: number) => ({
              text: `${label} (${seasonData.plots[i].crop})`,
              fillStyle: (data.datasets[0] as any).backgroundColor[i],
              strokeStyle: '#fff',
              lineWidth: 2,
              hidden: false,
              index: i,
            }));
          },
        },
      },
      datalabels: {
        color: '#222',
        font: { weight: 'bold', size: 12 },
        formatter: (_value: unknown, ctx: { dataIndex: number }) => seasonData.plots[ctx.dataIndex].short,
      },
      tooltip: {
        callbacks: {
          label: (ctx: any) => seasonData.plots[ctx.dataIndex].crop,
        },
      },
      title: {
        display: true,
        text: `Crops Grown in ${selectedSeason}`,
        color: '#166534',
        font: { size: 18, weight: 'bold' },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <>
      <Nav />
      <main className="pt-28 bg-gray-50 min-h-screen font-sans">
        <section className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-6 text-center drop-shadow-lg">
            Crop Calendar
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-green-700">Select Season:</span>
              <select
                className="border border-green-300 rounded-lg px-3 py-2 text-green-900 focus:ring-2 focus:ring-green-400"
                value={selectedSeason}
                onChange={e => setSelectedSeason(e.target.value)}
              >
                {seasonOptions.map((season: string) => (
                  <option key={season} value={season}>{season}</option>
                ))}
              </select>
            </div>
            <div className="text-green-800 font-medium text-lg">
              Planting date: <span className="font-bold">{seasonData.plantingDate}</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-1/2 h-[350px] bg-white rounded-2xl shadow-lg p-4 flex items-center justify-center">
              <PieChart key={selectedSeason} data={pieData} options={pieOptions} />
            </div>
            <div className="w-full md:w-1/2 grid gap-6">
              {seasonData.plots.map((plot: Plot) => (
                <div key={plot.plot} className="bg-green-50 border border-green-200 rounded-xl p-4 shadow-sm">
                  <div className="font-bold text-green-800 text-lg mb-1">{plot.plot}</div>
                  <div className="text-green-700 text-base">{plot.crop}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
