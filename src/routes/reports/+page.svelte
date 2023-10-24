<script lang="ts">
	import { onMount } from 'svelte';

	import type { GridApi } from 'ag-grid-enterprise';
	import type {
		IPayRunLineItemDetailsReportDto,
		IReportHeaderDto
	} from '$lib/test-data/Reports/pay-runs-line-item-details-report-dto';

	import _Grid from '$lib/components/grid.svelte';
	import _ReportColumns from '$lib/components/report-columns.svelte';
	import { getPayRunLineItemDetailsReport } from '$lib/test-data/Reports/getPayRunLineItemDetailsReport';

	let gridApi: GridApi<IPayRunLineItemDetailsReportDto> | undefined = undefined;
	let reportData: IPayRunLineItemDetailsReportDto[] | undefined = undefined;
	let headers: IReportHeaderDto[] | undefined = undefined;

	const Grid = _Grid<IPayRunLineItemDetailsReportDto>;
	const ReportColumns = _ReportColumns<IPayRunLineItemDetailsReportDto>;

	const onApiReady = (event: CustomEvent<GridApi<IPayRunLineItemDetailsReportDto>>) =>
		(gridApi = event.detail);

	onMount(async () => ({ headers, reportData } = await getPayRunLineItemDetailsReport()));
</script>

<h1>The AG Grid Spike - From report dto</h1>
<Grid
	gridOptions={{
		sideBar: true
	}}
	rowData={reportData}
	on:apiReady={onApiReady}
>
	<ReportColumns {headers} />
</Grid>
