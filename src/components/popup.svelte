<script lang="ts">
	import ButtonIcon from './button-icon.svelte';

	export let visible: boolean;
  export let title: string;
</script>

{#if visible}
	<div class="background" on:click={() => (visible = false)}>
		<div class="container">
			<div class="popup" on:click|stopPropagation>
				<div class="header">
					<h2>{title}</h2>
					<ButtonIcon on:click={() => (visible = false)}
						><img src="/icons/x.svg" alt="X" /></ButtonIcon
					>
				</div>
        <div>
          <slot />
        </div>
			</div>
		</div>
	</div>
{/if}

<style lang="scss" scoped>
	div.background {
		position: fixed;
		z-index: 999;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: hsla(0, 0%, 0%, 0.4);
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	div.container {
		display: flex;
		justify-content: center;
	}
	div.popup {
		width: 500px;
		padding: var(--padding);
		background-color: var(--background);
		border-radius: var(--radius);
	}
	div.header {
		display: flex;
		justify-content: space-between;
	}
</style>
