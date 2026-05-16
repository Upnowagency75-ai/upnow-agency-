"use client";

const stats = [
  { number: "50M+", label: "Utilisateurs réseaux sociaux en France" },
  { number: "2h+", label: "Passées par jour sur les réseaux" },
  { number: "×3", label: "Plus de visibilité en moyenne" },
  { number: "100%", label: "Dédié à votre croissance" },
];

export default function KpiStrip() {
  return (
    <section style={{ background: "#000", borderTop: "1px solid #1d1d1f", borderBottom: "1px solid #1d1d1f" }}>
      <div
        className="kpi-grid"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "60px 24px",
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 1,
        }}
      >
        {stats.map((s, i) => (
          <div
            key={i}
            style={{
              textAlign: "center",
              padding: "32px 24px",
              borderRight: i < 3 ? "1px solid #1d1d1f" : "none",
            }}
          >
            <div
              style={{
                fontSize: "clamp(36px, 4vw, 52px)",
                fontWeight: 700,
                color: "#f5f5f7",
                letterSpacing: "-0.03em",
                lineHeight: 1,
                marginBottom: 10,
                background: "linear-gradient(135deg, #f5f5f7, #a1a1a6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {s.number}
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#6e6e73",
                lineHeight: 1.5,
                maxWidth: 160,
                margin: "0 auto",
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
