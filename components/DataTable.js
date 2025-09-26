import { useState } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

export default function DataTable({ data }) {
  const [sortConfig, setSortConfig] = useState({ column: null, direction: null });

  const sortData = (columnIndex) => {
    let direction = 'asc';
    if (sortConfig.column === columnIndex && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ column: columnIndex, direction });
  };

  const getSortedData = () => {
    if (!sortConfig.column) return data.rows || [];

    const sortedRows = [...(data.rows || [])].sort((a, b) => {
      const aVal = parseFloat(a[sortConfig.column]) || 0;
      const bVal = parseFloat(b[sortConfig.column]) || 0;

      if (sortConfig.direction === 'asc') {
        return aVal - bVal;
      }
      return bVal - aVal;
    });

    return sortedRows;
  };

  const getSortIcon = (columnIndex) => {
    if (sortConfig.column !== columnIndex) {
      return <ArrowUpDown className="w-3 h-3 ml-1" />;
    }
    return sortConfig.direction === 'asc' ?
    <ArrowDown className="w-3 h-3" />:
    <ArrowUp className="w-3 h-3" /> 
  };

  const getSortLabel = (columnIndex) => {
    if (sortConfig.column !== columnIndex) return '';
    return sortConfig.direction === 'asc' ? ' (warmest → coldest)' : ' (coldest → warmest)';
  };

  return (
    <div>
      <div className="max-h-[600px] overflow-y-auto rounded-xl border border-slate-200 shadow-lg">
        <table className="w-full border-collapse bg-white">
          <thead className="bg-sky-600">
            <tr>
              {data.header?.slice(0, 14).map((headerCell, index) => (
                <th
                  key={index}
                  className="px-3 py-4 sticky top-0 z-10 font-semibold text-white text-sm text-center font-heading cursor-pointer hover:bg-slate-700 transition-all duration-200 border-r border-slate-600 last:border-r-0 bg-sky-600"
                  onClick={() => sortData(index)}
                  title={`Sort by ${headerCell}${getSortLabel(index)}`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="whitespace-nowrap">{headerCell}</span>
                    <span className="text-slate-300">{getSortIcon(index)}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {getSortedData().map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`hover:bg-slate-50 transition-colors ${
                  rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                }`}
              >
                {row.slice(0, 14).map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`px-3 py-3 text-center text-sm border-r border-slate-100 last:border-r-0 ${
                      cellIndex === 0
                        ? 'font-semibold text-slate-900 bg-slate-50'
                        : parseFloat(cell) > 0
                          ? 'text-red-600 font-medium'
                          : parseFloat(cell) < 0
                            ? 'text-blue-600 font-medium'
                            : 'text-slate-700'
                    }`}
                  >
                    {cellIndex === 0 ? cell : (
                      isNaN(parseFloat(cell)) ? cell :
                      parseFloat(cell) > 0 ? `+${cell}` : cell
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200 text-sm text-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><span className="font-semibold text-slate-900">Data:</span> {getSortedData().length || 0} years since 1880</p>
            <p><span className="font-semibold text-slate-900">Source:</span> NASA Goddard Institute (GISS)</p>
          </div>
          <div>
            <p><span className="font-semibold text-slate-900">Reference:</span> Anomalies vs 1951-1980 mean</p>
            <p><span className="font-semibold text-slate-900">Colors:</span> <span className="text-red-600 font-medium">Red = warmer</span> • <span className="text-blue-600 font-medium">Blue = colder</span></p>
          </div>
        </div>
        {sortConfig.column && (
          <div className="mt-3 pt-3 border-t border-slate-200">
            <p><span className="font-semibold text-slate-900">Current sort:</span> {data.header?.[sortConfig.column]} {getSortLabel(sortConfig.column)}</p>
          </div>
        )}
      </div>
    </div>
  );
}