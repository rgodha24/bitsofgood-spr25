import { PAGINATION_PAGE_SIZE } from "@/lib/constants/config";
import { RequestStatus } from "@/lib/types/request";
import {
  NormalizedRequest,
  requestsSchema,
  type RequestNoId,
} from "@/lib/validation/requests";
import { MongoClient, ObjectId } from "mongodb";
import { z } from "zod";

console.log(process.env.MONGO_URI);
if (!process.env.MONGO_URI) throw new Error("Mongo URI env variable isn't set");

const client = await MongoClient.connect(process.env.MONGO_URI);
const db = client.db("crisis_compass");

const requests = db.collection("requests");

export async function createRequest(r: RequestNoId) {
  const { insertedId: _id } = await requests.insertOne(r);
  // this parse should never fail. its just to get the return types correct
  return requestsSchema.parse({ ...r, _id });
}

export async function getRequests({
  page,
  status,
}: {
  /** the 1 indexed page */
  page: number;
  status?: RequestStatus;
}) {
  const data = await requests
    .find(!!status ? { status } : {})
    .sort("createdDate", -1)
    .skip((page - 1) * PAGINATION_PAGE_SIZE)
    .limit(PAGINATION_PAGE_SIZE)
    .toArray();

  // again: infallible & just for types
  return z.array(requestsSchema).parse(data);
}

export async function updateRequest({
  id,
  status,
}: Pick<NormalizedRequest, "id" | "status">) {
  await requests.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        status,
        lastEditedDate: new Date(),
      },
    },
  );
}
