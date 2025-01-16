"use client";

import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { useState } from "react";

/**
 * Legacy front-end code from Crisis Corner's previous admin page!
 */
export default function ItemRequestsPage() {
  const [item, setItem] = useState<string>("");
  const [itemList, setItemList] = useState<string[]>([]);

  const handleAddItem = (): void => {
    if (item.trim()) {
      setItemList((prevList) => [...prevList, item.trim()]);
      setItem("");
    }
  };

  return (
    <div className="flex flex-col gap-6 items-center mx-auto mt-8 max-w-md">
      <h2 className="font-bold">Approve Items</h2>

      <div className="flex flex-col gap-4 w-full">
        <Input
          type="text"
          placeholder="Type an item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          label="Item"
        />
        <Button onClick={handleAddItem}>Approve</Button>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="underline">Currently approved items:</h3>
        {itemList.length > 0 ? (
          <ul className="pl-5 list-disc">
            {itemList.map((listItem, index) => (
              <li key={index}>{listItem}</li>
            ))}
          </ul>
        ) : (
          "None :("
        )}
      </div>
    </div>
  );
}
