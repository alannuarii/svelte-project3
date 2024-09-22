import { InfluxDB } from '@influxdata/influxdb-client';
import { TOKEN, ORG, BUCKET, URL} from '$env/static/private';

const token = TOKEN
const org = ORG
const bucket = BUCKET
const url = URL

export async function GET() {
  try {
    const query = `
      from(bucket: "${bucket}")
        |> range(start: -1m)
        |> filter(fn: (r) => r._measurement == "weather_station")
        |> filter(fn: (r) => r._field == "External Temperature" or r._field == "Global Irradiance" or r._field == "Wind Direction" or r._field == "Wind Speed" or r._field == "Relative Humidity")
        |> last()
    `;

    const influxDB = new InfluxDB({ url, token });
    const queryApi = influxDB.getQueryApi(org);
    let result = [];

    // Membungkus dalam Promise untuk menunggu hingga selesai
    await new Promise((resolve, reject) => {
      queryApi.queryRows(query, {
        next(row, tableMeta) {
          const o = tableMeta.toObject(row);
          result.push(o); // Menambahkan objek ke result
        },
        error(error) {
          console.error('Query failed: ', error);
          reject(error); // Menolak promise jika terjadi error
        },
        complete() {
          console.log('Query completed.');
          resolve(); // Menyelesaikan promise
        }
      });
    });

    console.log('Final Query result:', result); // Log sebelum return

    // Menampilkan hasil query ke dalam response
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    console.error('Caught error:', error); // Log kesalahan
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
