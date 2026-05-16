"use client";

export default function Evenement() {
  return (
    <section id="evenement" style={{ background: "#000", padding: "120px 0" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "0 24px" }}>

        {/* Full width image card */}
        <div
          style={{
            position: "relative",
            borderRadius: 24,
            overflow: "hidden",
            marginBottom: 24,
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80"
            alt="Événementiel"
            style={{ width: "100%", height: 420, objectFit: "cover", display: "block" }}
            loading="lazy"
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 100%)",
            }}
          />
          <div
            className="event-content"
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "48px 56px",
            }}
          >
            <p style={{ fontSize: 13, fontWeight: 600, color: "#2997ff", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>
              Événementiel
            </p>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "#f5f5f7",
                marginBottom: 16,
                lineHeight: 1.1,
              }}
            >
              Votre événement,
              <br />mémorable.
            </h2>
            <p style={{ fontSize: 17, color: "#a1a1a6", lineHeight: 1.6, maxWidth: 400, marginBottom: 28 }}>
              Soirée, match, mariage, lancement — UpNow vous accompagne avant,
              pendant et après.
            </p>
            <a
              href="/contact"
              style={{
                display: "inline-block",
                background: "#2997ff",
                color: "#fff",
                padding: "14px 28px",
                borderRadius: 980,
                fontSize: 15,
                fontWeight: 500,
                textDecoration: "none",
                width: "fit-content",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "#0071e3")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "#2997ff")
              }
            >
              Devis gratuit
            </a>
          </div>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
          {["Soirées", "Matchs", "Mariages", "Associations", "Lancements", "Animations"].map((tag) => (
            <span
              key={tag}
              style={{
                background: "#0a0a0a",
                border: "1px solid #1d1d1f",
                color: "#a1a1a6",
                padding: "8px 20px",
                borderRadius: 980,
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
