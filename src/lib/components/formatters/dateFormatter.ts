import type { ValueFormatterFunc, ValueFormatterParams } from 'ag-grid-enterprise';
import moment from 'moment';

const getValue = <TValue>(value: TValue): string | Date => {
	if (value instanceof Date) return value;

	return `${value}`;
};

export const dateFormatter =
	<TData = any, TValue = any>(format: string = 'DD-MM-YYYY'): ValueFormatterFunc<TData, TValue> =>
	(params: ValueFormatterParams<TData, TValue>) => {
		if (!params.value) return '';

		if (moment.isMoment(params.value)) return params.value.format(format);

		const value = getValue(params.value);
		const date = moment(value);

		if (date.isValid()) return date.format(format);

		// fallback to simply return the original value if it can't be formatted as a date
		return value.toString();
	};
