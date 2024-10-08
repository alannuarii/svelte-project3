// src/routes/api/getData.js

import { queryInfluxDB } from '../../../lib/js/query';
import { TOKEN, ORG, BUCKET, URL } from '$env/static/private';

export const GET = async ({ url }) => {
  const token = TOKEN;
  const org = ORG;
  const bucket = BUCKET;
  const influxUrl = URL;

  // Ambil parameter dari URL
  const timeframe = url.searchParams.get('timeframe');
  const field = (url.searchParams.get('field') || '').replace("Total ", ""); // Perbaikan parameter


  // Query InfluxDB berdasarkan parameter yang diterima
  const query = `
  data1 = from(bucket: "${bucket}")
    |> range(start: -${timeframe})
    |> filter(fn: (r) => r._measurement == "LVSW1")
    |> filter(fn: (r) => r._field == "${field}")
    |> aggregateWindow(every: 1s, fn: sum, createEmpty: false)

  data2 = from(bucket: "${bucket}")
    |> range(start: -${timeframe})
    |> filter(fn: (r) => r._measurement == "LVSW2")
    |> filter(fn: (r) => r._field == "${field}")
    |> aggregateWindow(every: 1s, fn: sum, createEmpty: false)

  union(tables: [data1, data2])
    |> group(columns: ["_time"]) // Grupkan berdasarkan waktu yang sama
    |> sum(column: "_value") // Jumlahkan nilai _value berdasarkan waktu yang sama
`

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
};
