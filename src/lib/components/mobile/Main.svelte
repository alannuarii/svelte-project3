<script>
	import Timer from '../Timer.svelte';
	import Pltd from './PLTD.svelte';
	import Plts from './PLTS.svelte';

	export let dg6Data;
	export let dg7Data;
	export let weatherData;
	export let lvsw1Data;
	export let lvsw2Data;
	export let it1Data;
	export let it2Data;

	const isFreqOutOfRange = (frequency) => frequency > 50.5 || frequency < 49.5;
</script>

<div class="container-fluid">
	<div class="mt-2">
		<Timer />
	</div>
	<div class="my-3">
		{#if lvsw1Data.length > 2 && lvsw1Data[2]}
			<h1
				class:out-of-range={isFreqOutOfRange(lvsw1Data[2]._value)}
				class="text-center text-light frequency-text"
			>
				{lvsw1Data[2]?._value?.toFixed(2) ?? '00.00'} Hz
			</h1>
		{:else}
			<h1 class="text-light text-center">00.00 Hz</h1>
		{/if}
	</div>
	<div>
		<Pltd {dg6Data} {dg7Data} />
	</div>
	<div><Plts {lvsw1Data} {lvsw2Data} {weatherData} {it1Data} {it2Data} /></div>
</div>

<style>
	h1 {
		font-weight: 900;
	}
	.frequency-text {
		font-size: 35px;
		font-weight: 700;
		margin-bottom: -7px;
		cursor: pointer;
		text-decoration: none;
	}
	.frequency-text:hover {
		color: #0d6efd !important;
	}
	/* Style dasar untuk teks */
	.frequency-text {
		transition:
			color 0.3s ease,
			text-shadow 0.3s ease;
	}

	/* Style ketika frekuensi di luar batas normal */
	.frequency-text.out-of-range {
		color: red; /* Warna merah */
		text-shadow: 0 0 10px rgba(255, 0, 0, 0.7); /* Efek menyala */
		animation: pulse 1s infinite alternate; /* Efek menyala */
	}

	/* Animasi untuk memberikan efek menyala */
	@keyframes pulse {
		from {
			text-shadow: 0 0 10px rgba(255, 0, 0, 0.7);
		}
		to {
			text-shadow: 0 0 20px rgba(255, 0, 0, 1);
		}
	}
</style>
