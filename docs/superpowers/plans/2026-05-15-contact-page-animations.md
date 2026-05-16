# Contact Page Animations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Animer la page contact d'UpNow Agency avec une entrée cinématique GSAP, des interactions formulaire, et une transition visuelle par logo pour chaque réseau social.

**Architecture:** Tout le code reste dans `/app/contact/page.tsx`. On ajoute des `useRef` pour GSAP, un `useState` pour l'overlay de transition réseau, et des keyframes CSS inline pour l'orbe flottante. GSAP est déjà installé dans le projet.

**Tech Stack:** Next.js 16 (App Router), GSAP (déjà installé), React hooks (useRef, useState, useEffect), CSS keyframes inline

---

### Task 1: Orbe décorative flottante + lueur titre

**Files:**
- Modify: `app/contact/page.tsx`

- [ ] **Step 1: Ajouter le keyframe CSS de l'orbe dans le composant**

Dans `ContactPage`, avant le `return`, ajouter une balise `<style>` globale avec le keyframe. Ajouter ceci juste après l'ouverture de `<main>` :

```tsx
<style>{`
  @keyframes orbFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
`}</style>
```

- [ ] **Step 2: Ajouter l'orbe décorative dans le JSX**

Juste après la balise `<style>`, avant le `<div style={{ maxWidth: 900...}}>`, ajouter :

```tsx
{/* Orbe décorative */}
<div style={{
  position: "fixed",
  top: -100,
  right: -100,
  width: 500,
  height: 500,
  background: "radial-gradient(circle, rgba(41,151,255,0.18), transparent 65%)",
  filter: "blur(80px)",
  pointerEvents: "none",
  zIndex: 0,
  animation: "orbFloat 8s ease-in-out infinite",
}} />
```

- [ ] **Step 3: Ajouter la lueur sur "projet." dans le titre h1**

Trouver dans le JSX :
```tsx
<span style={{ color: "#2997ff" }}>projet.</span>
```
Remplacer par :
```tsx
<span style={{ color: "#2997ff", textShadow: "0 0 40px rgba(41,151,255,0.35)" }}>projet.</span>
```

- [ ] **Step 4: Vérifier visuellement**

Le dev server tourne déjà (`npm run dev`). Ouvrir `http://localhost:3000/contact`. Vérifier :
- L'orbe bleue est visible en haut à droite
- Elle flotte doucement (cycle de 8s)
- "projet." a une lueur bleue

---

### Task 2: Entrée cinématique GSAP au chargement

**Files:**
- Modify: `app/contact/page.tsx`

- [ ] **Step 1: Ajouter les imports GSAP et useRef**

En haut du fichier, modifier la ligne d'import React :
```tsx
"use client";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
```

- [ ] **Step 2: Créer les refs pour chaque élément animé**

Dans `ContactPage`, avant le `return`, ajouter :
```tsx
const eyebrowRef = useRef<HTMLParagraphElement>(null);
const titleRef = useRef<HTMLHeadingElement>(null);
const subtitleRef = useRef<HTMLParagraphElement>(null);
const formColRef = useRef<HTMLDivElement>(null);
const infoColRef = useRef<HTMLDivElement>(null);
```

- [ ] **Step 3: Ajouter le useEffect GSAP**

Juste après les refs, ajouter :
```tsx
useEffect(() => {
  const els = [
    eyebrowRef.current,
    titleRef.current,
    subtitleRef.current,
    formColRef.current,
    infoColRef.current,
  ];
  gsap.set(els, { y: 60, opacity: 0, filter: "blur(6px)" });

  const delays = [0, 0.15, 0.28, 0.40, 0.52];
  const durations = [0.6, 0.8, 0.6, 0.7, 0.7];

  els.forEach((el, i) => {
    if (!el) return;
    gsap.to(el, {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: durations[i],
      delay: delays[i],
      ease: "power3.out",
    });
  });
}, []);
```

- [ ] **Step 4: Attacher les refs aux éléments JSX**

Dans le JSX, trouver et ajouter les refs :

**Eyebrow** — trouver :
```tsx
<p style={{ fontSize: 13, fontWeight: 600, color: "#2997ff", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
  Contactez-nous
</p>
```
Ajouter `ref={eyebrowRef}` sur le `<p>`.

**Titre h1** — trouver :
```tsx
<h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", ...}}>
```
Ajouter `ref={titleRef}`.

**Sous-titre** — trouver :
```tsx
<p style={{ fontSize: 17, color: "#6e6e73", maxWidth: 480, margin: "0 auto" }}>
  Décrivez-nous ce que vous voulez...
</p>
```
Ajouter `ref={subtitleRef}`.

**Colonne formulaire** — trouver le `<form onSubmit={handleSubmit}...>` et l'envelopper dans :
```tsx
<div ref={formColRef}>
  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
    {/* contenu existant */}
  </form>
</div>
```

**Colonne infos/réseaux** — trouver le `{/* RIGHT — Infos + Socials */}` et ajouter `ref={infoColRef}` sur son `<div>` parent.

- [ ] **Step 5: Vérifier l'animation au chargement**

Recharger `http://localhost:3000/contact`. Les éléments doivent apparaître en cascade de haut en bas avec glissement et défloutage.

---

### Task 3: Interactions formulaire animées

**Files:**
- Modify: `app/contact/page.tsx`

- [ ] **Step 1: Améliorer les champs input au focus**

Dans le JSX, trouver les handlers `onFocus`/`onBlur` des inputs et remplacer par :
```tsx
onFocus={(e) => {
  e.target.style.borderColor = "rgba(41,151,255,0.6)";
  e.target.style.boxShadow = "0 0 0 3px rgba(41,151,255,0.15), 0 0 20px rgba(41,151,255,0.1)";
}}
onBlur={(e) => {
  e.target.style.borderColor = "rgba(255,255,255,0.1)";
  e.target.style.boxShadow = "none";
}}
```
Appliquer à chaque `<input>` ET au `<textarea>`.

- [ ] **Step 2: Ajouter le spring animation sur les cartes de service**

Trouver le `<button>` des cartes de service (dans le `.map` des services) et ajouter :
```tsx
onMouseDown={(e) => {
  (e.currentTarget as HTMLElement).style.transform = "scale(0.97)";
}}
onMouseUp={(e) => {
  (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
  setTimeout(() => {
    (e.currentTarget as HTMLElement).style.transform = "scale(1)";
  }, 150);
}}
```
Et ajouter `transition: "all 0.15s ease"` dans le style existant du bouton.

- [ ] **Step 3: Ajouter le glow vert sur le bouton WhatsApp submit**

Trouver le bouton submit et mettre à jour ses handlers :
```tsx
onMouseEnter={(e) => {
  (e.currentTarget as HTMLElement).style.background = "#0071e3";
  (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(37,211,102,0.4)";
}}
onMouseLeave={(e) => {
  (e.currentTarget as HTMLElement).style.background = "#2997ff";
  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
  (e.currentTarget as HTMLElement).style.boxShadow = "none";
}}
```

- [ ] **Step 4: Vérifier les interactions**

Sur `http://localhost:3000/contact` :
- Cliquer sur un champ → glow bleu apparaît
- Cliquer sur une carte service → légère compression puis rebond
- Hover sur le bouton → lueur verte WhatsApp

---

### Task 4: Overlay de transition réseau social

**Files:**
- Modify: `app/contact/page.tsx`

- [ ] **Step 1: Définir le type SocialConfig et les données**

En haut du fichier, après les imports, ajouter :
```tsx
type SocialConfig = {
  name: string;
  color: string;
  glowColor: string;
  text: string;
  icon: React.ReactNode;
};
```

- [ ] **Step 2: Ajouter le state pour l'overlay**

Dans `ContactPage`, après les refs existants, ajouter :
```tsx
const [activeTransition, setActiveTransition] = useState<SocialConfig | null>(null);
```

- [ ] **Step 3: Ajouter le keyframe de l'overlay dans la balise style**

Dans la balise `<style>` déjà créée (Task 1), ajouter :
```css
@keyframes overlayIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes logoIn {
  0% { transform: scale(0); opacity: 0; }
  70% { transform: scale(1.15); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes textFadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
```

- [ ] **Step 4: Créer la fonction handleSocialClick**

Dans `ContactPage`, avant le `return`, ajouter :
```tsx
const handleSocialClick = (config: SocialConfig, url: string) => {
  setActiveTransition(config);
  setTimeout(() => {
    window.open(url, "_blank");
    setTimeout(() => setActiveTransition(null), 200);
  }, 800);
};
```

- [ ] **Step 5: Ajouter l'overlay JSX**

Juste après la balise `<style>` et l'orbe, ajouter :
```tsx
{/* Overlay transition réseau */}
{activeTransition && (
  <div style={{
    position: "fixed", inset: 0, zIndex: 99999,
    background: "rgba(0,0,0,0.92)",
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center", gap: 20,
    animation: "overlayIn 0.2s ease forwards",
  }}>
    <div style={{
      width: 96, height: 96, borderRadius: 24,
      background: `${activeTransition.glowColor}`,
      border: `1px solid ${activeTransition.color}40`,
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: `0 0 60px ${activeTransition.color}`,
      color: activeTransition.color,
      animation: "logoIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards",
    }}>
      {activeTransition.icon}
    </div>
    <p style={{
      fontSize: 16, fontWeight: 500, color: "#f5f5f7",
      animation: "textFadeIn 0.4s ease 0.35s both",
    }}>
      {activeTransition.text}
    </p>
  </div>
)}
```

- [ ] **Step 6: Convertir les liens sociaux en boutons avec handleSocialClick**

Dans le `.map` de `socials`, remplacer le `<a>` par un `<button>` :
```tsx
<button
  key={s.name}
  onClick={() => handleSocialClick(
    { name: s.name, color: s.color, glowColor: `${s.color}18`, text: `Ouverture de ${s.name}...`, icon: s.icon },
    s.href
  )}
  style={{
    display: "flex", alignItems: "center", gap: 14,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 12, padding: "14px 16px",
    cursor: "pointer", width: "100%",
    transition: "all 0.2s",
  }}
  onMouseEnter={(e) => {
    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
  }}
  onMouseLeave={(e) => {
    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
  }}
>
  <div style={{
    width: 38, height: 38, borderRadius: 10, flexShrink: 0,
    background: `${s.color}18`,
    border: `1px solid ${s.color}30`,
    display: "flex", alignItems: "center", justifyContent: "center",
    color: s.color,
  }}>
    {s.icon}
  </div>
  <div style={{ textAlign: "left" }}>
    <div style={{ fontSize: 14, fontWeight: 500, color: "#f5f5f7" }}>{s.name}</div>
    <div style={{ fontSize: 12, color: "#6e6e73" }}>{s.handle}</div>
  </div>
  <div style={{ marginLeft: "auto", color: "#3d3d3f", fontSize: 16 }}>→</div>
</button>
```

- [ ] **Step 7: Connecter le bouton submit WhatsApp à handleSocialClick**

Trouver dans `handleSubmit` la ligne :
```tsx
window.open(`https://wa.me/33744810427?text=${msg}`, "_blank");
```
Remplacer par :
```tsx
const waConfig: SocialConfig = {
  name: "WhatsApp",
  color: "#25D366",
  glowColor: "rgba(37,211,102,0.15)",
  text: "Ouverture de WhatsApp...",
  icon: socials[0].icon,
};
handleSocialClick(waConfig, `https://wa.me/33744810427?text=${msg}`);
```

Supprimer la ligne `setSent(true)` — la transition overlay remplace l'état succès.

- [ ] **Step 8: Vérifier l'overlay**

Sur `http://localhost:3000/contact` :
- Cliquer sur "Instagram" → overlay noir, logo rose pulse, texte "Ouverture d'Instagram...", puis Instagram s'ouvre dans un nouvel onglet
- Cliquer sur "WhatsApp" → overlay vert, logo WA pulse, WhatsApp s'ouvre
- Cliquer sur "Snapchat" → overlay jaune, logo Snapchat
- Vérifier TikTok (rouge) et Facebook (bleu)

- [ ] **Step 9: Vérifier que TypeScript ne signale aucune erreur**

```bash
cd /Users/aminebensaad/Desktop/mon-site && npx tsc --noEmit 2>&1
```
Attendu : aucune sortie (0 erreurs)
