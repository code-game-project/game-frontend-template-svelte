<script lang="ts">
	import { Link } from 'svelte-routing';
	import TableRow from './generic/table-row.svelte';
	import TableCell from './generic/table-cell.svelte';
	import CopyButton from './generic/copy-button.svelte';
  import Popup from './generic/popup.svelte';
  import GameInfoPopupContent from './game-info-popup-content.svelte';

	export let columnWidths: string;
	export let id: string;
	export let players: number;

	let popupVisible = false;
</script>

<TableRow {columnWidths}>
	<TableCell>
		<span class="mono game-id">{id}</span>
		<CopyButton text={id} />
	</TableCell>
	<TableCell>{players}</TableCell>
	<TableCell>
		<div style="overflow-wrap: normal;">
			<Link to="spectate?scope=game&game_id={id}">Spectate</Link>,&nbsp;
			<Link to="debug?scope=game&game_id={id}">Debug</Link>,&nbsp;
			<a href="#null" on:click|preventDefault={() => (popupVisible = true)}
				>Details</a
			>
		</div>
	</TableCell>
</TableRow>

{#if popupVisible}
<Popup title='Game Info' on:close={() => (popupVisible = false)}>
  <GameInfoPopupContent {id}></GameInfoPopupContent>
</Popup>
{/if}

<style lang="scss" scoped>
	span.game-id {
		padding-right: var(--padding);
	}
</style>
