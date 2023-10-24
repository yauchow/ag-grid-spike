# Running the sample app

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

# Starting story book

To start Storybook

```bash
npm run storybook
```

# Using the Grid component

## A simple grid with defined columns

Firstly import the components inside the svelte component's script tags

```typescript
import _Grid from '$lib/components/grid.svelte';
import _Column from '$lib/components/column.svelte';
```

These are generic components, create the final types with the type of data we want to create
a grid of. We will use Employee as an example. You don't need to complete the generic type
as the components will fallback to components of any, but you will loose the type safety of
Typescripts, errors will not be highlighted when your DTOS or interfaces changes.

```typescript
const Grid = _Grid<Employee>;
const Column = _Column<Employee>;
```

You then need to define a list of items we will present on the grid. You can load the list of items
asynchronously from an api call if required using the onMount svelte function.

```typescript
import { onMount } from 'svelte';

let employees: Employee[] = [];

onMount(async () => (employees = await getEmployees()));
```

Then to use the grid component in the Svelte html markup

```svelte
<Grid rowData={employees}>
	<Column field="employeeId" headerName="Employee ID" />
	<Column field="firstname" headerName="Firstname" />
	<Column field="surname" headerName="Surname" />
</Grid>
```

The Column component tells the Grid how to read the list of employees by specifying what field display in the column. As this is a generic component, the field propert of column will only accept field names from the Employee type. It will also accept deep property names nested types separated by dots, if the employee type also has a department field, then we can access feilds of the department object, eg. department.name

## Accessing the AG Grid api

To access the AG Grid's api to perform more advance logic, simply add a listener for the 'apiReady' event. The custom event will have the AG Grid Api in the details. Once you have a reference to the Grid Api you can use it in your Svelte code to implement interesting logic.

```svelte
<script lant="ts">
	import type { GridApi } from 'ag-grid-enterprise';
	import _Grid from '$lib/components/grid.svelte';
	import _Column from '$lib/components/column.svelte';

	let searchText: string = '';
	let employees: Employee[] = [];
	let gridApi: GridApi<Employee> | undefined = undefined;

	onMount(async () => (employees = await getEmployees()));

	// When the api is ready, the gridApi will have a copy of the gridApi for the below grid.
	const onApiReady = (event: CustomEvent<GridApi<Employee>>) => (gridApi = event.details);

	// Doing something interesting with the grid api from a button click event
	const onClick = async () => {
		if (!gridApi) return;

		// Demonstration purpose only, probably not the right way to reload data
		// in the grid
		gridApi.setRowData(await getEmployees());
	};

	// Doing something with the grid api with the svelte's reactive code
	// using it for a quick filter as the user enters search text.
	$: if (gridApi) gridApi.setQuickFilter(searchText);
</script>

<input type="search" placeholder="search" bind:value={searchText} />
<button on:click={onClick}>reload</button>

<Grid rowData={employees} on:apiRead={onApiReady}>
	<Column field="employeeId" headerName="Employee ID" />
	<Column field="firstname" headerName="Firstname" />
	<Column field="surname" headerName="Surname" />
</Grid>
```
