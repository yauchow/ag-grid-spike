<script lang="ts" context="module">
	import _TableGrid from './tableGrid.svelte';

	export interface ExampleData {
		id: string;
		name: string;

		rating: number;

		date: Date;

		boolean: boolean;
	}

	export const meta = {
		title: 'TableGrid',
		component: _TableGrid
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { faker } from '@faker-js/faker';

	import _Column from './column.svelte';
	import _ColumnGroup from './columnGroup.svelte';
	import { dateFormatter } from './formatters/dateFormatter';

	const createRandomRow = (i: number): ExampleData => ({
		id: i.toString().padStart(5, '0'),
		name: faker.name.fullName(),
		rating: faker.number.int(10),
		boolean: !!(faker.number.int() % 2),
		date: faker.date.soon()
	});

	let rowData: ExampleData[] = Array.from({ length: 1000 }, (_, i) => createRandomRow(i));

	const TableGrid = _TableGrid<ExampleData>;
	const Column = _Column<ExampleData>;
</script>

<Template let:args>
	<TableGrid {...args} --min-height="600px">
		<Column field="id" headerName="ID" />
		<Column field="name" headerName="Name" />
		<Column field="rating" headerName="Rating" />
		<Column field="date" headerName="Date" valueFormatter={dateFormatter()} />
		<Column field="boolean" headerName="True/False" />
	</TableGrid>
</Template>

<Story name="TableGrid" args={{ rowData }} />
