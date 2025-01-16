"use client";
import { NormalizedRequest } from "@/lib/validation/requests";
import {
  CellContext,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Dropdown from "../atoms/Dropdown";
import { RequestStatus } from "@/lib/types/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const columnHelper = createColumnHelper<NormalizedRequest>();

const columns = [
  columnHelper.accessor("requestorName", {
    cell: (info) => info.getValue(),
    header: "Name",
  }),
  columnHelper.accessor("itemRequested", {
    cell: (info) => info.getValue(),
    header: "Item Requested",
  }),
  columnHelper.accessor("createdDate", {
    cell: (info) =>
      `${info.getValue().getMonth() + 1}/${info.getValue().getDate()}/${info.getValue().getFullYear() % 100}`,
    header: "Created",
  }),
  columnHelper.accessor("lastEditedDate", {
    cell: (info) =>
      info.getValue()
        ? `${info.getValue()!.getMonth() + 1}/${info.getValue()!.getDate()}/${info.getValue()!.getFullYear() % 100}`
        : "",
    header: "Updated",
  }),
  columnHelper.accessor("status", {
    cell: (info) => <StatusCell cell={info} />,
    header: "Status",
  }),
];

export default function RequestTable({ data }: { data: NormalizedRequest[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="w-full table-auto">
      <thead className="bg-gray-fill-light border-y border-gray-stroke">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="">
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="p-4 text-sm font-normal text-left text-gray-text"
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="text-sm text-gray-text">
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className="py-2 px-4 border-b border-gray-stroke"
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function StatusCell({
  cell,
}: {
  cell: CellContext<NormalizedRequest, RequestStatus>;
}) {
  const [status, setStatus] = useState(cell.getValue());
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (status: RequestStatus) => {
      fetch("/api/request", {
        method: "PATCH",
        body: JSON.stringify({
          id: cell.row.original.id,
          status,
        }),
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
  });

  return (
    <Dropdown
      value={status}
      onValueChange={(newStatus) => {
        setStatus(newStatus);
        mutation.mutate(newStatus);
      }}
    />
  );
}
