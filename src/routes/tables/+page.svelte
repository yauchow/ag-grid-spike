<script lang="ts">
	import _TableGrid from '$lib/components/tableGrid.svelte';
	import _Column from '$lib/components/column.svelte';
	import _ColumnGroup from '$lib/components/columnGroup.svelte';

	import { getLotsOfEmployeesAsync, type Employee } from '$lib/test-data/emplloyees';
	import { onMount } from 'svelte';
	import { dateFormatter } from '$lib/components/formatters/dateFormatter';
	import { linkRenderer } from '$lib/components/cell-renderers/linkRenderer';

	const TableGrid = _TableGrid<Employee>;
	const Column = _Column<Employee>;
	const ColumnGroup = _ColumnGroup<Employee>;

	let employees: Employee[] = [];

	onMount(async () => (employees = await getLotsOfEmployeesAsync()));
</script>

<TableGrid rowData={employees}>
	<!-- Demonstration of creating a column with a link renderer that takes a function to generate a url with the incoming employee data -->
	<Column
		field="employeeId"
		headerName="Employee ID"
		cellRenderer={linkRenderer((e) => `\\tables\\${e.employeeId}`)}
	/>
	<Column field="firstname" headerName="Firstname" />
	<Column field="surname" headerName="Surname" />
	<ColumnGroup headerName="Stuff">
		<Column field="date" headerName="Date" valueFormatter={dateFormatter('DD MMM YYYY')} />
		<Column field="rating" headerName="Rating" />
	</ColumnGroup>
</TableGrid>
