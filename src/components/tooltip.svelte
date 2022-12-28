<script lang="ts">
	export let active: boolean;
	export let tipText: string;
	export let tipWidthPx: number = 120;
</script>

<div class="tooltip" class:active>
	<slot />
	<div
		class="tooltiptext"
		style="width: {tipWidthPx}px; margin-left: -{tipWidthPx / 2}px;"
	>
		{tipText}
	</div>
</div>

<style lang="scss" scoped>
	.tooltip {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.tooltip .tooltiptext {
		visibility: hidden;
		background-color: var(--background);
		color: var(--text);
		text-align: center;
		border-radius: 6px;
		border: 1px solid var(--background-light);
		padding: 5px 0;
		position: absolute;
		z-index: 1;
		bottom: 125%;
		left: 50%;
		opacity: 0;
		transition: visibility var(--transition-time) linear, opacity var(--transition-time) linear;
	}

	.tooltip .tooltiptext::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 50%;
		margin-left: -5px;
		border-width: 5px;
		border-style: solid;
		border-color: var(--background-light) transparent transparent transparent;
	}

	.tooltip.active .tooltiptext {
		visibility: visible;
		opacity: 1;
	}
</style>
