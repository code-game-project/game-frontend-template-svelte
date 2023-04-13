<script lang="ts">
	import ButtonIcon from './button-icon.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import trash from '../../icons/trash.svg';

	export let message: string;
</script>

<div class="error">
	<div class="error-container">
		<div>{message}</div>
		<ButtonIcon on:click={() => dispatch('dismiss')}
			><img src={trash} alt="dismiss" /></ButtonIcon
		>
	</div>
</div>

<style lang="scss" scoped>
	div.error {
		background-color: hsl(0, 80%, 50%);
		padding: var(--padding);
		div.error-container {
			max-width: 1300px;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
		}
	}
</style>
