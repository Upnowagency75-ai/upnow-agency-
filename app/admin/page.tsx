"use client";
import { useState, useEffect, useCallback } from "react";

type Contact = {
  id: string;
  date: string;
  nom: string;
  email: string;
  tel: string;
  ville: string;
  services: string;
  message: string;
  appel: boolean;
  dateAppel: string | null;
  heureAppel: string | null;
  statut: "en_attente" | "en_cours" | "traite";
};

const STATUT_CONFIG = {
  en_attente: { label: "En attente", color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  en_cours:   { label: "En cours",   color: "#2997ff", bg: "rgba(41,151,255,0.12)" },
  traite:     { label: "Traité",     color: "#22c55e", bg: "rgba(34,197,94,0.12)" },
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed]     = useState(false);
  const [error, setError]       = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading]   = useState(false);
  const [selected, setSelected] = useState<Contact | null>(null);
  const [filter, setFilter]     = useState<"tous" | "en_attente" | "en_cours" | "traite">("tous");
  const [search, setSearch]     = useState("");
  const [view, setView]         = useState<"liste" | "calendrier">("liste");

  const fetchContacts = useCallback(async (pwd: string) => {
    setLoading(true);
    const res = await fetch("/api/admin/contacts", {
      headers: { "x-admin-password": pwd },
    });
    if (res.ok) {
      setContacts(await res.json());
    }
    setLoading(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/contacts", {
      headers: { "x-admin-password": password },
    });
    if (res.ok) {
      setAuthed(true);
      setContacts(await res.json());
    } else {
      setError("Mot de passe incorrect");
    }
  };

  const updateStatut = async (id: string, statut: Contact["statut"]) => {
    await fetch("/api/admin/contacts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ id, statut }),
    });
    setContacts((prev) => prev.map((c) => c.id === id ? { ...c, statut } : c));
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, statut } : null);
  };

  const deleteContact = async (id: string) => {
    if (!confirm("Supprimer ce contact ?")) return;
    await fetch("/api/admin/contacts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ id }),
    });
    setContacts((prev) => prev.filter((c) => c.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  useEffect(() => {
    if (authed) {
      const interval = setInterval(() => fetchContacts(password), 30000);
      return () => clearInterval(interval);
    }
  }, [authed, password, fetchContacts]);

  const filtered = contacts.filter((c) => {
    if (filter !== "tous" && c.statut !== filter) return false;
    if (search && !`${c.nom} ${c.email} ${c.ville} ${c.services}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  // Stats
  const stats = {
    total: contacts.length,
    enAttente: contacts.filter((c) => c.statut === "en_attente").length,
    enCours: contacts.filter((c) => c.statut === "en_cours").length,
    traites: contacts.filter((c) => c.statut === "traite").length,
    appels: contacts.filter((c) => c.appel).length,
  };

  const serviceCount: Record<string, number> = {};
  contacts.forEach((c) => {
    (c.services || "").split(", ").forEach((s) => {
      if (s) serviceCount[s] = (serviceCount[s] || 0) + 1;
    });
  });
  const topServices = Object.entries(serviceCount).sort((a, b) => b[1] - a[1]).slice(0, 4);

  const villeCount: Record<string, number> = {};
  contacts.forEach((c) => { if (c.ville) villeCount[c.ville] = (villeCount[c.ville] || 0) + 1; });
  const topVilles = Object.entries(villeCount).sort((a, b) => b[1] - a[1]).slice(0, 4);

  const sourceCount: Record<string, number> = {};
  contacts.forEach((c) => {
    const s = (c as Contact & { source?: string }).source || "Direct";
    sourceCount[s] = (sourceCount[s] || 0) + 1;
  });
  const topSources = Object.entries(sourceCount).sort((a, b) => b[1] - a[1]);

  const sourceColors: Record<string, string> = {
    Instagram: "#e1306c", TikTok: "#fe2c55", Facebook: "#1877f2",
    Snapchat: "#fffc00", Google: "#34a853", YouTube: "#ff0000",
    "Twitter/X": "#f5f5f7", WhatsApp: "#25d366", Direct: "#2997ff", Autre: "#6e6e73",
  };

  // Appels à venir
  const appelsAvenir = contacts.filter((c) => c.appel && c.dateAppel).sort((a, b) =>
    (a.dateAppel || "").localeCompare(b.dateAppel || "")
  );

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  // ── LOGIN ──
  if (!authed) return (
    <main style={{ background: "#000", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 400, padding: 24 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#2997ff", marginBottom: 8 }}>UpNow Agency</p>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: "#f5f5f7", marginBottom: 32 }}>Dashboard Admin</h1>
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 10, padding: "14px 16px", fontSize: 15, color: "#f5f5f7",
              outline: "none", width: "100%", boxSizing: "border-box",
            }}
          />
          {error && <p style={{ color: "#f87171", fontSize: 13 }}>{error}</p>}
          <button type="submit" style={{
            background: "#2997ff", color: "#fff", border: "none", borderRadius: 980,
            padding: "14px", fontSize: 15, fontWeight: 600, cursor: "pointer",
          }}>
            Accéder au dashboard
          </button>
        </form>
      </div>
    </main>
  );

  // ── DASHBOARD ──
  return (
    <main style={{ background: "#000", minHeight: "100vh", color: "#f5f5f7", fontFamily: "-apple-system, sans-serif" }}>
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #0a0a0a; } ::-webkit-scrollbar-thumb { background: #2997ff40; border-radius: 3px; }
        .contact-row:hover { background: rgba(255,255,255,0.04) !important; cursor: pointer; }
        .stat-card { background: #0a0a0a; border: 1px solid #1d1d1f; border-radius: 16px; padding: 20px 24px; }
        .btn-statut { border: none; border-radius: 6px; padding: 5px 12px; font-size: 12px; font-weight: 600; cursor: pointer; transition: opacity 0.2s; }
        .btn-statut:hover { opacity: 0.8; }
      `}</style>

      {/* Header */}
      <div style={{ borderBottom: "1px solid #1d1d1f", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "rgba(0,0,0,0.9)", backdropFilter: "blur(20px)", zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#2997ff", letterSpacing: "0.12em", textTransform: "uppercase", margin: 0 }}>UpNow Agency</p>
            <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Dashboard</h1>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {(["liste", "calendrier"] as const).map((v) => (
            <button key={v} onClick={() => setView(v)} style={{
              background: view === v ? "#2997ff" : "rgba(255,255,255,0.06)",
              color: view === v ? "#fff" : "#a1a1a6",
              border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}>
              {v === "liste" ? "📋 Contacts" : "📅 Appels"}
            </button>
          ))}
          <button onClick={() => fetchContacts(password)} style={{ background: "rgba(255,255,255,0.06)", color: "#a1a1a6", border: "none", borderRadius: 8, padding: "8px 14px", fontSize: 13, cursor: "pointer" }}>
            {loading ? "⏳" : "↻ Actualiser"}
          </button>
        </div>
      </div>

      <div style={{ padding: "32px", maxWidth: 1400, margin: "0 auto" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, marginBottom: 32 }}>
          {[
            { label: "Total contacts", value: stats.total, color: "#f5f5f7" },
            { label: "En attente", value: stats.enAttente, color: "#f59e0b" },
            { label: "En cours", value: stats.enCours, color: "#2997ff" },
            { label: "Traités", value: stats.traites, color: "#22c55e" },
            { label: "Appels réservés", value: stats.appels, color: "#a78bfa" },
          ].map((s) => (
            <div key={s.label} className="stat-card">
              <p style={{ fontSize: 12, color: "#6e6e73", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>{s.label}</p>
              <p style={{ fontSize: 32, fontWeight: 700, color: s.color, margin: 0 }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Sources trafic */}
        <div className="stat-card" style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 12, color: "#6e6e73", margin: "0 0 20px", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>📊 D'où viennent tes clients</p>
          {topSources.length === 0 ? (
            <p style={{ color: "#3d3d3f", fontSize: 13 }}>Aucune donnée — les sources s'afficheront dès qu'un client remplit le formulaire</p>
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {topSources.map(([source, count]) => {
                const pct = Math.round((count / stats.total) * 100);
                const color = sourceColors[source] || "#6e6e73";
                return (
                  <div key={source} style={{ flex: "1 1 160px", background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: "16px", border: `1px solid ${color}30` }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color }}>{source}</span>
                      <span style={{ fontSize: 22, fontWeight: 800, color }}>{count}</span>
                    </div>
                    <div style={{ height: 4, background: "#1d1d1f", borderRadius: 2, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 2, transition: "width 0.5s" }} />
                    </div>
                    <p style={{ fontSize: 11, color: "#6e6e73", margin: "6px 0 0", textAlign: "right" }}>{pct}%</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Top services + villes */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
          <div className="stat-card">
            <p style={{ fontSize: 12, color: "#6e6e73", margin: "0 0 16px", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>Services les plus demandés</p>
            {topServices.length === 0 ? <p style={{ color: "#3d3d3f", fontSize: 13 }}>Aucune donnée</p> : topServices.map(([s, n]) => (
              <div key={s} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 13, color: "#f5f5f7" }}>{s}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 80, height: 4, background: "#1d1d1f", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${(n / stats.total) * 100}%`, background: "#2997ff", borderRadius: 2 }} />
                  </div>
                  <span style={{ fontSize: 12, color: "#6e6e73", width: 20, textAlign: "right" }}>{n}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="stat-card">
            <p style={{ fontSize: 12, color: "#6e6e73", margin: "0 0 16px", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>Villes</p>
            {topVilles.length === 0 ? <p style={{ color: "#3d3d3f", fontSize: 13 }}>Aucune donnée</p> : topVilles.map(([v, n]) => (
              <div key={v} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 13, color: "#f5f5f7" }}>{v}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 80, height: 4, background: "#1d1d1f", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${(n / stats.total) * 100}%`, background: "#a78bfa", borderRadius: 2 }} />
                  </div>
                  <span style={{ fontSize: 12, color: "#6e6e73", width: 20, textAlign: "right" }}>{n}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* VUE CALENDRIER */}
        {view === "calendrier" && (
          <div className="stat-card">
            <p style={{ fontSize: 12, color: "#6e6e73", margin: "0 0 24px", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>📞 Appels réservés</p>
            {appelsAvenir.length === 0 ? (
              <p style={{ color: "#3d3d3f", fontSize: 14 }}>Aucun appel réservé</p>
            ) : appelsAvenir.map((c) => (
              <div key={c.id} onClick={() => setSelected(c)} style={{
                display: "flex", alignItems: "center", gap: 16, padding: "16px", borderRadius: 12,
                background: "rgba(255,255,255,0.03)", border: "1px solid #1d1d1f", marginBottom: 10, cursor: "pointer",
              }}>
                <div style={{ background: "rgba(167,139,250,0.12)", borderRadius: 10, padding: "10px 16px", textAlign: "center", minWidth: 70 }}>
                  <p style={{ fontSize: 18, fontWeight: 700, color: "#a78bfa", margin: 0 }}>{c.heureAppel}</p>
                  <p style={{ fontSize: 11, color: "#6e6e73", margin: 0 }}>{c.dateAppel}</p>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, fontSize: 15, margin: "0 0 2px" }}>{c.nom}</p>
                  <p style={{ fontSize: 12, color: "#6e6e73", margin: 0 }}>{c.tel} · {c.ville}</p>
                </div>
                <div style={{ background: STATUT_CONFIG[c.statut].bg, color: STATUT_CONFIG[c.statut].color, borderRadius: 6, padding: "4px 10px", fontSize: 12, fontWeight: 600 }}>
                  {STATUT_CONFIG[c.statut].label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VUE LISTE */}
        {view === "liste" && (
          <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 380px" : "1fr", gap: 16 }}>

            {/* Tableau */}
            <div className="stat-card" style={{ padding: 0, overflow: "hidden" }}>
              {/* Filtres */}
              <div style={{ padding: "16px 20px", borderBottom: "1px solid #1d1d1f", display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <input
                  placeholder="Rechercher..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid #1d1d1f", borderRadius: 8, padding: "7px 12px", fontSize: 13, color: "#f5f5f7", outline: "none", flex: 1, minWidth: 150 }}
                />
                {(["tous", "en_attente", "en_cours", "traite"] as const).map((f) => (
                  <button key={f} onClick={() => setFilter(f)} style={{
                    background: filter === f ? "#2997ff" : "rgba(255,255,255,0.06)",
                    color: filter === f ? "#fff" : "#a1a1a6",
                    border: "none", borderRadius: 8, padding: "7px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer",
                  }}>
                    {f === "tous" ? "Tous" : STATUT_CONFIG[f].label}
                    {f !== "tous" && <span style={{ marginLeft: 6, background: "rgba(255,255,255,0.15)", borderRadius: 4, padding: "1px 5px", fontSize: 11 }}>{contacts.filter((c) => c.statut === f).length}</span>}
                  </button>
                ))}
              </div>

              {/* En-têtes */}
              <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 80px 100px 80px", padding: "10px 20px", borderBottom: "1px solid #1d1d1f" }}>
                {["Nom", "Email", "Ville", "Services", "Source", "Statut", ""].map((h) => (
                  <span key={h} style={{ fontSize: 11, fontWeight: 700, color: "#6e6e73", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</span>
                ))}
              </div>

              {/* Rows */}
              <div style={{ maxHeight: 500, overflowY: "auto" }}>
                {filtered.length === 0 ? (
                  <p style={{ padding: 24, color: "#3d3d3f", fontSize: 14 }}>Aucun contact{search ? ` pour "${search}"` : ""}</p>
                ) : filtered.map((c) => (
                  <div
                    key={c.id}
                    className="contact-row"
                    onClick={() => setSelected(selected?.id === c.id ? null : c)}
                    style={{
                      display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 80px 100px 80px",
                      padding: "14px 20px", borderBottom: "1px solid #1d1d1f", alignItems: "center",
                      background: selected?.id === c.id ? "rgba(41,151,255,0.06)" : "transparent",
                      transition: "background 0.15s",
                    }}
                  >
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 14, margin: "0 0 2px" }}>{c.nom}</p>
                      <p style={{ fontSize: 11, color: "#6e6e73", margin: 0 }}>{formatDate(c.date)}{c.appel ? " · 📞" : ""}</p>
                    </div>
                    <p style={{ fontSize: 13, color: "#a1a1a6", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.email}</p>
                    <p style={{ fontSize: 13, color: "#a1a1a6", margin: 0 }}>{c.ville || "—"}</p>
                    <p style={{ fontSize: 12, color: "#6e6e73", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.services || "—"}</p>
                    <span style={{ fontSize: 12, fontWeight: 700, color: sourceColors[(c as Contact & { source?: string }).source || "Direct"] || "#6e6e73" }}>
                      {(c as Contact & { source?: string }).source || "Direct"}
                    </span>
                    <div>
                      <span style={{ background: STATUT_CONFIG[c.statut].bg, color: STATUT_CONFIG[c.statut].color, borderRadius: 6, padding: "4px 10px", fontSize: 12, fontWeight: 600 }}>
                        {STATUT_CONFIG[c.statut].label}
                      </span>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); deleteContact(c.id); }} style={{ background: "rgba(248,113,113,0.1)", color: "#f87171", border: "none", borderRadius: 6, padding: "5px 10px", fontSize: 12, cursor: "pointer" }}>
                      🗑
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Détail */}
            {selected && (
              <div className="stat-card" style={{ height: "fit-content", position: "sticky", top: 80 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div>
                    <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 4px" }}>{selected.nom}</h2>
                    <p style={{ fontSize: 12, color: "#6e6e73", margin: 0 }}>{formatDate(selected.date)}</p>
                  </div>
                  <button onClick={() => setSelected(null)} style={{ background: "rgba(255,255,255,0.06)", border: "none", borderRadius: 6, color: "#a1a1a6", fontSize: 18, cursor: "pointer", padding: "4px 8px" }}>✕</button>
                </div>

                {/* Infos */}
                {[
                  { label: "Email", value: selected.email, href: `mailto:${selected.email}` },
                  { label: "Téléphone", value: selected.tel || "—", href: selected.tel ? `tel:${selected.tel}` : undefined },
                  { label: "Ville", value: selected.ville || "—" },
                  { label: "Services", value: selected.services || "—" },
                  { label: "Source", value: (selected as Contact & { source?: string }).source || "Direct" },
                ].map((item) => (
                  <div key={item.label} style={{ marginBottom: 12 }}>
                    <p style={{ fontSize: 11, color: "#6e6e73", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, margin: "0 0 3px" }}>{item.label}</p>
                    {item.href ? (
                      <a href={item.href} style={{ fontSize: 14, color: "#2997ff", textDecoration: "none" }}>{item.value}</a>
                    ) : (
                      <p style={{ fontSize: 14, color: "#f5f5f7", margin: 0 }}>{item.value}</p>
                    )}
                  </div>
                ))}

                {selected.appel && (
                  <div style={{ background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.2)", borderRadius: 10, padding: "12px 14px", marginBottom: 12 }}>
                    <p style={{ fontSize: 12, color: "#a78bfa", fontWeight: 700, margin: "0 0 4px" }}>📞 Appel réservé</p>
                    <p style={{ fontSize: 14, color: "#f5f5f7", margin: 0, fontWeight: 600 }}>{selected.dateAppel} à {selected.heureAppel}</p>
                  </div>
                )}

                <div style={{ marginBottom: 16 }}>
                  <p style={{ fontSize: 11, color: "#6e6e73", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, margin: "0 0 6px" }}>Message</p>
                  <p style={{ fontSize: 13, color: "#a1a1a6", lineHeight: 1.6, margin: 0, whiteSpace: "pre-wrap", background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: 12 }}>{selected.message}</p>
                </div>

                {/* Changer statut */}
                <div>
                  <p style={{ fontSize: 11, color: "#6e6e73", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, margin: "0 0 10px" }}>Statut</p>
                  <div style={{ display: "flex", gap: 8 }}>
                    {(Object.entries(STATUT_CONFIG) as [Contact["statut"], typeof STATUT_CONFIG[keyof typeof STATUT_CONFIG]][]).map(([key, cfg]) => (
                      <button
                        key={key}
                        className="btn-statut"
                        onClick={() => updateStatut(selected.id, key)}
                        style={{
                          background: selected.statut === key ? cfg.bg : "rgba(255,255,255,0.06)",
                          color: selected.statut === key ? cfg.color : "#6e6e73",
                          border: selected.statut === key ? `1px solid ${cfg.color}40` : "1px solid transparent",
                        }}
                      >
                        {cfg.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions rapides */}
                <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                  <a href={`mailto:${selected.email}`} style={{ flex: 1, background: "#2997ff", color: "#fff", borderRadius: 8, padding: "10px", fontSize: 13, fontWeight: 600, textAlign: "center", textDecoration: "none" }}>
                    ✉️ Email
                  </a>
                  {selected.tel && (
                    <a href={`https://wa.me/${selected.tel.replace(/\s/g, "").replace("+", "")}`} target="_blank" rel="noreferrer" style={{ flex: 1, background: "rgba(37,211,102,0.15)", color: "#25D366", borderRadius: 8, padding: "10px", fontSize: 13, fontWeight: 600, textAlign: "center", textDecoration: "none" }}>
                      💬 WhatsApp
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
