"use client";

import { useEffect, useRef } from "react";
import MagneticText from "./MagneticText";

export default function Hero() {
  const imgRef  = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  /* Parallax on scroll */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (imgRef.current)  imgRef.current.style.transform  = `translateY(${y * 0.18}px)`;
      if (glowRef.current) glowRef.current.style.transform = `translateY(${y * 0.1}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  /* Curseur virtuel fluide */
  useEffect(() => {
    let frameId: number;
    let startTime: number | null = null;
    const SWEEP = 2400;
    const PAUSE = 1800;
    const CYCLE = SWEEP + PAUSE;
    // Position cible de chaque lettre (interpolée)
    const current: Map<HTMLSpanElement, { x: number; y: number }> = new Map();
    const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const elapsed = (ts - startTime) % CYCLE;
      const container = document.querySelector(".hero-line1") as HTMLElement;
      if (!container) { frameId = requestAnimationFrame(animate); return; }

      const chars = container.querySelectorAll<HTMLSpanElement>(".split-char");
      const rect  = container.getBoundingClientRect();
      const inSweep = elapsed < SWEEP;

      let targetX = 0, targetY = 0;
      if (inSweep) {
        const t = easeInOut(elapsed / SWEEP);
        targetX = rect.left + t * rect.width;
        targetY = rect.top  + rect.height / 2;
      }

      chars.forEach((char) => {
        const cr   = char.getBoundingClientRect();
        const cx   = cr.left + cr.width  / 2;
        const cy   = cr.top  + cr.height / 2;
        const prev = current.get(char) ?? { x: 0, y: 0 };

        let wantX = 0, wantY = 0;
        if (inSweep) {
          const dist = Math.sqrt((targetX - cx) ** 2 + (targetY - cy) ** 2);
          const max  = 100;
          if (dist < max) {
            const force = (max - dist) / max;
            wantX = (cx - targetX) * force * 0.45;
            wantY = (cy - targetY) * force * 0.45;
          }
        }

        // Lerp vers la cible pour fluidité
        const lerp = 0.12;
        const nx = prev.x + (wantX - prev.x) * lerp;
        const ny = prev.y + (wantY - prev.y) * lerp;
        current.set(char, { x: nx, y: ny });
        char.style.transform = `translate(${nx}px, ${ny}px)`;
      });

      frameId = requestAnimationFrame(animate);
    };

    const timer = setTimeout(() => {
      frameId = requestAnimationFrame(animate);
    }, 2200);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frameId);
      document.querySelectorAll<HTMLSpanElement>(".hero-line1 .split-char")
        .forEach((c) => { c.style.transform = ""; });
    };
  }, []);

  /* GSAP cinematic entrance */
  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(".hero-eyebrow",  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 })
        .fromTo(".hero-h1",       { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.1 }, "-=0.5")
        .fromTo(".hero-sub",      { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9 }, "-=0.7")
        .fromTo(".hero-ctas",     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .fromTo(".hero-img-wrap", { opacity: 0, y: 60, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 1.4 }, "-=0.5")
        // Vague automatique sur "Devenez une référence"
      ;
    });
  }, []);

  return (
    <section
      style={{
        background: "#000",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Ambient radial glow */}
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 1000,
          height: 700,
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(41,151,255,0.16) 0%, transparent 65%)",
          pointerEvents: "none",
          animation: "glow-pulse 7s ease-in-out infinite",
        }}
      />

      {/* ── Text block ── */}
      <div
        style={{
          textAlign: "center",
          padding: "130px 24px 52px",
          maxWidth: 860,
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Eyebrow — style B dégradé animé */}
        <div className="hero-eyebrow" style={{ display: "inline-block", marginBottom: 32, opacity: 0 }}>
          <style>{`
            @keyframes spin-gradient {
              0%   { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            .eyebrow-wrap {
              position: relative;
              display: inline-flex;
              border-radius: 999px;
              padding: 2px;
              background: transparent;
            }
            .eyebrow-wrap::before {
              content: '';
              position: absolute;
              inset: 0;
              border-radius: 999px;
              padding: 2px;
              background: conic-gradient(from 0deg, #2997ff, #a78bfa, #f472b6, #2997ff);
              animation: spin-gradient 2.5s linear infinite;
              -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
              -webkit-mask-composite: xor;
              mask-composite: exclude;
            }
            .eyebrow-inner {
              position: relative;
              z-index: 1;
              display: inline-flex;
              align-items: center;
              gap: 10px;
              background: #0a0a0a;
              border-radius: 999px;
              padding: 8px 20px;
              font-size: 11px;
              font-weight: 700;
              letter-spacing: 2.5px;
              text-transform: uppercase;
              background-clip: text;
              -webkit-background-clip: text;
            }
            .eyebrow-text {
              background: linear-gradient(90deg, #2997ff, #a78bfa, #f472b6);
              background-size: 200%;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              animation: gradient-shift 3s ease infinite;
            }
            @keyframes gradient-shift {
              0%   { background-position: 0% 50%; }
              50%  { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            .eyebrow-dot {
              width: 7px;
              height: 7px;
              border-radius: 50%;
              background: linear-gradient(135deg, #2997ff, #a78bfa);
              box-shadow: 0 0 8px #a78bfa, 0 0 16px #2997ff60;
              animation: blink 2s ease-in-out infinite;
              flex-shrink: 0;
            }
          `}</style>
          <div className="eyebrow-wrap">
            <div className="eyebrow-inner">
              <span className="eyebrow-dot" />
              <span className="eyebrow-text">Agence Marketing Digital — International</span>
            </div>
          </div>
        </div>

        {/* H1 with magnetic text */}
        <div className="hero-h1" style={{ opacity: 0, marginBottom: 24 }}>
          <MagneticText
            tag="h1"
            className="hero-line1"
            style={{
              fontSize: "clamp(44px, 7.5vw, 96px)",
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: "-0.04em",
              color: "#f5f5f7",
              display: "block",
            }}
          >
            Devenez une référence
          </MagneticText>
          <div style={{ marginTop: 4 }}>
            <MagneticText
              tag="div"
              style={{
                fontSize: "clamp(44px, 7.5vw, 96px)",
                fontWeight: 700,
                lineHeight: 1.04,
                letterSpacing: "-0.04em",
                background: "linear-gradient(90deg,#2997ff 0%,#a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                display: "block",
              }}
            >
              dans votre ville.
            </MagneticText>
          </div>
        </div>

        {/* Subtitle */}
        <p
          className="hero-sub"
          style={{
            fontSize: "clamp(17px, 2vw, 22px)",
            fontWeight: 400,
            lineHeight: 1.65,
            color: "#a1a1a6",
            maxWidth: 560,
            margin: "0 auto 44px",
            opacity: 0,
          }}
        >
          Nous transformons votre présence en ligne et hors ligne
          en véritable levier de croissance.
        </p>

        {/* CTAs */}
        <div
          className="hero-ctas"
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
            opacity: 0,
          }}
        >
          <a
            href="#offres"
            className="btn-primary"
            style={{ padding: "17px 38px", textDecoration: "none", display: "inline-block" }}
          >
            Découvrir nos offres
          </a>
          <a
            href="/contact"
            className="btn-secondary"
            style={{ padding: "17px 38px", textDecoration: "none", display: "inline-block" }}
          >
            Nous contacter
          </a>
        </div>
      </div>

      {/* ── Hero image — premier plan + parallax ── */}
      <div
        ref={imgRef}
        className="hero-img-wrap"
        style={{
          width: "100%",
          maxWidth: 1400,
          padding: "0 24px",
          position: "relative",
          zIndex: 2,
          opacity: 0,
        }}
      >
        {/* Image glow */}
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: "50%",
            transform: "translateX(-50%)",
            width: "70%",
            height: 160,
            background: "radial-gradient(ellipse, rgba(41,151,255,0.22) 0%, transparent 70%)",
            filter: "blur(50px)",
            animation: "glow-pulse 6s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />

        {/* Apple-style rounded frame with blue border glow */}
        <div
          className="hero-frame"
          style={{
            borderRadius: 28,
            padding: 10,
            background: "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
            border: "1px solid rgba(41,151,255,0.45)",
            backdropFilter: "blur(2px)",
          }}
        >
        <div
          className="img-zoom"
          style={{
            borderRadius: 20,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            src="/html-img-0.png"
            alt="UpNow Agency"
            style={{
              width: "100%",
              display: "block",
            }}
          />
          {/* Subtle overlay at bottom */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "30%",
              background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.4))",
              pointerEvents: "none",
            }}
          />
        </div>
        </div>
      </div>
    </section>
  );
}
