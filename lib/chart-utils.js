export const MONTHS = [
  { key: 'Jan', name: 'January', index: 1 },
  { key: 'Feb', name: 'February', index: 2 },
  { key: 'Mar', name: 'March', index: 3 },
  { key: 'Apr', name: 'April', index: 4 },
  { key: 'May', name: 'May', index: 5 },
  { key: 'Jun', name: 'June', index: 6 },
  { key: 'Jul', name: 'July', index: 7 },
  { key: 'Aug', name: 'August', index: 8 },
  { key: 'Sep', name: 'September', index: 9 },
  { key: 'Oct', name: 'October', index: 10 },
  { key: 'Nov', name: 'November', index: 11 },
  { key: 'Dec', name: 'December', index: 12 }
];

export function transformDataForYearlyChart(data) {
  if (!data.rows || data.rows.length === 0) return [];

  return data.rows.map(row => {
    const year = parseInt(row[0]);
    const tempValue = row[13];

    if (!tempValue || tempValue === '' || tempValue.includes('*')) {
      return null; // Ignorer cette entrée
    }

    const temperature = parseFloat(tempValue);

    return {
      year,
      temperature,
      isPositive: temperature > 0
    };
  }).filter(item => item !== null && !isNaN(item.year) && !isNaN(item.temperature));
}

export function transformDataForMonthlyChart(data, selectedMonth = 'Jan') {
  if (!data.rows || data.rows.length === 0) return [];

  const monthIndex = MONTHS.find(m => m.key === selectedMonth)?.index;
  if (!monthIndex) return [];

  return data.rows.map(row => {
    const year = parseInt(row[0]);
    const tempValue = row[monthIndex];

    if (!tempValue || tempValue === '' || tempValue.includes('*')) {
      return null; 
    }

    const temperature = parseFloat(tempValue);

    return {
      year,
      temperature,
      isPositive: temperature > 0,
      month: selectedMonth
    };
  }).filter(item => item !== null && !isNaN(item.year) && !isNaN(item.temperature));
}

export function calculateStats(chartData) {
  if (!chartData || chartData.length === 0) {
    return { min: 0, max: 0 };
  }

  const temperatures = chartData.map(d => d.temperature);
  const min = Math.min(...temperatures);
  const max = Math.max(...temperatures);

  return {
    min: parseFloat(min.toFixed(2)),
    max: parseFloat(max.toFixed(2))
  };
}