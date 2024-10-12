<script>
	import user from '../../img/user.png';
</script>

<div
	class="offcanvas offcanvas-top text-bg-dark"
	tabindex="-1"
	id="logout"
	aria-labelledby="offcanvasTopLabel"
>
	<div class="offcanvas-body d-flex flex-column justify-content-center align-items-center">
		<!-- svelte-ignore a11y-img-redundant-alt -->
		<div class="d-flex justify-content-center mb-3">
			<img src={user} alt="User Image" />
		</div>
		<h5 class="text-center">Admin</h5>
		<a href="/logout" class="btn btn-secondary w-50"
			><i class="bi-box-arrow-right me-2"></i>Log Out</a
		>
	</div>
</div>

<style>
	img {
		height: 70px;
	}
</style>
