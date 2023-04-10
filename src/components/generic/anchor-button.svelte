<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>

<button on:click={() => dispatch('click')}>
	<slot />
</button>

<style lang="scss">
  button {
    all: unset;
    color: var(--primary-light);
    cursor: pointer;
  }
</style>
