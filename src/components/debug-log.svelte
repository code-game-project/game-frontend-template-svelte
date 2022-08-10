<script lang="ts">
	import type { Severity } from '@code-game-project/client/dist/browser';

	export let visible: boolean;
	export let severity: Severity;
	export let message: string;
	export let data: string | null;
	let unfolded = false;
</script>

{#if visible}
	<div class="log">
		<div class="top" on:click={() => (unfolded = !unfolded)}>
			<img src="/icons/{severity}.svg" alt={severity.toUpperCase()} />
			<div>
				<span>{message}</span>
				<img src="/icons/arrow-right.svg" alt="arrow" class:unfolded />
			</div>
		</div>
		{#if data && unfolded}
			<div class="bottom">
				<div />
				<pre><code>{@html data}</code></pre>
			</div>
		{/if}
	</div>
{/if}

<style lang="scss" scoped>
	@import 'prismjs/themes/prism-tomorrow.css';

	div.log {
		border-bottom: 1px solid var(--background-light);
		div.top,
		div.bottom {
			display: grid;
			grid-template-columns: 24px auto;
			gap: var(--padding);
			padding: var(--padding);
		}
		div.top {
			align-items: center;
		}
		div.top:hover {
			cursor: pointer;
			background-color: var(--background-light);
		}
		div.top > div {
			display: flex;
			justify-content: space-between;
			align-items: center;
			img {
				transition: var(--transition-time);
			}
			img.unfolded {
				transform: rotate(90deg);
			}
		}
		div.bottom {
			padding-top: 0;
		}
	}
</style>
