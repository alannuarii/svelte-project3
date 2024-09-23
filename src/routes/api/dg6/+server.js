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
        |> filter(fn: (r) => r._measurement == "dg6")
        |> filter(fn: (r) => r._field == "Generator Current Phase L1" or r._field == "Generator Current Phase L2" or r._field == "Generator Current Phase L3" or r._field == "Generator Voltage L1-L2" or r._field == "Generator Voltage L2-L3" or r._field == "Generator Voltage L3-L1" or r._field == "Generator Frequency" or r._field == "Power Factor" or r._field == "Active Power" or r._field == "Reactive Power")
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
