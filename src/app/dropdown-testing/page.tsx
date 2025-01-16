"use client";

import Dropdown from "@/components/atoms/Dropdown";
import { RequestStatus } from "@/lib/types/request";
import { useState } from "react";

export default function DropdownTesting() {
  const [status, setStatus] = useState(RequestStatus.REJECTED);
  return (
    <div className="flex flex-col gap-6 items-center mx-auto mt-8 max-w-md">
      <Dropdown value={status} onValueChange={(s) => setStatus(s)} />
    </div>
  );
}
