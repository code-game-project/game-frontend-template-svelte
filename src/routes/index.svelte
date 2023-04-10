<script lang="ts">
	import { onMount } from 'svelte';
	import {} from 'svelte/animate';
	import { api } from '@code-game-project/client';
	import config from '../config';
	import { gameDescription, addError } from '../stores';
	import ButtonIcon from '../components/generic/button-icon.svelte';
	import Table from '../components/generic/table.svelte';
	import TableRow from '../components/generic/table-row.svelte';
	import TableEmpty from '../components/generic/table-empty.svelte';
	import TableCell from '../components/generic/table-cell.svelte';
	import GameRow from '../components/game-row.svelte';
	import { scopeStore } from '../scoping';

	let privateGames: number | 'N/A' = 'N/A';
	let publicGames: { id: string; players: number }[];
	const columnWidths = '65% 10% 25%';

	const refreshGames = async () => {
		const games = await api.getGames(window.fetch, config.gameURL);
		if (games.ok && games.data) {
			privateGames = games.data.private;
			publicGames = games.data.public;
		} else if (games.networkError) {
			addError('A network error occurred.');
		}
	};

	let rotating = false;
	const rotate = () => {
		if (!rotating) {
			rotating = true;
			setTimeout(() => (rotating = false), 1000);
		}
	};

	scopeStore.set('server');

	onMount(refreshGames);
</script>

<main>
	<section>
		<h2>About</h2>
		<p>{$gameDescription}</p>
	</section>
	<section>
		<h2>
			<span>Games</span>
			<ButtonIcon
				title={'refresh'}
				on:click={() => {
					refreshGames();
					rotate();
				}}
				><img
					src="/icons/refresh.svg"
					alt="refresh"
					class:rotating
				/></ButtonIcon
			>
		</h2>
		<p>Private games: {privateGames}</p>
		<p>
			Public games: {typeof publicGames === 'undefined'
				? 'N/A'
				: publicGames.length}
		</p>
		<Table minWidthPx={600}>
			<div slot="head">
				<TableRow {columnWidths}>
					<TableCell>Game ID</TableCell>
					<TableCell>Players</TableCell>
					<TableCell>Actions</TableCell>
				</TableRow>
			</div>
			<div slot="body">
				{#if publicGames?.length > 0}
					{#each publicGames as { id, players }}
						<GameRow {id} {players} {columnWidths} />
					{/each}
				{:else}
					<TableEmpty>There are no public games at the moment.</TableEmpty>
				{/if}
			</div>
		</Table>
	</section>
</main>

<style lang="scss" scoped>
	h2 {
		margin-top: var(--padding);
		display: flex;
		gap: var(--half-padding);
		img {
			transform: rotate(0deg);
			transition: all 0s;
		}
		img.rotating {
			transform: rotate(360deg);
			transition: all 1s;
			animation-timing-function: cubic-bezier(1, 0, 0.5, 1);
		}
	}
</style>
