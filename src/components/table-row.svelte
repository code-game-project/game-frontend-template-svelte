<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let columWidths: string;
	export let pointer: boolean = false;
</script>

<div
	on:click={() => dispatch('click')}
	class="row"
	class:pointer
	style="grid-template-columns: {columWidths};"
>
	<slot />
</div>

<style lang="scss" scoped>
	div.row {
		display: grid;
	}

	div.pointer {
		cursor: pointer;
	}
</style>

