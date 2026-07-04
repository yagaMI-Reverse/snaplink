import { PrismaClient } from "@prisma/client";

// Seeds a few demo links with realistic click history so the dashboard is
// alive on first load. Safe to re-run: it clears prior seed data first.
const prisma = new PrismaClient();

const LINKS = [
  { slug: "gh-repo", url: "https://github.com/yagaMI-Reverse/snaplink" },
  { slug: "launch", url: "https://news.ycombinator.com/" },
  { slug: "docs", url: "https://www.prisma.io/docs" },
  { slug: "promo", url: "https://www.producthunt.com/" },
];
const COUNTRIES = ["US", "GB", "DE", "KZ", "IN", "CA", "FR", "BR"];
const DEVICES = ["Desktop", "Mobile", "Mobile", "Tablet"];
const REFERRERS = ["Direct", "twitter.com", "google.com", "linkedin.com", "github.com", "reddit.com"];

const pick = <T,>(a: T[], i: number) => a[i % a.length];

async function main() {
  await prisma.click.deleteMany();
  await prisma.link.deleteMany();

  let seed = 7;
  const rnd = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;

  for (let li = 0; li < LINKS.length; li++) {
    const link = await prisma.link.create({ data: LINKS[li] });
    const total = 30 + Math.floor(rnd() * 90);
    const clicks = [];
    for (let i = 0; i < total; i++) {
      const daysAgo = Math.floor(rnd() * 14);
      clicks.push({
        linkId: link.id,
        country: pick(COUNTRIES, Math.floor(rnd() * COUNTRIES.length)),
        device: pick(DEVICES, Math.floor(rnd() * DEVICES.length)),
        referrer: pick(REFERRERS, Math.floor(rnd() * REFERRERS.length)),
        createdAt: new Date(Date.now() - daysAgo * 86400000 - Math.floor(rnd() * 86400000)),
      });
    }
    await prisma.click.createMany({ data: clicks });
  }
  console.log("Seeded", LINKS.length, "links with click history.");
}

main().finally(() => prisma.$disconnect());
