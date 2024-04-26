import { flexRender, Header, Table } from "@tanstack/react-table";
import classNames from "classnames";
import React from "react";
import { Icon, IconProps } from "../icon";
import { BaseProps } from "../index.types";
import { Input } from "../input-lib";
import { TableFooter } from "./footer";

export type TableProps<DataT> = BaseProps & {
  title?: React.ReactNode;
  header?: React.ReactNode;

  border?: boolean;
  shadow?: boolean;
  isOverFlowXNotNeeded?: boolean;
  headerPosition?: "left" | "right" | "center";
  table: Table<DataT>;
  children?: React.ReactNode;
};

export const TableRoot = <DataT extends object>({
  title,
  table,
  header,
  headerPosition = "left",
  border = true,
  shadow = true,
  isOverFlowXNotNeeded = false,
  children,
  ...props
}: TableProps<DataT>) => {
  return (
    <div
      className={classNames(
        "relative rounded-sm  border-b bg-white",
        border && "border border-slate-200",
        shadow && " shadow-lg"
      )}
    >
      {(title || header) && (
        <header className="px-5 py-4">
          {header
            ? header
            : title && (
                <h2 className="font-semibold text-slate-800">{title}</h2>
              )}
        </header>
      )}
      <div className={isOverFlowXNotNeeded ? "" : `overflow-x-auto`}>
        <table className="w-full table-auto">
          <thead className="border-t border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase text-slate-500">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={classNames([
                      "whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5",
                      header.column.getCanSort() && "cursor-pointer",
                    ])}
                    style={{
                      width: header.getSize(),
                    }}
                    onClick={
                      header.column.getCanSort()
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                  >
                    <div className={`text-${headerPosition} font-semibold`}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}

                      {header.column.getCanSort() &&
                        // <SortIcon header={header} />
                        "^"}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <TableFooter table={table} />
        </table>
        {children && (
          <div className="border-t border-slate-200 px-5 py-4">{children}</div>
        )}
      </div>
    </div>
  );
};

TableRoot.displayName = "UI_Table";

interface SortIconProps<DataT> {
  header: Header<DataT, unknown>;
}

// function SortIcon<TableData>({ header }: SortIconProps<TableData>) {
//   const sort = header.column.getIsSorted();
//   const isDesc = sort === "desc";
//   const icon: IconProps["name"] = isDesc ? "fa-sort-down" : "fa-sort-up";

//   if (sort)
//     return (
//       <Icon
//         className={classNames("ml-1.5", isDesc ? "mb-0.5" : "-mb-0.5")}
//         name={icon}
//       />
//     );
//   return <Icon className="ml-1.5" name="fa-sort" />;
// }
