<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>

<button on:click={(event) => dispatch('click', { ctrl: event.ctrlKey })}>
	<slot />
</button>

<style lang="scss">
	button {
		all: unset;
		color: var(--primary-light);
		cursor: pointer;
	}
</style>
