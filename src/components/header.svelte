<script lang="ts">
	import { Link } from 'svelte-routing';
	import ButtonAnchor from './button-anchor.svelte';
	import GameVersionBadge from './game-version-badge.svelte';
	import { onMount } from 'svelte';
	import { getInfo } from '../api';

	let name = 'N/A';
	let version = 'N/A';
	let cgVersion = 'N/A';
	let repo_url = '';

	onMount(async () => {
		const info = await getInfo();
		if (info.ok && info.data) {
			name = info.data.display_name || info.data.name;
			if (info.data.version) version = info.data.version;
			cgVersion = info.data.cg_version;
			if (info.data.repository_url) repo_url = info.data.repository_url;
		}
	});
</script>

<svelte:head>
	<title>{name} - CodeGame</title>
</svelte:head>

<header>
	<div class="super">
		<Link to="/"><h1>{name} v{version}</h1></Link>
		<nav>
			{#if repo_url}
				<ButtonAnchor href={repo_url}>Repository</ButtonAnchor>
			{/if}
		</nav>
	</div>
	<div class="sub">
		<GameVersionBadge cg_version={cgVersion} />
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
