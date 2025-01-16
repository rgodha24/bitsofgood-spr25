import { ServerResponseBuilder } from "@/lib/builders/serverResponseBuilder";
import { ResponseType } from "@/lib/types/apiResponse";
import { RequestStatus } from "@/lib/types/request";
import { countRequests } from "@/server/db";
import { z, ZodError } from "zod";

export async function GET(request: Request) {
  try {
    const querySchema = z.object({
      status: z.nativeEnum(RequestStatus).optional(),
    });
    const { status } = querySchema.parse(
      Object.fromEntries(new URL(request.url).searchParams),
    );

    return Response.json({ count: await countRequests({ status }) });
  } catch (e) {
    console.error(e);
    if (e instanceof ZodError) {
      return new ServerResponseBuilder(ResponseType.INVALID_INPUT).build();
    }
    return new ServerResponseBuilder(ResponseType.UNKNOWN_ERROR).build();
  }
}
