<script>
	import { onMount } from 'svelte';
	import { units } from '../../lib/js/units';

	let weatherData = [];
	let dg6Data = [];
	let dg7Data = [];
	let error = null;

	const fetchData = async () => {
		try {
			// Fetch data from both APIs
			const weatherRes = await fetch('/api/weather-station');
			const dg6Res = await fetch('/api/dg6');
			const dg7Res = await fetch('/api/dg7');

			// Check if both requests are successful
			if (!weatherRes.ok || !dg6Res.ok || !dg7Res.ok) {
				throw new Error('Failed to fetch data');
			}

			// Parse both JSON responses
			const weather = await weatherRes.json();
			const dg6 = await dg6Res.json();
			const dg7 = await dg7Res.json();

			// Update the weatherData and dg7Data arrays
			weatherData = weather;
			dg6Data = dg6;
			dg7Data = dg7;
		} catch (err) {
			error = err.message;
		}
	};

	onMount(() => {
		fetchData();

		const interval = setInterval(fetchData, 5000);

		return () => clearInterval(interval);
	});

	// Debugging output for both datasets
	$: console.log('Weather Data:', weatherData);
	$: console.log('DG7 Data:', dg7Data);
</script>

<div>
	{#if error}
		<p>Error: {error}</p>
	{:else}
		<!-- Display weather station data -->
		<h3>Weather Station Data</h3>
		<ul>
			{#each weatherData as item}
				<li>{item._field} = {(item._value).toFixed(2)} {units(item._field)}</li>
			{/each}
		</ul>

		<!-- Display dg6 data -->
		<h3>DG6 Data</h3>
		<ul>
			{#each dg6Data as item}
				<li>{item._field} = {(item._value).toFixed(2)} {units(item._field)}</li>
			{/each}
		</ul>

		<!-- Display dg7 data -->
		<h3>DG7 Data</h3>
		<ul>
			{#each dg7Data as item}
				<li>{item._field} = {(item._value).toFixed(2)} {units(item._field)}</li>
			{/each}
		</ul>
	{/if}
</div>
