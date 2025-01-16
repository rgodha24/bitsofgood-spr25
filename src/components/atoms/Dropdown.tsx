import { RequestStatus } from "@/lib/types/request";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon, Dot } from "lucide-react";

export interface DropdownProps {
  value: RequestStatus;
  onValueChange: (value: RequestStatus) => void;
}

export default function Dropdown({
  value: status,
  onValueChange,
}: DropdownProps) {
  return (
    <Select.Root value={status} onValueChange={onValueChange}>
      <Select.Trigger
        className="flex flex-row gap-x-4 items-center p-2 rounded-md border border-gray-stroke hover:bg-primary-fill"
        aria-label="Status"
      >
        <Select.Value asChild>
          <div
            className={`flex flex-row rounded-full w-min pr-4 items-center ${statusToStyles[status][0]}`}
          >
            <Dot className={`-mr-1 w-8 h-8 ${statusToStyles[status][1]}`} />
            <p className="text-xs">{statusToName[status]}</p>
          </div>
        </Select.Value>
        <Select.Icon className="stroke-gray-text" asChild>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className="relative z-50 p-2 bg-white rounded-xl shadow-lg w-[var(--radix-select-trigger-width)]"
          position="popper"
        >
          <Select.Viewport>
            <Select.Group className="flex flex-col gap-y-2 pl-1 first:pt-1">
              <SelectItem status={RequestStatus.PENDING} />
              <SelectItem status={RequestStatus.APPROVED} />
              <SelectItem status={RequestStatus.COMPLETED} />
              <SelectItem status={RequestStatus.REJECTED} />
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

const statusToName: Record<RequestStatus, string> = {
  pending: "Pending",
  approved: "Approved",
  completed: "Completed",
  rejected: "Rejected",
};

const statusToStyles: Record<RequestStatus, [string, string]> = {
  pending: ["bg-negative-fill text-negative-text", "text-negative-indicator"],
  approved: ["bg-warning-fill text-warning-text", "text-warning-indicator"],
  completed: ["bg-success-fill text-success-text", "text-success-indicator"],
  rejected: ["bg-danger-fill text-danger-text", "text-danger-indicator"],
};

function SelectItem({ status }: { status: RequestStatus }) {
  return (
    <Select.Item
      className={`flex flex-row rounded-full w-min pr-4 items-center text-xs ${statusToStyles[status][0]}`}
      value={status}
    >
      <Dot className={`-mr-1 w-8 h-8 ${statusToStyles[status][1]}`} />
      <Select.ItemText className="text-xs">
        {statusToName[status]}
      </Select.ItemText>
    </Select.Item>
  );
}
