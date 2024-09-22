<script>
	import { onMount } from 'svelte';
	import { units } from '../../lib/js/units';

	let weatherData = [];
	let error = null;

	const fetchData = async () => {
		try {
			const res = await fetch('/api/weather-station');
			if (!res.ok) {
				throw new Error('Failed to fetch data');
			}
			const data = await res.json();
			weatherData = data;
		} catch (err) {
			error = err.message;
		}
	};

	onMount(() => {
		fetchData();

		const interval = setInterval(fetchData, 5000);

		return () => clearInterval(interval);
	});

	$: console.log(weatherData[0]);
</script>

<div>
	{#if error}
		<p>Error: {error}</p>
	{:else}
		<ul>
			{#each weatherData as item}
				<li>{item._field} = {(item._value).toFixed(2)} {units(item._field)}</li>
			{/each}
		</ul>
	{/if}
</div>
