<script lang="ts">
	export let mobileModeWidthPx: number;
	let containerWidth: number;
	export let mobileMode = false;
	$: mobileMode = containerWidth < mobileModeWidthPx;
</script>

<div class="container" bind:clientWidth={containerWidth}>
	<div class="table">
		{#if !mobileMode}
			<div class="head">
				<slot name="head" />
			</div>
		{/if}
		<div class="body">
			<slot/>
		</div>
	</div>
</div>

<style lang="scss" scoped>
	div.container {
		overflow-x: hidden;
		div.table {
			border: 1px solid var(--background-light);
			border-radius: var(--radius);
			div.head {
				background-color: var(--background-light);
			}
		}
	}
</style>
