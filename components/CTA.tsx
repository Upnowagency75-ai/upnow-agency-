"use client";

import ScrollReveal from "./ScrollReveal";
import MagneticText from "./MagneticText";

export default function CTA() {
  return (
    <section id="contact" style={{ background: "#000", padding: "140px 24px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>

        <ScrollReveal>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#2997ff", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>
            Commençons
          </p>
          <MagneticText
            tag="h2"
            style={{
              fontSize: "clamp(40px, 7vw, 84px)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.04,
              color: "#f5f5f7",
              display: "block",
              marginBottom: 12,
            }}
          >
            Prêt à accélérer
          </MagneticText>
          <MagneticText
            tag="h2"
            style={{
              fontSize: "clamp(40px, 7vw, 84px)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.04,
              color: "#a1a1a6",
              display: "block",
              marginBottom: 24,
            }}
          >
            votre croissance ?
          </MagneticText>
          <p style={{ fontSize: 19, color: "#6e6e73", lineHeight: 1.65, maxWidth: 460, margin: "0 auto 52px" }}>
            Votre image devient plus professionnelle, plus visible et plus crédible. Parlons de votre projet.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 36 }}>
            <a
              href="/contact"
              className="btn-primary"
              style={{ padding: "18px 44px", textDecoration: "none", display: "inline-block", fontSize: 17 }}
            >
              Nous écrire
            </a>
            <a
              href="tel:+33744810427"
              className="btn-secondary"
              style={{ padding: "18px 44px", textDecoration: "none", display: "inline-block", fontSize: 17 }}
            >
              07 44 81 04 27
            </a>
            <a
              href="https://www.instagram.com/upnow_agency_"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
                color: "#fff", padding: "18px 44px", borderRadius: 980,
                fontSize: 17, fontWeight: 500, textDecoration: "none",
                transition: "opacity 0.25s, transform 0.25s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "0.85";
                (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "1";
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              }}
            >
              @upnow_agency_
            </a>
          </div>
          <p style={{ fontSize: 13, color: "#3d3d3f" }}>upnow.agency75@gmail.com · International</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
