<script lang="ts">
	import { onMount, beforeUpdate, afterUpdate } from 'svelte';
	import {
		createDebugSocket,
		Severity,
		Verbosity,
	} from '@code-game-project/client/dist/browser';
	import config from '../config';
	import { handleScope } from '../scoping';
	import Fullscreen from '../components/generic/fullscreen.svelte';
	import DebugLog from '../components/debug-log.svelte';
	import ButtonIcon from '../components/generic/button-icon.svelte';

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
	let logs: {
		severity: Severity;
		timeReceived: string;
		stackCount: number;
		message: string;
		data: object | undefined;
	}[] = [];
	$: presentVisible = Object.entries(filter).some(
		([k, v]) => v && present[k as Severity]
	);
	$: allHidden = !Object.values(filter).some((v) => v);

	function formatTime(date: Date) {
		const formatSegment = (number: number) => {
			let numberAsString = number.toString();
			return numberAsString.length === 2
				? numberAsString
				: '0' + numberAsString;
		};
		return (
			formatSegment(date.getHours()) +
			':' +
			formatSegment(date.getMinutes()) +
			':' +
			formatSegment(date.getSeconds())
		);
	}

	const addLog = (severity: Severity, message: string, data?: object) => {
		const now = formatTime(new Date(Date.now()));
		present[severity] = true;
		const last = logs[logs.length - 1];
		if (
			last &&
			last.severity === severity &&
			last.message === message &&
			typeof last.data === typeof data
		) {
			last.timeReceived = now;
			last.stackCount += 1;
			last.data = data;
			logs = logs;
		} else {
			logs = [
				...logs,
				{ severity, timeReceived: now, stackCount: 1, message, data },
			];
		}
	};

	const setupDebugSocket = () => {
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
		return socket;
	};

	onMount(() => {
		handleScope(
			window.location.search,
			async () => await setupDebugSocket().debugServer(),
			async (gameId) => await setupDebugSocket().debugGame(gameId),
			async (gameId, playerId, playerSecret) =>
				await setupDebugSocket().debugPlayer(gameId, playerId, playerSecret)
		);
	});

	let contentDiv: HTMLDivElement;
	let autoscroll: boolean = false;
	beforeUpdate(() => {
		autoscroll =
			contentDiv &&
			contentDiv.offsetHeight + contentDiv.scrollTop >
				contentDiv.scrollHeight - 20;
	});
	afterUpdate(() => {
		if (autoscroll) scrollToBottom();
	});
	const scrollToBottom = () => contentDiv.scrollTo(0, contentDiv.scrollHeight);
</script>

<section id="logs">
	<Fullscreen height={700} on:fullscreenChange={scrollToBottom}>
		<div id="header" slot="header">
			<h3>Debug Console</h3>
			<div id="filters">
				<div>
					<input type="checkbox" bind:checked={filter['error']} />
					<ButtonIcon on:click={() => (filter['error'] = !filter['error'])}>
						<img
							src="/icons/error.svg"
							alt="Error"
							title="Add errors to filter."
						/>
					</ButtonIcon>
				</div>
				<div>
					<input type="checkbox" bind:checked={filter['warning']} />
					<ButtonIcon on:click={() => (filter['warning'] = !filter['warning'])}>
						<img
							src="/icons/warning.svg"
							alt="warning"
							title="Add warnings to filter."
						/>
					</ButtonIcon>
				</div>
				<div>
					<input type="checkbox" bind:checked={filter['info']} />
					<ButtonIcon on:click={() => (filter['info'] = !filter['info'])}>
						<img
							src="/icons/info.svg"
							alt="info"
							title="Add infos to filter."
						/>
					</ButtonIcon>
				</div>
				<div>
					<input type="checkbox" bind:checked={filter['trace']} />
					<ButtonIcon on:click={() => (filter['trace'] = !filter['trace'])}>
						<img
							src="/icons/trace.svg"
							alt="trace"
							title="Add traces to filter."
						/>
					</ButtonIcon>
				</div>
			</div>
		</div>
		<div id="content" slot="content" bind:this={contentDiv}>
			{#if logs.length === 0}
				<p>No debug logs have arrived here yet.</p>
			{:else if allHidden}
				<p>
					All logs are hidden. Use the filters in the upper right corner to
					choose which severities are shown.
				</p>
			{:else if presentVisible}
				{#each logs as log, i (i)}
					<div>
						<DebugLog {...log} visible={filter[log.severity]} />
					</div>
				{/each}
			{:else}
				<p>No logs match the current filters. Try adding more filters.</p>
			{/if}
		</div>
	</Fullscreen>
</section>

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
				margin-left: var(--padding);
				display: flex;
				align-items: center;
				img {
					margin-left: var(--half-padding);
				}
			}
		}
	}

	div#content {
		overflow-y: scroll;
		height: 100%;
		> p {
			padding: var(--padding);
			text-align: center;
		}
	}
</style>
