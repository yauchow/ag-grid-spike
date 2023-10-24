import type { ValueFormatterFunc, ValueFormatterParams } from 'ag-grid-enterprise';

export const booleanFormatter =
	<TData = any, TValue = any>(
		trueText: string = 'True',
		falseText: string = 'False',
		emptyText: string = ''
	): ValueFormatterFunc<TData, TValue> =>
	(params: ValueFormatterParams<TData, TValue>) => {
		if (!params.value) return emptyText;

		if (!params.value || params.value === 'false' || params.value === 'False') return falseText;

		return trueText;
	};
