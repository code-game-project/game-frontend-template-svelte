<script lang="ts">
	export let columWidths: string;
</script>

<div class="row" style="grid-template-columns: {columWidths};">
	<slot />
</div>

<style lang="scss" scoped>
	div.row {
		display: grid;
	}
</style>
