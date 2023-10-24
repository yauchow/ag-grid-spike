<script lang="ts" generics="T">
	import { getValueFormatterForReportColumn } from './formatters/getValueFormatterForDataType';

	import { getCellStyleForReportColumn } from './cell-renderers/getCellStyleForDataType';

	import type { ColDefField } from 'ag-grid-community/dist/lib/entities/colDef';

	import {
		ReportHeaderDataType,
		type IReportHeaderDto
	} from '$lib/test-data/Reports/pay-runs-line-item-details-report-dto';
	import type { ColDef } from 'ag-grid-enterprise';
	import {
		DefinitivGridContextKey,
		type IDefinitivGridColumnsContext
	} from './contexts/definitivGridContext';

	import { getContext } from 'svelte';

	let currentHeader: ColDef<T>[] = [];

	const gridColumnsContext = getContext<IDefinitivGridColumnsContext<T>>(DefinitivGridContextKey);

	export let headers: IReportHeaderDto[] | undefined = undefined;

	const canAggregate = (dataType: ReportHeaderDataType | undefined): boolean => {
		switch (dataType) {
			case ReportHeaderDataType.Number:
			case ReportHeaderDataType.Currency:
			case ReportHeaderDataType.Duration:
				return true;

			case ReportHeaderDataType.Date:
			case ReportHeaderDataType.DateTime:
			case ReportHeaderDataType.DateTimeUtc:
			case ReportHeaderDataType.TimeOfDay:
			case ReportHeaderDataType.Text:
			case ReportHeaderDataType.TextArray:
			case ReportHeaderDataType.Percentage:
			default:
				return false;
		}
	};

	const setHeaders = () => {
		if (!headers) return;

		for (const header of headers) {
			const fieldName: any = header.fieldName;
			const field: ColDefField<T> = fieldName;

			var isAggregateable = canAggregate(header.dataType);

			const colDef: ColDef<T> = {
				headerName: header.title,
				field,
				hide: header.hiddenByDefault,
				enableValue: isAggregateable,
				aggFunc: isAggregateable && !header.disableDefaultAggregation ? 'sum' : undefined,
				valueFormatter: getValueFormatterForReportColumn(header),
				cellStyle: header.cellStyle ?? getCellStyleForReportColumn(header)
			};

			gridColumnsContext.addColDef(colDef);
			currentHeader.push(colDef);
		}
	};

	$: headers, setHeaders();
</script>
