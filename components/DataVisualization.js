'use client';

import { useState, useMemo } from 'react';
import ChartControls from './charts/ChartControls';
import TemperatureChart from './charts/TemperatureChart';
import DataTable from './DataTable';
import { transformDataForYearlyChart, transformDataForMonthlyChart } from '@/lib/chart-utils';

export default function DataVisualization({ data }) {
  const [viewMode, setViewMode] = useState('chart'); 
  const [chartType, setChartType] = useState('yearly'); 
  const [selectedMonth, setSelectedMonth] = useState('Aug'); 

  
  const chartData = useMemo(() => {
    if (chartType === 'yearly') {
      return transformDataForYearlyChart(data);
    } else {
      return transformDataForMonthlyChart(data, selectedMonth);
    }
  }, [data, chartType, selectedMonth]);


  return (
    <div>
      <ChartControls
        viewMode={viewMode}
        setViewMode={setViewMode}
        chartType={chartType}
        setChartType={setChartType}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />

      {viewMode === 'chart' ? (
        <TemperatureChart
          data={chartData}
          chartType={chartType}
          selectedMonth={selectedMonth}
        />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              NASA GISTEMP Data - Raw Format
            </h3>
            <p className="text-sm text-slate-600">
              Complete table of temperature anomalies since 1880
            </p>
          </div>
          <DataTable data={data} />
        </div>
      )}
    </div>
  );
}