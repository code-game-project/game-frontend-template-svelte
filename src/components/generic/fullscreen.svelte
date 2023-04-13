<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import ButtonIcon from './button-icon.svelte';
	const dispatch = createEventDispatcher();
	import minimize from '../../icons/minimize.svg';
	import maximize from '../../icons/maximize.svg';

	export let height: number;

	const noop = () => {};
	export let isFullscreen = false;
	let fsContainer: HTMLDivElement;
	let fullscreenSupport = false;
	let exitFullscreen = noop;
	let requestFullscreen: (options?: FullscreenOptions) => void = noop;

	onMount(() => {
		fullscreenSupport =
			document.fullscreenEnabled ||
			// @ts-ignore
			document.webkitFullscreenEnabled ||
			// @ts-ignore
			document.mozFullScreenEnabled ||
			// @ts-ignore
			document.msFullscreenEnabled ||
			false;
		exitFullscreen = (
			document.exitFullscreen ||
			// @ts-ignore
			document.mozCancelFullScreen ||
			// @ts-ignore
			document.webkitExitFullscreen ||
			// @ts-ignore
			document.msExitFullscreen ||
			noop
		).bind(document);
		requestFullscreen = (
			fsContainer.requestFullscreen ||
			// @ts-ignore
			fsContainer.mozRequestFullScreen ||
			// @ts-ignore
			fsContainer.webkitRequestFullscreen ||
			// @ts-ignore
			fsContainer.msRequestFullscreen ||
			noop
		).bind(fsContainer);
		document.addEventListener('fullscreenchange', fullscreenChange);
		document.addEventListener('mozfullscreenchange', fullscreenChange);
		document.addEventListener('MSFullscreenChange', fullscreenChange);
		document.addEventListener('webkitfullscreenchange', fullscreenChange);
	});

	const fullscreenChange = () => {
		isFullscreen = !isFullscreen;
		dispatch('fullscreenChange', { isFull: isFullscreen });
	};

	const fsToggle = () => {
		if (!fullscreenSupport) return;
		if (isFullscreen) {
			exitFullscreen();
		} else {
			requestFullscreen({ navigationUI: 'hide' });
		}
	};
</script>

<div
	class="fs"
	class:isFullscreen
	bind:this={fsContainer}
	style={`height: ${height}px;`}
>
	<div id="header">
		<slot name="header" />
	</div>
	<div id="content" class:isFullscreen>
		<slot name="content" />
	</div>
	{#if fullscreenSupport}
		<div id="controls">
			{#if isFullscreen}
				<ButtonIcon on:click={fsToggle}
					><img src={minimize} alt="Exit full screen" /></ButtonIcon
				>
			{:else}
				<ButtonIcon on:click={fsToggle}
					><img src={maximize} alt="Show in full screen" />
				</ButtonIcon>
			{/if}
		</div>
	{/if}
</div>

<style>
	div.fs {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background-color: var(--background);
	}

	div#header,
	div#controls {
		flex-shrink: 0;
	}

	div#content {
		flex-grow: 1;
		overflow: auto;
	}

	div#controls {
		display: flex;
		justify-content: right;
		width: 100%;
		padding: var(--padding);
		background-color: var(--background-light);
	}
</style>
