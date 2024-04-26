import { flexRender, Table } from '@tanstack/react-table';
import React from 'react';

export type TableFooterProps<DataT> = {
	table: Table<DataT>;
};

export const TableFooter = <DataT extends object>({ table }: TableFooterProps<DataT>) => {
	const hasAnyPlaceholders = table
		.getFooterGroups()
		.some((footerGroup) => footerGroup.headers.some((header) => header.isPlaceholder));
	if (!hasAnyPlaceholders) {
		return null;
	}

	return (
		<tfoot className="border-t border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase text-slate-500">
			{table.getFooterGroups().map((footerGroup) => (
				<tr key={footerGroup.id}>
					{footerGroup.headers.map((header) => (
						<th
							key={header.id}
							className="w-px whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5"
						>
							<div className="text-left font-semibold">
								{header.isPlaceholder
									? null
									: flexRender(header.column.columnDef.footer, header.getContext())}
							</div>
						</th>
					))}
				</tr>
			))}
		</tfoot>
	);
};
