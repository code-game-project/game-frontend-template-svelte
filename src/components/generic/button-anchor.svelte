<script lang="ts">
	import { link } from 'svelte-routing';

	export let href: string;
</script>

<a {href} use:link class:withIcon={$$slots.icon}>
	{#if $$slots.icon}
		<div id="icon">
			<slot name="icon" />
		</div>
	{/if}
	<div id="default">
		<slot>Click me!</slot>
	</div>
</a>

<style lang="scss" scoped>
	a {
		height: 48px;
		background-color: var(--primary);
		color: var(--text);
		padding: var(--padding);
		border: none;
		border-radius: var(--radius);
		text-align: center;
		cursor: pointer;
	}

	a.withIcon {
		display: flex;
		justify-content: space-between;
		align-items: center;
		> #icon {
			padding-right: var(--half-padding);
			flex-shrink: 0;
		}
	}
</style>
