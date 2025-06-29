'use client';
import { Bar, Pie } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  ArcElement,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  ArcElement,
  ChartDataLabels
);

interface BarChartProps {
  options: ChartOptions<'bar'>;
  data: ChartData<'bar'>;
}

interface PieChartProps {
  options: ChartOptions<'pie'>;
  data: ChartData<'pie'>;
}

export default function Chart({ data, options }: BarChartProps) {
  return <Bar options={options} data={data} plugins={[ChartDataLabels]} />;
}

export function PieChart({ data, options }: PieChartProps) {
  return <Pie options={options} data={data} plugins={[ChartDataLabels]} />;
}
