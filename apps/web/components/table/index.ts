import { TablePagination } from './pagination';
import { TableRoot } from './table';
import * as cells from './cell';

export const Table = Object.assign(TableRoot, {
	Pagination: TablePagination,
	...cells,
});
