# Contact Page — Animations Design
**Date:** 2026-05-15  
**Projet:** UpNow Agency — `/app/contact/page.tsx`  
**Style:** Cinématique dramatique (orbe bleue, glow, amplitude forte)

---

## 1. Entrée cinématique (GSAP)

### Dépendance
GSAP est déjà installé dans le projet (`/components/Hero.tsx` l'utilise).

### Séquence d'animation au chargement
Chaque élément entre depuis y:+60px, opacity:0, filter:blur(6px) → y:0, opacity:1, blur:0

| Élément | Délai | Durée | Easing |
|---|---|---|---|
| Eyebrow "Contactez-nous" | 0s | 0.6s | power3.out |
| Titre h1 | 0.15s | 0.8s | power3.out |
| Sous-titre | 0.28s | 0.6s | power3.out |
| Colonne formulaire (gauche) | 0.40s | 0.7s | power3.out |
| Colonne infos/réseaux (droite) | 0.52s | 0.7s | power3.out |

### Orbe décorative
- `position: fixed`, top-right de la page
- `width: 500px, height: 500px`
- `background: radial-gradient(circle, rgba(41,151,255,0.18), transparent 65%)`
- `filter: blur(80px)`, `pointer-events: none`, `z-index: 0`
- Légère animation CSS flottante (keyframe translateY -20px/+20px, 8s, ease-in-out infinite)

### Lueur sur le titre
- `text-shadow: 0 0 40px rgba(41,151,255,0.35)` sur le mot "projet." en bleu

---

## 2. Interactions formulaire

### Champs input/textarea au focus
- `border-color` → `rgba(41,151,255,0.6)`
- `box-shadow` → `0 0 0 3px rgba(41,151,255,0.15), 0 0 20px rgba(41,151,255,0.1)`
- Transition : 0.25s ease

### Cases de service au clic (toggle)
- Scale spring : `scale(1.04)` pendant 150ms puis retour à `scale(1)`
- Via CSS `transition: transform 0.15s` + `active:scale(0.97)`
- Border + background s'illuminent en bleu (déjà implémenté)

### Bouton WhatsApp submit
- Hover : `box-shadow: 0 0 30px rgba(37,211,102,0.4)` (vert WhatsApp)
- `transform: scale(1.02)`

---

## 3. Transition réseau social (fonctionnalité clé)

### Comportement
Quand l'utilisateur clique sur un lien réseau social (ou le bouton submit WhatsApp) :
1. L'ouverture de l'URL cible est retardée de 800ms
2. Un overlay apparaît (`position:fixed, inset:0, z-index:9999`)
3. Le logo du réseau s'affiche au centre avec animation
4. Après 800ms → l'URL s'ouvre dans un nouvel onglet + l'overlay disparaît

### Animation overlay
- Background : `rgba(0,0,0,0)` → `rgba(0,0,0,0.92)` en 200ms
- Logo container : `scale(0) opacity(0)` → `scale(1.15) opacity(1)` en 300ms → `scale(1)` en 100ms
- Glow coloré : `box-shadow: 0 0 60px [couleur réseau]`
- Texte : "Ouverture de [Réseau]..." fade in à 400ms

### Données par réseau

| Réseau | Couleur principale | Bg glow | Texte |
|---|---|---|---|
| WhatsApp | `#25D366` | `rgba(37,211,102,0.3)` | Ouverture de WhatsApp... |
| Instagram | `#E1306C` | `rgba(225,48,108,0.3)` | Ouverture d'Instagram... |
| TikTok | `#ff0050` | `rgba(255,0,80,0.3)` | Ouverture de TikTok... |
| Facebook | `#1877F2` | `rgba(24,119,242,0.3)` | Ouverture de Facebook... |
| Snapchat | `#FFFC00` | `rgba(255,252,0,0.25)` | Ouverture de Snapchat... |

### Implémentation
- Composant `SocialTransition` : overlay React avec `useState(null | SocialConfig)`
- Fonction `handleSocialClick(social, url)` appelée par chaque lien au lieu de `href` direct
- Les liens deviennent des `<button>` avec `onClick` pour contrôler la navigation
- Le lien du formulaire WhatsApp utilise aussi `handleSocialClick`

---

## 4. Fichiers modifiés

| Fichier | Changement |
|---|---|
| `/app/contact/page.tsx` | Ajout GSAP refs, overlay state, handleSocialClick, animations |

Aucun nouveau composant externe — tout reste dans `page.tsx` pour garder la simplicité.

---

## 5. Hors scope
- Confettis (non retenu)
- Cursor personnalisé (déjà retiré sur le reste du site)
- Animations sur mobile (les animations GSAP s'appliquent sur tous écrans)
