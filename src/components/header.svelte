<script lang="ts">
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

<noscript>
	<ErrorBar
		message="Some parts of this site require JavaScript to work. Please enable it to continue."
	/>
</noscript>

<header>
	<div class="super">
		<a href="/"><h1>{name} v{version}</h1></a>
		<nav>
			{#if repo_url}
				<ButtonAnchor href={repo_url}>Repository</ButtonAnchor>
			{/if}
		</nav>
	</div>
	<div class="sub">
		<img src="https://img.shields.io/badge/CodeGame-v{cgVersion}-orange" alt={cgVersion}>
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
