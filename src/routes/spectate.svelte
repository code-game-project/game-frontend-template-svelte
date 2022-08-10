<script lang="ts">
	import config from '../config';
	import { createSocket } from '@code-game-project/client/dist/browser';
	import ErrorStack from '../components/error-stack.svelte';
	import Header from '../components/header.svelte';
	import Fullscreen from '../components/fullscreen.svelte';
	import Table from '../components/table.svelte';
	import TableRow from '../components/table-row.svelte';
	import TableEmpty from '../components/table-empty.svelte';
	import TableCell from '../components/table-cell.svelte';
	import Footer from '../components/footer.svelte';
	import { onMount } from 'svelte';

	let errors: string[] = [];
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;
	let isFullscreen: boolean;
	let canvasContainerWidth: number;
	let width = 300;
	let height = (width / 16) * 9;

	const resize = () => {
		width = isFullscreen ? window.screen.availWidth : canvasContainerWidth;
		height = isFullscreen ? window.screen.availHeight : (width / 16) * 9;
		// give the canvas time to resize, which has the side effect of clearing before redrawing
		setTimeout(draw, 0);
	};

	let dt = 0;
	const draw = () => {
		if (ctx) {
			dt += 0.002 % 1;

			const cx = width / 2;
			const cy = height / 2;
			const w = 200;
			const h = 200;
			const x = -w / 2;
			const y = -h / 2;
			const deg = dt * 360;

			ctx.save();
			ctx.clearRect(0, 0, width, height);
			ctx.translate(cx, cy);
			ctx.rotate((deg * Math.PI) / 180);
			ctx.fillStyle = '#37ff00';
			ctx.fillRect(x, y, w, h);
			ctx.restore();
		}
	};

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
		ctx = canvas.getContext('2d');
		resize();
		setInterval(draw, 1000 / 30);
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
	<section bind:clientWidth={canvasContainerWidth}>
		<Fullscreen bind:isFullscreen on:fullscreenChange={resize}>
			<canvas slot="content" bind:this={canvas} {width} {height} />
		</Fullscreen>
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
		width: 100%;
		background-color: hsl(208, 100%, 50%);
	}
</style>
