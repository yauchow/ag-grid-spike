import type { GridOptions } from 'ag-grid-community';
import { DefinitivGridContext } from './definitivGridContext';

export class DefinitivTableGridContext<T> extends DefinitivGridContext<T> {
	constructor() {
		super();
	}

	override getGridOptions(): GridOptions<T> {
		return {
			rowGroupPanelShow: 'onlyWhenGrouping',
			pagination: true,
			paginationAutoPageSize: true,

			defaultColDef: {
				enableRowGroup: true,
				enablePivot: true,
				resizable: true,
				filter: 'set',
				sortable: true
			}
		};
	}
}
