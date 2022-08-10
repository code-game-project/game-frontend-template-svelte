<script lang="ts">
	import type { Severity } from '@code-game-project/client/dist/browser';

	export let visible: boolean;
	export let severity: Severity;
	export let message: string;
	export let data: string | null;
</script>

{#if visible}
<div class="log">
	<div class="left">
		<img
			class="severity"
			src="/icons/{severity}.svg"
			alt={severity.toUpperCase()}
		/>
	</div>
	<div class="right">
		<div>{message}</div>
		{#if data}
			<pre>
        <code>{@html data}</code>
      </pre>
		{/if}
	</div>
</div>
{/if}

<style lang="scss" scoped>
	@import 'prismjs/themes/prism-tomorrow.css';

	div.log {
		padding: var(--padding);
		border-bottom: 1px solid var(--background-light);
		display: flex;
		div.left {
			img.severity {
				margin-right: var(--padding);
			}
		}
		div.right {
      display: flex;
      flex-direction: column;
			pre {
				display: contents;
			}
		}
	}
</style>
