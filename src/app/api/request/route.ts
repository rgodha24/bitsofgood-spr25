import { ServerResponseBuilder } from "@/lib/builders/serverResponseBuilder";
import { ResponseType } from "@/lib/types/apiResponse";
import { RequestStatus } from "@/lib/types/request";
import { requestsSchemaWithoutId } from "@/lib/validation/requests";
import { createRequest, getRequests } from "@/server/db";
import { z, ZodError } from "zod";

export async function PUT(request: Request) {
  try {
    const json = await request.json();
    const { requestorName, itemRequested } = requestsSchemaWithoutId
      .pick({
        requestorName: true,
        itemRequested: true,
      })
      .parse(json);

    const normalizedRequest = await createRequest({
      requestorName,
      itemRequested,
      createdDate: new Date(),
      lastEditedDate: new Date(),
      status: RequestStatus.PENDING,
    });

    return Response.json(normalizedRequest, { status: 201 });
  } catch (e) {
    console.error(e);
    if (e instanceof ZodError) {
      return new ServerResponseBuilder(ResponseType.INVALID_INPUT).build();
    }
    return new ServerResponseBuilder(ResponseType.UNKNOWN_ERROR).build();
  }
}

export async function GET(request: Request) {
  try {
    const querySchema = z.object({
      status: z.nativeEnum(RequestStatus).optional(),
      page: z.coerce.number().default(1),
    });
    const { page, status } = querySchema.parse(
      Object.fromEntries(new URL(request.url).searchParams),
    );

    return Response.json(await getRequests({ page, status }));
  } catch (e) {
    console.error(e);
    if (e instanceof ZodError) {
      return new ServerResponseBuilder(ResponseType.INVALID_INPUT).build();
    }
    return new ServerResponseBuilder(ResponseType.UNKNOWN_ERROR).build();
  }
}
