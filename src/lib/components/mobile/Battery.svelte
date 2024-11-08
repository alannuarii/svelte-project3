<script>
	export let it1;
	export let it2;
</script>

<div class="row mt-3 gx-3 px-5">
	<div class="col-6">
		<h2 class="text-center mb-2">BSS Feeder #1</h2>
		<h3 class="text-center batval">{it1 * 100} kW</h3>
		<hr />
		<h3 class="text-center status">
			{#if it1 > 0}
				<h3 class="card-title me-2 text-danger status">Discharging</h3>
			{:else if it1 <= -1}
				<h3 class="card-title me-2 text-primary status">Charging</h3>
			{:else}
				<h3 class="card-title me-2">-</h3>
			{/if}
		</h3>
	</div>
	<div class="col-6">
		<h2 class="text-center mb-2">BSS Feeder #2</h2>
		<h3 class="text-center batval">{it2 * 100} kW</h3>
		<hr />
		<h3 class="text-center status">
			{#if it2 > 0}
				<h3 class="card-title me-2 text-danger status">Discharging</h3>
			{:else if it2 <= -1}
				<h3 class="card-title me-2 text-primary status">Charging</h3>
			{:else}
				<h3 class="card-title me-2">-</h3>
			{/if}
		</h3>
	</div>
</div>

<style>
	h2 {
		font-size: 12px;
		margin: 0px;
	}
	h3 {
		font-size: 12px;
		margin: 0px;
		font-weight: 700;
	}
	.batval {
		margin-bottom: -12px;
	}
	.status {
		margin-top: -12px;
	}
</style>
