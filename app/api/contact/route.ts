import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { nom, email, tel, ville, typeCommerce, nomCommerce, services, message, appel, dateAppel, heureAppel, source } = body;

  const contact = {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    nom, email, tel, ville, typeCommerce, nomCommerce, services, message,
    appel: appel || false,
    dateAppel: dateAppel || null,
    heureAppel: heureAppel || null,
    source: source || "Direct",
    statut: "en_attente",
  };

  // Sauvegarde dans Redis
  await redis.lpush("contacts", JSON.stringify(contact));

  // Envoi email (optionnel si configuré)
  if (process.env.GMAIL_USER && process.env.GMAIL_PASS && !process.env.GMAIL_PASS.includes("REMPLACE")) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS },
      });

      const appelBlock = appel
        ? `<tr><td style="padding:10px 0;border-bottom:1px solid #1d1d1f;color:#a1a1a6;font-size:13px;width:160px">📞 Appel réservé</td><td style="padding:10px 0;border-bottom:1px solid #1d1d1f;color:#f5f5f7;font-size:13px;font-weight:600">${dateAppel} à ${heureAppel}</td></tr>`
        : "";

      const html = `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
      <body style="background:#000;color:#f5f5f7;font-family:-apple-system,Helvetica,sans-serif;padding:0;margin:0">
        <div style="max-width:600px;margin:0 auto;padding:40px 24px">
          <p style="font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#2997ff;margin:0 0 8px">UpNow Agency</p>
          <h1 style="font-size:28px;font-weight:700;margin:0 0 32px;color:#f5f5f7">Nouvelle demande de contact</h1>
          <div style="background:#0a0a0a;border:1px solid #1d1d1f;border-radius:16px;padding:28px;margin-bottom:24px">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:10px 0;border-bottom:1px solid #1d1d1f;color:#a1a1a6;font-size:13px;width:160px">Nom</td><td style="padding:10px 0;border-bottom:1px solid #1d1d1f;color:#f5f5f7;font-size:13px;font-weight:600">${nom}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #1d1d1f;color:#a1a1a6;font-size:13px">Email</td><td style="padding:10px 0;border-bottom:1px solid #1d1d1f;font-size:13px"><a href="mailto:${email}" style="color:#2997ff">${email}</a></td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #1d1d1f;color:#a1a1a6;font-size:13px">Téléphone</td><td style="padding:10px 0;border-bottom:1px solid #1d1d1f;color:#f5f5f7;font-size:13px;font-weight:600">${tel || "—"}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #1d1d1f;color:#a1a1a6;font-size:13px">Ville</td><td style="padding:10px 0;border-bottom:1px solid #1d1d1f;color:#f5f5f7;font-size:13px;font-weight:600">${ville || "—"}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #1d1d1f;color:#a1a1a6;font-size:13px">Type de commerce</td><td style="padding:10px 0;border-bottom:1px solid #1d1d1f;color:#f5f5f7;font-size:13px;font-weight:600">${typeCommerce || "—"}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #1d1d1f;color:#a1a1a6;font-size:13px">Nom du commerce</td><td style="padding:10px 0;border-bottom:1px solid #1d1d1f;color:#f5f5f7;font-size:13px;font-weight:600">${nomCommerce || "—"}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #1d1d1f;color:#a1a1a6;font-size:13px">Source</td><td style="padding:10px 0;border-bottom:1px solid #1d1d1f;color:#f5f5f7;font-size:13px;font-weight:600">${source || "Direct"}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #1d1d1f;color:#a1a1a6;font-size:13px">Services</td><td style="padding:10px 0;border-bottom:1px solid #1d1d1f;color:#f5f5f7;font-size:13px">${services || "Non précisé"}</td></tr>
              ${appelBlock}
            </table>
          </div>
          <div style="background:#0a0a0a;border:1px solid #1d1d1f;border-radius:16px;padding:28px;margin-bottom:32px">
            <p style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#6e6e73;margin:0 0 12px">Message</p>
            <p style="font-size:15px;line-height:1.7;color:#f5f5f7;margin:0;white-space:pre-wrap">${message}</p>
          </div>
        </div>
      </body></html>`;

      await transporter.sendMail({
        from: `"UpNow Agency" <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER,
        subject: `📩 Nouveau contact — ${nom}${appel ? " · Appel réservé" : ""}`,
        html,
        replyTo: email,
      });
    } catch (err) {
      console.error("Email error:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
