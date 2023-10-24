<script lang="ts" generics="T">
	import _Grid from '$lib/components/grid.svelte';
	const Grid = _Grid<T>;

	export let rowData: T[] | undefined = undefined;
</script>

<Grid
	{rowData}
	gridOptions={{
		rowGroupPanelShow: 'onlyWhenGrouping',
		pagination: true,
		paginationAutoPageSize: true
	}}
	on:apiReady
>
	<slot />
</Grid>
