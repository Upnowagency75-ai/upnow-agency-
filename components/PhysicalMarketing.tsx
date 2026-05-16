"use client";

const items = [
  { label: "Enseignes", img: "/enseigne.jpeg" },
  { label: "Vitrophanie", img: "/vitrophanie.jpg" },
  { label: "Drapeaux", img: "/drapeaux.jpg" },
  { label: "Flyers", img: "/flyers.jpg" },
  { label: "Panneaux", img: "/panneaux.png" },
  { label: "Cartes de visite", img: "/cartes-visite.jpeg" },
  { label: "Fidélité", img: "/fidelite.jpg" },
  { label: "Distribution stratégique", img: "/distribution.jpg" },
];

export default function PhysicalMarketing() {
  return (
    <section id="physique" style={{ background: "#000", padding: "120px 0" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "0 24px" }}>

        <style>{`
          @media (max-width: 700px) {
            .physical-split { grid-template-columns: 1fr !important; gap: 40px !important; }
            .physical-grid  { grid-template-columns: repeat(2,1fr) !important; }
          }
        `}</style>

        {/* Split layout */}
        <div
          className="physical-split"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "center",
            marginBottom: 60,
          }}
        >
          {/* Left — text */}
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#2997ff", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20 }}>
              Marketing physique
            </p>
            <h2
              style={{
                fontSize: "clamp(30px, 4vw, 48px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                color: "#f5f5f7",
                marginBottom: 20,
              }}
            >
              Votre visibilité
              <br />
              <span style={{ color: "#a1a1a6" }}>ne s&apos;arrête pas au digital.</span>
            </h2>
            <p style={{ fontSize: 17, color: "#6e6e73", lineHeight: 1.65, marginBottom: 32 }}>
              Nous créons des supports physiques professionnels pour rendre votre
              commerce plus visible, plus crédible et plus mémorable à chaque
              point de contact.
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
                transition: "background 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#0071e3";
                (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#2997ff";
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              }}
            >
              Demander un devis gratuit
            </a>
          </div>

          {/* Right — image */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                inset: -20,
                background: "radial-gradient(ellipse, rgba(41,151,255,0.1) 0%, transparent 70%)",
                filter: "blur(30px)",
              }}
            />
            <img
              src="/marketing-physique.jpg"
              alt="Panneau publicitaire UpNow Agency"
              style={{
                width: "100%",
                borderRadius: 16,
                position: "relative",
                zIndex: 1,
              }}
            />
          </div>
        </div>

        {/* Items grid */}
        <div
          className="physical-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 2,
            background: "#1d1d1f",
            border: "1px solid #1d1d1f",
            borderRadius: 18,
            overflow: "hidden",
            // images fill cells
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                aspectRatio: "4/3",
                overflow: "hidden",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                const img = e.currentTarget.querySelector("img") as HTMLElement;
                if (img) img.style.transform = "scale(1.08)";
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector("img") as HTMLElement;
                if (img) img.style.transform = "scale(1)";
              }}
            >
              <img
                src={item.img}
                alt={item.label}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.5s ease",
                }}
              />
              {/* dark gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%)",
                }}
              />
              {/* label */}
              <div
                style={{
                  position: "absolute",
                  bottom: 14,
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#fff",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
