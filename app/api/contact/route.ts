import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

function buildCalendarLink(nom: string, dateAppel: string, heureAppel: string) {
  // dateAppel format: "Lun 19/5", heureAppel: "10:00"
  // On construit une date pour Google Agenda
  const parts = dateAppel.split(" "); // ["Lun", "19/5"]
  const dayParts = parts[1]?.split("/"); // ["19", "5"]
  if (!dayParts) return null;
  const day = dayParts[0].padStart(2, "0");
  const month = dayParts[1].padStart(2, "0");
  const year = new Date().getFullYear();
  const [hour, minute] = heureAppel.split(":");
  const start = `${year}${month}${day}T${hour}${minute}00`;
  const endHour = String(parseInt(hour) + 1).padStart(2, "0");
  const end = `${year}${month}${day}T${endHour}${minute}00`;
  const title = encodeURIComponent(`📞 Appel client — ${nom}`);
  const details = encodeURIComponent(`Appel réservé via upnow-agency.vercel.app`);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}`;
}

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

  await redis.lpush("contacts", JSON.stringify(contact));

  if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS },
      });

      const calendarLink = appel && dateAppel && heureAppel ? buildCalendarLink(nom, dateAppel, heureAppel) : null;

      const appelBlock = appel ? `
        <tr><td style="padding:10px 0;border-bottom:1px solid #1d1d1f;color:#a1a1a6;font-size:13px;width:160px">📞 Appel réservé</td>
        <td style="padding:10px 0;border-bottom:1px solid #1d1d1f;color:#f5f5f7;font-size:13px;font-weight:600">${dateAppel} à ${heureAppel}</td></tr>
      ` : "";

      const calendarButton = calendarLink ? `
        <div style="text-align:center;margin-top:24px">
          <a href="${calendarLink}" target="_blank" style="display:inline-block;background:#2997ff;color:#fff;text-decoration:none;padding:14px 28px;border-radius:980px;font-size:15px;font-weight:600">
            📅 Ajouter à Google Agenda
          </a>
        </div>
      ` : "";

      const html = `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
      <body style="background:#000;color:#f5f5f7;font-family:-apple-system,Helvetica,sans-serif;padding:0;margin:0">
        <div style="max-width:600px;margin:0 auto;padding:40px 24px">
          <p style="font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#2997ff;margin:0 0 8px">UpNow Agency</p>
          <h1 style="font-size:28px;font-weight:700;margin:0 0 32px;color:#f5f5f7">
            ${appel ? "📞 Appel réservé" : "Nouvelle demande de contact"}
          </h1>
          <div style="background:#0a0a0a;border:1px solid #1d1d1f;border-radius:16px;padding:28px;margin-bottom:24px">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:10px 0;border-bottom:1px solid #1d1d1f;color:#a1a1a6;font-size:13px;width:160px">Nom</td><td style="padding:10px 0;border-bottom:1px solid #1d1d1f;color:#f5f5f7;font-size:13px;font-weight:600">${nom}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #1d1d1f;color:#a1a1a6;font-size:13px">Email</td><td style="padding:10px 0;border-bottom:1px solid #1d1d1f;font-size:13px"><a href="mailto:${email}" style="color:#2997ff">${email}</a></td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #1d1d1f;color:#a1a1a6;font-size:13px">Téléphone</td><td style="padding:10px 0;border-bottom:1px solid #1d1d1f;color:#f5f5f7;font-size:13px;font-weight:600"><a href="tel:${tel}" style="color:#f5f5f7">${tel || "—"}</a></td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #1d1d1f;color:#a1a1a6;font-size:13px">Ville</td><td style="padding:10px 0;border-bottom:1px solid #1d1d1f;color:#f5f5f7;font-size:13px;font-weight:600">${ville || "—"}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #1d1d1f;color:#a1a1a6;font-size:13px">Type de commerce</td><td style="padding:10px 0;border-bottom:1px solid #1d1d1f;color:#f5f5f7;font-size:13px;font-weight:600">${typeCommerce || "—"}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #1d1d1f;color:#a1a1a6;font-size:13px">Nom du commerce</td><td style="padding:10px 0;border-bottom:1px solid #1d1d1f;color:#f5f5f7;font-size:13px;font-weight:600">${nomCommerce || "—"}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #1d1d1f;color:#a1a1a6;font-size:13px">Source</td><td style="padding:10px 0;border-bottom:1px solid #1d1d1f;color:#f5f5f7;font-size:13px;font-weight:600">${source || "Direct"}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #1d1d1f;color:#a1a1a6;font-size:13px">Services</td><td style="padding:10px 0;border-bottom:1px solid #1d1d1f;color:#f5f5f7;font-size:13px">${services || "Non précisé"}</td></tr>
              ${appelBlock}
            </table>
          </div>
          <div style="background:#0a0a0a;border:1px solid #1d1d1f;border-radius:16px;padding:28px;margin-bottom:24px">
            <p style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#6e6e73;margin:0 0 12px">Message</p>
            <p style="font-size:15px;line-height:1.7;color:#f5f5f7;margin:0;white-space:pre-wrap">${message}</p>
          </div>
          ${calendarButton}
          <p style="font-size:11px;color:#3d3d3f;text-align:center;margin-top:24px">UpNow Agency · upnow.agency75@gmail.com</p>
        </div>
      </body></html>`;

      await transporter.sendMail({
        from: `"UpNow Agency" <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER,
        subject: `${appel ? "📞 Appel réservé" : "📩 Nouveau contact"} — ${nom}${appel ? ` · ${dateAppel} à ${heureAppel}` : ""}`,
        html,
        replyTo: email,
      });
    } catch (err) {
      console.error("Email error:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
