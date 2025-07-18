// import {
//   getCoreRowModel,
//   getExpandedRowModel,
//   getFilteredRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import React from "react";

// const base_url = process.env.VITE.
// function PendingRecharge() {
//     const columns = [
//       {
//         header: "ID",
//         accessorKey: "id",
//         size: 60,
//       },
//       {
//         header: "Account",
//         accessorKey: "phone",
//         size: 120,
//       },
//       {
//         header: "Type",
//         accessorKey: "type",
//         size: 100,
//       },
//       {
//         header: "Amount",
//         accessorKey: "money",
//         size: 80,
//       },
//       {
//         header: "Transaction ID",
//         accessorKey: "id_order",
//         size: 150,
//       },
//       {
//         header: "Proof",
//         accessorKey: "url",
//         cell: ({ getValue }) => {
//           const value = getValue();

//           return (
//             <>
//               {" "}
//               <img
//                 src={`${base_url}${value}`}
//                 alt="Proof"
//                 className="w-25 object-cover rounded"
//                 onClick={() => showImageModal(`${base_url}${value}`)}
//               />
//               <p
//                 className="text-primary mt-1"
//                 style={{ cursor: "pointer" }}
//                 onClick={() => openImageModal(`${base_url}${value}`)}
//               >
//                 View
//               </p>
//             </>
//           );
//         },
//       },
//       {
//         header: "Status",
//         accessorKey: "status",
//         cell: ({ getValue }) => {
//           const value = getValue();
//           const bgColor =
//             value === 1
//               ? "bg-success"
//               : value === "Pending"
//               ? "bg-warning text-info"
//               : "bg-danger text-info";
//           return (
//             <span
//               className={`px-2 py-1 rounded-full text-sm rounded-pill ${bgColor}`}
//             >
//               {value === 1 ? "Success" : "Rejected"}
//             </span>
//           );
//         },
//       },
//       {
//         header: "Time",
//         accessorKey: "time",
//         size: 160,
//         cell: ({ getValue }) => timerJoin(getValue()),
//       },
//     ];

//   const table = useReactTable({
//     columns,
//     data,
//     getCoreRowModel: getCoreRowModel(),
//     getExpandedRowModel: getExpandedRowModel(),
//     getFilteredRowModel:getFilteredRowModel()
//   });
//   return <div></div>;
// }

// export default PendingRecharge;

"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@radix-ui/react-checkbox";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const data = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@example.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@example.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@example.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@example.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@example.com",
  },
];

// Column definitions
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
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ getValue }) => <span>{getValue()}</span>,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ getValue }) => <span>${getValue()}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => <span>{getValue()}</span>,
  },
];

function PendingRecharge() {
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
  });

  return (
    <div>
      <div className="flex items-center justify-content-between">
        <input />
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-4">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default PendingRecharge;
