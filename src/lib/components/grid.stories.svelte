<script lang="ts" context="module">
	import _Grid from './grid.svelte';

	export interface ExampleData {
		id: string;
		name: string;

		numbers: Numbers;

		date: Date;

		boolean: boolean;
	}

	export interface Numbers {
		currency: number;
		integer: number;
		numericValue: number;
	}

	export const meta = {
		title: 'Grid',
		component: _Grid
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { faker } from '@faker-js/faker';

	import _Column from './column.svelte';
	import _ColumnGroup from './columnGroup.svelte';
	import { currencyFormatter, numberFormatter } from './formatters/numberFormatter';
	import { dateFormatter } from './formatters/dateFormatter';
	import ReportColumns from './report-columns.svelte';
	import {
		ReportHeaderDataType,
		type IReportHeaderDto
	} from '$lib/test-data/Reports/pay-runs-line-item-details-report-dto';

	const createRandomRow = (): ExampleData => ({
		id: faker.string.alphanumeric(5),
		name: faker.name.fullName(),
		numbers: {
			currency: faker.number.float({ min: 0, max: 9999 }),
			integer: faker.number.int({ min: -10, max: 10 }),
			numericValue: faker.number.float()
		},
		boolean: !!(faker.number.int() % 2),
		date: faker.date.soon()
	});

	let rowData: ExampleData[] = Array.from({ length: 1000 }, () => createRandomRow());

	let headers: IReportHeaderDto[] = [
		{ fieldName: 'id', title: 'ID', dataType: ReportHeaderDataType.Text },

		{ fieldName: 'name', title: 'Name', dataType: ReportHeaderDataType.Text },

		{ fieldName: 'numbers.currency', title: 'Currency', dataType: ReportHeaderDataType.Currency },

		{
			fieldName: 'numbers.integer',
			title: 'Integer',
			dataType: ReportHeaderDataType.Number,
			numericPrecision: 0
		},

		{ fieldName: 'numbers.numericValue', title: 'Number', dataType: ReportHeaderDataType.Number },

		{ fieldName: 'date', title: 'Date', dataType: ReportHeaderDataType.Date },

		{
			fieldName: 'boolean',
			title: 'Yes/No',
			dataType: ReportHeaderDataType.Boolean,
			trueText: 'Yes',
			falseText: 'No'
		}
	];

	const Grid = _Grid<ExampleData>;
	const Column = _Column<ExampleData>;
	const ColumnGroup = _ColumnGroup<ExampleData>;
</script>

<Template let:args>
	<Grid {...args} --min-height="800px">
		<Column field="id" headerName="ID" />

		<Column field="name" headerName="Name" />

		<ColumnGroup headerName="Numbers">
			<Column
				field="numbers.currency"
				headerName="Currency"
				valueFormatter={currencyFormatter(2)}
			/>
			<Column field="numbers.integer" headerName="Integer" />
			<Column
				field="numbers.numericValue"
				headerName="Numbers"
				valueFormatter={numberFormatter({
					useGrouping: true,
					minimumFractionDigits: 4,
					maximumFractionDigits: 4
				})}
			/>
		</ColumnGroup>

		<Column field="date" headerName="Date" valueFormatter={dateFormatter()} />

		<Column field="boolean" headerName="True/False" />
	</Grid>
</Template>

<Story name="Simple" args={{ rowData }} />

<Template id="reports" let:args>
	<Grid rowData={args.rowData} --min-height="800px">
		<ReportColumns headers={args.headers} />
	</Grid>
</Template>

<Story name="Reports" template="reports" args={{ rowData, headers }} />
