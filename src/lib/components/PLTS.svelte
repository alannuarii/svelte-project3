<script>
	import Battery from './Battery.svelte';
	import Feeder from './Feeder.svelte';
	import WeatherStation from './WeatherStation.svelte';

	export let weatherData;
	export let lvsw1Data;
	export let lvsw2Data;
	export let it1Data;
	export let it2Data;

	// Fungsi untuk mengecek ketersediaan data
	const isDataAvailable = (data) => data && data.length > 0;
</script>

<section class="my-2">
	<div class="card py-2 rounded-5 shadow border-dark border-5">
		<h1 class="text-center">PLTS Sangihe</h1>

		<!-- Status Operasi berdasarkan weatherData -->
		<div class="mx-auto mb-3">
			{#if isDataAvailable(lvsw1Data) && isDataAvailable(lvsw2Data) && lvsw1Data[0]._value + lvsw2Data[0]._value > 0}
				<span class="badge text-bg-success">Operating</span>
			{:else}
				<span class="badge text-bg-secondary">Stop</span>
			{/if}
		</div>

		<div>
			<div class="row mx-2">
				<!-- Card Active Power -->
				<div class="col-6">
					{#if isDataAvailable(lvsw1Data || lvsw2Data)}
						<div class="card mb-2 border-dark">
							<a href="/chart/{lvsw1Data[0]._measurement}-Total {lvsw1Data[0]._field}" class="card-header text-center">Total Active Power</a>
							<div class="my-2 d-flex justify-content-center align-items-center">
								<h5 class="card-title me-2">
									{(lvsw1Data[0]._value + lvsw2Data[0]._value).toFixed(2)}
								</h5>
								<span class="unit">kW</span>
							</div>
						</div>
					{:else}
						<h4 class="text-center">Loading</h4>
					{/if}
				</div>

				<!-- Card Reactive Power -->
				<div class="col-6">
					{#if isDataAvailable(lvsw1Data || lvsw2Data)}
						<div class="card mb-2 border-dark">
							<a href="/chart/{lvsw1Data[4]._measurement}-{lvsw1Data[4]._field}" class="card-header text-center">Total Reactive Power</a>
							<div class="my-2 d-flex justify-content-center align-items-center">
								<h5 class="card-title me-2">
									{(lvsw1Data[4]._value + lvsw2Data[4]._value).toFixed(2)}
								</h5>
								<span class="unit">kVAR</span>
							</div>
						</div>
					{:else}
						<h4 class="text-center">Loading</h4>
					{/if}
				</div>
			</div>

			<!-- Feeder Components -->
			<div class="row text-center px-3">
				<div class="col-6">
					<Feeder lvswData={lvsw1Data} feeder={1} />
				</div>
				<div class="col-6">
					<Feeder lvswData={lvsw2Data} feeder={2} />
				</div>
			</div>

			<!-- Battery Components -->
			<div class="row text-center px-3">
				<div class="col-6">
					<Battery itData={it1Data} feeder={1} />
				</div>
				<div class="col-6">
					<Battery itData={it2Data} feeder={2} />
				</div>
			</div>

			<!-- Weather Data Cards -->
			<WeatherStation {weatherData} />
		</div>
	</div>
</section>

<style>
	h1 {
		font-size: 25px;
		font-weight: 700;
	}
	h4 {
		font-size: 15px;
		margin: 0;
	}
	h5 {
		margin: 0;
		font-size: 15px;
	}
	a {
		padding: 4px;
		font: inherit;
		cursor: pointer;
		text-decoration: none;
		font-weight: 500;
	}
	a:hover {
		color: #0d6efd;
	}
</style>
