"use client";

import ScrollReveal from "./ScrollReveal";
import MagneticText from "./MagneticText";

const services = [
  {
    icon: "📊", title: "Publicité digitale",
    sub: "Meta · Google · TikTok · Snapchat",
    text: "Ciblage précis selon votre commerce et votre ville. Chaque euro investi travaille pour vous.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
  },
  {
    icon: "📱", title: "Réseaux sociaux",
    sub: "Instagram · TikTok · Facebook · Snapchat",
    text: "Vidéos, stories et contenus publiés aux heures stratégiques pour stimuler l'interaction.",
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=900&q=80",
  },
  {
    icon: "🎬", title: "Création de contenu",
    sub: "Reels · Visuels · Design",
    text: "Contenus sur mesure qui captent l'attention et renforcent votre image de marque.",
    img: "/content-creation.jpeg",
  },
  {
    icon: "💻", title: "Sites web",
    sub: "Vitrine · Landing page · E-commerce",
    text: "Design premium, rapide, optimisé conversion — pour inspirer confiance dès le premier clic.",
    img: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=900&q=80",
  },
  {
    icon: "🏪", title: "Marketing physique",
    sub: "Enseignes · Flyers · Panneaux",
    text: "De l'enseigne au flyer, votre marque reste cohérente et mémorable à chaque point de contact.",
    img: "/marketing-physique.jpg",
  },
  {
    icon: "🎤", title: "Pack événementiel",
    sub: "Soirées · Matchs · Mariages",
    text: "Avant, pendant et après — communication complète pour que votre événement reste gravé.",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80",
  },
];

export default function Services() {
  return (
    <section id="services" style={{ background: "#000", padding: "140px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>

        <ScrollReveal style={{ textAlign: "center", marginBottom: 80 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#2997ff", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
            Nos solutions
          </p>
          <MagneticText
            tag="h2"
            style={{
              fontSize: "clamp(32px, 5vw, 60px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.07,
              color: "#f5f5f7",
              display: "block",
              marginBottom: 16,
            }}
          >
            Tout ce qu&apos;il faut pour dominer.
          </MagneticText>
          <p style={{ fontSize: 19, color: "#6e6e73", maxWidth: 440, margin: "0 auto" }}>
            À force de vous voir, vos clients finissent par venir vers vous.
          </p>
        </ScrollReveal>

        {/* Grid */}
        <div
          className="services-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 2,
            background: "#1d1d1f",
            borderRadius: 24,
            overflow: "hidden",
          }}
        >
          {services.map((s, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div
                className="premium-card"
                style={{
                  background: "#000",
                  border: "1px solid transparent",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                {/* Image */}
                <div className="img-zoom" style={{ height: 200, overflow: "hidden", position: "relative" }}>
                  <img
                    src={s.img}
                    alt={s.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    loading="lazy"
                  />
                  <div
                    style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.75) 100%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute", bottom: 14, left: 14,
                      width: 40, height: 40, borderRadius: 12,
                      background: "rgba(41,151,255,0.15)",
                      border: "1px solid rgba(41,151,255,0.3)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 18,
                    }}
                  >
                    {s.icon}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "24px 24px 32px" }}>
                  <p style={{ fontSize: 11, color: "#2997ff", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
                    {s.sub}
                  </p>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "#f5f5f7", letterSpacing: "-0.02em", marginBottom: 10, lineHeight: 1.2 }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "#6e6e73", lineHeight: 1.65 }}>
                    {s.text}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
