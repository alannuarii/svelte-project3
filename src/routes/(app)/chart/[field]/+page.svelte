<script>
	import { onMount, onDestroy } from 'svelte';

	let chartDiv;
	let interval;
	let Plotly = null;
	let error = null;
	let timeframe = '5m'; // Timeframe default
	let measurement = ''; // Measurement yang akan diambil dari URL
	let field = ''; // Field yang akan diambil dari URL
	let urlParams = null; // Variabel untuk menyimpan URL path
	let lastValue = null; // Untuk menyimpan nilai terakhir

	// Fungsi untuk mengecek apakah kode berjalan di browser
	const isClient = typeof window !== 'undefined';

	// Fungsi untuk mengambil data dari API berdasarkan timeframe yang dipilih
	const fetchData = async () => {
		try {
			// Pastikan field memiliki nilai sebelum melakukan fetch
			if (field) {
				// Tentukan URL berdasarkan field yang dipilih
				const apiUrl =
					field.includes('Voltage') || field.includes('Current')
						? `/api/chart3?timeframe=${timeframe}&measurement=${measurement}&field=${field}`
						: `/api/chart?timeframe=${timeframe}&measurement=${measurement}&field=${field}`;

				const response = await fetch(apiUrl);
				if (!response.ok) throw new Error('Gagal mengambil data dari server');

				const data = await response.json();

				// Buat dictionary untuk mengelompokkan data berdasarkan _field
				const groupedData = data.reduce((acc, item) => {
					if (!acc[item._field]) acc[item._field] = [];
					acc[item._field].push(item);
					return acc;
				}, {});

				// Buat trace untuk setiap _field yang ditemukan di data
				const trace = Object.keys(groupedData).map((fieldName) => {
					const fieldData = groupedData[fieldName];
					lastValue = fieldData[fieldData.length - 1]._value; // Ambil nilai terakhir
					return {
						x: fieldData.map((d) => new Date(d._time)), // Waktu sebagai x-axis
						y: fieldData.map((d) => d._value), // Nilai field sebagai y-axis
						mode: 'lines', // Menambahkan marker untuk menunjukkan data
						name: fieldName, // Nama dari _field diambil langsung dari data
						line: { color: getColorForField(fieldName), width: 1, dash: 'solid' } // Fungsi untuk mendapatkan warna untuk setiap field
					};
				});

				// Update grafik dengan data terbaru menggunakan Plotly.react()
				Plotly.react(chartDiv, trace, {
					title: '<b>' + `${field} Monitoring` + '</b>',
					xaxis: { title: 'Time' },
					yaxis: { title: `${field} (kW)` },
					margin: { l: 80, r: 50, b: 100, t: 80 }, // Menambahkan padding bawah untuk legend
					legend: {
						orientation: 'h', // Legend horizontal
						y: -0.2, // Menggeser legend ke bawah grafik
						x: 0.5, // Menempatkan legend di tengah
						xanchor: 'center' // Anchor legend ke tengah
					},
					showlegend: true, // Tampilkan legenda untuk membedakan setiap field
					annotations: [
						{
							x: new Date(groupedData[Object.keys(groupedData)[0]].slice(-1)[0]._time), // Waktu terakhir
							y: lastValue, // Nilai terakhir
							xref: 'x',
							yref: 'y',
							text: '<b>' + `${lastValue.toFixed(2)}` + '<b>', // Teks anotasi
							showarrow: true,
							arrowhead: 2,
							ax: 0,
							ay: -40
						}
					]
				});
			} else {
				throw new Error('Field tidak valid, pastikan parameter URL sudah benar.');
			}
		} catch (err) {
			error = err.message;
			console.error('Error fetching data:', error);
		}
	};

	// Fungsi untuk memberikan warna berbeda untuk setiap field (opsional)
	const getColorForField = (fieldName) => {
		const colorMap = {
			'Generator Voltage L1-L2': 'blue',
			'Generator Voltage L2-L3': 'orange',
			'Generator Voltage L3-L1': 'green',
			'Generator Current Phase L1': 'blue',
			'Generator Current Phase L2': 'orange',
			'Generator Current Phase L3': 'green'
		};
		return colorMap[fieldName] || 'black'; // Gunakan warna default jika fieldName tidak ada di colorMap
	};

	// Fungsi untuk mengurai URL path menjadi measurement dan field
	const parseUrlPath = (path) => {
		// Contoh path: /chart/dg7-Active%20Power
		const segments = path.split('/');

		// Pastikan path memiliki segmen yang sesuai ("/chart/measurement-field")
		if (segments.length >= 3) {
			// Ambil measurement dan field dari segmen terakhir, misalnya "dg7-Active Power"
			const [measurementSegment, fieldSegment] = segments[2].split('-');

			// Decode URL agar menangani karakter URL seperti "%20" untuk spasi
			measurement = decodeURIComponent(measurementSegment);
			field = decodeURIComponent(fieldSegment);
		} else {
			console.error('URL path tidak sesuai format yang diharapkan: /chart/measurement-field');
		}
	};

	// Fungsi yang dijalankan pada saat komponen di-mount
	onMount(async () => {
		if (isClient) {
			// Import `Plotly` hanya jika kode berjalan di klien
			Plotly = await import('plotly.js-dist');

			// Tangkap path dari URL saat ini
			urlParams = window.location.pathname;

			// Uraikan URL path untuk mendapatkan measurement dan field
			parseUrlPath(urlParams);

			// Ambil data pertama kali dan set interval untuk update setiap 10 detik
			if (measurement && field) {
				await fetchData();
				interval = setInterval(fetchData, 10000);
			}
		}
	});

	// Bersihkan interval ketika komponen di-unmount
	onDestroy(() => {
		if (interval) clearInterval(interval);
	});
</script>

<!-- Bagian UI untuk mengatur timeframe -->
<div class="ms-5 mt-2">
	<h5 class="text-light">Timeframe</h5>
	<div class="w-25">
		<select class="form-select" id="timeframe" bind:value={timeframe} on:change={fetchData}>
			<option value="1m">1 Minute</option>
			<option value="5m">5 Minutes</option>
			<option value="30m">30 Minutes</option>
			<option value="1h">1 Hour</option>
			<option value="6h">6 Hours</option>
			<option value="12h">12 Hours</option>
			<option value="24h">24 Hours</option>
		</select>
	</div>
</div>

<!-- Elemen div untuk menampung grafik Plotly -->
{#if error}
	<p style="color: red;">Error: {error}</p>
{:else}
	<div class="card p-3 border-dark border-5 rounded-5">
		<div bind:this={chartDiv} style="width:100%; height:420px;"></div>
	</div>
{/if}

<style>
	select {
		margin-bottom: 20px;
	}
</style>
