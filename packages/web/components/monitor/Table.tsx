"use client";
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo } from "react";
import {
  JsonParam,
  NumberParam,
  useQueryParam,
  useQueryParams,
  withDefault,
} from "use-query-params";
import { Hooks } from "../../hooks";
import { NavLink } from "react-router-dom";
import { Routing } from "../../constants";

type ApplicationTableProps = {
  //   data?: OrgEntity[];
  //   type?: OrgType | -2 | -1; // -2: all, -1: others
  search?: string;
};

export function OrgTable({ type, search, data }: ApplicationTableProps) {
  //   const [pagination, setPagination] = useQueryParams(DEFAULT_PAGINATION);
  //   const [sorting, setSorting] = useQueryParam("s", DEFAULT_SORTING);

  const navigate = Hooks.useNavigate();

  const tableData =
    useMemo(
      () =>
        data?.filter(
          (org) =>
            type === -2 ||
            org.teamType === type ||
            (type === -1 &&
              [
                OrgType.Internal,
                OrgType.Archived,
                OrgType.Inactive,
                OrgType.Micro,
              ].includes(org.teamType))
        ),
      [data, type]
    ) || [];

  const table = useReactTable({
    columns: useColl({
      onRechargeClick: async (id) => {
        navigate.toOrg(id + "/recharge");
      },
      onViewClick: async (id) => {
        navigate.toOrg(id);
      },
      loading: false,
    }),

    data: tableData,
    initialState: {
      pagination,
      sorting,
    },
    state: {
      pagination,
      sorting,
    },
    pageCount: data ? Math.ceil(tableData.length / pagination.pageSize) : -1,
    enableMultiSort: true,

    // Models
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
  });

  useEffect(() => {
    table.resetPagination();
  }, [type, search, table]);

  if (!data) return null;

  return (
    <>
      <DataDisplay.Table title="Orgs" table={table} />
      <DataDisplay.Table.Pagination table={table} />
    </>
  );
}

const columnHelper = createColumnHelper<OrgEntity>();
type UseCollProps = {
  onRechargeClick: (id: number) => Promise<void>;
  onViewClick: (id: number) => Promise<void>;
  loading: boolean;
};

const useColl = ({ onRechargeClick, onViewClick, loading }: UseCollProps) => {
  const columns = [
    columnHelper.accessor("id", {
      header: "Id",
      size: 30,
    }),
    columnHelper.accessor("teamName", {
      header: "Name",
      cell: ({ getValue, row }) => (
        <NavLink to={Routing.org.details(row.original.teamId)}>
          <DataDisplay.Table.TitleCell value={getValue()} />
        </NavLink>
      ),
      size: 200,
    }),
    columnHelper.accessor("adminEmail", {
      header: "Email",
    }),
  ];

  return columns;
};
