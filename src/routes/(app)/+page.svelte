<script>
	import { onMount } from 'svelte';
	import Pltd from '../../lib/components/PLTD.svelte';
	import Plts from '../../lib/components/PLTS.svelte';
	import Main from '../../lib/components/mobile/Main.svelte';

	let weatherData = [];
	let dg6Data = [];
	let dg7Data = [];
	let lvsw1Data = [];
	let lvsw2Data = [];
	let it1Data = [];
	let it2Data = [];
	let error = null;

	const fetchData = async () => {
		try {
			// Fetch data from both APIs
			const weatherRes = await fetch('/api/weather-station');
			const dg6Res = await fetch('/api/dg6');
			const dg7Res = await fetch('/api/dg7');
			const lvsw1Res = await fetch('/api/lvsw1');
			const lvsw2Res = await fetch('/api/lvsw2');
			const it1Res = await fetch('/api/it1');
			const it2Res = await fetch('/api/it2');

			// Check if both requests are primaryful
			if (
				!weatherRes.ok ||
				!dg6Res.ok ||
				!dg7Res.ok ||
				!lvsw1Res.ok ||
				!lvsw2Res.ok ||
				!it1Res.ok ||
				!it2Res.ok
			) {
				throw new Error('Failed to fetch data');
			}

			// Parse both JSON responses
			const weather = await weatherRes.json();
			const dg6 = await dg6Res.json();
			const dg7 = await dg7Res.json();
			const lvsw1 = await lvsw1Res.json();
			const lvsw2 = await lvsw2Res.json();
			const it1 = await it1Res.json();
			const it2 = await it2Res.json();

			// Update the weatherData and dg7Data arrays
			weatherData = weather;
			dg6Data = dg6;
			dg7Data = dg7;
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
</script>

<section class="desktop">
	<div class="container-fluid">
		{#if error}
			<p>Error: {error}</p>
		{:else}
			<div class="row gx-3">
				<div class="col-6">
					<Pltd {dg6Data} {dg7Data} />
				</div>
				<div class="col-6">
					<Plts {weatherData} {lvsw1Data} {lvsw2Data} {it1Data} {it2Data} />
				</div>
			</div>
		{/if}
	</div>
</section>

<section class="mobile">
	{#if error}
		<p>Error: {error}</p>
	{:else}
		<Main {dg6Data} {dg7Data} {lvsw1Data} {lvsw2Data} {weatherData} {it1Data} {it2Data} />
	{/if}
</section>

<style>
	.desktop {
		display: block;
	}

	.mobile {
		display: none;
	}

	/* Mobile specific */
	@media screen and (max-width: 1000px) {
		.desktop {
			display: none;
		}
		.mobile {
			display: block !important;
		}
	}
</style>
