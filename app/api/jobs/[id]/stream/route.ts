export const runtime = "edge";
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const base = process.env.NEXT_PUBLIC_API_BASE!;
  const upstream = await fetch(`${base}/v1/jobs/${params.id}/stream`, { headers: { Accept: "text/event-stream" } });
  const body = upstream.body; if (!body) return new Response("No stream", { status: 502 });
  return new Response(body, { status: 200, headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", "Connection": "keep-alive" } });
}
