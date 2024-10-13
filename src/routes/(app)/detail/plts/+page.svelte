<script>
	import { onMount } from 'svelte';
	import Frequency from '../../../../lib/components/mobile/Frequency.svelte';
	import Mvsw from '../../../../lib/components/mobile/MVSW.svelte';
	import Feeder from '../../../../lib/components/Feeder.svelte';
    import Battery from '../../../../lib/components/Battery.svelte';
    import WeatherStation from '../../../../lib/components/WeatherStation.svelte';

	let weatherData = [];
	let lvsw1Data = [];
	let lvsw2Data = [];
	let it1Data = [];
	let it2Data = [];
	let error = null;

	const fetchData = async () => {
		try {
			// Fetch data from both APIs
			const weatherRes = await fetch('/api/weather-station');
			const lvsw1Res = await fetch('/api/lvsw1');
			const lvsw2Res = await fetch('/api/lvsw2');
			const it1Res = await fetch('/api/it1');
			const it2Res = await fetch('/api/it2');

			// Check if both requests are primaryful
			if (!weatherRes.ok || !lvsw1Res.ok || !lvsw2Res.ok || !it1Res.ok || !it2Res.ok) {
				throw new Error('Failed to fetch data');
			}

			// Parse both JSON responses
			const weather = await weatherRes.json();
			const lvsw1 = await lvsw1Res.json();
			const lvsw2 = await lvsw2Res.json();
			const it1 = await it1Res.json();
			const it2 = await it2Res.json();

			// Update the weatherData and dg7Data arrays
			weatherData = weather;
			lvsw1Data = lvsw1;
			lvsw2Data = lvsw2;
			it1Data = it1;
			it2Data = it2;
		} catch (err) {
			error = err.message;
		}
	};

	onMount(() => {
		fetchData();

		const interval = setInterval(fetchData, 5000);

		return () => clearInterval(interval);
	});

	const isDataAvailable = (data) => data && data.length > 0;
</script>

<section class="mobile">
	{#if error}
		<p>Error: {error}</p>
	{:else}
		<div class="container-fluid">
			<div>
				<Frequency freqData={lvsw1Data} />
			</div>
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
						<Mvsw {lvsw1Data} {lvsw2Data} />

						<!-- Feeder Components -->
						<div class="row text-center px-3">
							<div class="col-12 col-lg-6">
								<Feeder lvswData={lvsw1Data} feeder={1} />
							</div>
							<div class="col-12 col-lg-6">
								<Feeder lvswData={lvsw2Data} feeder={2} />
							</div>
						</div>

						<!-- Battery Components -->
						<div class="row text-center px-3">
							<div class="col-12 col-lg-6">
								<Battery itData={it1Data} feeder={1} />
							</div>
							<div class="col-12 col-lg-6">
								<Battery itData={it2Data} feeder={2} />
							</div>
						</div>

						<!-- Weather Data Cards -->
						<WeatherStation {weatherData} />
					</div>
				</div>
			</section>
		</div>
	{/if}
</section>

<style>
	h1 {
		font-size: 25px;
		font-weight: 700;
	}
</style>
