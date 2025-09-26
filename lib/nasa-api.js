// Important : version côté serveur pour fetch direct sur la NASA 
export async function fetchNasaDataServer() {
  try {
    const response = await fetch('https://data.giss.nasa.gov/gistemp/tabledata_v4/GLB.Ts+dSST.csv', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'text/csv,text/plain,*/*'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const csvText = await response.text();
    
    const cleanedData = csvText.replace(/\*\*\*/g, '');

    const lines = cleanedData.trim().split('\n');
    const header = lines[1].split(',').map(cell => cell.trim());
    const dataRows = lines.slice(2).map(line =>
      line.split(',').map(cell => cell.trim())
    );

    const processedRows = dataRows.map(row => {
      const year = parseInt(row[0]);
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;

      if (year === currentYear) {
        const monthValues = [];
        for (let i = 1; i <= Math.min(12, currentMonth); i++) {
          const value = parseFloat(row[i]);
          if (!isNaN(value)) {
            monthValues.push(value);
          }
        }

        if (monthValues.length > 0) {
          const partialAverage = monthValues.reduce((sum, val) => sum + val, 0) / monthValues.length;
          const newRow = [...row];
          newRow[13] = partialAverage.toFixed(2);
          return newRow;
        }
      }

      return row;
    });

    return { header, rows: processedRows };
  } catch (error) {
    console.error('Error fetching NASA data:', error);
    return { header: [], rows: [] };
  }
}