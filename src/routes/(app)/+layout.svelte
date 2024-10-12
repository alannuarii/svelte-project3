<script>
	import Header from '../../lib/components/Header.svelte';
	import HeaderMob from '../../lib/components/mobile/Header.svelte';
	import { onMount } from 'svelte';

	let freqData = [];

	const fetchData = async () => {
		try {
			const freqRes = await fetch('/api/lvsw1');

			// Check if both requests are primaryful
			if (!freqRes.ok) {
				throw new Error('Failed to fetch data');
			}

			// Parse both JSON responses
			const freq = await freqRes.json();

			// Update the weatherData and freqData arrays
			freqData = freq;
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

<svelte:head>
	<title>Dashboard PLTD Tahuna</title>
	<meta name="description" content="Dashboard PLTD Tahuna" />
</svelte:head>

<main class="desktop">
	<div class="position-relative">
		<div class="header position-absolute top-0 start-50 translate-middle-x">
			<Header {freqData} />
		</div>
		<div class="content px-5">
			<slot />
		</div>
	</div>
</main>

<main class="mobile">
	<div class="header position-absolute top-0 start-50 translate-middle-x">
		<HeaderMob />
	</div>
	<div class="content">
		<slot />
	</div>
</main>

<style>
	.desktop {
		overflow-x: hidden;
		background-image: url('../../lib/img/bg.jpg');
		background-size: cover;
	}
	.desktop .content {
		height: 100vh;
		overflow-x: hidden;
		overflow-y: auto;
		padding-top: 85px;
		/* padding-bottom: 50px; */
	}
	.desktop .header {
		width: 100%;
		z-index: 1;
	}
	.desktop {
		display: block;
	}

	.mobile {
		display: none;
	}

	/* Mobile specific */
	@media screen and (max-width: 1000px) {
		.desktop {
			display: none;
		}
		.mobile {
			display: block !important;
		}
		.mobile {
			overflow-x: hidden;
			background-image: url('../../lib/img/bg.jpg');
			background-size: cover;
		}
		.mobile .content {
			height: 100vh;
			overflow-x: hidden;
			overflow-y: auto;
			padding-top: 60px;
			/* padding-bottom: 50px; */
		}
		.mobile .header {
			width: 100%;
			z-index: 1;
		}
	}
</style>
