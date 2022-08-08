<script lang="ts">
	export let minWidthPx: number;
</script>

<div class="container">
	<div class="table" style="min-width: {minWidthPx}px;">
		<div class="head">
			<slot name="head" />
		</div>
		<div class="body">
			<slot name="body" />
		</div>
	</div>
</div>

<style lang="scss" scoped>
	div.container {
		overflow-x: auto;
		div.table {
			margin-top: var(--padding);
			border: 1px solid var(--background-light);
			border-radius: var(--radius);
			div.head {
				background-color: var(--background-light);
			}
		}
	}
</style>
