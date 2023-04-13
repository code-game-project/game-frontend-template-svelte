<script lang="ts">
	import { link } from 'svelte-routing';
	import { gameName, gameVersion, repoUrl } from '../stores';
	import ButtonAnchor from './generic/button-anchor.svelte';
	import GameVersionBadge from './game-version-badge.svelte';
	import debug from '../icons/debug.svg';
	import git from '../icons/git.svg';
</script>

<svelte:head>
	<title>{$gameName} - CodeGame</title>
</svelte:head>

<header>
	<a href="/" use:link>
		<h1>
			{$gameName}
			{#if $gameVersion}v{$gameVersion}{/if}
		</h1>
		<GameVersionBadge />
	</a>
	<nav>
		<ButtonAnchor href="/debug">
			<img slot="icon" src={debug} alt="debug" />
			Console
		</ButtonAnchor>
		{#if $repoUrl}
			<ButtonAnchor href={$repoUrl}>
				<img slot="icon" src={git} alt="git" />
				Repository
			</ButtonAnchor>
		{/if}
	</nav>
</header>

<style lang="scss" scoped>
	header {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		row-gap: var(--padding);
		a {
			flex-shrink: 1;
		}
		nav {
			display: flex;
			justify-content: space-evenly;
			gap: 5px;
		}
	}
</style>
