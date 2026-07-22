import { useState, useEffect } from "react";

// Per inserire immagini
import backgroundImage from "./assets/sfondo-hb2026.webp";
import logo from "./assets/LogoHB.webp";

// 50 squadre
// const teamsList = Array.from({ length: 50 }, (_, i) => `Squadra ${i + 1}`);

import teams from "./teams.js";
import initialMatches from "./matches.js";

function App() {
  const [logoSmall, setLogoSmall] = useState(false);
  // MATCHES
  const [matches, setMatches] = useState(() => {
    const saved = localStorage.getItem("matches");
    return saved ? JSON.parse(saved) : initialMatches;
  });

  // SAVE
  useEffect(() => {
    localStorage.setItem("matches", JSON.stringify(matches));
  }, [matches]);

  useEffect(() => {
    const onScroll = () => {
      setLogoSmall(window.scrollY > 80);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // RESET
  function resetTournament() {
    if (!window.confirm("Vuoi cancellare tutto il torneo?")) return;
    localStorage.removeItem("matches");
    setMatches(initialMatches);
  }

  function updateMatch(id, field, value) {
    setMatches(matches =>
      matches.map(m =>
        m.id === id
          ? {
              ...m,
              [field]: value === "" ? null : Number(value)
            }
          : m
      )
    );
  }

  // =========================
  // CLASSIFICA UNICA
  // =========================
  const table = {};

  teams.forEach(team => {
    table[team.name] = {
      team: team.name,
      points: 0,
      won: 0,
      lost: 0
    };
  });

  matches.forEach(m => {
    if (m.sets1 == null || m.sets2 == null) return;
    const t1 = table[m.team1];
    const t2 = table[m.team2];

    t1.won += m.sets1;
    t1.lost += m.sets2;
    t2.won += m.sets2;
    t2.lost += m.sets1;

    if (m.sets1 > m.sets2) {
      t1.points += 3;
    } else {
      t2.points += 3;
    }
  });

  const ranking = Object.values(table).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return (b.won - b.lost) - (a.won - a.lost);
  });

  // =========================
  // UI STYLE
  // =========================
  const container = {
    fontFamily: "Inter, Arial, sans-serif",
    // background: "#f5f7fb",               sfondo bianco

    // Per avere sfondo immagine
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",

    padding: "16px",
    width: "100%",
    maxWidth: "100%",
    margin: "0 auto",
    minHeight: "100vh",
    boxSizing: "border-box",
    paddingLeft: "32px",
    paddingRight: "32px",
    color: "#111"
  };

  // const cardStyle = {
  //   background: "#f6f6f6",
  //   padding: "16px",
  //   borderRadius: "12px",
  //   marginBottom: "20px"
  // };
  const cardStyle = {
    background: "#fff",
    // background: "#f5f7fb",
    border: "1px solid #e2e8f0",
    borderRadius: "18px",
    padding: "22px",
    boxShadow: "0 10px 30px rgba(15,23,42,0.08)"
  };
  const contentLayoutStyle = {
    display: "grid",
    gridTemplateColumns: "700px minmax(0, 1fr)",
    gap: "20px",
    alignItems: "start"
  };

  const stickyStyle = {
    position: "sticky",
    top: logoSmall ? "130px" : "220px",
    alignSelf: "start"
  };

  return (
    <div style={container}>
      <div style={{ height: logoSmall ? "130px" : "220px", transition: "height 0.3s ease" }} />
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          textAlign: "center",
          marginBottom: "24px",
          padding: logoSmall ? "8px 0" : "16px 0",
          background: logoSmall ? "rgba(255,255,255,0.92)" : "transparent",
          backdropFilter: logoSmall ? "blur(10px)" : "none",
          WebkitBackdropFilter: logoSmall ? "blur(10px)" : "none",
          transition: "all 0.3s ease",
          // Per aggiungere ombra quando si scrolla e il logo è piccolo
          boxShadow: logoSmall ? "0 2px 12px rgba(0,0,0,0.08)" : "none",
        }}
      >
        <img
          src={logo}
          alt="Happy Beach"
          style={{
            height: logoSmall ? "110px" : "200px",
            width: "auto",
            display: "block",
            margin: "0 auto",
            transition: "height 0.3s ease"
          }}
        />
      </header>

      <div style={contentLayoutStyle}>
        <div style={stickyStyle}>

          {/* CLASSIFICA */}
          <div
            style={{
              ...cardStyle,
              height: "calc(100vh - 160px)",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <h2 style={{ marginTop: 0 }}>Classifica</h2>

            <div
              style={{
                flex: 1,
                overflowY: "auto",
                overflowX: "hidden",
                paddingRight: "4px"
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8fafc" }}>
                    <th style={{ padding: "10px" }}>#</th>
                    <th style={{ padding: "10px" }}>Squadra</th>
                    <th style={{ padding: "10px" }}>Punti</th>
                    <th style={{ padding: "10px" }}>Set</th>
                  </tr>
                </thead>
              
                <tbody>
                  {ranking.map((t, i) => (
                    <tr
                      key={i}
                      style={{
                        textAlign: "center",
                        // Per camboiare il colore delle prime n posizioni
                        background:
                          i <= 31
                            ? "#DCFCE7"
                            : "transparent",
                        borderBottom: "1px solid #eef2f7"
                      }}
                    >
                      <td style={{ padding: "10px" }}>{i + 1}</td>
                      <td style={{ padding: "10px" }}>{t.team}</td>
                      <td style={{ padding: "10px" }}>{t.points}</td>
                      <td style={{ padding: "10px" }}>
                        {/* // Per mettere il segno + davanti ai set vinti in più rispetto a quelli persi */}
                        {t.won - t.lost > 0 ? "+" : ""}
                        {t.won - t.lost}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* PARTITE */}
        <div
          style={{
            ...cardStyle,
            display: "flex",
            flexDirection: "column",
            minHeight: "72px"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 style={{ margin: 0 }}>Partite</h2>
            <button
              onClick={resetTournament}
              style={{
                padding: "8px 14px",
                border: "none",
                borderRadius: "8px",
                background: "#b91c1c",
                color: "white",
                cursor: "pointer",
                fontWeight: 700,
                transition: "0.2s"
              }}
            >
              Reset
            </button>
          </div>
          <div
            style={{
              paddingRight: "6px"
            }}>
          {matches.map((m, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(150px,1fr) auto minmax(150px,1fr)",
                alignItems: "center",
                gap: "12px",
                padding: "16px 20px",
                border: "1px solid #e5e7eb",
                borderRadius: "14px",
                marginBottom: "16px",
                background: "#fcfdff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
              }}
            >
              <div
                style={{
                  textAlign: "right",
                  fontWeight: 800,
                  fontSize: "1.05rem",
                  color: m.sets1 > m.sets2 ? "#16a34a" : "#374151",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}
              >
                {m.team1}
              </div>

              <div
                onClick={() => {
                  const s1 = window.prompt(`Set di ${m.team1}`, m.sets1 ?? "");
                  if (s1 === null) return;

                  const s2 = window.prompt(`Set di ${m.team2}`, m.sets2 ?? "");
                  if (s2 === null) return;

                  updateMatch(m.id, "sets1", s1);
                  updateMatch(m.id, "sets2", s2);
                }}
                style={{
                  cursor: "pointer",
                  background: m.sets1 == null || m.sets2 == null ? "#f8fafc" : "#2563eb",
                  color: m.sets1 == null || m.sets2 == null ? "#64748b" : "white",
                  borderRadius: "999px",
                  padding: "8px 14px",
                  fontWeight: 800,
                  fontSize: "1rem",
                  minWidth: "76px",
                  textAlign: "center",
                  userSelect: "none",
                  transition: "0.2s"
                }}
              >
                {m.sets1 == null || m.sets2 == null
                  ? "- : -"
                  : `${m.sets1} : ${m.sets2}`}
              </div>

              <div
                style={{
                  fontWeight: 800,
                  fontSize: "1.05rem",
                  color: m.sets2 > m.sets1 ? "#16a34a" : "#374151",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textAlign: "left"
                }}
              >
                {m.team2}
              </div>

              <div
                style={{
                  gridColumn: "1 / -1",
                  marginTop: "8px",
                  fontSize: "0.85rem",
                  color: "#6b7280",
                  display: "flex",
                  justifyContent: "center",
                  gap: "16px",
                  flexWrap: "wrap"
                }}
              >
                <span>📍 {m.campo || "-"}</span>
                <span>📅 {m.giorno || "-"}</span>
                <span>⏰ {m.ora || "-"}</span>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;