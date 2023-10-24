<script lang="ts" generics="T">
	import type { GridOptions } from 'ag-grid-enterprise';

	import { createEventDispatcher, setContext } from 'svelte';

	import { DefinitivGridContext, DefinitivGridContextKey } from './contexts/definitivGridContext';

	import 'ag-grid-enterprise/styles/ag-grid.css';
	import 'ag-grid-enterprise/styles/ag-theme-alpine.css';

	export let gridOptions: GridOptions<T> | undefined = undefined;

	let gridContainer: HTMLElement;

	const dispatchEvent = createEventDispatcher();

	const gridContext: DefinitivGridContext<T> = new DefinitivGridContext<T>();
	if (gridOptions) gridContext.useGridOptions(gridOptions);

	gridContext.onApiReady((api) => dispatchEvent('apiReady', api));

	setContext(DefinitivGridContextKey, gridContext);

	export let rowData: T[] | undefined;

	$: gridContext.setTargetHtmlElement(gridContainer);
	$: if (rowData) gridContext.fillGrid(rowData);
</script>

<div class="defintiv-grid">
	<div class="defintiv-grid__container ag-theme-alpine" bind:this={gridContainer} />
</div>
<slot />

<style lang="scss">
	.defintiv-grid {
		display: flex;
		width: 100%;
		min-height: var(--min-height, 600px);
		flex: 1;

		&__container {
			flex: 1;
			min-height: 400px;
		}
	}
</style>
