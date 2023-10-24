import {
	ReportHeaderDataType,
	type IReportHeaderDto
} from '$lib/test-data/Reports/pay-runs-line-item-details-report-dto';
import type { ValueFormatterFunc } from 'ag-grid-enterprise';
import { currencyFormatter, numberFormatter } from './numberFormatter';
import { dateFormatter } from './dateFormatter';
import { booleanFormatter } from './booleanFormatter';

export const getValueFormatterForReportColumn = <TData = any, TValue = any>(
	header: IReportHeaderDto
): ValueFormatterFunc<TData, TValue> | undefined => {
	if (!header.dataType) return undefined;

	switch (header.dataType) {
		case ReportHeaderDataType.Currency:
			return currencyFormatter(2);

		case ReportHeaderDataType.Date:
			return dateFormatter();

		case ReportHeaderDataType.Number:
			return numberFormatter({
				minimumFractionDigits: header.numericPrecision !== undefined ? header.numericPrecision : 4,
				maximumFractionDigits: header.numericPrecision !== undefined ? header.numericPrecision : 4
			});

		case ReportHeaderDataType.Boolean:
			return booleanFormatter(header.trueText, header.falseText, header.nullDisplayText);

		default:
			return undefined;
	}
};
