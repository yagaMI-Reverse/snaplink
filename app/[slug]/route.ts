import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { countryFromHeaders, deviceFromUA, referrerHost } from "@/lib/detect";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Resolve a short slug → log the click → 302 to the target URL. */
export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const link = await prisma.link.findUnique({ where: { slug: params.slug } });
  if (!link) {
    return NextResponse.redirect(new URL("/?notfound=1", req.url), 302);
  }

  // Log the click without blocking the redirect on any analytics hiccup.
  try {
    await prisma.click.create({
      data: {
        linkId: link.id,
        country: countryFromHeaders(req),
        device: deviceFromUA(req.headers.get("user-agent") ?? ""),
        referrer: referrerHost(req.headers.get("referer")),
      },
    });
  } catch {
    /* analytics failure must never break the redirect */
  }

  return NextResponse.redirect(link.url, 302);
}
