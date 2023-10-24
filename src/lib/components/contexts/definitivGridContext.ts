import { Grid, type ColDef, type GridOptions, GridApi, type ColGroupDef } from 'ag-grid-enterprise';

export interface IDefinitivGridColumnsContext<T> {
	addColDef(columnDefinition: ColDef<T> | ColGroupDef<T>): void;

	removeColumnDef(columnDefinition: ColDef<T> | ColGroupDef<T>): void;
}

export class DefinitivGridContext<T> implements IDefinitivGridColumnsContext<T> {
	private columnDefinitions: (ColDef<T> | ColGroupDef<T>)[];
	private grid: Grid | undefined = undefined;
	private targetHtmlElement: HTMLElement | undefined = undefined;

	private customGridOptions: GridOptions<T> | undefined = undefined;

	private currentGridOptions: GridOptions<T> | undefined = undefined;
	private currentRowData: T[] | undefined;

	private apiReadyCallback: ((api: GridApi<T>) => void) | undefined = undefined;

	constructor() {
		this.columnDefinitions = [];
	}

	public useGridOptions(gridOptions: GridOptions<T>) {
		this.customGridOptions = gridOptions;
	}

	public getGridOptions(): GridOptions<T> {
		return {
			rowGroupPanelShow: 'always',
			groupIncludeFooter: true,
			groupIncludeTotalFooter: true,

			...(this.customGridOptions ?? {}),

			defaultColDef: {
				enableRowGroup: true,
				enablePivot: true,
				resizable: true,
				filter: 'set',
				sortable: true
			}
		};
	}

	// Called by the Grid component to publish the Ag Grid Api once it has been created.
	// The Grid Api can be used by consuming components to perform custom logic to the
	// grid.
	public onApiReady(callback: (api: GridApi<T>) => void) {
		this.apiReadyCallback = callback;
	}

	// Called from the Column or Report Columns component to append a list of columns
	// used to initialize the AG Grid's grid options.  If the grid is already initialized
	// the new Col Def if added directly via the grid api.
	public addColDef(columnDefinition: ColDef<T> | ColGroupDef<T>) {
		this.columnDefinitions.push(columnDefinition);

		if (this.api) {
			this.api.setColumnDefs(this.columnDefinitions);
		}
	}

	// Called from the Column component when the component is destroyed, will remove the column
	// from the current Ad grid.
	public removeColumnDef(columnDefinition: ColDef<T> | ColGroupDef<T>) {
		const index = this.columnDefinitions.indexOf(columnDefinition);

		if (index >= 0) this.columnDefinitions.splice(index, 1);

		if (this.api) {
			this.api.setColumnDefs(this.columnDefinitions);
		}
	}

	// Called from the Grid column, when the HTML element used to host the AG grid
	// is ready.
	public setTargetHtmlElement(element: HTMLElement) {
		this.targetHtmlElement = element;

		this.updateGrid();
	}

	// Called from the Grid column each time the row data property is set.
	public fillGrid(rowData: T[]) {
		this.currentRowData = rowData;

		this.updateGrid();
	}

	public get api(): GridApi<T> | undefined | null {
		return this.currentGridOptions?.api;
	}

	public destroy() {
		this.grid?.destroy();
	}

	private updateGrid() {
		if (!this.currentRowData) return;

		if (!this.targetHtmlElement) return;

		if (this.currentGridOptions && this.currentGridOptions.api) {
			this.currentGridOptions.api.setRowData(this.currentRowData);

			return;
		}

		// Bring everything together to create the grid options
		this.currentGridOptions = {
			...this.getGridOptions(),
			columnDefs: this.columnDefinitions,
			rowData: this.currentRowData
		};

		// Create the grid
		this.grid = new Grid(this.targetHtmlElement, this.currentGridOptions);

		// alert parent components the grid api is ready
		this.raiseApiIsReady();
	}

	private raiseApiIsReady() {
		if (this.apiReadyCallback) {
			const api = this.currentGridOptions?.api;
			if (!api) throw new Error('Api expected');

			this.apiReadyCallback(api);
		}
	}
}

export const DefinitivGridContextKey = 'DefinitivGridContextKey';
