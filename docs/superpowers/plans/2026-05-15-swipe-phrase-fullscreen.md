# Swipe Phrase Fullscreen Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Sur mobile, swiper vers le haut sur la phrase "À force de vous voir, vos clients viennent à vous" ouvre un overlay plein écran avec la phrase en grand et le même effet de curseur automatique que "Devenez une référence".

**Architecture:** On ajoute un état `showOverlay` dans SocialMedia.tsx, une détection de swipe vers le haut (touchstart/touchend), un overlay fullscreen avec la phrase et une boucle requestAnimationFrame identique à celle de Hero.tsx. L'overlay se ferme au tap ou au swipe vers le bas.

**Tech Stack:** React (useState, useEffect, useRef), requestAnimationFrame, GSAP pour l'entrée de l'overlay, CSS keyframes.

---

### Task 1 : Ajouter l'état overlay et la détection de swipe dans SocialMedia.tsx

**Files:**
- Modify: `components/SocialMedia.tsx`

- [ ] **Step 1 : Ajouter l'état et le ref du swipe**

Dans `export default function SocialMedia()`, ajouter après `const crashRef = React.useRef<HTMLDivElement>(null);` :

```tsx
const [showOverlay, setShowOverlay] = React.useState(false);
const swipeTouchY   = React.useRef(0);
```

- [ ] **Step 2 : Ajouter les handlers de swipe sur le crashRef**

Ajouter ces deux fonctions après les handlers `prev` / `next` :

```tsx
const handlePhraseSwipeStart = (e: React.TouchEvent) => {
  swipeTouchY.current = e.touches[0].clientY;
};

const handlePhraseSwipeEnd = (e: React.TouchEvent) => {
  const delta = swipeTouchY.current - e.changedTouches[0].clientY;
  if (delta > 60) setShowOverlay(true); // swipe vers le haut
};
```

- [ ] **Step 3 : Brancher les handlers sur le div crashRef**

Trouver le JSX `<div ref={crashRef} style={{ overflow: "hidden", marginBottom: 28 }}>` et le modifier :

```tsx
<div
  ref={crashRef}
  onTouchStart={handlePhraseSwipeStart}
  onTouchEnd={handlePhraseSwipeEnd}
  style={{ overflow: "hidden", marginBottom: 28, cursor: "pointer" }}
>
```

---

### Task 2 : Créer l'overlay fullscreen avec la phrase

**Files:**
- Modify: `components/SocialMedia.tsx`

- [ ] **Step 1 : Ajouter le CSS de l'overlay dans la balise `<style>` existante**

Dans le `<style>` déjà présent dans le composant, ajouter :

```css
@keyframes overlay-crash-in {
  0%   { opacity: 0; transform: scale(1.08); }
  100% { opacity: 1; transform: scale(1); }
}
.phrase-overlay {
  position: fixed;
  inset: 0;
  background: #000;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  animation: overlay-crash-in 0.25s ease forwards;
  text-align: center;
}
```

- [ ] **Step 2 : Ajouter l'overlay dans le JSX avant la fermeture de `<section>`**

Juste avant `</section>` à la fin du composant, ajouter :

```tsx
{showOverlay && (
  <div className="phrase-overlay" onClick={() => setShowOverlay(false)}>
    <p style={{ fontSize: 12, fontWeight: 600, color: "#2997ff", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 32 }}>
      Swipe bas ou appuie pour fermer
    </p>
    <h2
      className="overlay-phrase"
      style={{
        fontSize: "clamp(40px, 12vw, 90px)",
        fontWeight: 700,
        letterSpacing: "-0.04em",
        lineHeight: 1.05,
        color: "#f5f5f7",
        display: "block",
      }}
    >
      À force de vous voir, vos clients viennent à vous.
    </h2>
  </div>
)}
```

---

### Task 3 : Ajouter le même effet de curseur automatique que Hero.tsx

**Files:**
- Modify: `components/SocialMedia.tsx`

- [ ] **Step 1 : Ajouter un useEffect qui démarre la boucle quand l'overlay s'ouvre**

Ajouter ce useEffect après celui du scroll du carousel :

```tsx
React.useEffect(() => {
  if (!showOverlay) return;

  let frameId: number;
  let startTime: number | null = null;
  const SWEEP = 2400;
  const PAUSE = 1800;
  const CYCLE = SWEEP + PAUSE;
  const current: Map<Element, { x: number; y: number }> = new Map();
  const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  const animate = (ts: number) => {
    if (!startTime) startTime = ts;
    const elapsed = (ts - startTime) % CYCLE;
    const container = document.querySelector(".overlay-phrase") as HTMLElement;
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

      const lerp = 0.12;
      const nx = prev.x + (wantX - prev.x) * lerp;
      const ny = prev.y + (wantY - prev.y) * lerp;
      current.set(char, { x: nx, y: ny });
      char.style.transform = `translate(${nx}px, ${ny}px)`;
    });

    frameId = requestAnimationFrame(animate);
  };

  // Petit délai pour que le DOM de l'overlay soit monté
  const timer = setTimeout(() => {
    frameId = requestAnimationFrame(animate);
  }, 100);

  return () => {
    clearTimeout(timer);
    cancelAnimationFrame(frameId);
  };
}, [showOverlay]);
```

- [ ] **Step 2 : Remplacer le `<h2>` statique de l'overlay par un MagneticText**

Le `<h2 className="overlay-phrase" ...>` doit utiliser `MagneticText` pour avoir les `.split-char` nécessaires à l'animation :

```tsx
<MagneticText
  tag="h2"
  className="overlay-phrase"
  style={{
    fontSize: "clamp(40px, 12vw, 90px)",
    fontWeight: 700,
    letterSpacing: "-0.04em",
    lineHeight: 1.05,
    color: "#f5f5f7",
    display: "block",
  }}
>
  À force de vous voir, vos clients viennent à vous.
</MagneticText>
```

---

### Task 4 : Fermeture par swipe vers le bas

**Files:**
- Modify: `components/SocialMedia.tsx`

- [ ] **Step 1 : Ajouter les handlers de swipe sur l'overlay**

Ajouter deux nouvelles fonctions :

```tsx
const overlayTouchY = React.useRef(0);

const handleOverlaySwipeStart = (e: React.TouchEvent) => {
  overlayTouchY.current = e.touches[0].clientY;
};

const handleOverlaySwipeEnd = (e: React.TouchEvent) => {
  const delta = e.changedTouches[0].clientY - overlayTouchY.current;
  if (delta > 60) setShowOverlay(false); // swipe vers le bas
};
```

- [ ] **Step 2 : Brancher sur le div overlay**

```tsx
<div
  className="phrase-overlay"
  onClick={() => setShowOverlay(false)}
  onTouchStart={handleOverlaySwipeStart}
  onTouchEnd={handleOverlaySwipeEnd}
>
```
