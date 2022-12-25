<script lang="ts">
	import Tooltip from './tooltip.svelte';
  import ButtonIcon from './button-icon.svelte';

  export let text: string | undefined;
  let textInternal = text || 'N/A';
  let active = false;
</script>

<Tooltip tipText="Copied!" tipWidthPx={80} {active}>
	<ButtonIcon on:click={() => {
		navigator.clipboard.writeText(textInternal);
		active = true;
		setTimeout(() => (active = false), 2500);
	}}>
		{#if active}
			<img src="/icons/check.svg" alt="check" />
		{:else}
			<img src="/icons/copy.svg" alt="copy" />
		{/if}
	</ButtonIcon>
</Tooltip>
