"use client";

import ScrollReveal from "./ScrollReveal";
import MagneticText from "./MagneticText";

const pubPacks = [
  { tier: "Lancement", price: "299", desc: "Idéal pour débuter", featured: false,
    features: ["1 plateforme publicitaire","Visibilité locale ciblée","Optimisation initiale","Rapport mensuel"] },
  { tier: "Premium",   price: "475", desc: "Performance accélérée", featured: true,
    features: ["Multi-plateformes","Stratégie sur mesure","Suivi continu","Analyse approfondie","Priorité support"] },
  { tier: "Business",  price: "675", desc: "Pour les ambitieux", featured: false,
    features: ["Toutes plateformes","Stratégie personnalisée","Optimisation avancée","Reporting temps réel","Rapport détaillé"] },
];

const socialPacks = [
  { tier: "Lancement", price: "299", desc: "Pour commencer à être visible", featured: false,
    features: ["1 réseau social","4 vidéos / mois","Stories régulières","Scénarios adaptés"] },
  { tier: "Premium",   price: "475", desc: "Pour créer de l'interaction", featured: true,
    features: ["3 réseaux sociaux","8 vidéos / mois","30 stories / mois","Avec ou sans figurants","Horaires optimisés"] },
  { tier: "Business",  price: "675", desc: "Pour une image forte", featured: false,
    features: ["Multi-réseaux avancé","8 vidéos / mois","30 stories / mois","Design numérique","Site vitrine inclus"] },
];

function PackGrid({ packs, label }: { packs: typeof pubPacks; label: string }) {
  return (
    <div style={{ marginBottom: 80 }}>
      <ScrollReveal>
        <p style={{ fontSize: 13, fontWeight: 600, color: "#2997ff", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16, textAlign: "center" }}>
          {label}
        </p>
      </ScrollReveal>
      <div className="pack-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
        {packs.map((p, i) => (
          <ScrollReveal key={p.tier} delay={i * 80}>
            <div
              className="premium-card"
              style={{
                background: p.featured ? "linear-gradient(145deg,#060d1f,#0a1530)" : "#0a0a0a",
                border: p.featured ? "1px solid rgba(41,151,255,0.35)" : "1px solid #1d1d1f",
                borderRadius: 22,
                padding: "36px 28px",
                position: "relative",
                boxShadow: p.featured ? "0 0 80px rgba(41,151,255,0.1)" : "none",
                height: "100%",
              }}
            >
              {p.featured && (
                <div style={{
                  position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)",
                  background: "#2997ff", color: "#fff",
                  fontSize: 10, fontWeight: 700, padding: "4px 18px",
                  borderRadius: "0 0 12px 12px", letterSpacing: "0.08em", textTransform: "uppercase",
                  boxShadow: "0 4px 20px rgba(41,151,255,0.4)",
                }}>
                  Recommandé
                </div>
              )}

              <p style={{ fontSize: 12, color: "#6e6e73", marginBottom: 8, fontWeight: 500, letterSpacing: "0.04em" }}>
                {p.tier}
              </p>
              <div style={{ fontSize: 58, fontWeight: 700, color: "#f5f5f7", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 4 }}>
                {p.price}
                <span style={{ fontSize: 22, color: "#6e6e73", fontWeight: 400 }}>€</span>
                <span style={{ fontSize: 14, color: "#6e6e73", fontWeight: 400 }}>/mois</span>
              </div>
              <p style={{ fontSize: 15, color: "#a1a1a6", marginBottom: 28 }}>{p.desc}</p>

              <div style={{ height: 1, background: "#1d1d1f", marginBottom: 24 }} />

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px 0" }}>
                {p.features.map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#a1a1a6", marginBottom: 12 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="8" fill={p.featured ? "#2997ff" : "#1d1d1f"} />
                      <path d="M5 8l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="/contact"
                style={{
                  display: "block", textAlign: "center",
                  background: p.featured ? "#2997ff" : "rgba(255,255,255,0.06)",
                  border: p.featured ? "none" : "1px solid rgba(255,255,255,0.1)",
                  color: "#fff", padding: "15px", borderRadius: 980,
                  fontSize: 15, fontWeight: 500, textDecoration: "none",
                  transition: "all 0.25s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = p.featured ? "#0071e3" : "rgba(255,255,255,0.12)";
                  (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
                  (e.currentTarget as HTMLElement).style.boxShadow = p.featured ? "0 0 30px rgba(41,151,255,0.4)" : "none";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = p.featured ? "#2997ff" : "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                Choisir ce pack
              </a>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

export default function Pricing() {
  return (
    <section id="offres" style={{ background: "#000", padding: "140px 0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <ScrollReveal style={{ textAlign: "center", marginBottom: 80 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#2997ff", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
            Tarifs
          </p>
          <div style={{ width: "100%", textAlign: "center", marginBottom: 16 }}>
            <MagneticText
              tag="h2"
              style={{
                fontSize: "clamp(36px, 5.5vw, 64px)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                color: "#f5f5f7",
              }}
            >
              Des offres claires, sans surprise.
            </MagneticText>
          </div>
          <p style={{ fontSize: 19, color: "#6e6e73", maxWidth: 460, margin: "0 auto" }}>
            Pensées pour les commerces et entreprises qui veulent croître.
          </p>
        </ScrollReveal>

        <PackGrid packs={pubPacks} label="Publicité digitale" />
        <PackGrid packs={socialPacks} label="Réseaux sociaux" />
      </div>
    </section>
  );
}
