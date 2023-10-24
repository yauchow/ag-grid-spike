import type { ValueFormatterFunc, ValueFormatterParams } from 'ag-grid-enterprise';

export const numberFormatter =
	<TData = any, TValue = any>(
		format: Intl.NumberFormatOptions
	): ValueFormatterFunc<TData, TValue> =>
	(params: ValueFormatterParams<TData, TValue>) =>
		new Intl.NumberFormat(navigator.language, format).format(Number(params.value));

export const currencyFormatter = <TData = any, TValue = any>(
	decimal: number = 2,
	currency: string = 'AUD'
): ValueFormatterFunc<TData, TValue> =>
	numberFormatter<TData, TValue>({
		style: 'currency',
		currency: currency,
		currencyDisplay: 'narrowSymbol',
		minimumFractionDigits: decimal,
		maximumFractionDigits: decimal
	});
