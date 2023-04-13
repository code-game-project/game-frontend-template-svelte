<script lang="ts">
	import Prism from 'prismjs';
	import type { Severity } from '@code-game-project/client/dist/browser';
	import error from '../icons/error.svg';
	import warning from '../icons/warning.svg';
	import info from '../icons/info.svg';
	import trace from '../icons/trace.svg';
	import arrowRight from '../icons/arrow-right.svg';

	const severityIcons: { [key in Severity]: string } = {
		error,
		warning,
		info,
		trace,
	};

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
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="top" on:click={() => (unfolded = !unfolded)}>
			<img src={severityIcons[severity]} alt={severity.toUpperCase()} />
			<div>
				<div>
					<span class="mono">[{timeReceived}]</span>
					{#if stackCount > 1}
						<span>({stackCount}x)</span>
					{/if}
					<span>{message}</span>
				</div>
				{#if formattedData}
					<img src={arrowRight} alt="arrow" class:unfolded title="Show more" />
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
