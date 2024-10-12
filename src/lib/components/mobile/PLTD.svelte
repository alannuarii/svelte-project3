<script>
	import Engine from './Engine.svelte';

	export let dg6Data;
	export let dg7Data;
</script>

<section class="my-2">
	<div class="card pt-2 rounded-5 shadow border-dark border-5">
		<h1 class="text-center">PLTD Tahuna</h1>
		<div>
			<div class="row gx-2 mx-2">
				<!-- Card Unit #6 -->
				<div class="col-6 mb-3">
					<Engine dgData={dg6Data} engine={6} />
				</div>

				<!-- Card Unit #7 -->
				<div class="col-6 mb-3">
					<Engine dgData={dg7Data} engine={7} />
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	h1 {
		font-size: 18px;
		font-weight: 700;
	}
</style>
