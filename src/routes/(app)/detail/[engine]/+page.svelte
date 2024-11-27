<script>
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import Frequency from "../../../../lib/components/mobile/Frequency.svelte";
	import Engine from "../../../../lib/components/Engine.svelte";
  
	let dg6Data = [];
	let dg7Data = [];
	let lvsw1Data = [];
	let error = null;
	let engine = $page.params.engine;
  
	const fetchData = async () => {
	  try {
		// Fetch data from both APIs
		const dg6Res = await fetch("/api/dg6");
		const dg7Res = await fetch("/api/dg7");
		const lvsw1Res = await fetch("/api/lvsw1");
  
		// Check if both requests are primaryful
		if (!dg6Res.ok || !dg7Res.ok || !lvsw1Res.ok) {
		  throw new Error("Failed to fetch data");
		}
  
		// Parse both JSON responses
		const dg6 = await dg6Res.json();
		const dg7 = await dg7Res.json();
		const lvsw1 = await lvsw1Res.json();
  
		// Update the weatherData and dg7Data arrays
		dg6Data = dg6;
		dg7Data = dg7;
		lvsw1Data = lvsw1;
	  } catch (err) {
		error = err.message;
	  }
	};
  
	onMount(() => {
	  fetchData();
  
	  const interval = setInterval(fetchData, 5000);
  
	  return () => clearInterval(interval);
	});
  </script>
  
  <section class="mobile">
	{#if error}
	  <p>Error: {error}</p>
	{:else}
	  <div class="container-fluid">
		<div>
		  <Frequency freqData={lvsw1Data} />
		</div>
		<section class="my-2">
		  {#if engine === "unit6"}
			<Engine dgData={dg6Data} engine={6} />
		  {:else}
			<Engine dgData={dg7Data} engine={7} />
		  {/if}
		</section>
	  </div>
	{/if}
  </section>
  