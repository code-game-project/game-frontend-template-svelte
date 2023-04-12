<script lang="ts">
	import { onMount } from 'svelte';
	import { createSocket } from '@code-game-project/client';
	import config from '../config';
	import { handleScope } from '../scoping';
	import Fullscreen from '../components/generic/fullscreen.svelte';
	import Table from '../components/generic/table.svelte';
	import TableRow from '../components/generic/table-row.svelte';
	import TableEmpty from '../components/generic/table-empty.svelte';
	import TableCell from '../components/generic/table-cell.svelte';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;
	let isFullscreen: boolean;
	let canvasContainerWidth: number;
	let width = 300;
	let height = (width / 16) * 9;

	const resize = () => {
		width = isFullscreen ? window.screen.availWidth : canvasContainerWidth;
		height = isFullscreen ? window.screen.availHeight : (width / 16) * 9;
		// let the canvas resize first, which has the side effect of clearing, before redrawing
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

	let columnWidths = '80% 20%';
	// TODO: remove the example data
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
		const socket = createSocket(config.gameURL);
		await handleScope(
			window.location.search,
			null,
			async (gameId) => await socket.spectate(gameId),
			async (gameId, playerId, playerSecret) =>
				await socket.connect(gameId, playerId, playerSecret)
		);
	});
</script>

<section>
	<p>
		This page features an example score board as well as a canvas with a blue
		background color and a green square on it. These are just examples of
		elements you can use to create a way to view what's happening in your game.
	</p>
</section>
<section id="view" bind:clientWidth={canvasContainerWidth}>
	<Fullscreen height={700} bind:isFullscreen on:fullscreenChange={resize}>
		<canvas slot="content" bind:this={canvas} {width} {height} />
	</Fullscreen>
</section>
<section>
	<Table mobileModeWidthPx={300}>
		<div slot="head">
			<TableRow {columnWidths}>
				<TableCell>Name</TableCell>
				<TableCell>Score</TableCell>
			</TableRow>
		</div>
		<div slot="body">
			{#if finishers.length > 0}
				{#each finishers as { name, score }}
					<TableRow {columnWidths}>
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

<style lang="scss" scoped>
	section#view {
		border: 1px solid var(--background-light);
		border-radius: var(--radius);
		overflow: hidden;
	}

	canvas {
		width: 100%;
		background-color: hsl(208, 100%, 50%);
	}
</style>
