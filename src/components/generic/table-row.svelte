<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let mobileMode: boolean;
	export let columnWidths: string;
	export let clickable: boolean = false;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	on:click={() => dispatch('click')}
	class="row"
	class:clickable
	class:mobileMode
	style="grid-template-columns: {columnWidths};"
>
	<slot />
</div>

<style lang="scss" scoped>
	div.row {
		display: grid;
	}

	div.mobileMode {
		display: flex;
		flex-direction: column;
	}

	div.clickable {
		cursor: pointer;
	}
</style>
