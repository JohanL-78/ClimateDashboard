'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const CustomTooltip = ({ active, payload, label, chartType }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-lg">
        <p className="font-semibold text-slate-900">
          {chartType === 'yearly' ? `Year ${label}` : `${data.month} ${label}`}
        </p>
        <p className={`text-sm ${data.isPositive ? 'text-red-600' : 'text-blue-600'}`}>
          <span className="font-medium">Anomaly:</span> {data.isPositive ? '+' : ''}{data.temperature}°C
        </p>
        <p className="text-xs text-slate-500 mt-1">
          vs 1951-1980 mean
        </p>
      </div>
    );
  }
  return null;
};


export default function TemperatureChart({ data, chartType, selectedMonth }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
        <div className="text-slate-400 text-lg mb-2">📊</div>
        <p className="text-slate-600">No data available for the chart</p>
      </div>
    );
  }

  const title = chartType === 'yearly'
    ? 'Annual Temperature Anomalies'
    : `Temperature Anomalies - ${selectedMonth}`;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
        <p className="text-sm text-slate-600">
          Temperature deviations from the 1951-1980 reference mean
        </p>
      </div>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="year"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={[-1, 2]}
              ticks={[-1, 0, 1, 2]}
              tickFormatter={(value) => `${value.toFixed(0)}°C`}
            />
            <Tooltip content={<CustomTooltip chartType={chartType} />} />

            <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="2 2" />

            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#0ea5e9"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: '#0ea5e9', strokeWidth: 2, stroke: '#fff' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}