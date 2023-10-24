import type { ICellRendererComp, ICellRendererParams } from 'ag-grid-enterprise';

// A higher order function that returns an Ag Grid cell renderer with functions callbacks it can use
// to extract the required link text and url from the row data.
export const linkRenderer = <TData = any, TValue = any, TContext = any>(
	url: (data: TData) => string
): any => {
	class LinkRenderer implements ICellRendererComp<TData> {
		element: HTMLElement | undefined = undefined;

		public getGui(): HTMLElement {
			return this.element!;
		}

		destroy?(): void {}

		init?(params: ICellRendererParams<TData, TValue, TContext>): void {
			const anchor: HTMLAnchorElement = document.createElement('a');

			const data: TData | undefined = params.data;

			anchor.innerText = params.valueFormatted ?? `${params.value}`;
			anchor.href = data ? url(data) : '#';

			this.element = anchor;
		}

		// Simply returning false so when data is updated AG grid will throw away the old anchor tag created and create a new one.
		public refresh(params: ICellRendererParams<TData, TValue, TContext>): boolean {
			return false;
		}
	}

	return LinkRenderer;
};
