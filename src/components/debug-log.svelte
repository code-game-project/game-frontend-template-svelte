<script lang="ts">
	import Prism from 'prismjs';
	import type { Severity } from '@code-game-project/client/dist/browser';

	export let visible: boolean;
	export let severity: Severity;
	export let timeReceived: string;
	export let stackCount: number;
	export let message: string;
	export let data: object | undefined;

	$: formattedData = data
		? Prism.highlight(
				JSON.stringify(data, null, 2),
				Prism.languages.javascript,
				'javascript'
		  )
		: null;
	let unfolded = false;
</script>

{#if visible}
	<div class="log">
		<div class="top" on:click={() => (unfolded = !unfolded)}>
			<img src="/icons/{severity}.svg" alt={severity.toUpperCase()} />
			<div>
				<div>
					<span class="mono">[{timeReceived}]</span>
					{#if stackCount > 1}
						<span>({stackCount}x)</span>
					{/if}
					<span>{message}</span>
				</div>
				{#if formattedData}
					<img
						src="/icons/arrow-right.svg"
						alt="arrow"
						class:unfolded
						title="Show more"
					/>
				{/if}
			</div>
		</div>
		{#if formattedData && unfolded}
			<div class="bottom">
				<div />
				<pre><code class="mono">{@html formattedData}</code></pre>
			</div>
		{/if}
	</div>
{/if}

<style lang="scss" scoped>
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
