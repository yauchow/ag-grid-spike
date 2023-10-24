import type { ColDef, ColGroupDef } from 'ag-grid-enterprise';
import type { IDefinitivGridColumnsContext } from './definitivGridContext';

export class DefinitivGridGroupedColumnsContext<T> implements IDefinitivGridColumnsContext<T> {
	constructor(private parentColumnDefinition: ColGroupDef<T>) {}

	addColDef(columnDefinition: ColDef<T> | ColGroupDef<T>): void {
		this.parentColumnDefinition.children.push(columnDefinition);
	}

	removeColumnDef(columnDefinition: ColDef<T> | ColGroupDef<T>): void {
		const index = this.parentColumnDefinition.children.indexOf(columnDefinition);

		if (index >= 0) this.parentColumnDefinition.children.splice(index, 1);
	}
}
