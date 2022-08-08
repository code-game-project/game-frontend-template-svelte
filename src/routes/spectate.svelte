<script lang="ts">
	import config from '../config';
	import { createSocket } from '@code-game-project/client/dist/browser';
	import ErrorStack from '../components/error-stack.svelte';
	import Header from '../components/header.svelte';
	import Table from '../components/table.svelte';
	import TableRow from '../components/table-row.svelte';
	import TableEmpty from '../components/table-empty.svelte';
	import TableCell from '../components/table-cell.svelte';
	import Footer from '../components/footer.svelte';
	import { onMount } from 'svelte';

	let errors: string[] = [];
	let canvas: HTMLCanvasElement;
	let columWidths = '80% 20%';
	let finishers: { name: string; score: number }[] = [
		{
			name: 'Alice',
			score: 100,
		},
		{
			name: 'Bob',
			score: 90,
		},
	];

	// always remember to reassign when updating arrays in svelte
	finishers = [
		...finishers,
		{
			name: 'Charlie',
			score: 20,
		},
	];

	onMount(async () => {
		const ctx = canvas.getContext('2d');
		if (ctx) {
			ctx.fillStyle = '#37ff00';
			ctx.fillRect(10, 10, 60, 40);
		}
		const gameId = new URLSearchParams(window.location.search).get('game_id');
		if (gameId) {
			try {
				const socket = createSocket(config.gameURL);
				// TODO: register event listeners here
				await socket.spectate(gameId);
				// TODO: work with the socket here
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
	<section>
		<p>
			This page features an example score board as well as a canvas with a blue
			background color and a green square on it. These are just examples of
			elements you can use to create a way to view whats happening in your game.
		</p>
	</section>
	<section>
		<canvas bind:this={canvas} />
	</section>
	<section>
		<Table minWidthPx={300}>
			<div slot="head">
				<TableRow {columWidths}>
					<TableCell>Name</TableCell>
					<TableCell>Score</TableCell>
				</TableRow>
			</div>
			<div slot="body">
				{#if finishers.length > 0}
					{#each finishers as { name, score }}
						<TableRow {columWidths}>
							<TableCell>{name}</TableCell>
							<TableCell>{score}</TableCell>
						</TableRow>
					{/each}
				{:else}
					<TableEmpty>No one has finished yet.</TableEmpty>
				{/if}
			</div>
		</Table>
	</section>
</main>

<Footer />

<style lang="scss" scoped>
	canvas {
		background-color: hsl(208, 100%, 50%);
	}
</style>
