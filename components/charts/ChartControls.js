import { Activity, Table2, Calendar, TrendingUp } from 'lucide-react';
import { MONTHS } from '@/lib/chart-utils';

export default function ChartControls({
  viewMode,
  setViewMode,
  chartType,
  setChartType,
  selectedMonth,
  setSelectedMonth
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div className="flex items-center">
          <div className="flex bg-slate-100 rounded-lg p-1 w-fit">
            <button
              onClick={() => setViewMode('chart')}
              className={`w-32 px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                viewMode === 'chart'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Activity className="w-4 h-4" />
              Chart
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`w-32 px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                viewMode === 'table'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Table2 className="w-4 h-4" />
              Data
            </button>
          </div>
        </div>

        {viewMode === 'chart' && (
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">

            
           <div className="flex items-center">
              <div className="flex bg-slate-100 rounded-lg p-1 w-fit">
                <button
                  onClick={() => setChartType('yearly')}
                  className={`w-32 px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                    chartType === 'yearly'
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  Yearly
                </button>
                <button
                  onClick={() => setChartType('monthly')}
                  className={`w-32 px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                    chartType === 'monthly'
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  Monthly
                </button>
              </div>
            </div>

            {chartType === 'monthly' && (
              <div className="flex items-center">
                <span className="text-sm font-medium text-slate-600 mr-3">Month:</span>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="px-3 py-2 bg-white border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {MONTHS.map(month => (
                    <option key={month.key} value={month.key}>
                      {month.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}


      </div>
    </div>
  );
}