<script>
	import { onMount } from 'svelte';
	import Battery from './Battery.svelte';
	import WeatherStation from './WeatherStation.svelte';

	export let weatherData;
	export let lvsw1Data;
	export let lvsw2Data;
	export let it1Data;
	export let it2Data;

	// Variabel untuk nilai activePower
	let activePower = 0; // Default value
	let irradiance = 0;
	let it1 = 0;
	let it2 = 0;
	let airTemp = 0;
	let exTemp = 0;
	let humidity = 0;
	let windDirect = 0;
	let windSpeed = 0;

	const isDataAvailable = (data) => data && data.length > 0;

	// Update nilai dari dgData secara real-time
	onMount(() => {
		if (isDataAvailable(lvsw1Data) && isDataAvailable(lvsw2Data)) {
			activePower = lvsw1Data[0]._value + lvsw2Data[0]._value; // Ambil nilai awal dari dgData
		}

		if (isDataAvailable(weatherData)) {
			airTemp = weatherData[0]._value;
			exTemp = weatherData[1]._value;
			irradiance = weatherData[2]._value;
			humidity = weatherData[3]._value;
			windDirect = weatherData[4]._value;
			windSpeed = weatherData[5]._value;
		}

		if (isDataAvailable(it1Data)) {
			it1 = it1Data[0]._value;
		}

		if (isDataAvailable(it2Data)) {
			it2 = it2Data[0]._value;
		}
	});

	$: if (isDataAvailable(lvsw1Data) && isDataAvailable(lvsw2Data)) {
		activePower = lvsw1Data[0]._value + lvsw2Data[0]._value; // Memperbarui nilai ketika dgData berubah
	}
	$: if (isDataAvailable(weatherData)) {
		airTemp = weatherData[0]._value;
		exTemp = weatherData[1]._value;
		irradiance = weatherData[2]._value;
		humidity = weatherData[3]._value;
		windDirect = weatherData[4]._value;
		windSpeed = weatherData[5]._value;
	}
	$: if (isDataAvailable(it1Data)) {
		it1 = it1Data[0]._value;
	}

	$: if (isDataAvailable(it2Data)) {
		it2 = it2Data[0]._value;
	}
</script>

<section class="mt-2">
	<div class="card py-2 rounded-5 shadow border-dark border-5">
		<h1 class="text-center">PLTS Sangihe</h1>
		<div class="mx-auto mb-2">
			{#if isDataAvailable(lvsw1Data) && isDataAvailable(lvsw2Data) && lvsw1Data[0]._value + lvsw2Data[0]._value > 0}
				<span class="badge text-bg-success">Operating</span>
			{:else}
				<span class="badge text-bg-secondary">Stop</span>
			{/if}
		</div>
		<div class="pt-2 mx-3">
			<div class="mb-2">
				<h2 class="text-center mb-1">Active Power (kW)</h2>
				<div
					class="progress mx-3"
					role="progressbar"
					aria-label="Progress example"
					aria-valuenow={activePower}
					aria-valuemin="0"
					aria-valuemax="1000"
					style="height: 25px;"
				>
					<div
						class="progress-bar progress-bar-striped progress-bar-animated"
						style="width: {Math.min((activePower / 1000) * 100, 1000)}%;"
					>
						{activePower.toFixed(2)}
					</div>
				</div>
				<p class="text-center">DMN 1000 kWp</p>
			</div>
			<div
				class="progress mx-3"
				role="progressbar"
				aria-label="Example 1px high"
				aria-valuenow={irradiance}
				aria-valuemin="0"
				aria-valuemax="1000"
				style="height: 4px"
			>
				<div
					class="progress-bar bg-warning"
					style="width: {Math.min((irradiance / 1000) * 100, 1000)}%"
				></div>
			</div>
			<p class="text-center">Global Irradiance {irradiance.toFixed(2)} W/m2</p>
			<div>
				<Battery {it1} {it2} />
			</div>
			<div>
				<WeatherStation {airTemp} {exTemp} {humidity} {windDirect} {windSpeed} />
			</div>
			<div class="text-center">
				<a href="/detail/plts">Detail <i class="bi-arrow-right-circle"></i></a>
			</div>
		</div>
	</div>
</section>

<style>
	h1 {
		font-size: 18px;
		font-weight: 700;
		margin: 0px;
	}
	h2 {
		font-size: 12px;
		margin: 0px;
	}
	p {
		margin: 0px;
		font-size: 10px;
	}
	a {
		font-size: 12px;
		text-decoration: none;
	}
	.badge {
		font-size: 10px;
	}
</style>
