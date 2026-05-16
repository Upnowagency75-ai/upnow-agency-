"use client";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#000",
        borderTop: "1px solid #1d1d1f",
        padding: "48px 24px 32px",
      }}
    >
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 48,
            marginBottom: 48,
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#f5f5f7",
                marginBottom: 12,
                letterSpacing: "0.5px",
              }}
            >
              UP<span style={{ color: "#2997ff" }}>NOW</span>
            </div>
            <p style={{ fontSize: 13, color: "#6e6e73", lineHeight: 1.6, maxWidth: 240, marginBottom: 16 }}>
              L&apos;agence qui transforme votre visibilité en croissance.
            </p>
            <p style={{ fontSize: 13, color: "#6e6e73" }}>International</p>
          </div>

          {/* Services */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#f5f5f7", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 16 }}>Services</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {["Publicité digitale", "Réseaux sociaux", "Sites web", "Marketing physique"].map((s) => (
                <li key={s}>
                  <a href="#services" style={{ fontSize: 13, color: "#6e6e73", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#f5f5f7")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#6e6e73")}
                  >{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#f5f5f7", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 16 }}>Contact</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              <li><a href="mailto:upnow.agency75@gmail.com" style={{ fontSize: 13, color: "#6e6e73", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#f5f5f7")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#6e6e73")}
              >Email</a></li>
              <li><a href="tel:+33744810427" style={{ fontSize: 13, color: "#6e6e73", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#f5f5f7")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#6e6e73")}
              >Téléphone</a></li>
              <li><a href="https://www.instagram.com/upnow_agency_" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "#6e6e73", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#f5f5f7")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#6e6e73")}
              >Instagram</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#f5f5f7", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 16 }}>Offres</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {["Pack Lancement", "Pack Premium", "Pack Business", "Événementiel"].map((s) => (
                <li key={s}>
                  <a href="#offres" style={{ fontSize: 13, color: "#6e6e73", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#f5f5f7")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#6e6e73")}
                  >{s}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="footer-bottom"
          style={{
            borderTop: "1px solid #1d1d1f",
            paddingTop: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: 12, color: "#3d3d3f" }}>
            © {new Date().getFullYear()} UpNow Agency. Tous droits réservés.
          </p>
          <p style={{ fontSize: 12, color: "#3d3d3f" }}>
            International · upnow.agency75@gmail.com · +33 7 44 81 04 27
          </p>
        </div>
      </div>
    </footer>
  );
}
