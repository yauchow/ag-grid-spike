<script lang="ts" generics="T">
	import { DefinitivGridGroupedColumnsContext } from './contexts/definitivGridGroupedColumnsContext';

	import {
		DefinitivGridContextKey,
		type IDefinitivGridColumnsContext
	} from './contexts/definitivGridContext';

	import { getContext, onDestroy, setContext } from 'svelte';

	import type { ColGroupDef } from 'ag-grid-enterprise';

	export let headerName: string;

	const columnDefinition: ColGroupDef<T> = {
		headerName,
		children: []
	};

	const parentContext = getContext<IDefinitivGridColumnsContext<T>>(DefinitivGridContextKey);
	parentContext.addColDef(columnDefinition);

	const currentContext = new DefinitivGridGroupedColumnsContext(columnDefinition);
	setContext(DefinitivGridContextKey, currentContext);

	$: columnDefinition.headerName = headerName;

	onDestroy(() => {
		parentContext?.removeColumnDef(columnDefinition);
	});
</script>

<slot />
