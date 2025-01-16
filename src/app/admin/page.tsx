"use client";
import Pagination from "@/components/molecules/Pagination";
import RequestTable from "@/components/tables/RequestTable";
import { PAGINATION_PAGE_SIZE } from "@/lib/constants/config";
import { RequestStatus } from "@/lib/types/request";
import { requestsSchema } from "@/lib/validation/requests";
import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, parseAsStringEnum, useQueryState } from "nuqs";
import { z } from "zod";

export default function ItemRequestsPage() {
  const [status, setStatus] = useQueryState(
    "status",
    parseAsStringEnum<RequestStatus | "all">([
      ...Object.values(RequestStatus),
      "all",
    ]).withDefault("all"),
  );

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const requestData = useQuery({
    queryKey: ["requests", status, page] as const,
    queryFn: async ({ queryKey: [_r, status] }) => {
      const searchParams = new URLSearchParams();
      if (status !== "all") searchParams.set("status", status);
      searchParams.set("page", page.toString());

      const req = await fetch("/api/request?" + searchParams.toString());
      return requestsSchema.array().parse(await req.json());
    },
  });

  const requestCount = useQuery({
    queryKey: ["requests", "count", status],
    queryFn: async ({ queryKey: [_r, _c, status] }) => {
      const searchParams = new URLSearchParams();
      if (status !== "all") searchParams.set("status", status);

      const req = await fetch("/api/request/count?" + searchParams.toString());
      // infallible & just for types
      return z.object({ count: z.coerce.number() }).parse(await req.json())
        .count;
    },
  });

  return (
    <div className="">
      <h2 className="p-6">Item Requests</h2>
      <RequestsTabs status={status} setStatus={setStatus} setPage={setPage} />
      <RequestTable data={requestData.data || []} />
      <div className="flex justify-end py-4 px-12 w-full">
        <Pagination
          pageNumber={page}
          pageSize={PAGINATION_PAGE_SIZE}
          totalRecords={requestCount.data || 0}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}

const requestsTabs = [
  {
    value: "all" as const,
    name: "All",
  },
  {
    value: RequestStatus.PENDING,
    name: "Pending",
  },
  {
    value: RequestStatus.APPROVED,
    name: "Approved",
  },
  {
    value: RequestStatus.COMPLETED,
    name: "Completed",
  },
  {
    value: RequestStatus.REJECTED,
    name: "Rejected",
  },
];

function RequestsTabs({
  status,
  setStatus,
  setPage,
}: {
  status: RequestStatus | "all";
  setStatus: (req: RequestStatus | "all") => any;
  setPage: (page: number) => void;
}) {
  return (
    <div className="flex flex-row gap-x-2 px-6">
      {requestsTabs.map(({ value, name }) => (
        <button
          key={value}
          className="py-4 px-6 data-[selected=true]:bg-primary data-[selected=true]:text-white  bg-gray-fill text-gray-text rounded-t-md"
          data-selected={status === value}
          onClick={() => {
            setStatus(value);
            setPage(1);
          }}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
