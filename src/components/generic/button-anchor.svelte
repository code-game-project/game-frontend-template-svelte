<script lang="ts">
	import { link } from "svelte-routing";

	export let href: string;
</script>

<a {href} use:link>
	<slot>Click me!</slot>
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
</style>
