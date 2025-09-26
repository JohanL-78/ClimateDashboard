export async function GET() {
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

    return new Response(csvText, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Cache-Control': 'public, max-age=21600', // Cache for 6 hours
      },
    });
  } catch (error) {
    console.error('Error fetching NASA data:', error);
    return new Response(JSON.stringify({ error: 'Unable to fetch NASA data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}