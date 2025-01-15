import { z } from "zod";
import { RequestStatus } from "../types/request";
import { ObjectId } from "mongodb";

export const requestsSchemaWithoutId = z.object({
  requestorName: z.string().min(3).max(30),
  itemRequested: z.string().min(2).max(100),
  createdDate: z.coerce.date(),
  lastEditedDate: z.coerce.date().optional(),
  status: z.nativeEnum(RequestStatus),
});

// we can either have `request` sent into the API with a string id, or a `request` from MongoDB with an ObjectId _id
export const requestsSchema = requestsSchemaWithoutId.and(
  z
    .object({ id: z.string() })
    .or(z.object({ _id: z.instanceof(ObjectId) }))
    .transform((it) => ("id" in it ? it : { id: it._id.toString() })),
);

export type NormalizedRequest = z.output<typeof requestsSchema>;
export type RequestNoId = z.input<typeof requestsSchemaWithoutId>;
