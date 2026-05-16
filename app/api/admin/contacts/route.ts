import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "upnow2025";

function auth(req: NextRequest) {
  return req.headers.get("x-admin-password") === ADMIN_PASSWORD;
}

// GET — tous les contacts
export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const raw = await redis.lrange("contacts", 0, -1);
  const contacts = raw.map((item) => typeof item === "string" ? JSON.parse(item) : item);
  return NextResponse.json(contacts);
}

// PATCH — modifier le statut
export async function PATCH(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const { id, statut } = await req.json();
  const raw = await redis.lrange("contacts", 0, -1);
  const contacts = raw.map((item) => typeof item === "string" ? JSON.parse(item) : item);
  const idx = contacts.findIndex((c: { id: string }) => c.id === id);
  if (idx === -1) return NextResponse.json({ error: "Introuvable" }, { status: 404 });
  contacts[idx].statut = statut;
  await redis.lset("contacts", idx, JSON.stringify(contacts[idx]));
  return NextResponse.json({ ok: true });
}

// DELETE — supprimer un contact
export async function DELETE(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const { id } = await req.json();
  const raw = await redis.lrange("contacts", 0, -1);
  const contacts = raw.map((item) => typeof item === "string" ? JSON.parse(item) : item);
  const filtered = contacts.filter((c: { id: string }) => c.id !== id);
  await redis.del("contacts");
  if (filtered.length > 0) {
    await redis.rpush("contacts", ...filtered.map((c: unknown) => JSON.stringify(c)));
  }
  return NextResponse.json({ ok: true });
}
