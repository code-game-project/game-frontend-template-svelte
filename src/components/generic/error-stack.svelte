<script lang="ts">
	import { errors, dismissError } from '../../stores';
	import ErrorBar from './error-bar.svelte';
</script>

<div>
	{#each $errors as message, index}
		<ErrorBar {message} on:dismiss={() => dismissError(index)} />
	{/each}
</div>
