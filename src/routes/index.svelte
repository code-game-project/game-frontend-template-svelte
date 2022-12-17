<script lang="ts">
	import { Link } from 'svelte-routing';
	import Prism from 'prismjs';
	import { onMount } from 'svelte';
	import { getInfo, getGames, getGame } from '../api';
	import Popup from '../components/popup.svelte';
	import ErrorStack from '../components/error-stack.svelte';
	import Header from '../components/header.svelte';
	import Table from '../components/table.svelte';
	import TableRow from '../components/table-row.svelte';
	import TableEmpty from '../components/table-empty.svelte';
	import TableCell from '../components/table-cell.svelte';
	import Tooltip from '../components/tooltip.svelte';
	import ButtonIcon from '../components/button-icon.svelte';
	import Footer from '../components/footer.svelte';

	let errors: string[] = [];

	let infoVisible = false;
	let infoGameId = 'N/A';
	let infoPlayerCount: number | 'N/A' = 'N/A';
	let infoConfig = '{}';

	const showPopup = async (gameId: string) => {
		const game = await getGame({ game_id: gameId });
		if (game.ok && game.data) {
			infoVisible = true;
			infoGameId = game.data.id;
			infoPlayerCount = game.data.players;
			if (game.data.config)
				infoConfig = Prism.highlight(
					JSON.stringify(game.data.config, null, 2),
					Prism.languages.javascript,
					'javascript'
				);
		} else {
			errors = [...errors, `Unable to get details of game "${gameId}"`];
		}
	};

	let description: string = 'N/A';
	let privateGames: number | 'N/A' = 'N/A';
	let publicGames: { id: string; players: number; active: boolean }[];
	let columWidths = '65% 10% 25%';

	onMount(async () => {
		const info = await getInfo();
		if (info.ok && info.data?.description) description = info.data.description;
		const games = await getGames();
		if (games.ok && games.data) {
			privateGames = games.data.private;
			publicGames = games.data.public.map(({ id, players }) => ({
				id,
				players,
				active: false,
			}));
		} else if (games.networkError) {
			errors = [...errors, 'A network error occurred.'];
		}
	});
</script>

<Popup bind:visible={infoVisible} title="Game Info">
	<div>
		<label for="info-game-id">Game ID:</label>
		<span id="info-game-id" class="mono">{infoGameId}</span>
	</div>
	<div>
		<label for="info-player-count">Players:</label>
		<span id="info-player-count">{infoPlayerCount}</span>
	</div>
	<div>
		<label for="info-config">Config:</label>
		<pre>
			<code id="info-config">{@html infoConfig}</code>
		</pre>
	</div>
</Popup>

<ErrorStack {errors} />

<Header />

<main>
	<section>
		<h2>About</h2>
		<p>{description}</p>
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
				<TableRow {columWidths}>
					<TableCell>Game ID</TableCell>
					<TableCell>Players</TableCell>
					<TableCell>Actions</TableCell>
				</TableRow>
			</div>
			<div slot="body">
				{#if publicGames?.length > 0}
					{#each publicGames as { id, players, active }}
						<TableRow {columWidths}>
							<TableCell>
								<span class="mono game-id">{id}</span>
								<Tooltip tipText="Copied!" tipWidthPx={80} {active}>
									<ButtonIcon
										on:click={() => {
											navigator.clipboard.writeText(id);
											active = true;
											setTimeout(() => (active = false), 2500);
										}}
									>
										{#if active}
											<img src="/icons/check.svg" alt="check" />
										{:else}
											<img src="/icons/copy.svg" alt="copy" />
										{/if}
									</ButtonIcon>
								</Tooltip>
							</TableCell>
							<TableCell>{players}</TableCell>
							<TableCell>
								<div style="overflow-wrap: normal;">
									<Link to="spectate?game_id={id}">Spectate</Link>,&nbsp;
									<Link to="debug?game_id={id}">Debug</Link>,&nbsp;
									<a href="#null" on:click|preventDefault={() => showPopup(id)}
										>Details</a
									>
								</div>
							</TableCell>
						</TableRow>
					{/each}
				{:else}
					<TableEmpty>There are no public games at the moment.</TableEmpty>
				{/if}
			</div>
		</Table>
	</section>
</main>

<Footer />

<style lang="scss" scoped>
	h2 {
		margin-top: var(--padding);
	}

	span.game-id {
		padding-right: var(--padding);
	}

	pre {
		display: contents;
	}
</style>
