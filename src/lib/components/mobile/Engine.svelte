<script>
	import { onMount } from 'svelte';

	export let dgData;
	export let engine;

	// Variabel untuk nilai activePower
	let activePower = 0; // Default value

	// Update nilai dari dgData secara real-time
	onMount(() => {
		if (dgData && dgData.length > 0) {
			activePower = dgData[0]._value; // Ambil nilai awal dari dgData
		}
	});

	$: if (dgData && dgData.length > 0) {
		activePower = dgData[0]._value; // Memperbarui nilai ketika dgData berubah
	}

	const isDataAvailable = (data) => data && data.length > 0;
</script>

<div class="card pt-3">
	<h1 class="text-center">Unit #{engine}</h1>
	<div class="mx-auto mb-3">
		{#if isDataAvailable(dgData) && dgData[0]._value !== 0}
			<span class="badge text-bg-success">Operating</span>
		{:else}
			<span class="badge text-bg-secondary">Stop</span>
		{/if}
	</div>
	<div class="mb-2">
		<h2 class="text-center mb-1">Active Power (kW)</h2>
		<div
			class="progress mx-3"
			role="progressbar"
			aria-label="Progress example"
			aria-valuenow={activePower}
			aria-valuemin="0"
			aria-valuemax="850"
			style="height: 25px;"
		>
			<div
				class="progress-bar progress-bar-striped progress-bar-animated"
				style="width: {Math.min((activePower / 850) * 100, 100)}%;"
			>
				{activePower.toFixed(2)}
			</div>
		</div>
		<p class="text-center">DMN 850 kW</p>
	</div>
	<div class="text-center mb-2">
		<div class="text-center">
            <a href="/detail/pltd">Detail <i class="bi-arrow-right-circle"></i></a>
        </div>
		
	</div>
</div>

<style>
	h1 {
		font-size: 15px;
		margin: 0px;
		font-weight: 700;
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
