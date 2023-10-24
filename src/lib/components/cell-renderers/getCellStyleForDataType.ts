import {
	ReportHeaderDataType,
	type IReportHeaderDto
} from '$lib/test-data/Reports/pay-runs-line-item-details-report-dto';
import type { CellStyle } from 'ag-grid-enterprise';

export const getCellStyleForReportColumn = (header: IReportHeaderDto): CellStyle | undefined => {
	switch (header.dataType) {
		case ReportHeaderDataType.Number:
		case ReportHeaderDataType.Currency:
		case ReportHeaderDataType.Duration:
		case ReportHeaderDataType.Percentage:
			return { 'text-align': 'right' };

		default:
			// A null cell style is just standard text.
			return undefined;
	}
};
