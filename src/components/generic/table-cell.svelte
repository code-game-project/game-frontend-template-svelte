<script lang="ts">
	export let center: boolean = false;
</script>

<div class="cell" class:center>
	<slot />
</div>

<style lang="scss" scoped>
	div.cell {
		display: flex;
		justify-content: space-between;
		padding: var(--padding);
	}

	div.center {
		justify-content: center;
	}
</style>
