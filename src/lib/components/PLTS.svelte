<script>
	import { units } from '../js/units';
	import Battery from './Battery.svelte';
	import Feeder from './Feeder.svelte';
	export let weatherData;
	export let lvsw1Data;
	export let lvsw2Data;
	export let it1Data;
	export let it2Data

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
					{#if isDataAvailable(weatherData)}
						<div class="card mb-2 border-dark">
							<h5 class="card-header text-center">Total Active Power</h5>
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
					{#if isDataAvailable(weatherData)}
						<div class="card mb-2 border-dark">
							<h5 class="card-header text-center">Total Reactive Power</h5>
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

				<!-- Card Voltage
				<div class="col-4">
					{#if isDataAvailable(weatherData)}
						<div class="card mb-2">
							<h5 class="card-header text-center">Voltage</h5>
							<div class="my-2 d-flex justify-content-center align-items-center">
								<h5 class="card-title me-2">
									{(lvsw1Data[5]._value === 0 ? lvsw2Data[5]._value : lvsw1Data[5]._value).toFixed(
										2
									)}
								</h5>
								<span class="unit">V</span>
							</div>
						</div>
					{:else}
						<h4>Loading</h4>
					{/if}
				</div> -->
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
			{#if isDataAvailable(weatherData)}
				<div class="row mx-3 py-2 ws card border-dark">
					<h4 class="text-center mb-2">Weather Station</h4>
					<div class="d-flex justify-content-center align-items-center">
						{#each weatherData as item}
							<div class="col-2">
								<div class="card mx-1 border-dark">
									<h5
										class="card-header d-flex justify-content-center align-items-center text-center"
									>
										{item._field}
									</h5>
									<div class="my-2 d-flex justify-content-center align-items-end">
										<h5 class="card-title me-1">{item._value.toFixed(2)}</h5>
										<span class="unit">{units(item._field)}</span>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{:else}
				<h4 class="text-center">Loading</h4>
			{/if}
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
	.ws h5 {
		font-size: 9px;
	}
	.ws .unit {
		font-size: 9px;
	}
	.ws .card-header {
		height: 40px;
	}
	.ws .card-title {
		font-size: 12px;
	}
</style>
