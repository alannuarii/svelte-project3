<script>
	import { units } from '../js/units';

	export let weatherData;

	const isDataAvailable = (data) => data && data.length > 0;
</script>

{#if isDataAvailable(weatherData)}
	<div class="mx-3 py-2 ws card border-dark">
		<h4 class="text-center mb-2">Weather Station</h4>
		<div class="row gx-0 mx-3 mx-lg-2">
			{#each weatherData as item}
				<div class="col-4 col-lg-2 mb-3">
					<!-- Menggunakan col-6 untuk layar kecil, col-lg-2 untuk layar besar -->
					<div class="card mx-1 border-dark">
						<a
							href="/chart/{item._measurement}-{item._field}"
							class="card-header d-flex justify-content-center align-items-center text-center"
							>{item._field}</a
						>
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

<style>
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
	a {
		font-size: 12px;
		padding: 4px;
		cursor: pointer;
		text-decoration: none;
		font-weight: 500;
	}
	a:hover {
		color: #0d6efd;
	}

	@media (max-width: 576px) {
		h5,
		.unit,
		a {
			font-size: 3vw;
		}
	}
</style>
