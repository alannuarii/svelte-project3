<script>
	export let lvsw1Data;
	export let lvsw2Data;

	const isDataAvailable = (data) => data && data.length > 0;
</script>

<div class="row mx-2">
	<!-- Card Active Power -->
	<div class="col-6">
		{#if isDataAvailable(lvsw1Data || lvsw2Data)}
			<div class="card mb-2 border-dark">
				<a
					href="/chart/{lvsw1Data[0]._measurement}-Total {lvsw1Data[0]._field}"
					class="card-header text-center">Total Active Power</a
				>
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
		{#if isDataAvailable(lvsw1Data || lvsw2Data)}
			<div class="card mb-2 border-dark">
				<a
					href="/chart/{lvsw1Data[4]._measurement}-{lvsw1Data[4]._field}"
					class="card-header text-center">Total Reactive Power</a
				>
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
</div>

<style>
	h4 {
		font-size: 15px;
		margin: 0;
	}
	h5 {
		margin: 0;
		font-size: 13px;
	}
	a {
		font-size: 13px;
		padding: 4px;
		cursor: pointer;
		text-decoration: none;
		font-weight: 500;
	}
	a:hover {
		color: #0d6efd;
	}
	.unit {
		font-size: 13px;
	}

	@media (max-width: 576px) {
		h5,
		.unit,
		a {
			font-size: 3vw;
		}
	}
</style>
