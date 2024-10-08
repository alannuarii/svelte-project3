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
  const measurement = url.searchParams.get('measurement'); // Parameter measurement sudah benar
  const field = url.searchParams.get('field'); // Parameter field sudah benar

  // Inisialisasi variabel query
  let query = '';

  // Pastikan parameter `field` tidak null atau undefined sebelum menggunakan `includes`
  if (field && field.includes("Generator Voltage") || field.includes("Generator Current")) {
    query = `
    from(bucket: "${bucket}")
      |> range(start: -${timeframe})
      |> filter(fn: (r) => r._measurement == "${measurement}")
      |> filter(fn: (r) => r._field == "Generator Voltage L1-L2" or r._field == "Generator Voltage L2-L3" or r._field == "Generator Voltage L3-L1")
    `;
  } else {
    query = `
    from(bucket: "${bucket}")
      |> range(start: -${timeframe})
      |> filter(fn: (r) => r._measurement == "${measurement}")
      |> filter(fn: (r) => r._field == "Generator Current Phase L1" or r._field == "Generator Current Phase L2" or r._field == "Generator Current Phase L3")
    `;
  }

  try {
    // Eksekusi query ke InfluxDB
    const result = await queryInfluxDB(token, org, influxUrl, query);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    // Tangani error dan kirimkan respons kesalahan
    console.error('Caught error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
