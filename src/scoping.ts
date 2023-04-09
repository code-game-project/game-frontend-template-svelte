/**
 * Parses the URL query for scope information. Only scopes that have a scope function will be valid.
 * @param query The query, i.e. `window.location.search`.
 * @param serverScope A function to be called if the scope is "server".
 * @param gameScope A function to be called if the scope is "game".
 * @param playerScope A function to be called if the scope is "player".
 * @param error A function to be called for errors.
 */
export async function handleScope(
	query: string,
	serverScope: () => any | null,
	gameScope: (gameId: string,) => any | null,
	playerScope: (gameId: string, playerId: string, playerSecret: string) => any | null,
	error: (error: string) => any,
): Promise<{
	scope?: string,
	gameId?: string,
	playerId?: string,
	playerSecret?: string;
}> {
	const params = new URLSearchParams(query);
	const scope = params.get('scope');
	if (!scope) {
		await error('The "scope" query parameter must be set.');
		return {};
	}

	const enabled = [];
	if (serverScope) enabled.push('"server"');
	if (gameScope) enabled.push('"game"');
	if (playerScope) enabled.push('"player"');

	if (serverScope && scope === 'server') {
		try {
			await serverScope();
		} catch (_err) {
			await error('Connection to server cannot be established.');
		}
	} else if ((gameScope && scope === 'game') || (playerScope && scope === 'player')) {
		const gameId = params.get('game_id');
		if (!gameId) {
			await error(`The ${enabled.join(' and ')} scope${enabled.length > 1 ? 's' : ''} require${enabled.length > 1 ? '' : 's'} the "game_id" query parameter to be set.`);
			return { scope };
		}

		if (scope === 'game') {
			try {
				await gameScope(gameId);
			} catch (_err) {
				await error('Unable to connect to game. You likely have the wrong game ID.');
			}
			return { scope, gameId };
		} else if (scope === 'player') {
			const playerId = params.get('player_id');
			const playerSecret = params.get('player_secret');
			if (!playerId || !playerSecret) {
				await error('The "player" scope requires the "player_id" and "player_secret" query parameters to be set.');
				return { scope, gameId };
			}

			try {
				await playerScope(gameId, playerId, playerSecret);
			} catch (_err) {
				await error("Unable to connect to player. You either don't have the correct game or player ID or the player secret you specified is incorrect.");
			}
			return { scope, gameId, playerId, playerSecret };
		}
	} else {
		await error(`Invalid scope: "${scope}". Must be one of: ${enabled.join(', ')}.`);
	}
	return { scope };
}
