<div class="page__container">
	<div>
		<span><a href="/">Hand Crafted</a></span>
		<span><a href="/reports/">Reports</a></span>
		<span><a href="/tables/">Table</a></span>
	</div>
	<slot />
</div>

<style lang="scss">
	.page {
		&__container {
			display: flex;
			flex-direction: column;

			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
		}
	}
</style>
