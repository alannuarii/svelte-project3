<script>
	import Header from '../../lib/components/Header.svelte';
	import HeaderMob from '../../lib/components/mobile/Header.svelte';
	import { onMount } from 'svelte';
	import LogOut from '../../lib/components/mobile/LogOut.svelte';

	let lvsw1Data = [];

	const fetchData = async () => {
		try {
			// Fetch data from both APIs
			const lvsw1Res = await fetch('/api/lvsw1');

			// Check if both requests are primaryful
			if (!lvsw1Res.ok) {
				throw new Error('Failed to fetch data');
			}

			// Parse both JSON responses
			const lvsw1 = await lvsw1Res.json();

			// Update the weatherData and dg7Data arrays
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

<svelte:head>
	<title>Dashboard PLTD Tahuna</title>
	<meta name="description" content="Dashboard PLTD Tahuna" />
</svelte:head>

<main class="desktop">
	<div class="position-relative">
		<div class="header position-absolute top-0 start-50 translate-middle-x">
			<Header freqData={lvsw1Data} />
		</div>
		<div class="content px-0">
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
	<LogOut />
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
