<script>
	import { units } from '../js/units';
	export let lvswData;
	export let feeder;

	const isDataAvailable = (data) => data && data.length > 0;
</script>

{#if isDataAvailable(lvswData)}
	<div class="card mb-2 border-dark">
		<h5 class="card-header text-center">Feeder #{feeder}</h5>
		<div class="my-2 d-flex justify-content-center align-items-center">
			<ul class="list-group list-group-horizontal px-2">
				{#each lvswData as item, i}
					{#if ![1, 2, 3].includes(i)}
						<li class="list-group-item d-flex flex-column">
							<div class="title d-flex justify-content-center align-items-center">
								<a
									href="/chart/{item._measurement}-{item._field}"
									class="title d-flex align-items-center text-dark">{item._field}</a
								>
							</div>
							<hr />
							<div class="value d-flex justify-content-center align-items-center">
								<h5 class="card-title me-2">{item._value?.toFixed(2)}</h5>
								<span class="unit2">{units(item._field)}</span>
							</div>
						</li>
					{/if}
				{/each}
			</ul>
		</div>
	</div>
{:else}
	<h4>Loading</h4>
{/if}

<style>
	h4 {
		font-size: 15px;
		margin: 0;
	}
	h5 {
		margin: 0;
		font-size: 13px;
	}
	.unit2 {
		font-size: 13px;
	}
	.title {
		height: 25px;
	}
	.value {
		margin-top: -10px;
	}
	a {
		font-size: 13px;
		margin-bottom: -7px;
		cursor: pointer;
		text-decoration: none;
		font-weight: 500;
	}
	a:hover {
		color: #0d6efd !important;
	}

	@media (max-width: 576px) {
		h5,
		.unit2,
		a {
			font-size: 3vw;
		}
		.title {
			height: 1px;
		}
	}
</style>
