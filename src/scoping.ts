import { get, writable, type Writable } from "svelte/store";
import { addError } from "./stores";

type ScopeDetails = {
	scope?: Scope;
	gameId?: string;
	playerId?: string;
	playerSecret?: string;
};
type Scope = 'server' | 'game' | 'player';

const scopeKey = 'scoping.scope';
let savedScope = window.localStorage.getItem(scopeKey);
if (savedScope !== 'server' && savedScope !== 'game' && savedScope !== 'player') savedScope = null;
export const scopeStore: Writable<Scope> = writable(savedScope as Scope || 'server');
scopeStore.subscribe((value) => window.localStorage.setItem(scopeKey, value));

const gameIdKey = 'scoping.gameId';
export const gameIdStore: Writable<string> = writable(window.localStorage.getItem(gameIdKey));
gameIdStore.subscribe((value) => window.localStorage.setItem(gameIdKey, value));

const playerIdKey = 'scoping.playerId';
const playerIdStore: Writable<string> = writable(window.localStorage.getItem(playerIdKey));
playerIdStore.subscribe((value) => window.localStorage.setItem(playerIdKey, value));

const playerSecretKey = 'scoping.playerSecret';
const playerSecretStore: Writable<string> = writable(window.localStorage.getItem(playerSecretKey));
playerSecretStore.subscribe((value) => window.localStorage.setItem(playerSecretKey, value));

/**
 * Parses the URL query for scope information and saves it in svelte
 * stores and local storage for later use.
 * Only scopes that have a scope function will be valid.
 * @param query The query, i.e. `window.location.search`.
 * @param serverScope A function to be called if the scope is "server".
 * @param gameScope A function to be called if the scope is "game".
 * @param playerScope A function to be called if the scope is "player".
 * @returns Scope details.
 */
export async function handleScope(
	query: string,
	serverScope: () => any | null,
	gameScope: (gameId: string,) => any | null,
	playerScope: (gameId: string, playerId: string, playerSecret: string) => any | null,
): Promise<ScopeDetails> {
	const params = new URLSearchParams(query);
	const scope = params.get('scope') || get(scopeStore);
	if (!scope) {
		addError('The "scope" query parameter must be set.');
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
			addError('Connection to server cannot be established.');
		}
		return { scope };
	} else if ((gameScope && scope === 'game') || (playerScope && scope === 'player')) {
		const gameId = params.get('game_id') || get(gameIdStore);
		if (!gameId) {
			addError(`The ${enabled.join(' and ')} scope${enabled.length > 1 ? 's' : ''} require${enabled.length > 1 ? '' : 's'} the "game_id" query parameter to be set.`);
			return { scope };
		}

		if (scope === 'game') {
			try {
				await gameScope(gameId);
			} catch (_err) {
				addError('Unable to connect to game. You likely have the wrong game ID.');
			}
			return { scope, gameId };
		} else if (scope === 'player') {
			const playerId = params.get('player_id') || get(playerIdStore);
			const playerSecret = params.get('player_secret') || get(playerSecretStore);
			if (!playerId || !playerSecret) {
				addError('The "player" scope requires the "player_id" and "player_secret" query parameters to be set.');
				return { scope, gameId };
			}

			try {
				await playerScope(gameId, playerId, playerSecret);
			} catch (_err) {
				addError("Unable to connect to player. You either don't have the correct game or player ID or the player secret you specified is incorrect.");
			}
			return { scope, gameId, playerId, playerSecret };
		}
	} else {
		addError(`Invalid scope: "${scope}". Must be one of: ${enabled.join(', ')}.`);
	}
	return {};
}
