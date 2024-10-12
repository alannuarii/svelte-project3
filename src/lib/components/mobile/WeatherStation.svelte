<script>
	export let airTemp = 0;
	export let exTemp = 0;
	export let humidity = 0;
	export let windDirect = 0;
	export let windSpeed = 0;
</script>

<div class="d-flex justify-content-evenly mx-3 my-3">
	<div class="d-flex flex-column justify-content-center align-items-center">
		<i class="bi-thermometer-sun"></i>
		<h6>{airTemp.toFixed(2)} °C</h6>
	</div>
	<div class="d-flex flex-column justify-content-center align-items-center">
		<i class="bi-thermometer-half"></i>
		<h6>{exTemp.toFixed(2)} °C</h6>
	</div>
	<div class="d-flex flex-column justify-content-center align-items-center">
		<i class="bi-droplet-half"></i>
		<h6>{humidity.toFixed(2)} %</h6>
	</div>
	<div class="d-flex flex-column justify-content-center align-items-center">
		<i class="bi-arrows-move"></i>
		<h6>{windDirect.toFixed(2)} °</h6>
	</div>
	<div class="d-flex flex-column justify-content-center align-items-center">
		<i class="bi-wind"></i>
		<h6>{windSpeed.toFixed(2)} m/s</h6>
	</div>
	<!-- <p>Air Temperature: {airTemp} °C</p>
	<p>External Temperature: {exTemp} °C</p>
	<p>Humidity: {humidity} %</p>
	<p>Wind Direction: {windDirect} °</p>
	<p>Wind Speed: {windSpeed} m/s</p> -->
</div>

<style>
	h6 {
		font-size: 8px;
		margin: 0px;
	}
	i {
		font-size: 13px;
	}
</style>
