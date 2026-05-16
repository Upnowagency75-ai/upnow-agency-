"use client";
import { useState, useEffect } from "react";

const links = [
  { href: "#services", label: "Services" },
  { href: "#reseaux", label: "Réseaux" },
  { href: "#offres", label: "Offres" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        height: 52,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        background: scrolled
          ? "rgba(0,0,0,0.85)"
          : "rgba(0,0,0,0.72)",
        backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid rgba(255,255,255,0.04)",
        transition: "all 0.35s ease",
      }}
    >
      {/* Logo */}
      <a
        href="#"
        style={{
          fontSize: 17,
          fontWeight: 700,
          color: "#f5f5f7",
          textDecoration: "none",
          letterSpacing: "0.5px",
        }}
      >
        UP<span style={{ color: "#2997ff" }}>NOW</span>
      </a>

      {/* Links */}
      <ul
        className="nav-links"
        style={{
          display: "flex",
          gap: 32,
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
      >
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              style={{
                color: "#a1a1a6",
                fontSize: 13,
                fontWeight: 400,
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#f5f5f7")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#a1a1a6")
              }
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="/contact"
        style={{
          background: "#2997ff",
          color: "#fff",
          padding: "8px 18px",
          borderRadius: 980,
          fontSize: 13,
          fontWeight: 500,
          textDecoration: "none",
          transition: "background 0.2s, transform 0.2s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "#0071e3";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "#2997ff";
        }}
      >
        Nous contacter
      </a>
    </nav>
  );
}
