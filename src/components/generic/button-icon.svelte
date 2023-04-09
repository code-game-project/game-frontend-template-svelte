<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let title: string | null = null;
</script>

<button title={title || ''} on:click|stopPropagation={() => dispatch('click')}>
	<slot>Click me!</slot>
</button>

<style lang="scss" scoped>
	button {
		background: none;
		border: none;
		margin: 0;
		padding: 0;
		cursor: pointer;
	}
</style>
