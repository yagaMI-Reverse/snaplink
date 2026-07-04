import { NextRequest, NextResponse } from "next/server";
import { customAlphabet } from "nanoid";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

// URL-safe, unambiguous alphabet (no 0/O/1/l/I) for readable slugs.
const makeSlug = customAlphabet("23456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ", 6);

export async function POST(req: NextRequest) {
  let url = "";
  try {
    ({ url } = await req.json());
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  url = (url || "").trim();

  // Accept bare domains by prefixing https://
  if (url && !/^https?:\/\//i.test(url)) url = `https://${url}`;
  let parsed: URL;
  try {
    parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) throw new Error();
  } catch {
    return NextResponse.json({ error: "Please enter a valid URL" }, { status: 400 });
  }

  // Retry a couple of times in the unlikely event of a slug collision.
  for (let attempt = 0; attempt < 3; attempt++) {
    const slug = makeSlug();
    const exists = await prisma.link.findUnique({ where: { slug }, select: { id: true } });
    if (exists) continue;
    const link = await prisma.link.create({ data: { slug, url: parsed.toString() } });
    const base = process.env.NEXT_PUBLIC_BASE_URL ?? new URL(req.url).origin;
    return NextResponse.json({ slug: link.slug, url: link.url, short: `${base}/${link.slug}` }, { status: 201 });
  }
  return NextResponse.json({ error: "Could not generate a link, try again" }, { status: 500 });
}
