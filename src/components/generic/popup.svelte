<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import ButtonIcon from './button-icon.svelte';
	const dispatch = createEventDispatcher();
	import x from '../../icons/x.svg';

	export let title: string;

	const handleKeypress = (
		event: KeyboardEvent & {
			currentTarget: EventTarget & Window;
		}
	) => {
		if (event.key === 'Escape') dispatch('close');
	};

	function teleport(node: HTMLElement) {
		let teleportContainer = document.querySelector('body');
		teleportContainer?.prepend(node);
	}
</script>

<svelte:window on:keydown={handleKeypress} />

<button use:teleport class="background" on:click={() => dispatch('close')}>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="popup" on:click|stopPropagation>
		<div class="header">
			<h2>{title}</h2>
			<ButtonIcon on:click={() => dispatch('close')}
				><img src={x} alt="X" /></ButtonIcon
			>
		</div>
		<div>
			<slot />
		</div>
	</div>
</button>

<style lang="scss" scoped>
	button.background {
		padding: 0;
		border: none;
		position: fixed;
		z-index: 999;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: hsla(0, 0%, 0%, 0.4);
		display: flex;
		justify-content: center;
		align-items: center;
		> div.popup {
			cursor: default;
			padding: var(--padding);
			background-color: var(--background-light);
			max-height: 100vh;
			overflow-y: scroll;
			overflow-x: hidden;
			> div.header {
				display: grid;
				grid-template-columns: auto 24px;
				align-items: flex-start;
				> h2 {
					text-align: left;
					font-size: 24px;
					line-height: 36px;
					margin-top: -3px; // (36px-24px)/2/2
				}
			}
		}
		@media screen and (min-width: 500px) {
			> div.popup {
				width: 500px;
				border-radius: var(--radius);
			}
		}
		@media screen and (max-width: 500px) {
			> div.popup {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
