<script lang="ts">
	import config from '../config';
	import {
		createDebugSocket,
		Severity,
		Verbosity,
	} from '@code-game-project/client/dist/browser';
	import Prism from 'prismjs';
	import ErrorStack from '../components/error-stack.svelte';
	import Header from '../components/header.svelte';
	import Fullscreen from '../components/fullscreen.svelte';
	import DebugLog from '../components/debug-log.svelte';
	import Footer from '../components/footer.svelte';
	import { onMount } from 'svelte';

	let errors: string[] = [];

	let present: { [K in Severity]: boolean } = {
		error: false,
		warning: false,
		info: false,
		trace: false,
	};
	let filter: { [K in Severity]: boolean } = {
		error: true,
		warning: true,
		info: true,
		trace: false,
	};
	let logs: { severity: Severity; message: string; data: string | null }[] = [];
	$: presentVisible = Object.entries(filter).some(
		([k, v]) => v && present[k as Severity]
	);
	$: allHidden = !Object.values(filter).some((v) => v);

	const addLog = (severity: Severity, message: string, data?: object) => {
		present[severity] = true;
		logs = [
			...logs,
			{
				severity: severity,
				message,
				data: data
					? Prism.highlight(
							JSON.stringify(data, null, 2),
							Prism.languages.javascript,
							'javascript'
					  )
					: null,
			},
		];
	};

	onMount(async () => {
		const gameId = new URLSearchParams(window.location.search).get('game_id');
		if (gameId) {
			try {
				const socket = createDebugSocket(config.gameURL, Verbosity.SILENT);
				socket.on(Severity.ERROR, (message, data) =>
					addLog(Severity.ERROR, message, data)
				);
				socket.on(Severity.WARNING, (message, data) =>
					addLog(Severity.WARNING, message, data)
				);
				socket.on(Severity.INFO, (message, data) =>
					addLog(Severity.INFO, message, data)
				);
				socket.on(Severity.TRACE, (message, data) =>
					addLog(Severity.TRACE, message, data)
				);
				await socket.debugGame(gameId);
			} catch (error) {
				errors = [
					...errors,
					'Unable to connect to game. You likely have the wrong game ID.',
				];
			}
		} else {
			errors = [...errors, 'Missing `game_id=` query parameter in URL.'];
		}
	});
</script>

<ErrorStack {errors} />

<Header />

<main>
	<section id="logs">
		<Fullscreen maxHeightPx={700}>
			<div id="header" slot="header">
				<h3>Debug Console</h3>
				<div id="filters">
					<div>
						<input type="checkbox" bind:checked={filter['error']} />
						<img
							src="/icons/error.svg"
							alt="Error"
							title="Add errors to filter."
							on:click={() => (filter['error'] = !filter['error'])}
						/>
					</div>
					<div>
						<input type="checkbox" bind:checked={filter['warning']} />
						<img
							src="/icons/warning.svg"
							alt="warning"
							title="Add warnings to filter."
							on:click={() => (filter['warning'] = !filter['warning'])}
						/>
					</div>
					<div>
						<input type="checkbox" bind:checked={filter['info']} />
						<img
							src="/icons/info.svg"
							alt="info"
							title="Add infos to filter."
							on:click={() => (filter['info'] = !filter['info'])}
						/>
					</div>
					<div>
						<input type="checkbox" bind:checked={filter['trace']} />
						<img
							src="/icons/trace.svg"
							alt="trace"
							title="Add traces to filter."
							on:click={() => (filter['trace'] = !filter['trace'])}
						/>
					</div>
				</div>
			</div>
			<div id="content" slot="content">
				{#if logs.length === 0}
					<p>No debug logs have arrived here yet.</p>
				{:else if allHidden}
					<p>
						All logs are hidden. Use the filters in the upper right corner to
						choose which severities are shown.
					</p>
				{:else if presentVisible}
					{#each logs as log}
						<DebugLog {...log} visible={filter[log.severity]} />
					{/each}
				{:else}
					<p>No logs match the current filters. Try adding more filters.</p>
				{/if}
			</div>
		</Fullscreen>
	</section>
</main>

<Footer />

<style lang="scss" scoped>
	section#logs {
		border: 1px solid var(--background-light);
		border-radius: var(--radius);
	}

	div#header {
		display: flex;
		justify-content: space-between;
		padding: var(--padding);
		background-color: var(--background-light);
		div#filters {
			display: flex;
			div {
				padding-left: var(--padding);
				display: flex;
				align-items: center;
				img {
					padding-left: calc(var(--padding) / 2);
				}
			}
		}
	}

	div#content > p {
		padding: var(--padding);
		text-align: center;
	}
</style>
