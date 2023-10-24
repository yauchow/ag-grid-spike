<script lang="ts" generics="T">
	import { getContext, onDestroy } from 'svelte';

	import type {
		CellStyle,
		CellStyleFunc,
		ColDefField,
		ValueFormatterFunc
	} from 'ag-grid-community/dist/lib/entities/colDef';
	import type { ColDef, ICellRendererComp, ICellRendererParams } from 'ag-grid-enterprise';

	import {
		DefinitivGridContextKey,
		type IDefinitivGridColumnsContext
	} from './contexts/definitivGridContext';

	export let field: ColDefField<T>;
	export let headerName: string | undefined = undefined;
	export let filter: string | undefined = undefined;
	export let valueFormatter: string | ValueFormatterFunc<T> | undefined = undefined;
	export let cellStyle: CellStyle | CellStyleFunc | undefined = undefined;
	export let cellRenderer: ICellRendererComp<T> | undefined = undefined;
	export let cellRendererParams: ICellRendererParams<T> | undefined = undefined;

	const gridContext = getContext<IDefinitivGridColumnsContext<T>>(DefinitivGridContextKey);

	const colDef: ColDef<T> = {
		cellStyle,
		field,
		filter,
		valueFormatter,
		cellRenderer,
		cellRendererParams
	};

	$: colDef.headerName = headerName;

	$: colDef.filter = filter;

	$: colDef.valueFormatter = valueFormatter;

	gridContext.addColDef(colDef);

	onDestroy(() => {
		if (!gridContext) return;

		gridContext.removeColumnDef(colDef);
	});
</script>
