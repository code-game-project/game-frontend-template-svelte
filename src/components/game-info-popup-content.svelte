<script lang="ts">
	import { onMount } from 'svelte';
	import Prism from 'prismjs';
	import { api } from '@code-game-project/client';
	import config from '../config';
	import { addError } from '../stores';

	export let id: string;
	let playerCount: number;
	let _protected: boolean;
	let gameConfig: string;

	onMount(async () => {
		const game = await api.getGameMetadata(
			window.fetch,
			{ game_id: id },
			config.gameURL
		);
		if (game.ok && game.data) {
			playerCount = game.data.players;
			_protected = game.data.protected || false;
			if (game.data.config)
				gameConfig = Prism.highlight(
					JSON.stringify(game.data.config, null, 2),
					Prism.languages.javascript,
					'javascript'
				);
		} else {
			addError(`Unable to get details of game "${id}"`);
		}
	});
</script>

<div>
	<label for="info-game-id">Game ID:</label>
	<span id="info-game-id" class="mono">{id}</span>
</div>
<div>
	<label for="info-player-count">Players:</label>
	<span id="info-player-count">{playerCount}</span>
</div>
<div>
	<label for="info-player-count">Protected:</label>
	<span id="info-player-count">{_protected}</span>
</div>
<div>
	<label for="info-config">Config:</label>
	<pre>
			<code id="info-config">{@html gameConfig}</code>
		</pre>
</div>

<style lang="scss" scoped>
	pre {
		display: contents;
	}

	div {
		text-align: left;
	}
</style>
