"use client";

import React from "react";
import ScrollReveal from "./ScrollReveal";
import MagneticText from "./MagneticText";

/* ── Instagram UI Mockup ── */
function InstagramMockup() {
  return (
    <div style={{
      background: "#000", border: "1px solid #262626",
      borderRadius: 12, overflow: "hidden", fontFamily: "-apple-system, sans-serif",
      fontSize: 12,
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderBottom: "1px solid #1a1a1a" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 700, color: "#fff", flexShrink: 0,
          }}>U</div>
          <div>
            <div style={{ color: "#f5f5f7", fontWeight: 600, fontSize: 12 }}>upnow_agency_</div>
            <div style={{ color: "#a1a1a6", fontSize: 10 }}>International</div>
          </div>
        </div>
        <div style={{ color: "#a1a1a6", fontSize: 18 }}>···</div>
      </div>

      {/* Post image */}
      <div style={{ position: "relative", background: "linear-gradient(135deg,#0a0a1a,#0d1228,#1a0a2e)", height: 180, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 28, marginBottom: 6 }}>📱</div>
          <div style={{ color: "#f5f5f7", fontWeight: 700, fontSize: 14 }}>UPNOW AGENCY</div>
          <div style={{ color: "#2997ff", fontSize: 11, marginTop: 4 }}>Marketing Digital International</div>
        </div>
        {/* Like effect */}
        <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(255,255,255,0.1)", borderRadius: 6, padding: "3px 8px", fontSize: 10, color: "#fff" }}>
          Sponsorisé
        </div>
      </div>

      {/* Actions */}
      <div style={{ padding: "10px 12px" }}>
        <div style={{ display: "flex", gap: 14, marginBottom: 8 }}>
          <span style={{ fontSize: 20 }}>🤍</span>
          <span style={{ fontSize: 20 }}>💬</span>
          <span style={{ fontSize: 20 }}>📤</span>
          <span style={{ marginLeft: "auto", fontSize: 20 }}>🔖</span>
        </div>
        <div style={{ color: "#f5f5f7", fontWeight: 600, fontSize: 11, marginBottom: 3 }}>2 841 J&apos;aime</div>
        <div style={{ color: "#a1a1a6", fontSize: 10 }}>
          <span style={{ color: "#f5f5f7", fontWeight: 600 }}>upnow_agency_</span> Votre visibilité, notre priorité 🚀
        </div>
      </div>

      {/* Comment bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderTop: "1px solid #1a1a1a" }}>
        <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#1d1d1f", flexShrink: 0 }} />
        <div style={{ flex: 1, background: "#1d1d1f", borderRadius: 20, padding: "6px 12px", color: "#6e6e73", fontSize: 11 }}>
          Ajouter un commentaire…
        </div>
      </div>
    </div>
  );
}

/* ── TikTok UI Mockup ── */
function TikTokMockup() {
  return (
    <div style={{
      background: "#000", borderRadius: 12, overflow: "hidden",
      fontFamily: "-apple-system, sans-serif", fontSize: 12, position: "relative",
      border: "1px solid #1a1a1a",
    }}>
      {/* Video area */}
      <div style={{
        height: 260, background: "linear-gradient(180deg,#0a0014,#140028,#000)",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        position: "relative", padding: 12,
      }}>
        {/* Watermark */}
        <div style={{ position: "absolute", top: 12, left: 12, display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ background: "#fe2c55", borderRadius: 4, padding: "2px 6px", fontSize: 9, fontWeight: 700, color: "#fff" }}>LIVE</div>
        </div>

        {/* Right actions */}
        <div style={{ position: "absolute", right: 10, bottom: 80, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
          {[
            { icon: "🤍", label: "124K" },
            { icon: "💬", label: "2.3K" },
            { icon: "📤", label: "Partager" },
          ].map((a) => (
            <div key={a.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22 }}>{a.icon}</div>
              <div style={{ color: "#f5f5f7", fontSize: 10, marginTop: 2 }}>{a.label}</div>
            </div>
          ))}
          {/* Avatar */}
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#f09433,#dc2743,#bc1888)", border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff" }}>
            U
          </div>
        </div>

        {/* Bottom info */}
        <div>
          <div style={{ color: "#f5f5f7", fontWeight: 700, fontSize: 13, marginBottom: 4 }}>@upnow_agency_</div>
          <div style={{ color: "#f5f5f7", fontSize: 11, marginBottom: 8, opacity: 0.9 }}>
            🚀 Comment doubler votre visibilité en 30 jours #marketing #paris
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#fe2c55", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>♪</div>
            <div style={{ color: "#f5f5f7", fontSize: 10 }}>Son original — UpNow Agency</div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 2, background: "#1a1a1a" }}>
        <div style={{ height: "100%", width: "40%", background: "#fe2c55" }} />
      </div>

      {/* Bottom nav */}
      <div style={{ display: "flex", justifyContent: "space-around", padding: "8px 0", background: "#000" }}>
        {["🏠", "🔍", "➕", "📬", "👤"].map((icon, i) => (
          <span key={i} style={{ fontSize: i === 2 ? 28 : 20, opacity: i === 0 ? 1 : 0.5 }}>{icon}</span>
        ))}
      </div>
    </div>
  );
}

/* ── Snapchat UI Mockup ── */
function SnapchatMockup() {
  const stories = [
    { name: "Ma Story", color: "#fffc00", icon: "U", new: true },
    { name: "Client 1", color: "#ff6b6b", icon: "A", new: true },
    { name: "Client 2", color: "#4ecdc4", icon: "B", new: false },
    { name: "Paris", color: "#a78bfa", icon: "P", new: true },
  ];

  return (
    <div style={{
      background: "#000", borderRadius: 12, overflow: "hidden",
      fontFamily: "-apple-system, sans-serif", border: "1px solid #1a1a1a",
    }}>
      {/* Header */}
      <div style={{ padding: "12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 20, fontWeight: 700, color: "#fffc00" }}>snapchat</span>
        <div style={{ display: "flex", gap: 14 }}>
          <span style={{ fontSize: 18, opacity: 0.7 }}>🔍</span>
          <span style={{ fontSize: 18, opacity: 0.7 }}>💬</span>
        </div>
      </div>

      {/* Stories row */}
      <div style={{ padding: "0 12px 12px", display: "flex", gap: 10, overflowX: "hidden" }}>
        {stories.map((s) => (
          <div key={s.name} style={{ textAlign: "center", flexShrink: 0 }}>
            <div style={{
              width: 52, height: 52, borderRadius: "50%",
              border: s.new ? `3px solid ${s.color}` : "3px solid #333",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "#1a1a1a", marginBottom: 4,
            }}>
              <span style={{ fontSize: 20, fontWeight: 700, color: s.color }}>{s.icon}</span>
            </div>
            <div style={{ fontSize: 9, color: "#a1a1a6", width: 52 }}>{s.name}</div>
          </div>
        ))}
      </div>

      {/* Big story preview */}
      <div style={{
        margin: "0 12px 12px",
        height: 130,
        borderRadius: 12,
        background: "linear-gradient(135deg, #1a1400, #2a2000, #1a1400)",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
        border: "1px solid #fffc0033",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 24, marginBottom: 4 }}>👻</div>
          <div style={{ color: "#fffc00", fontWeight: 700, fontSize: 13 }}>upnow_agency_</div>
          <div style={{ color: "#a1a1a6", fontSize: 10 }}>Story · il y a 2h</div>
        </div>
        <div style={{ position: "absolute", bottom: 8, left: 0, right: 0, display: "flex", gap: 3, padding: "0 8px" }}>
          {[1,2,3].map(i => (
            <div key={i} style={{ flex: 1, height: 2, background: i === 1 ? "#fffc00" : "#ffffff33", borderRadius: 2 }} />
          ))}
        </div>
      </div>

      {/* Spotlight */}
      <div style={{ padding: "0 12px 12px" }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: "#a1a1a6", marginBottom: 8, letterSpacing: "0.06em", textTransform: "uppercase" }}>Spotlight</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          {["#marketing", "#paris"].map((tag) => (
            <div key={tag} style={{ background: "#1a1a1a", borderRadius: 8, padding: "8px 10px", fontSize: 11, color: "#fffc00", fontWeight: 600 }}>
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Facebook UI Mockup ── */
function FacebookMockup() {
  return (
    <div style={{
      background: "#18191a", borderRadius: 12, overflow: "hidden",
      fontFamily: "-apple-system, sans-serif", border: "1px solid #3a3b3c",
    }}>
      {/* Header */}
      <div style={{ background: "#242526", padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #3a3b3c" }}>
        <span style={{ color: "#1877f2", fontWeight: 900, fontSize: 22, letterSpacing: "-1px" }}>f</span>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ background: "#3a3b3c", borderRadius: 20, padding: "4px 12px", fontSize: 11, color: "#f5f5f7" }}>🔍</div>
          <div style={{ background: "#1877f2", borderRadius: 20, padding: "4px 12px", fontSize: 11, color: "#fff", fontWeight: 600 }}>+</div>
        </div>
      </div>

      {/* Post */}
      <div style={{ padding: 12 }}>
        {/* Post header */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#1877f2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: "#fff", flexShrink: 0 }}>U</div>
          <div>
            <div style={{ color: "#f5f5f7", fontWeight: 600, fontSize: 13 }}>UpNow Agency</div>
            <div style={{ color: "#a1a1a6", fontSize: 10, display: "flex", alignItems: "center", gap: 4 }}>
              <span>2h</span> · <span>🌍</span>
            </div>
          </div>
          <div style={{ marginLeft: "auto", color: "#a1a1a6", fontSize: 18 }}>···</div>
        </div>

        <p style={{ color: "#f5f5f7", fontSize: 13, lineHeight: 1.5, marginBottom: 10 }}>
          📢 Votre commerce mérite d&apos;être vu ! Publicité digitale, réseaux sociaux & création de sites web. 🚀
        </p>

        {/* Post visual */}
        <div style={{
          background: "linear-gradient(135deg,#0a0f1e,#0d1228)", borderRadius: 8,
          height: 110, display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 10, border: "1px solid #3a3b3c",
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#f5f5f7", fontWeight: 800, fontSize: 15 }}>UPNOW AGENCY</div>
            <div style={{ color: "#1877f2", fontSize: 11, marginTop: 2 }}>upnow.agency75@gmail.com</div>
          </div>
        </div>

        {/* Reactions */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 10, borderBottom: "1px solid #3a3b3c" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ fontSize: 14 }}>👍❤️😮</span>
            <span style={{ color: "#a1a1a6", fontSize: 12 }}>1 247</span>
          </div>
          <div style={{ color: "#a1a1a6", fontSize: 12 }}>89 commentaires · 234 partages</div>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", justifyContent: "space-around", paddingTop: 6 }}>
          {[["👍", "J'aime"], ["💬", "Commenter"], ["📤", "Partager"]].map(([icon, label]) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 5, color: "#a1a1a6", fontSize: 12, fontWeight: 600, padding: "4px 8px", borderRadius: 6 }}>
              <span style={{ fontSize: 16 }}>{icon}</span> {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SocialMedia() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const scrollRef  = React.useRef<HTMLDivElement>(null);
  const sectionRef = React.useRef<HTMLElement>(null);

  const platforms = [
    { name: "Instagram", color: "#e1306c", component: <InstagramMockup /> },
    { name: "TikTok",    color: "#fe2c55", component: <TikTokMockup /> },
    { name: "Snapchat",  color: "#fffc00", component: <SnapchatMockup /> },
    { name: "Facebook",  color: "#1877f2", component: <FacebookMockup /> },
  ];

  // Met à jour l'index actif quand l'utilisateur swipe
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const cards = Array.from(el.children) as HTMLElement[];
        const center = el.scrollLeft + el.offsetWidth / 2;
        let closest = 0;
        let minDist = Infinity;
        cards.forEach((card, i) => {
          const cardCenter = card.offsetLeft + card.offsetWidth / 2;
          const dist = Math.abs(center - cardCenter);
          if (dist < minDist) { minDist = dist; closest = i; }
        });
        setActiveIndex(closest);
      }, 30);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => { el.removeEventListener("scroll", onScroll); clearTimeout(timer); };
  }, []);


  /* Curseur virtuel + néon fluide sur les phrases crash-line */
  React.useEffect(() => {
    let frameId: number;
    let startTime: number | null = null;
    const SWEEP = 2400;
    const PAUSE = 1800;
    const CYCLE = SWEEP + PAUSE;
    const current: Map<Element, { x: number; y: number; force: number }> = new Map();
    const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const elapsed = (ts - startTime) % CYCLE;
      const containers = document.querySelectorAll<HTMLElement>(".crash-line");
      if (!containers.length) { frameId = requestAnimationFrame(animate); return; }
      const inSweep = elapsed < SWEEP;
      // Couleur HSL qui tourne en continu — bleu (210) → violet (270) → rose (320) → retour
      const hue = 220 + 50 * Math.sin((elapsed / SWEEP) * Math.PI);

      containers.forEach((container) => {
        const chars = container.querySelectorAll<HTMLSpanElement>(".split-char");
        const rect = container.getBoundingClientRect();
        let targetX = 0, targetY = 0;
        if (inSweep) {
          const t = easeInOut(elapsed / SWEEP);
          targetX = rect.left + t * rect.width;
          targetY = rect.top + rect.height / 2;
        }
        chars.forEach((char) => {
          const cr = char.getBoundingClientRect();
          const cx = cr.left + cr.width / 2;
          const cy = cr.top + cr.height / 2;
          const prev = current.get(char) ?? { x: 0, y: 0, force: 0 };
          let wantX = 0, wantY = 0, wantForce = 0;
          if (inSweep) {
            const dist = Math.sqrt((targetX - cx) ** 2 + (targetY - cy) ** 2);
            const max = 100;
            if (dist < max) {
              wantForce = (max - dist) / max;
              wantX = (cx - targetX) * wantForce * 0.45;
              wantY = (cy - targetY) * wantForce * 0.45;
            }
          }
          const lerp = 0.1;
          const nx = prev.x + (wantX - prev.x) * lerp;
          const ny = prev.y + (wantY - prev.y) * lerp;
          const nf = prev.force + (wantForce - prev.force) * lerp;
          current.set(char, { x: nx, y: ny, force: nf });
          char.style.transform = `translate(${nx}px, ${ny}px)`;
          // Couleur et glow proportionnels à la force — pas de seuil brutal
          if (nf > 0.01) {
            char.style.color = `hsl(${hue}, 100%, ${65 + nf * 20}%)`;
            char.style.textShadow = `0 0 ${12 * nf}px hsl(${hue}, 100%, 70%), 0 0 ${28 * nf}px hsl(${hue}, 100%, 60%)`;
          } else {
            char.style.color = "";
            char.style.textShadow = "";
          }
        });
      });
      frameId = requestAnimationFrame(animate);
    };

    const timer = setTimeout(() => { frameId = requestAnimationFrame(animate); }, 500);
    return () => { clearTimeout(timer); cancelAnimationFrame(frameId); };
  }, []);

  const scrollTo = (index: number) => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.children[index] as HTMLElement;
    if (card) card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    setActiveIndex(index);
  };

  const prev = () => scrollTo(Math.max(0, activeIndex - 1));
  const next = () => scrollTo(Math.min(platforms.length - 1, activeIndex + 1));

  return (
    <section ref={sectionRef} id="reseaux" style={{ background: "#000", padding: "140px 0" }}>
      <style>{`
        #social-scroll::-webkit-scrollbar { display: none; }
        @media (max-width: 700px) {
          .carousel-arrow { display: none !important; }
          #social-scroll {
            padding: 8px 7.5vw 16px !important;
            scroll-padding-inline: 7.5vw !important;
            scroll-behavior: auto !important;
          }
          .carousel-card { width: 85vw !important; }
        }
      `}</style>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

        {/* Big statement */}
        <div style={{ textAlign: "center", marginBottom: 100 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#2997ff", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>
            Réseaux sociaux
          </p>

          <div style={{ overflow: "hidden", marginBottom: 28 }}>
            <MagneticText
              tag="h2"
              className="crash-line"
              style={{
                fontSize: "clamp(36px, 6vw, 76px)", fontWeight: 700,
                letterSpacing: "-0.04em", lineHeight: 1.04,
                color: "#f5f5f7", display: "block", marginBottom: 12,
              }}
            >
              À force de vous voir,
            </MagneticText>
            <MagneticText
              tag="h2"
              className="crash-line"
              style={{
                fontSize: "clamp(36px, 6vw, 76px)", fontWeight: 700,
                letterSpacing: "-0.04em", lineHeight: 1.04,
                color: "#a1a1a6", display: "block",
              }}
            >
              vos clients viennent à vous.
            </MagneticText>
          </div>

          <p style={{ fontSize: 19, color: "#6e6e73", lineHeight: 1.6, maxWidth: 520, margin: "0 auto" }}>
            Plus de 50 millions de Français sur les réseaux. Votre audience est là — nous la captons pour vous.
          </p>
        </div>

        {/* Carousel avec flèches */}
        <div style={{ position: "relative", marginBottom: 48 }}>

          {/* Flèche gauche */}
          <button
            className="carousel-arrow"
            aria-label="Réseau précédent"
            onClick={prev}
            disabled={activeIndex === 0}
            style={{
              position: "absolute", left: -20, top: "50%", transform: "translateY(-50%)",
              zIndex: 10, width: 44, height: 44, borderRadius: "50%",
              background: activeIndex === 0 ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: activeIndex === 0 ? "#3d3d3f" : "#f5f5f7",
              fontSize: 22, cursor: activeIndex === 0 ? "default" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { if (activeIndex > 0) (e.currentTarget as HTMLElement).style.background = "rgba(41,151,255,0.25)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = activeIndex === 0 ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.1)"; }}
          >‹</button>

          {/* Flèche droite */}
          <button
            className="carousel-arrow"
            aria-label="Réseau suivant"
            onClick={next}
            disabled={activeIndex === platforms.length - 1}
            style={{
              position: "absolute", right: -20, top: "50%", transform: "translateY(-50%)",
              zIndex: 10, width: 44, height: 44, borderRadius: "50%",
              background: activeIndex === platforms.length - 1 ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: activeIndex === platforms.length - 1 ? "#3d3d3f" : "#f5f5f7",
              fontSize: 22, cursor: activeIndex === platforms.length - 1 ? "default" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { if (activeIndex < platforms.length - 1) (e.currentTarget as HTMLElement).style.background = "rgba(41,151,255,0.25)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = activeIndex === platforms.length - 1 ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.1)"; }}
          >›</button>

          {/* Scroll container */}
          <div
            ref={scrollRef}
            id="social-scroll"
            style={{
              display: "flex", gap: 20,
              overflowX: "auto", scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              padding: "8px 4px 16px",
              WebkitOverflowScrolling: "touch",
            } as React.CSSProperties}
          >
            {platforms.map((p, i) => (
              <div
                key={p.name}
                className="carousel-card"
                onClick={() => scrollTo(i)}
                style={{
                  flexShrink: 0,
                  width: "clamp(260px, 30vw, 300px)",
                  scrollSnapAlign: "center",
                  scrollSnapStop: "always",
                  display: "flex", flexDirection: "column", gap: 10,
                  cursor: "pointer",
                  transition: "transform 0.25s cubic-bezier(0.16,1,0.3,1), opacity 0.2s",
                  opacity: i === activeIndex ? 1 : 0.5,
                  transform: i === activeIndex ? "translateY(-8px) scale(1.02)" : "scale(1)",
                }}
              >
                {/* Label néon */}
                <div style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "6px 12px",
                  background: "#0a0a0a",
                  border: `1px solid ${p.color}${i === activeIndex ? "60" : "25"}`,
                  borderRadius: 8, width: "fit-content",
                  boxShadow: i === activeIndex ? `0 0 12px ${p.color}40` : "none",
                  transition: "all 0.3s",
                }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: p.color,
                    boxShadow: i === activeIndex ? `0 0 10px ${p.color}, 0 0 20px ${p.color}60` : "none",
                    transition: "box-shadow 0.3s",
                  }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: i === activeIndex ? "#f5f5f7" : "#6e6e73" }}>{p.name}</span>
                </div>

                {/* Mockup */}
                <div style={{
                  boxShadow: i === activeIndex ? `0 0 40px ${p.color}20, 0 20px 60px rgba(0,0,0,0.5)` : "none",
                  borderRadius: 12,
                  transition: "box-shadow 0.4s",
                }}>
                  {p.component}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots néon */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 60 }}>
          {platforms.map((p, i) => (
            <button
              key={i}
              aria-label={`Voir ${p.name}`}
              onClick={() => scrollTo(i)}
              style={{
                width: i === activeIndex ? 28 : 8,
                height: 8, borderRadius: 4, border: "none",
                background: i === activeIndex ? p.color : "rgba(255,255,255,0.12)",
                cursor: "pointer", padding: 0,
                transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                boxShadow: i === activeIndex ? `0 0 10px ${p.color}, 0 0 20px ${p.color}60` : "none",
              }}
            />
          ))}
        </div>

        {/* Quote */}
        <ScrollReveal>
          <div style={{
            background: "#0a0a0a", border: "1px solid #1d1d1f",
            borderRadius: 24, padding: "56px 60px", textAlign: "center", position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)",
              width: 400, height: 200,
              background: "radial-gradient(ellipse, rgba(41,151,255,0.12) 0%, transparent 70%)",
              filter: "blur(30px)", pointerEvents: "none",
            }} />
            <p style={{
              fontSize: "clamp(18px, 2.5vw, 28px)", fontWeight: 500,
              color: "#f5f5f7", lineHeight: 1.5, letterSpacing: "-0.01em",
              marginBottom: 16, position: "relative",
            }}>
              &ldquo;C&apos;est comme regarder 58 fois une carte de restaurant —
              à un moment, vous avez envie de passer à l&apos;action.&rdquo;
            </p>
            <p style={{ fontSize: 14, color: "#6e6e73", position: "relative" }}>
              Votre présence devient une évidence. Vos clients viennent à vous.
            </p>
          </div>
        </ScrollReveal>
      </div>

    </section>
  );
}
