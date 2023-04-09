<script lang="ts">
	import { onMount } from 'svelte';
	import { api } from '@code-game-project/client';
	import config from '../config';
	import { gameDescription, addError } from '../stores';
	import Table from '../components/generic/table.svelte';
	import TableRow from '../components/generic/table-row.svelte';
	import TableEmpty from '../components/generic/table-empty.svelte';
	import TableCell from '../components/generic/table-cell.svelte';
	import GameRow from '../components/game-row.svelte';

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

	onMount(refreshGames);
</script>

<main>
	<section>
		<h2>About</h2>
		<p>{$gameDescription}</p>
	</section>
	<section>
		<h2>Games</h2>
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
	}
</style>
