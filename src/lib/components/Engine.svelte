<script>
	import { units } from '../js/units';
	export let dgData;
	export let engine;

	const isDataAvailable = (data) => data && data.length > 0;
</script>

<div class="card border-dark">
	<h2 class="text-center mt-2">Unit #{engine}</h2>
	<div class="mx-auto mb-3">
		{#if isDataAvailable(dgData) && dgData[0]._value !== 0}
			<span class="badge text-bg-success">Operating</span>
		{:else}
			<span class="badge text-bg-secondary">Stop</span>
		{/if}
	</div>

	<!-- Menampilkan data utama dari dgData -->
	{#if isDataAvailable(dgData)}
		{#each [0, 9, 8] as index}
			<div class="card mx-4 mb-2 border-dark">
				<a
					href="/chart/{dgData[index]._measurement}-{dgData[index]._field}"
					class="card-header text-center">{dgData[index]._field}</a
				>
				<div class="my-2 d-flex justify-content-center align-items-center">
					<h5 class="card-title me-2">{dgData[index]._value.toFixed(2)}</h5>
					<span class="unit">{units(dgData[index]._field)}</span>
				</div>
			</div>
		{/each}

		<!-- Voltage Generator -->
		<div class="card mx-4 mb-2 border-dark">
			<a
				href="/chart/{dgData[5]._measurement}-{dgData[5]._field.split(' L')[0]}"
				class="card-header text-center">Voltage Generator</a
			>
			<div class="my-2 d-flex justify-content-center align-items-center">
				<ul class="list-group list-group-horizontal">
					{#each dgData as item, i}
						{#if ![0, 1, 2, 3, 4, 8, 9].includes(i)}
							<li class="list-group-item d-flex justify-content-center align-items-center">
								<h6 class="card-title me-2">{item._value.toFixed(0)}</h6>
								<span class="unit2">{units(item._field)}</span>
							</li>
						{/if}
					{/each}
				</ul>
			</div>
		</div>

		<!-- Current Generator -->
		<div class="card mx-4 mb-2 border-dark">
			<a
				href="/chart/{dgData[1]._measurement}-{dgData[1]._field.split(' L')[0]}"
				class="card-header text-center">Current Generator</a
			>
			<div class="my-2 d-flex justify-content-center align-items-center">
				<ul class="list-group list-group-horizontal">
					{#each dgData as item, i}
						{#if ![0, 5, 6, 7, 4, 8, 9].includes(i)}
							<li class="list-group-item d-flex justify-content-center align-items-center">
								<h6 class="card-title me-2">{item._value.toFixed(0)}</h6>
								<span class="unit2">{units(item._field)}</span>
							</li>
						{/if}
					{/each}
				</ul>
			</div>
		</div>
	{:else}
		<h4 class="text-center">Loading</h4>
	{/if}
</div>

<style>
	h4 {
		font-size: 15px;
		margin: 0;
	}
	h2 {
		font-size: 20px;
		font-weight: 700;
	}
	h5 {
		margin: 0;
		font-size: 15px;
	}
	h6 {
		margin: 0;
		font-size: 11px;
	}
	.unit {
		font-size: 15px;
	}
	.unit2 {
		font-size: 11px;
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

	@media (max-width: 576px) {
		.card-header,
		h6,
		.unit2,
		.unit {
			font-size: 3vw;
		}
	}
</style>
