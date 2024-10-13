<script>
	import Frequency from './Frequency.svelte';
	import Pltd from './PLTD.svelte';
	import Plts from './PLTS.svelte';

	export let dg6Data;
	export let dg7Data;
	export let weatherData;
	export let lvsw1Data;
	export let lvsw2Data;
	export let it1Data;
	export let it2Data;
</script>

<div class="container-fluid">
	<div>
		<Frequency freqData={lvsw1Data} />
	</div>
	<div>
		<Pltd {dg6Data} {dg7Data} />
	</div>
	<div><Plts {lvsw1Data} {lvsw2Data} {weatherData} {it1Data} {it2Data} /></div>
</div>

