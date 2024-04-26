import { Table } from "@tanstack/react-table";
import classNames from "classnames";
import React from "react";
import { Input } from "./../input-lib";

export type PaginationProps<DataT> = {
  table: Table<DataT>;
};

function TablePaginationDefault<DataT extends object>({
  table,
}: PaginationProps<DataT>) {
  return (
    <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <nav
        className="mb-4 sm:order-1 sm:mb-0"
        role="navigation"
        aria-label="Navigation"
      >
        <ul className="flex justify-center">
          <li className="ml-3 first:ml-0">
            <Input.Button
              text="< Previous"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              variant="secondary"
            />
          </li>
          <li className="ml-3 first:ml-0">
            <Input.Button
              text="Next >"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              variant="secondary"
            />
          </li>
        </ul>
      </nav>
      <div className="text-center text-sm text-slate-500 sm:text-left">
        Showing{" "}
        {/* <span className="font-medium text-slate-600">1</span> to{' '} */}
        <span className="font-medium text-slate-600">
          {table.getState().pagination.pageIndex + 1}
        </span>{" "}
        of{" "}
        <span className="font-medium text-slate-600">
          {table.getPageCount()}
        </span>{" "}
        pages
      </div>
    </div>
  );
}

function TablePaginationNumeric<DataT extends object>({
  table,
}: PaginationProps<DataT>) {
  const pages = new Array(table.getPageCount()).fill(0).map((_, i) => i + 1);

  const slicedPages = pages.slice(
    Math.max(0, table.getState().pagination.pageIndex - 2),
    Math.min(pages.length, table.getState().pagination.pageIndex + 3)
  );

  return (
    <div className="flex justify-center">
      <nav className="flex" role="navigation" aria-label="Navigation">
        <div className="mr-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="hover:bg-primary-500 inline-flex items-center justify-center rounded border border-slate-200 bg-white px-2.5 py-2 leading-5 hover:text-white disabled:text-slate-300 disabled:hover:bg-white"
          >
            <span className="sr-only">Previous</span>
            <wbr />
            <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
              <path d="M9.4 13.4l1.4-1.4-4-4 4-4-1.4-1.4L4 8z" />
            </svg>
          </button>
        </div>

        <ul className="inline-flex -space-x-px text-sm font-medium shadow-sm">
          {slicedPages.map((page) => (
            <NumberButton number={page} table={table} key={page} />
          ))}
        </ul>
        <div className="ml-2">
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="hover:bg-primary-500 inline-flex items-center justify-center rounded border border-slate-200 bg-white px-2.5 py-2 leading-5 text-slate-600 shadow-sm hover:text-white disabled:text-slate-300 disabled:hover:bg-white"
          >
            <span className="sr-only">Next</span>
            <wbr />
            <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
              <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
            </svg>
          </button>
        </div>
      </nav>
    </div>
  );
}

function NumberButton<DataT>({
  table,
  number,
}: PaginationProps<DataT> & { number: number }) {
  const isActive = table.getState().pagination.pageIndex + 1 === number;
  const onClick = () => table.setPageIndex(number - 1);

  return (
    <li>
      <button
        onClick={onClick}
        className={classNames(
          "text-primary-500 inline-flex items-center justify-center rounded-l border border-slate-200 bg-white px-3.5 py-2 leading-5",
          isActive
            ? "bg-primary-500 text-white"
            : "hover:bg-primary-300 text-slate-600 hover:text-white"
        )}
      >
        {number}
      </button>
    </li>
  );
}
export const TablePagination = Object.assign(TablePaginationDefault, {
  Numeric: TablePaginationNumeric,
});
