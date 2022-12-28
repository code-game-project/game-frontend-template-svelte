<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let sizePx: string;
</script>

<button
	style="width: {sizePx}px; height: {sizePx}px;"
	on:click={() => dispatch('click')}
>
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
