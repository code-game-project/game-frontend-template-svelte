<script lang="ts">
	import { navigate } from 'svelte-routing';
	import TableRow from './generic/table-row.svelte';
	import TableCell from './generic/table-cell.svelte';
	import CopyButton from './generic/copy-button.svelte';
	import Popup from './generic/popup.svelte';
	import GameInfoPopupContent from './game-info-popup-content.svelte';
	import AnchorButton from './generic/anchor-button.svelte';
	import { gameIdStore, scopeStore } from '../scoping';

	export let mobileMode: boolean;
	export let columnWidths: string;

	export let id: string;
	export let players: number;

	let popupVisible = false;

	const spectate = (details: any) => {
		scopeStore.set('game');
		gameIdStore.set(id);
		if (details.ctrl)
			window.open(window.location.origin + '/spectate', '_blank');
		else navigate('spectate');
	};
	const debug = (details: any) => {
		scopeStore.set('game');
		gameIdStore.set(id);
		if (details.ctrl) window.open(window.location.origin + '/debug', '_blank');
		else navigate('debug');
	};
</script>

<TableRow {columnWidths} {mobileMode}>
	<TableCell>
		<span class="mono game-id">{id}</span>
		<CopyButton text={id} />
	</TableCell>
	<TableCell>
		<span>
			{#if mobileMode}Players:{/if}
			{players}
		</span>
	</TableCell>
	<TableCell center={mobileMode}>
		<div>
			<AnchorButton on:click={spectate}>Spectate</AnchorButton>,&nbsp;
			<AnchorButton on:click={debug}>Debug</AnchorButton>,&nbsp;
			<AnchorButton on:click={() => (popupVisible = true)}>
				Details
			</AnchorButton>
		</div>
	</TableCell>
</TableRow>

{#if popupVisible}
	<Popup title="Game Info" on:close={() => (popupVisible = false)}>
		<GameInfoPopupContent {id} />
	</Popup>
{/if}

<style lang="scss" scoped>
	span.game-id {
		padding-right: var(--padding);
		text-overflow: ellipsis;
	}
</style>
