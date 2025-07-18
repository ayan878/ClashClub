"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, MoreHorizontal, MoveDown, MoveUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { fetchDeposite } from "../api/depositApi";

const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
    minSize: 20,
    maxSize: 50,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          className="flex items-center gap-1 uppercase"
          onClick={() => column.toggleSorting(isSorted === "asc")}
        >
          ID
          <span className="flex flex-row leading-none">
            <MoveUp
              className={`h-3 w-3 transition-opacity ${
                isSorted === "asc" ? "text-blue-500" : "opacity-50"
              }`}
            />
            <MoveDown
              className={`h-3 w-3 -ml-2 -mt-0.5 transition-opacity ${
                isSorted === "desc" ? "text-blue-500" : "opacity-50"
              }`}
            />
          </span>
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize text-center">{row.getValue("id")}</div>,
    size: 40,
    minSize: 80,
    maxSize: 100,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          className="flex items-center gap-1 uppercase"
          onClick={() => column.toggleSorting(isSorted === "asc")}
        >
          Phone
          <span className="flex flex-row leading-none">
            <MoveUp
              className={`h-3 w-3 transition-opacity ${
                isSorted === "asc" ? "text-blue-500" : "opacity-50"
              }`}
            />
            <MoveDown
              className={`h-3 w-3 -ml-2 -mt-0.5 transition-opacity ${
                isSorted === "desc" ? "text-blue-500" : "opacity-50"
              }`}
            />
          </span>
        </Button>
      );
    },
    cell: ({ row }) => <div className="text-center">{row.getValue("phone")}</div>,
    size: 110,
    minSize: 100,
    maxSize: 120,
  },
  {
    accessorKey: "id_order",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          className="flex items-center gap-1 uppercase"
          onClick={() => column.toggleSorting(isSorted === "asc")}
        >
          Transaction ID
          <span className="flex flex-row leading-none">
            <MoveUp
              className={`h-3 w-3 transition-opacity ${
                isSorted === "asc" ? "text-blue-500" : "opacity-50"
              }`}
            />
            <MoveDown
              className={`h-3 w-3 -ml-2 -mt-0.5 transition-opacity ${
                isSorted === "desc" ? "text-blue-500" : "opacity-50"
              }`}
            />
          </span>
        </Button>
      );
    },
    cell: ({ getValue }) => <div>{getValue()}</div>,
    size: 120,
    minSize: 100,
    maxSize: 300,
  },
  {
    accessorKey: "utr",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          className="flex items-center gap-1 uppercase"
          onClick={() => column.toggleSorting(isSorted === "asc")}
        >
          UTR
          <span className="flex flex-row leading-none">
            <MoveUp
              className={`h-3 w-3 transition-opacity ${
                isSorted === "asc" ? "text-blue-500" : "opacity-50"
              }`}
            />
            <MoveDown
              className={`h-3 w-3 -ml-2 -mt-0.5 transition-opacity ${
                isSorted === "desc" ? "text-blue-500" : "opacity-50"
              }`}
            />
          </span>
        </Button>
      );
    },
    cell: ({ getValue }) => <div>{getValue()}</div>,
    size: 140,
    minSize: 100,
    maxSize: 280,
  },
  {
    accessorKey: "type",
    header: "TYPE",
    cell: ({ getValue }) => <div>{getValue()}</div>,
    size: 100,
    minSize: 80,
    maxSize: 200,
  },
  {
    accessorKey: "money",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          className="flex items-center gap-1 uppercase"
          onClick={() => column.toggleSorting(isSorted === "asc")}
        >
          Amount
          <span className="flex flex-row leading-none">
            <MoveUp
              className={`h-3 w-3 transition-opacity ${
                isSorted === "asc" ? "text-blue-500" : "opacity-50"
              }`}
            />
            <MoveDown
              className={`h-3 w-3 -ml-2 -mt-0.5 transition-opacity ${
                isSorted === "desc" ? "text-blue-500" : "opacity-50"
              }`}
            />
          </span>
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("money"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
    size: 120,
    minSize: 80,
    maxSize: 300,
  },
  {
    accessorKey: "time",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          className="flex items-center gap-1 uppercase"
          onClick={() => column.toggleSorting(isSorted === "asc")}
        >
          Time
          <span className="flex flex-row leading-none">
            <MoveUp
              className={`h-3 w-3 transition-opacity ${
                isSorted === "asc" ? "text-blue-500" : "opacity-50"
              }`}
            />
            <MoveDown
              className={`h-3 w-3 -ml-2 -mt-0.5 transition-opacity ${
                isSorted === "desc" ? "text-blue-500" : "opacity-50"
              }`}
            />
          </span>
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const timestamp = parseInt(getValue());
      const time = new Date(timestamp);
      return <div>{time.toLocaleString()}</div>;
    },
    size: 160,
    minSize: 100,
    maxSize: 240,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    size: 60,
    minSize: 40,
    maxSize: 100,
  },
];

export function DepositHistory() {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const { data, isLoading, error } = useQuery({
    queryKey: ["depositHistory"],
    queryFn: fetchDeposite,
    refetchOnWindowFocus: true,
  });

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    enableColumnResizing: true,
    columnResizeMode: "onChange",
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full p-4">
      <style jsx>{`
        .resizable-table {
          table-layout: fixed;
          width: 100%;
        }
      `}</style>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter IDs..."
          value={table.getColumn("id")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("id")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table className="resizable-table">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="text-center">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{
                      width: header.getSize(),
                      position: "relative",
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {header.column.getCanResize() && (
                      <div
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className="absolute right-0 top-0 h-full w-0.5 cursor-col-resize select-none bg-gray-200 hover:bg-blue-400"
                        style={{ touchAction: "none" }}
                      />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
