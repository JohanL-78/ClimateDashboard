'use client';

import DataVisualization from '@/components/DataVisualization';
import { Activity } from 'lucide-react';

export default function DataPageContent({ data }) {
  return (
    <div className="min-h-screen bg-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-slate-700 font-heading tracking-tight text-3xl md:text-4xl font-bold flex items-center justify-center gap-4 mb-4">
            <Activity className="w-10 h-10 text-sky-600 [filter:drop-shadow(0_0_10px_rgb(14_165_233))]" />
            <span>NASA GISTEMP Data</span>
          </h1>
          <h2 className="text-slate-700 ml-12 text-xl md:text-2xl font-medium mb-3">
            Global Temperature Anomalies
          </h2>
          <p className="text-slate-600 text-base max-w-2xl mx-auto leading-relaxed">
            Visualization of temperature deviations from the 1951-1980 reference mean,
            updated with the latest data from the Goddard Institute for Space Studies.
          </p>
        </div>

        <DataVisualization data={data} />
      </div>
    </div>
  );
}