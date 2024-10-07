import { queryInfluxDB } from '../../../lib/js/query'
import { TOKEN, ORG, BUCKET, URL} from '$env/static/private';

const token = TOKEN
const org = ORG
const bucket = BUCKET
const url = URL

const query = `
from(bucket: "${bucket}")
  |> range(start: -1m)
  |> filter(fn: (r) => r._measurement == "dg7")
  |> filter(fn: (r) => r._field == "Generator Current Phase L1" or r._field == "Generator Current Phase L2" or r._field == "Generator Current Phase L3" or r._field == "Generator Voltage L1-L2" or r._field == "Generator Voltage L2-L3" or r._field == "Generator Voltage L3-L1" or r._field == "Generator Frequency" or r._field == "Power Factor" or r._field == "Active Power" or r._field == "Reactive Power")
  |> last()
`;

export const GET = async () => {
  try {
    const result = await queryInfluxDB(token, org, url, query)

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
