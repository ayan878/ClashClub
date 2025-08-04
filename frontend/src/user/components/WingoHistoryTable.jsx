// import { Table } from "@/components/ui/table";
// import { useQuery } from "@tanstack/react-query";
// import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
// import React from "react";

// function WingoHistoryTable() {
//   const fetchWingoHistory = async () => {
//     const response = await fetch("http://localhost:3000/api/wingo-history", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       // credentials: "include", // if you need cookies/session
//     });

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     return response.json();
//   };

//   const { data, isError, isLoading } = useQuery({
//     queryKey: ["wingo"],
//     queryFn: fetchWingoHistory,
//     refetchOnWindowFocus: true,
//   });

//   console.log("history", data);

//   const columns = [
//     {
//       accessKey: "peroid",
//       header: "Peroid",
//     },
//     { accessKey: "result", header: "Number" },
//     {
//       accessorFn: (row) => (row.result >= 5 ? "Big" : "Small"),
//       id: "size",
//       header: "Big/Small",
//     },
//     {
//       accessorFn: (row) => {
//         row.result === 0 || row.result === 0
//           ? "Voilet"
//           : row.result % 2 === 0
//           ? "Red"
//           : "Green";
//       },
//       id: "color",
//       header: "Color",
//     },
//   ];

//   const table = useReactTable({
//     columns,
//     data,
//     getCoreRowModel: getCoreRowModel(),
//   });
//   return (
//     <Table className="w-full">
//       {table.getHeaderGroups().map((headerGroup) => (
//         <TableRow key={headerGroup.id}>
//           {headerGroup.headers.map((header) => (
//             <TableHead key={header.id} colSpan={header.colSpan}>
//               flexRender( header.column.columnDef.header, header.getContext() )
//             </TableHead>
//           ))}
//         </TableRow>
//       ))}
//     </Table>
//   );
// }

// export default WingoHistoryTable;


import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";

import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@/components/ui/table";

function WingoHistoryTable() {
  const fetchWingoHistory = async () => {
    const response = await fetch("http://localhost:3000/api/wingo-history", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // credentials: "include", // use if needed
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  };

  const {
    data = [],
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["wingo"],
    queryFn: fetchWingoHistory,
    refetchOnWindowFocus: true,
  });

  const columns = [
    {
      accessorKey: "period",
      header: "Period",
    },
    {
      accessorKey: "result",
      header: "Number",
    },
    {
      accessorFn: (row) => (row.result >= 5 ? "Big" : "Small"),
      id: "size",
      header: "Big/Small",
    },
    {
      accessorFn: (row) => {
        if (row.result === 0) return "Voilet";
        return row.result % 2 === 0 ? "Red" : "Green";
      },
      id: "color",
      header: "Color",
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data.</div>;

  console.log(data);
  

  return (
    <Table className="w-full">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id} colSpan={header.colSpan}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default WingoHistoryTable;
