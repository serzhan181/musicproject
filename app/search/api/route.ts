import { sc } from "@/config/soundcloud";
import { NextResponse } from "next/server";

const allowedTypes = ["tracks", "playlists"] as const;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const query = searchParams.get("q");
  const type =
    (searchParams.get("type") as (typeof allowedTypes)[number]) || "tracks";

  if (!allowedTypes.includes(type) || !query) {
    return new Response("Type or query not provided", { status: 400 });
  }

  let res;

  if (type === "playlists") {
    res = await sc.playlists.searchV2({ q: query });
  } else if (type === "tracks") {
    res = await sc.tracks.searchV2({ q: query });
  }

  return NextResponse.json({
    res,
  });
}
