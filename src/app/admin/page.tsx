"use client";
import RequestTable from "@/components/tables/RequestTable";
import { requestsSchema } from "@/lib/validation/requests";
import { useQuery } from "@tanstack/react-query";

export default function ItemRequestsPage() {
  const query = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const req = await fetch("/api/request");
      const data = await req.json();
      console.log(data);
      return requestsSchema.array().parse(data);
    },
  });
  return (
    <div className="">
      <h2 className="py-12">Item Requests</h2>
      <RequestTable data={query.data || []} />
    </div>
  );
}
