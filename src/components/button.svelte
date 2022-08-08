<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>

<button on:click={() => dispatch('click')}>
	<slot>Click me!</slot>
</button>

<style lang="scss" scoped>
	button {
		height: 48px;
		background-color: var(--primary);
		color: var(--text);
		padding: var(--padding);
		border: none;
		border-radius: var(--radius);
		text-align: center;
		cursor: pointer;
	}
</style>
