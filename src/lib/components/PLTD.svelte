<script>
	import { units } from '../js/units';
	export let dg6Data;
	export let dg7Data;

	const isDataAvailable = (data) => data && data.length > 0;

	// Fungsi untuk mengambil data dari array berdasarkan nama field
	const getDataByField = (data, field) => {
		return data.find(item => item._field === field) || null;
	};
</script>

<section class="my-2">
	<div class="card py-2 rounded-5 shadow border-dark border-5">
		<h1 class="text-center">PLTD Tahuna</h1>
		<div>
			<div class="row m-2">
				<!-- Card Unit #6 -->
				<div class="col-6">
					<div class="card border-dark">
						<h2 class="text-center mt-2">Unit #6</h2>
						<div class="mx-auto mb-3">
							{#if isDataAvailable(dg6Data) && dg6Data[0]._value !== 0}
								<span class="badge text-bg-success">Operating</span>
							{:else}
								<span class="badge text-bg-secondary">Stop</span>
							{/if}
						</div>
						
						<!-- Menampilkan data utama dari dg6Data -->
						{#if isDataAvailable(dg6Data)}
							{#each [0, 9, 8] as index}
								<div class="card mx-4 mb-2 border-dark">
									<h5 class="card-header text-center">{dg6Data[index]._field}</h5>
									<div class="my-2 d-flex justify-content-center align-items-center">
										<h5 class="card-title me-2">{dg6Data[index]._value.toFixed(2)}</h5>
										<span class="unit">{units(dg6Data[index]._field)}</span>
									</div>
								</div>
							{/each}
							
							<!-- Voltage Generator -->
							<div class="card mx-4 mb-2 border-dark">
								<h6 class="card-header text-center">Voltage Generator</h6>
								<div class="my-2 d-flex justify-content-center align-items-center">
									<ul class="list-group list-group-horizontal">
										{#each dg6Data as item, i}
											{#if ![0, 1, 2, 3, 4, 8, 9].includes(i)}
												<li class="list-group-item d-flex justify-content-center align-items-center">
													<h6 class="card-title me-2">{item._value.toFixed(2)}</h6>
													<span class="unit2">{units(item._field)}</span>
												</li>
											{/if}
										{/each}
									</ul>
								</div>
							</div>

							<!-- Current Generator -->
							<div class="card mx-4 mb-2 border-dark">
								<h6 class="card-header text-center">Current Generator</h6>
								<div class="my-2 d-flex justify-content-center align-items-center">
									<ul class="list-group list-group-horizontal">
										{#each dg6Data as item, i}
											{#if ![0, 5, 6, 7, 4, 8, 9].includes(i)}
												<li class="list-group-item d-flex justify-content-center align-items-center">
													<h6 class="card-title me-2">{item._value.toFixed(2)}</h6>
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
				</div>

				<!-- Card Unit #7 -->
				<div class="col-6">
					<div class="card border-dark">
						<h2 class="text-center mt-2">Unit #7</h2>
						<div class="mx-auto mb-3">
							{#if isDataAvailable(dg7Data) && dg7Data[0]._value !== 0}
								<span class="badge text-bg-success">Operating</span>
							{:else}
								<span class="badge text-bg-secondary">Stop</span>
							{/if}
						</div>
						
						<!-- Menampilkan data utama dari dg7Data -->
						{#if isDataAvailable(dg7Data)}
							{#each [0, 9, 8] as index}
								<div class="card mx-4 mb-2 border-dark">
									<h5 class="card-header text-center">{dg7Data[index]._field}</h5>
									<div class="my-2 d-flex justify-content-center align-items-center">
										<h5 class="card-title me-2">{dg7Data[index]._value.toFixed(2)}</h5>
										<span class="unit">{units(dg7Data[index]._field)}</span>
									</div>
								</div>
							{/each}

							<!-- Voltage Generator -->
							<div class="card mx-4 mb-2 border-dark">
								<h6 class="card-header text-center">Voltage Generator</h6>
								<div class="my-2 d-flex justify-content-center align-items-center">
									<ul class="list-group list-group-horizontal">
										{#each dg7Data as item, i}
											{#if ![0, 1, 2, 3, 4, 8, 9].includes(i)}
												<li class="list-group-item d-flex justify-content-center align-items-center">
													<h6 class="card-title me-2">{item._value.toFixed(2)}</h6>
													<span class="unit2">{units(item._field)}</span>
												</li>
											{/if}
										{/each}
									</ul>
								</div>
							</div>

							<!-- Current Generator -->
							<div class="card mx-4 mb-2 border-dark">
								<h6 class="card-header text-center">Current Generator</h6>
								<div class="my-2 d-flex justify-content-center align-items-center">
									<ul class="list-group list-group-horizontal">
										{#each dg7Data as item, i}
											{#if ![0, 5, 6, 7, 4, 8, 9].includes(i)}
												<li class="list-group-item d-flex justify-content-center align-items-center">
													<h6 class="card-title me-2">{item._value.toFixed(2)}</h6>
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
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	h1 {
		font-size: 25px;
		font-weight: 700;
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
</style>
