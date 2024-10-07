import { InfluxDB } from '@influxdata/influxdb-client';

export const queryInfluxDB = async (token, org, url, query) => {
    try {
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
                    resolve(); // Menyelesaikan promise
                }
            });
        });

        // Mengembalikan hasil query
        return result;
    } catch (error) {
        console.error('Caught error:', error); // Log kesalahan
        throw new Error(error.message); // Melempar kesalahan jika terjadi
    }
}
