"use client";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

type SocialConfig = {
  name: string;
  color: string;
  glowColor: string;
  text: string;
  icon: React.ReactNode;
};

const services = [
  { id: "pub", label: "Publicité digitale", sub: "Meta Ads · Google Ads · TikTok Ads" },
  { id: "reseaux", label: "Gestion réseaux sociaux", sub: "Instagram · TikTok · Facebook" },
  { id: "contenu", label: "Création de contenu", sub: "Photos · Vidéos · Reels" },
  { id: "web", label: "Création de site web", sub: "Vitrine · E-commerce · Landing page" },
  { id: "physique", label: "Marketing physique", sub: "Enseignes · Flyers · Panneaux" },
  { id: "event", label: "Pack événementiel", sub: "Soirées · Matchs · Mariages" },
];

const socials = [
  {
    name: "WhatsApp",
    handle: "+33 7 44 81 04 27",
    href: "https://wa.me/33744810427",
    color: "#25D366",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    name: "Instagram",
    handle: "@upnow_agency_",
    href: "https://www.instagram.com/upnow_agency_",
    color: "#E1306C",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    name: "TikTok",
    handle: "@upnow.agency",
    href: "https://www.tiktok.com/@upnow.agency",
    color: "#ff0050",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.79 1.54V6.79a4.85 4.85 0 01-1.02-.1z"/>
      </svg>
    ),
  },
  {
    name: "Facebook",
    handle: "UpNow Agency",
    href: "https://www.facebook.com/profile.php?id=61586427172574",
    color: "#1877F2",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: "Snapchat",
    handle: "@upnow_agency",
    href: "https://snapchat.com/t/ciFVkwJq",
    color: "#FFFC00",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.166 3.598c.2-.005.4 0 .593.023 1.672.18 3.17 1.107 4.084 2.525.497.775.73 1.68.826 2.572.053.492.04.99.028 1.486l-.003.233c-.003.122.048.234.135.308.212.181.545.31.934.396.22.048.454.07.673.04.144-.018.29-.065.42-.14.087-.05.18-.078.268-.078.142 0 .286.057.393.175.15.163.196.384.094.554-.155.255-.518.447-.915.594-.17.064-.35.12-.527.155-.057.012-.114.022-.17.03-.165.026-.298.118-.34.243-.024.072-.012.148.035.22.282.43.96.784 1.687.97.11.028.22.055.328.086.23.067.38.265.367.479-.012.177-.122.327-.288.41a4.23 4.23 0 01-.545.209c-.684.21-1.043.439-1.167.73-.052.122-.047.25.014.378.273.575.796.97 1.4 1.063.13.02.26.03.393.022.197-.012.388.07.498.219.12.164.127.383.02.559-.208.349-.593.578-1.024.63-.122.015-.25.01-.374-.012a4.527 4.527 0 00-.722-.057c-.237 0-.487.02-.728.087-.715.198-1.274.725-1.954 1.347-.572.524-1.217 1.114-2.05 1.495-.59.269-1.23.392-1.888.392-.657 0-1.298-.123-1.888-.392-.832-.381-1.478-.97-2.05-1.495-.68-.622-1.239-1.149-1.954-1.347a4.582 4.582 0 00-.728-.087 4.527 4.527 0 00-.722.057c-.124.023-.252.027-.374.012-.43-.052-.816-.281-1.024-.63-.107-.176-.1-.395.02-.559.11-.149.301-.231.498-.219.132.008.263-.002.393-.022.604-.093 1.127-.488 1.4-1.063.061-.128.066-.256.014-.378-.124-.291-.483-.52-1.167-.73a4.23 4.23 0 01-.545-.209c-.166-.083-.276-.233-.288-.41-.013-.214.137-.412.367-.479.108-.031.218-.058.328-.086.727-.186 1.405-.54 1.687-.97.047-.072.059-.148.035-.22-.042-.125-.175-.217-.34-.243-.056-.008-.113-.018-.17-.03-.177-.035-.357-.091-.527-.155-.397-.147-.76-.339-.915-.594-.102-.17-.056-.391.094-.554.107-.118.251-.175.393-.175.088 0 .181.028.268.078.13.075.276.122.42.14.219.03.453.008.673-.04.389-.086.722-.215.934-.396.087-.074.138-.186.135-.308l-.003-.233c-.012-.496-.025-.994.028-1.486.096-.892.33-1.797.826-2.572.914-1.418 2.412-2.345 4.084-2.525.193-.023.393-.028.593-.023z"/>
      </svg>
    ),
  },
];

function detectSource(): string {
  if (typeof window === "undefined") return "Direct";
  const ref = document.referrer;
  const params = new URLSearchParams(window.location.search);
  const utm = params.get("utm_source");
  if (utm) return utm.charAt(0).toUpperCase() + utm.slice(1);
  if (!ref) return "Direct";
  if (ref.includes("instagram")) return "Instagram";
  if (ref.includes("tiktok")) return "TikTok";
  if (ref.includes("facebook") || ref.includes("fb.")) return "Facebook";
  if (ref.includes("snapchat")) return "Snapchat";
  if (ref.includes("google")) return "Google";
  if (ref.includes("youtube")) return "YouTube";
  if (ref.includes("twitter") || ref.includes("x.com")) return "Twitter/X";
  if (ref.includes("whatsapp")) return "WhatsApp";
  return "Autre";
}

export default function ContactPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [form, setForm] = useState({ nom: "", email: "", tel: "", ville: "", typeCommerce: "", nomCommerce: "", message: "" });
  const [reserverAppel, setReserverAppel] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedHeure, setSelectedHeure] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [appelAnimating, setAppelAnimating] = useState(false);

  const heures = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

  const prochainJours = Array.from({ length: 10 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d;
  }).filter((d) => d.getDay() !== 0 && d.getDay() !== 6); // exclure dimanche et samedi

  const formatJour = (d: Date) => {
    const jours = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    return jours[d.getDay()];
  };
  const formatDate = (d: Date) => `${d.getDate()}/${d.getMonth() + 1}`;
  const [activeTransition, setActiveTransition] = useState<SocialConfig | null>(null);

  // GSAP refs
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const formColRef = useRef<HTMLDivElement>(null);
  const infoColRef = useRef<HTMLDivElement>(null);

  // GSAP entrance animation
  useEffect(() => {
    const els = [
      eyebrowRef.current,
      titleRef.current,
      subtitleRef.current,
      formColRef.current,
      infoColRef.current,
    ];
    gsap.set(els, { y: 60, opacity: 0, filter: "blur(6px)" });
    const delays = [0, 0.15, 0.28, 0.40, 0.52];
    const durations = [0.6, 0.8, 0.6, 0.7, 0.7];
    els.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        y: 0, opacity: 1, filter: "blur(0px)",
        duration: durations[i], delay: delays[i], ease: "power3.out",
      });
    });
  }, []);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSocialClick = (config: SocialConfig, url: string) => {
    setActiveTransition(config);
    setTimeout(() => {
      window.open(url, "_blank");
      setTimeout(() => setActiveTransition(null), 200);
    }, 800);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const servicesLabels = selected
      .map((id) => services.find((s) => s.id === id)?.label)
      .join(", ");

    // Envoi email en arrière-plan
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom: form.nom,
        email: form.email,
        tel: form.tel,
        ville: form.ville,
        typeCommerce: form.typeCommerce,
        nomCommerce: form.nomCommerce,
        services: servicesLabels || "Non précisé",
        message: form.message,
        appel: reserverAppel,
        dateAppel: selectedDate,
        heureAppel: selectedHeure,
        source: detectSource(),
      }),
    });

    // Envoi WhatsApp
    const msg = encodeURIComponent(
      `Bonjour UpNow Agency 👋\n\n` +
      `*Nom :* ${form.nom}\n` +
      `*Email :* ${form.email}\n` +
      `*Téléphone :* ${form.tel}\n` +
      `*Ville :* ${form.ville || "Non précisée"}\n` +
      `*Type de commerce :* ${form.typeCommerce || "Non précisé"}\n` +
      `*Nom du commerce :* ${form.nomCommerce || "Non précisé"}\n` +
      (reserverAppel ? `*📞 Appel réservé le :* ${selectedDate} à ${selectedHeure}\n` : "") +
      `*Services souhaités :* ${servicesLabels || "Non précisé"}\n\n` +
      `*Message :*\n${form.message}`
    );
    const waConfig: SocialConfig = {
      name: "WhatsApp",
      color: "#25D366",
      glowColor: "rgba(37,211,102,0.15)",
      text: "Ouverture de WhatsApp...",
      icon: socials[0].icon,
    };
    setSuccess(true);
    setTimeout(() => {
      handleSocialClick(waConfig, `https://wa.me/33744810427?text=${msg}`);
      setTimeout(() => setSuccess(false), 3000);
    }, 1200);

    // Reset
    setForm({ nom: "", email: "", tel: "", ville: "", typeCommerce: "", nomCommerce: "", message: "" });
    setReserverAppel(false);
    setSelectedDate(null);
    setSelectedHeure(null);
    setSelected([]);
  };

  return (
    <main style={{ background: "#000", minHeight: "100vh", color: "#f5f5f7", paddingTop: 80 }}>

      {/* Keyframes + responsive CSS */}
      <style>{`
        @keyframes orbFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes overlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes logoIn {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes textFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes successPulse {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes checkDraw {
          from { stroke-dashoffset: 40; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes successGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(37,211,102,0.5); }
          50% { box-shadow: 0 0 40px rgba(37,211,102,0.9), 0 0 60px rgba(37,211,102,0.4); }
        }
        @keyframes confettiFly {
          0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(-140px) rotate(720deg) scale(0.3); opacity: 0; }
        }
        @keyframes confettiSide {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx), -110px) rotate(540deg) scale(0.2); opacity: 0; }
        }
        @keyframes appelBounce {
          0% { transform: scale(1); }
          30% { transform: scale(1.04); }
          60% { transform: scale(0.97); }
          100% { transform: scale(1); }
        }
        @keyframes starBurst {
          0% { transform: scale(0) rotate(0deg); opacity: 1; }
          60% { transform: scale(1.4) rotate(180deg); opacity: 1; }
          100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }

        /* Mobile */
        @media (max-width: 700px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .contact-socials-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 10px !important;
          }
        }
      `}</style>

      {/* Orbe décorative */}
      <div style={{
        position: "fixed", top: -100, right: -100,
        width: 500, height: 500,
        background: "radial-gradient(circle, rgba(41,151,255,0.18), transparent 65%)",
        filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
        animation: "orbFloat 8s ease-in-out infinite",
      }} />

      {/* Overlay transition réseau */}
      {activeTransition && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 99999,
          background: "rgba(0,0,0,0.92)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 20,
          animation: "overlayIn 0.2s ease forwards",
        }}>
          <div style={{
            width: 96, height: 96, borderRadius: 24,
            background: activeTransition.glowColor,
            border: `1px solid ${activeTransition.color}40`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 0 60px ${activeTransition.color}`,
            color: activeTransition.color,
            animation: "logoIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards",
          }}>
            {activeTransition.icon}
          </div>
          <p style={{
            fontSize: 16, fontWeight: 500, color: "#f5f5f7", margin: 0,
            animation: "textFadeIn 0.4s ease 0.35s both",
          }}>
            {activeTransition.text}
          </p>
        </div>
      )}

      {/* Navbar minimal */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999,
        height: 52, display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px",
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}>
        <a href="/" style={{ fontSize: 17, fontWeight: 700, color: "#f5f5f7", textDecoration: "none" }}>
          UP<span style={{ color: "#2997ff" }}>NOW</span>
        </a>
        <a href="/" style={{ fontSize: 13, color: "#a1a1a6", textDecoration: "none" }}>← Retour</a>
      </nav>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 24px 100px", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <p ref={eyebrowRef} style={{ fontSize: 13, fontWeight: 600, color: "#2997ff", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
            Contactez-nous
          </p>
          <h1 ref={titleRef} style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 20 }}>
            Parlons de votre<br />
            <span style={{ color: "#2997ff", textShadow: "0 0 40px rgba(41,151,255,0.35)" }}>projet.</span>
          </h1>
          <p ref={subtitleRef} style={{ fontSize: 17, color: "#6e6e73", maxWidth: 480, margin: "0 auto" }}>
            Décrivez-nous ce que vous voulez, on revient vers vous rapidement.
          </p>
        </div>

        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>

          {/* LEFT — Form */}
          <div ref={formColRef}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Service selection */}
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#f5f5f7", marginBottom: 14, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  Ce qui vous intéresse
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {services.map((s) => {
                    const active = selected.includes(s.id);
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => toggle(s.id)}
                        onMouseDown={(e) => {
                          (e.currentTarget as HTMLElement).style.transform = "scale(0.97)";
                        }}
                        onMouseUp={(e) => {
                          (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
                          setTimeout(() => {
                            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                          }, 150);
                        }}
                        style={{
                          display: "flex", alignItems: "center", gap: 14,
                          background: active ? "rgba(41,151,255,0.1)" : "rgba(255,255,255,0.03)",
                          border: active ? "1px solid rgba(41,151,255,0.5)" : "1px solid rgba(255,255,255,0.08)",
                          borderRadius: 12, padding: "14px 16px",
                          cursor: "pointer", textAlign: "left",
                          transition: "all 0.15s ease",
                        }}
                      >
                        <div style={{
                          width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                          border: active ? "none" : "1.5px solid rgba(255,255,255,0.2)",
                          background: active ? "#2997ff" : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          transition: "all 0.2s",
                        }}>
                          {active && (
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                              <path d="M2 5l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 500, color: active ? "#f5f5f7" : "#a1a1a6" }}>{s.label}</div>
                          <div style={{ fontSize: 12, color: "#6e6e73", marginTop: 2 }}>{s.sub}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Fields */}
              {[
                { key: "nom", label: "Nom & prénom", type: "text", placeholder: "Jean Dupont" },
                { key: "email", label: "Email", type: "email", placeholder: "jean@exemple.com" },
                { key: "tel", label: "Téléphone", type: "tel", placeholder: "+33 6 00 00 00 00" },
                { key: "ville", label: "Ville", type: "text", placeholder: "Paris, Lyon, Marseille..." },
                { key: "typeCommerce", label: "Type de commerce", type: "text", placeholder: "Restaurant, Coiffeur, Boutique..." },
                { key: "nomCommerce", label: "Nom du commerce", type: "text", placeholder: "Le Petit Bistrot, Salon Marie..." },
              ].map((f) => (
                <div key={f.key}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#a1a1a6", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    required={f.key !== "tel"}
                    placeholder={f.placeholder}
                    value={form[f.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    style={{
                      width: "100%", background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10,
                      padding: "13px 16px", fontSize: 15, color: "#f5f5f7",
                      outline: "none", boxSizing: "border-box",
                      transition: "border-color 0.25s, box-shadow 0.25s",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(41,151,255,0.6)";
                      e.target.style.boxShadow = "0 0 0 3px rgba(41,151,255,0.15), 0 0 20px rgba(41,151,255,0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255,255,255,0.1)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              ))}

              {/* Réserver un appel */}
              <div style={{ position: "relative" }}>
                {/* Confettis */}
                {appelAnimating && (() => {
                  const colors = ["#2997ff", "#25D366", "#FFD60A", "#FF375F", "#BF5AF2", "#FF9F0A", "#30D158"];
                  const shapes = ["●", "■", "▲", "★", "◆"];
                  return Array.from({ length: 22 }).map((_, i) => {
                    const color = colors[i % colors.length];
                    const shape = shapes[i % shapes.length];
                    const tx = (Math.random() * 160 - 80).toFixed(0);
                    const delay = (Math.random() * 0.3).toFixed(2);
                    const size = (10 + Math.random() * 10).toFixed(0);
                    const dur = (0.9 + Math.random() * 0.5).toFixed(2);
                    const left = (10 + Math.random() * 80).toFixed(0);
                    return (
                      <span
                        key={i}
                        style={{
                          position: "absolute",
                          left: `${left}%`,
                          top: "50%",
                          fontSize: `${size}px`,
                          color,
                          pointerEvents: "none",
                          zIndex: 10,
                          "--tx": `${tx}px`,
                          animation: `confettiSide ${dur}s ease-out ${delay}s both`,
                          lineHeight: 1,
                        } as React.CSSProperties}
                      >
                        {shape}
                      </span>
                    );
                  });
                })()}

                <button
                  type="button"
                  onClick={() => {
                    const next = !reserverAppel;
                    setReserverAppel(next);
                    if (next) {
                      setAppelAnimating(true);
                      setTimeout(() => setAppelAnimating(false), 1600);
                    }
                  }}
                  style={{
                    width: "100%",
                    display: "flex", alignItems: "center", gap: 14,
                    background: reserverAppel ? "rgba(41,151,255,0.1)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${reserverAppel ? "rgba(41,151,255,0.5)" : "rgba(255,255,255,0.1)"}`,
                    borderRadius: 10, padding: "14px 16px",
                    cursor: "pointer", textAlign: "left",
                    transition: "background 0.25s, border-color 0.25s, box-shadow 0.25s",
                    boxShadow: reserverAppel ? "0 0 0 3px rgba(41,151,255,0.15), 0 0 20px rgba(41,151,255,0.2)" : "none",
                    animation: appelAnimating ? "appelBounce 0.45s ease" : "none",
                    position: "relative", overflow: "visible",
                  }}
                >
                  <div style={{
                    width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                    background: reserverAppel ? "#2997ff" : "transparent",
                    border: `2px solid ${reserverAppel ? "#2997ff" : "rgba(255,255,255,0.25)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.2s, border-color 0.2s",
                    animation: appelAnimating ? "successPulse 0.45s cubic-bezier(0.34,1.56,0.64,1)" : "none",
                  }}>
                    {reserverAppel && <span style={{ color: "#fff", fontSize: 13, lineHeight: 1 }}>✓</span>}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: reserverAppel ? "#2997ff" : "#a1a1a6", transition: "color 0.2s" }}>
                      {reserverAppel && appelAnimating ? "🎉 Appel réservé !" : "Réserver un appel téléphonique"}
                    </div>
                    <div style={{ fontSize: 12, color: "#6e6e73", marginTop: 2 }}>
                      Un conseiller vous rappelle sous 24h
                    </div>
                  </div>
                </button>
              </div>

              {/* Calendrier créneaux */}
              {reserverAppel && (
                <div style={{
                  background: "rgba(41,151,255,0.05)",
                  border: "1px solid rgba(41,151,255,0.2)",
                  borderRadius: 12, padding: "20px 16px",
                  display: "flex", flexDirection: "column", gap: 16,
                }}>
                  {/* Jours */}
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 600, color: "#a1a1a6", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>
                      Choisissez un jour
                    </p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {prochainJours.map((d) => {
                        const key = `${formatJour(d)} ${formatDate(d)}`;
                        const active = selectedDate === key;
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => { setSelectedDate(key); setSelectedHeure(null); }}
                            style={{
                              display: "flex", flexDirection: "column", alignItems: "center",
                              padding: "10px 14px", borderRadius: 10, border: "none", cursor: "pointer",
                              background: active ? "#2997ff" : "rgba(255,255,255,0.06)",
                              transition: "background 0.2s",
                            }}
                          >
                            <span style={{ fontSize: 11, fontWeight: 600, color: active ? "#fff" : "#6e6e73", textTransform: "uppercase", letterSpacing: "0.05em" }}>{formatJour(d)}</span>
                            <span style={{ fontSize: 16, fontWeight: 700, color: active ? "#fff" : "#f5f5f7", marginTop: 2 }}>{d.getDate()}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Heures */}
                  {selectedDate && (
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 600, color: "#a1a1a6", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>
                        Choisissez un créneau
                      </p>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {heures.map((h) => {
                          const active = selectedHeure === h;
                          return (
                            <button
                              key={h}
                              type="button"
                              onClick={() => setSelectedHeure(h)}
                              style={{
                                padding: "9px 16px", borderRadius: 8, border: "none", cursor: "pointer",
                                background: active ? "#2997ff" : "rgba(255,255,255,0.06)",
                                color: active ? "#fff" : "#a1a1a6",
                                fontSize: 14, fontWeight: 600,
                                transition: "background 0.2s, color 0.2s",
                                boxShadow: active ? "0 0 12px rgba(41,151,255,0.4)" : "none",
                              }}
                            >
                              {h}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Récap */}
                  {selectedDate && selectedHeure && (
                    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "rgba(41,151,255,0.12)", borderRadius: 8 }}>
                      <span style={{ fontSize: 16 }}>📞</span>
                      <span style={{ fontSize: 13, color: "#f5f5f7", fontWeight: 500 }}>
                        Appel réservé le <strong>{selectedDate}</strong> à <strong>{selectedHeure}</strong>
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Message */}
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#a1a1a6", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>
                  Décrivez votre projet
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Décrivez votre activité, vos objectifs, votre budget approximatif..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{
                    width: "100%", background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10,
                    padding: "13px 16px", fontSize: 15, color: "#f5f5f7",
                    outline: "none", resize: "vertical", boxSizing: "border-box",
                    fontFamily: "inherit",
                    transition: "border-color 0.25s, box-shadow 0.25s",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(41,151,255,0.6)";
                    e.target.style.boxShadow = "0 0 0 3px rgba(41,151,255,0.15), 0 0 20px rgba(41,151,255,0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255,255,255,0.1)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={success}
                style={{
                  background: success ? "#1a1a1a" : "#2997ff",
                  color: "#fff",
                  padding: "16px 32px", borderRadius: 980,
                  fontSize: 16, fontWeight: 600, border: success ? "2px solid #25D366" : "none",
                  cursor: success ? "default" : "pointer",
                  transition: "background 0.4s, border 0.4s, box-shadow 0.4s",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  animation: success ? "successPulse 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards, successGlow 1.5s ease-in-out 0.5s infinite" : "none",
                  position: "relative", overflow: "hidden",
                }}
              >
                {success ? (
                  <>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" style={{ strokeDasharray: 40, animation: "checkDraw 0.4s ease 0.1s both" }} />
                    </svg>
                    <span style={{ color: "#25D366" }}>Réservation confirmée ✓</span>
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Envoyer via WhatsApp
                  </>
                )}
              </button>
            </form>
          </div>

          {/* RIGHT — Infos + Socials */}
          <div ref={infoColRef} style={{ display: "flex", flexDirection: "column", gap: 32 }}>

            {/* Info box */}
            <div style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 20, padding: 28,
            }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#f5f5f7", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 20 }}>
                Nous joindre directement
              </p>
              {[
                { icon: "✉️", label: "Email", value: "upnow.agency75@gmail.com", href: "mailto:upnow.agency75@gmail.com" },
                { icon: "📞", label: "Téléphone", value: "+33 7 44 81 04 27", href: "tel:+33744810427" },
                { icon: "📍", label: "Localisation", value: "International", href: null },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", gap: 14, marginBottom: 18, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 18, marginTop: 1 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: 11, color: "#6e6e73", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>{item.label}</div>
                    {item.href ? (
                      <a href={item.href} style={{ fontSize: 14, color: "#a1a1a6", textDecoration: "none" }}
                        onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#f5f5f7")}
                        onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#a1a1a6")}
                      >{item.value}</a>
                    ) : (
                      <span style={{ fontSize: 14, color: "#a1a1a6" }}>{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#f5f5f7", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 16 }}>
                Nos réseaux
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {socials.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => handleSocialClick(
                      { name: s.name, color: s.color, glowColor: `${s.color}18`, text: `Ouverture de ${s.name}...`, icon: s.icon },
                      s.href
                    )}
                    style={{
                      display: "flex", alignItems: "center", gap: 14,
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 12, padding: "14px 16px",
                      cursor: "pointer", width: "100%",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                    }}
                  >
                    <div style={{
                      width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                      background: `${s.color}18`,
                      border: `1px solid ${s.color}30`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: s.color,
                    }}>
                      {s.icon}
                    </div>
                    <div style={{ textAlign: "left" }}>
                      <div style={{ fontSize: 14, fontWeight: 500, color: "#f5f5f7" }}>{s.name}</div>
                      <div style={{ fontSize: 12, color: "#6e6e73" }}>{s.handle}</div>
                    </div>
                    <div style={{ marginLeft: "auto", color: "#3d3d3f", fontSize: 16 }}>→</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Response time */}
            <div style={{
              background: "rgba(41,151,255,0.06)",
              border: "1px solid rgba(41,151,255,0.15)",
              borderRadius: 16, padding: "20px 22px",
              display: "flex", gap: 14, alignItems: "flex-start",
            }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                {/* Cadran */}
                <circle cx="12" cy="12" r="10" stroke="#2997ff" strokeWidth="1.5"/>
                {/* Graduations */}
                <line x1="12" y1="3" x2="12" y2="4.5" stroke="#2997ff" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="12" y1="19.5" x2="12" y2="21" stroke="#2997ff" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="3" y1="12" x2="4.5" y2="12" stroke="#2997ff" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="19.5" y1="12" x2="21" y2="12" stroke="#2997ff" strokeWidth="1.5" strokeLinecap="round"/>
                {/* Aiguille des heures (10h) */}
                <line x1="12" y1="12" x2="9" y2="8.5" stroke="#f5f5f7" strokeWidth="2" strokeLinecap="round"/>
                {/* Aiguille des minutes (12h) */}
                <line x1="12" y1="12" x2="12" y2="5.5" stroke="#f5f5f7" strokeWidth="1.5" strokeLinecap="round"/>
                {/* Centre */}
                <circle cx="12" cy="12" r="1.2" fill="#2997ff"/>
              </svg>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#f5f5f7", marginBottom: 4 }}>Réponse rapide garantie</div>
                <div style={{ fontSize: 13, color: "#6e6e73", lineHeight: 1.5 }}>
                  Nous répondons à toutes les demandes sous <strong style={{ color: "#2997ff" }}>24h maximum</strong>, souvent bien plus vite.
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
