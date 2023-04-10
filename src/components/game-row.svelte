<script lang="ts">
	import { link, navigate } from 'svelte-routing';
	import TableRow from './generic/table-row.svelte';
	import TableCell from './generic/table-cell.svelte';
	import CopyButton from './generic/copy-button.svelte';
	import Popup from './generic/popup.svelte';
	import GameInfoPopupContent from './game-info-popup-content.svelte';
	import AnchorButton from './generic/anchor-button.svelte';
	import { gameIdStore, scopeStore } from '../scoping';

	export let columnWidths: string;
	export let id: string;
	export let players: number;

	let popupVisible = false;

	let holdingCtrl = false;
	const handleKeydown = (
		event: KeyboardEvent & {
			currentTarget: EventTarget & Window;
		}
	) => {
		if (event.key == 'Control' || event.key == 'Meta') holdingCtrl = true;
	};
	const handleKeyup = (
		event: KeyboardEvent & {
			currentTarget: EventTarget & Window;
		}
	) => {
		if (event.key == 'Control' || event.key == 'Meta') holdingCtrl = false;
	};

	const spectate = () => {
		scopeStore.set('game');
		gameIdStore.set(id);
		if (holdingCtrl)
			window.open(window.location.origin + '/spectate', '_blank');
		else navigate('spectate');
	};
	const debug = () => {
		scopeStore.set('game');
		gameIdStore.set(id);
		if (holdingCtrl) window.open(window.location.origin + '/debug', '_blank');
		else navigate('debug');
	};
</script>

<svelte:window on:keydown={handleKeydown} on:keyup={handleKeyup} />

<TableRow {columnWidths}>
	<TableCell>
		<span class="mono game-id">{id}</span>
		<CopyButton text={id} />
	</TableCell>
	<TableCell>{players}</TableCell>
	<TableCell>
		<div style="overflow-wrap: normal;">
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
	}
</style>
