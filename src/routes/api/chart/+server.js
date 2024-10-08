// src/routes/api/getData.js

import { queryInfluxDB } from '../../../lib/js/query'
import { TOKEN, ORG, BUCKET, URL } from '$env/static/private';

export const GET = async ({ url }) => {
  const token = TOKEN;
  const org = ORG;
  const bucket = BUCKET;
  const influxUrl = URL;

  // Ambil parameter dari URL
  const timeframe = url.searchParams.get('timeframe');
  const measurement = url.searchParams.get('measurement'); // Perbaikan parameter
  const field = url.searchParams.get('field'); // Perbaikan parameter

  // Query InfluxDB berdasarkan parameter yang diterima
  const query = `
  from(bucket: "${bucket}")
    |> range(start: -${timeframe})
    |> filter(fn: (r) => r._measurement == "${measurement}")
    |> filter(fn: (r) => r._field == "${field}")
  `;

  try {
    const result = await queryInfluxDB(token, org, influxUrl, query);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    console.error('Caught error:', error); 
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
