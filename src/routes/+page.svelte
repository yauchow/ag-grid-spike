<script lang="ts">
	import { getLotsOfEmployeesAsync, type Employee } from '$lib/test-data/emplloyees';
	import _Grid from '$lib/components/grid.svelte';
	import _Column from '$lib/components/column.svelte';
	import _ColumnGroup from '$lib/components/columnGroup.svelte';
	import type { GridApi } from 'ag-grid-enterprise';
	import { onMount } from 'svelte';
	import { dateFormatter } from '$lib/components/formatters/dateFormatter';

	const Grid = _Grid<Employee>;
	const Column = _Column<Employee>;
	const ColumnGroup = _ColumnGroup<Employee>;

	let gridApi: GridApi<Employee> | undefined = undefined;

	let rowData: Employee[] = [];

	let quickSearch: string = '';

	const onApiReady = (event: CustomEvent<GridApi<Employee>>) => {
		gridApi = event.detail;
	};

	$: if (gridApi) gridApi.setQuickFilter(quickSearch);

	onMount(async () => (rowData = await getLotsOfEmployeesAsync()));
</script>

<h1>The AG Grid Spike - handcrafted report</h1>

<div class="search-bar">
	<input class="search-bar__input" type="search" bind:value={quickSearch} />
</div>

<Grid {rowData} on:apiReady={onApiReady}>
	<Column field="employeeId" headerName="Employee ID" />
	<Column field="firstname" headerName="Firstname" />
	<Column field="surname" headerName="Surname" />

	<ColumnGroup headerName="A Simple Column Group">
		<Column field="date" headerName="Date" valueFormatter={dateFormatter('DD MMM YYYY')} />
		<Column field="rating" headerName="Rating" />
	</ColumnGroup>

	<ColumnGroup headerName="Department">
		<Column field="department.name" />
		<Column field="department.code" />
	</ColumnGroup>
</Grid>

<style lang="scss">
	.search-bar {
		padding: 0.5em;
		&__input {
			padding: 0.5em 1em;
		}
	}
</style>
