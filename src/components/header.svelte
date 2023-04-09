<script lang="ts">
	import { link } from 'svelte-routing';
	import { gameName, gameVersion, repoUrl } from '../stores';
	import ButtonAnchor from './generic/button-anchor.svelte';
	import GameVersionBadge from './game-version-badge.svelte';
</script>

<svelte:head>
	<title>{$gameName} - CodeGame</title>
</svelte:head>

<header>
	<div class="super">
		<a href="/" use:link>
			<h1>
				{$gameName}
				{#if $gameVersion}v{$gameVersion}{/if}
			</h1>
		</a>
		<nav>
			<ButtonAnchor href="/debug?scope=server">Console</ButtonAnchor>
			{#if $repoUrl}
				<ButtonAnchor href={$repoUrl}>Repository</ButtonAnchor>
			{/if}
		</nav>
	</div>
	<div class="sub">
		<GameVersionBadge />
	</div>
</header>

<style lang="scss" scoped>
	header {
		div.super {
			display: flex;
			justify-content: space-between;
			nav {
				display: flex;
				justify-content: space-evenly;
				gap: 5px;
			}
		}
	}
</style>
