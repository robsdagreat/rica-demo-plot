'use client';
import { useState } from 'react';
import Chart from '@/components/Chart';
import Nav from '@/components/Nav';
import plotData from '@/../public/data/plot_data.json';
import type { ChartData, ChartOptions, PluginOptionsByType } from 'chart.js';

interface PlotData {
  name: string;
  description: string;
  crop: { name: string; spacing: string };
  inputs?: { npk_applied: number; urea_applied: number; dap_applied: number };
  measurements: Record<string, number | null>;
  nutrient_loss: Record<string, number | null>;
}

const metricOptions = [
  { value: 'sediment_soil_collected', label: 'Soil Erosion (t/ha)' },
  { value: 'runoff_volume', label: 'Runoff Volume (m³/ha)' },
  { value: 'yield_harvested', label: 'Yield (t/ha)' },
  { value: 'organic_matter', label: 'Soil Organic Matter (%)' },
  { value: 'earthworm_count', label: 'Earthworm Count (per m²)' },
];

const npkOptions = [
  { value: 'N', label: 'Nitrogen (mg/kg)' },
  { value: 'P', label: 'Phosphorus (mg/kg)' },
  { value: 'K', label: 'Potassium (mg/kg)' },
];

const BASELINE = {
  season_name: 'Baseline',
  planting_date: '-',
  harvest_date: '-',
  plots: [
    {
      name: 'CT-Monocropping',
      description: 'Baseline for Conventional Tillage with Maize Monocropping',
      crop: { name: 'Maize', spacing: '-' },
      measurements: {
        sediment_soil_collected: 10, // lower erosion
        yield_harvested: 0,
        beans_yield: 0,
        earthworm_count: 12,
        organic_matter: 2.8, // slightly higher than season A
        runoff_volume: 120,
      },
      nutrient_loss: { N: 0, P: 0, K: 0 },
    },
    {
      name: 'CT-Intercropping',
      description: 'Baseline for Conventional Tillage with Intercropping',
      crop: { name: 'Maize & Beans', spacing: '-' },
      measurements: {
        sediment_soil_collected: 8,
        yield_harvested: 0,
        beans_yield: 0,
        earthworm_count: 16,
        organic_matter: 3.1,
        runoff_volume: 100,
      },
      nutrient_loss: { N: 0, P: 0, K: 0 },
    },
    {
      name: 'CA-Rotation',
      description: 'Baseline for Conservation Agriculture with Rotation',
      crop: { name: 'Soybeans', spacing: '-' },
      measurements: {
        sediment_soil_collected: 2,
        yield_harvested: 0,
        beans_yield: 0,
        earthworm_count: 55,
        organic_matter: 5.0,
        runoff_volume: 40,
      },
      nutrient_loss: { N: 0, P: 0, K: 0 },
    },
    {
      name: 'CA-Intercropping',
      description: 'Baseline for Conservation Agriculture with Intercropping',
      crop: { name: 'Maize & Beans', spacing: '-' },
      measurements: {
        sediment_soil_collected: 1.5,
        yield_harvested: 0,
        beans_yield: 0,
        earthworm_count: 70,
        organic_matter: 5.2,
        runoff_volume: 30,
      },
      nutrient_loss: { N: 0, P: 0, K: 0 },
    },
    {
      name: 'CA-Rotation-AntiErosion',
      description: 'Baseline for CA with Rotation and Anti-Erosion strips',
      crop: { name: 'Soybeans and Napier', spacing: '-' },
      measurements: {
        sediment_soil_collected: 1,
        yield_harvested: 0,
        beans_yield: 0,
        earthworm_count: 65,
        organic_matter: 5.1,
        runoff_volume: 20,
      },
      nutrient_loss: { N: 0, P: 0, K: 0 },
    },
  ],
  total_rain: 0,
};

export default function DashboardPage() {
  const [selectedSeason, setSelectedSeason] = useState(plotData[0].season_name);
  const [selectedMetric, setSelectedMetric] = useState(metricOptions[0].value);
  const [npkMetric, setNpkMetric] = useState('N');
  const [showNpk, setShowNpk] = useState(false);

  const allSeasons = [BASELINE, ...plotData];
  const seasonData = allSeasons.find((s) => s.season_name === selectedSeason);
  const metricInfo = metricOptions.find((m) => m.value === selectedMetric);

  const getMeasurement = (measurements: Record<string, number | null>, metric: string): number | null => {
    if (!measurements) return null;

    const get = (keys: string[]): number | null => {
        for (const key of keys) {
            if (measurements[key] != null) {
                return measurements[key];
            }
        }
        return null;
    };

    switch (metric) {
        case 'yield_harvested': {
            const keys = ['maize_yield', 'beans_yield', 'maize_harvested'];
            let totalYield = 0;
            let aValueWasFound = false;
            for (const key of keys) {
                if (measurements[key] != null) {
                    totalYield += measurements[key]!;
                    aValueWasFound = true;
                }
            }
            return aValueWasFound ? totalYield : null;
        }
        case 'organic_matter':
            return get(['organic_matter', 'organic_matter_within_plot']);

        case 'earthworm_count':
            return get(['earthworm_count', 'earthworm_count_at_tasseling_stage', 'earthworm_count__at_tasseling_stage']);
        
        default:
            return get([metric]);
    }
  };

  const plots = (seasonData?.plots ?? []) as PlotData[];

  // Conversion for t/ha (kg/180)
  const convertToTha = (kg: number) => kg == null ? null : +(kg / 180).toFixed(2);

  // Chart data logic
  let chartData: ChartData<'bar'>;
  if (showNpk) {
    chartData = {
      labels: plots.map((p) => p.name),
      datasets: [
        {
          label: npkOptions.find((n) => n.value === npkMetric)?.label || '',
          data: plots.map((p) =>
            p.nutrient_loss && typeof p.nutrient_loss[npkMetric] === 'number'
              ? p.nutrient_loss[npkMetric] ?? 0
              : 0
          ) || [],
          backgroundColor: 'rgba(22, 163, 74, 0.6)',
          borderColor: 'rgba(22, 163, 74, 1)',
          borderWidth: 1,
        },
      ],
    };
  } else {
    chartData = {
      labels: plots.map((p) => p.name),
      datasets: [
        {
          label: metricInfo?.label || '',
          data:
            plots.map((p) => {
              const value = getMeasurement(p.measurements, selectedMetric);
              if (
                selectedMetric === 'sediment_soil_collected' ||
                selectedMetric === 'yield_harvested'
              ) {
                return value != null
                  ? convertToTha(value)
                  : 0;
              }
              return value ?? 0;
            }) || [],
          backgroundColor: 'rgba(22, 163, 74, 0.6)',
          borderColor: 'rgba(22, 163, 74, 1)',
          borderWidth: 1,
        },
      ],
    };
  }

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: showNpk
          ? `${npkOptions.find((n) => n.value === npkMetric)?.label} Comparison for ${selectedSeason}`
          : `${metricInfo?.label} Comparison for ${selectedSeason}`,
        font: {
          size: 18,
        },
      },
      
      datalabels: {
        anchor: 'end',
        align: 'end',
        color: '#222',
        font: { weight: 'bold', size: 14 },
        formatter: (value: number) => value,
      } as PluginOptionsByType<'bar'>['datalabels'],
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: showNpk
            ? npkOptions.find((n) => n.value === npkMetric)?.label
            : metricInfo?.label,
        },
      },
    },
  };

  return (
    <>
      <Nav />
      <main className="pt-28 bg-gray-50 min-h-screen font-sans">
        <section className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-10 text-center drop-shadow-lg">
            Observation Dashboard
          </h1>

          <div className="flex flex-wrap gap-6 mb-10 p-6 bg-white rounded-2xl shadow-lg justify-center">
            <div className="flex-grow min-w-[220px] max-w-xs">
              <label
                htmlFor="season-select"
                className="block text-sm font-semibold text-green-700 mb-2"
              >
                Select Season
              </label>
              <select
                id="season-select"
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-xl shadow-sm bg-gray-50"
              >
                {allSeasons.map((s) => (
                  <option key={s.season_name} value={s.season_name}>
                    {s.season_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-grow min-w-[220px] max-w-xs">
              <label
                htmlFor="metric-select"
                className="block text-sm font-semibold text-green-700 mb-2"
              >
                Select Metric
              </label>
              <select
                id="metric-select"
                value={selectedMetric}
                onChange={(e) => { setSelectedMetric(e.target.value); setShowNpk(false); }}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-xl shadow-sm bg-gray-50"
              >
                {metricOptions.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-grow min-w-[220px] max-w-xs flex flex-col justify-end">
              <label className="block text-sm font-semibold text-green-700 mb-2">NPK Metrics</label>
              <div className="flex gap-2">
                {npkOptions.map((n) => (
                  <button
                    key={n.value}
                    className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${showNpk && npkMetric === n.value ? 'bg-green-600 text-white border-green-700' : 'bg-white text-green-700 border-green-300 hover:bg-green-100'}`}
                    onClick={() => { setShowNpk(true); setNpkMetric(n.value); }}
                    type="button"
                  >
                    {n.label.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Season details and NPK lost */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-2">
            <div>
              <span className="font-semibold text-green-700">Planting Date:</span> {seasonData?.planting_date || '-'}<br />
              <span className="font-semibold text-green-700">Harvest Date:</span> {seasonData?.harvest_date || '-'}<br />
              <span className="font-semibold text-green-700">Total Rain:</span> {typeof seasonData?.total_rain === 'number' ? `${seasonData.total_rain} mm` : '-'}
            </div>
            {selectedSeason !== 'Baseline' && (
              <div>
                <span className="font-semibold text-green-700">Nutrients Lost (kg/ha):</span>
                <ul className="list-disc list-inside ml-4">
                  {npkOptions.map((n) => (
                    <li key={n.value}>{n.label.split(' ')[0]}: {plots.map((p: any) => p.nutrient_loss?.[n.value] ?? 0).join(', ')}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            {seasonData ? (
              <>
                <Chart options={chartOptions} data={chartData} />
                {showNpk && (
                  <div className="mt-6 bg-green-50 rounded-xl p-4 text-green-900">
                    <h4 className="font-bold mb-2">Final {npkOptions.find((n) => n.value === npkMetric)?.label} Lost per Cropping Type:</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {plots.map((p: any) => (
                        <li key={p.name} className="flex justify-between"><span className="font-semibold">{p.name}:</span> <span>{p.nutrient_loss?.[npkMetric] ?? 0} mg/kg</span></li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <p className="text-center text-gray-500">Select a season to view data.</p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
