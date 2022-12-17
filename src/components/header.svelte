<script lang="ts">
	import { Link } from 'svelte-routing';
	import ErrorBar from './error-bar.svelte';
	import ButtonAnchor from './button-anchor.svelte';
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
			document.title = name + ' - CodeGame';
			if (info.data.version) version = info.data.version;
			cgVersion = info.data.cg_version;
			if (info.data.repository_url) repo_url = info.data.repository_url;
		}
	});
</script>

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
		<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="106" height="20" role="img" aria-label="CodeGame: v0.7"><title>CodeGame: v0.7</title><linearGradient id="s" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><clipPath id="r"><rect width="106" height="20" rx="3" fill="#fff"/></clipPath><g clip-path="url(#r)"><rect width="71" height="20" fill="#555"/><rect x="71" width="35" height="20" fill="#fe7d37"/><rect width="106" height="20" fill="url(#s)"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110"><text aria-hidden="true" x="365" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="610">CodeGame</text><text x="365" y="140" transform="scale(.1)" fill="#fff" textLength="610">CodeGame</text><text aria-hidden="true" x="875" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="250">v0.7</text><text x="875" y="140" transform="scale(.1)" fill="#fff" textLength="250">v{cgVersion}</text></g></svg>
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
		}}
	}
</style>
