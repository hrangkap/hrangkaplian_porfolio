import { NextResponse } from "next/server";

// In production, this resets on cold starts. For a portfolio site this is acceptable.
// For persistent storage, use Vercel KV or a database.
const countedDevices = new Set<string>();
let visitorCount = 0;
let initialized = false;

async function initCount() {
  if (initialized) return;
  try {
    const res = await fetch(
      "https://hits.dwyl.com/hrangkaplian/hrangkaplian-unique-visitors.json",
      { cache: "no-store" }
    );
    const data = await res.json();
    const num = parseInt(data.message, 10);
    if (!isNaN(num)) visitorCount = num;
  } catch {
    // Start from 0 if fetch fails
  }
  initialized = true;
}

// GET - returns current count
export async function GET() {
  await initCount();
  return NextResponse.json({ count: visitorCount });
}

// POST - increment only if deviceId is new
export async function POST(request: Request) {
  await initCount();

  try {
    const body = await request.json();
    const deviceId = body.deviceId as string;

    if (deviceId && !countedDevices.has(deviceId)) {
      countedDevices.add(deviceId);
      // Increment the persistent counter
      try {
        const res = await fetch(
          "https://hits.dwyl.com/hrangkaplian/hrangkaplian-unique-visitors.json",
          { cache: "no-store" }
        );
        const data = await res.json();
        const num = parseInt(data.message, 10);
        if (!isNaN(num)) visitorCount = num;
      } catch {
        visitorCount++;
      }
    }
  } catch {
    // Invalid body, just return current count
  }

  return NextResponse.json({ count: visitorCount });
}
