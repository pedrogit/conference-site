import { useState } from "react";
import { supabase } from "./lib/supabase";
import "./App.css";

const talks = [
  { title: "Concevoir des systèmes qui évoluent", speaker: "Alicia Moore", time: "09:30" },
  { title: "Du prototype au produit", speaker: "Priya Shah", time: "11:00" },
  { title: "Accélérez votre production avec l'automatisation", speaker: "Luca Kim", time: "14:00" },
];

const workshops = [
  { title: "Optimisation des performances React", speaker: "Nina Hart", duration: "90 min" },
  { title: "L'IA pour les équipes produit", speaker: "Sam Lee", duration: "60 min" },
  { title: "Design systems à grande échelle", speaker: "Mira Chen", duration: "120 min" },
];

const getStoredEntries = (key) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const saveRegistration = async (payload) => {
  if (supabase) {
    const { error } = await supabase.from("registrations").insert([payload]);
    if (error) throw error;
    return { mode: "supabase" };
  }

  const entries = getStoredEntries("conference-registrations");
  const updated = [...entries, { ...payload, createdAt: new Date().toISOString() }];
  saveToStorage("conference-registrations", updated);
  return { mode: "local" };
};

const saveProposal = async (payload) => {
  if (supabase) {
    const { error } = await supabase.from("proposals").insert([payload]);
    if (error) throw error;
    return { mode: "supabase" };
  }

  const entries = getStoredEntries("conference-proposals");
  const updated = [...entries, { ...payload, createdAt: new Date().toISOString() }];
  saveToStorage("conference-proposals", updated);
  return { mode: "local" };
};

export default function App() {
  const [activeTab, setActiveTab] = useState("register");
  const [status, setStatus] = useState("");
  const [registration, setRegistration] = useState({
    name: "",
    email: "",
    company: "",
    ticket: "standard",
  });
  const [proposal, setProposal] = useState({
    name: "",
    email: "",
    title: "",
    type: "talk",
    summary: "",
    experience: "Intermediate",
  });

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveRegistration({
        ...registration,
        created_at: new Date().toISOString(),
      });
      setStatus("Inscription enregistrée avec succès.");
      setRegistration({ name: "", email: "", company: "", ticket: "standard" });
    } catch (error) {
      setStatus("Une erreur s'est produite lors de l'inscription. Veuillez réessayer.");
      console.error(error);
    }
  };

  const handleProposalSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveProposal({
        ...proposal,
        created_at: new Date().toISOString(),
      });
      setStatus(
        proposal.type === "talk"
          ? "Proposition de conférence soumise avec succès."
          : "Proposition d'atelier soumise avec succès."
      );
      setProposal({
        name: "",
        email: "",
        title: "",
        type: "talk",
        summary: "",
        experience: "Intermediate",
      });
    } catch (error) {
      setStatus("Une erreur s'est produite lors de la soumission. Veuillez réessayer.");
      console.error(error);
    }
  };

  return (
    <div className="app-shell">
      <header className="hero">
        <nav className="nav">
          <div className="brand">DevSummit 2026</div>
          <div className="nav-links">
            <a href="#about">À propos</a>
            <a href="#schedule">Horaire</a>
            <a href="#workshops">Ateliers</a>
            <a href="#register">S'inscrire</a>
          </div>
        </nav>

        <div className="hero-content">
          <p className="eyebrow">24-25 octobre • Québec</p>
          <h1>Construisez l'avenir de l'ingénierie produit.</h1>
          <p className="subtext">
            Rejoignez des ingénieurs, des designers, des fondateurs et des leaders produits
            pour deux jours de conférences, d'ateliers pratiques et de réseautage.
          </p>

          <div className="cta-row">
            <a href="#register" className="primary-btn">S'inscrire maintenant</a>
            <a href="#submit" className="ghost-btn">Soumettre une conférence</a>
          </div>
        </div>
      </header>

      <main>
        <section id="about" className="section">
          <div className="section-heading">
            <p className="label">Pourquoi participer</p>
            <h2>Tout ce qu'il faut pour concevoir de meilleurs produits.</h2>
          </div>

          <div className="cards">
            <div className="card">
              <h3>12+ conférenciers</h3>
              <p>Apprenez de ceux qui construisent les outils et les équipes derrière les produits modernes.</p>
            </div>
            <div className="card">
              <h3>6 ateliers pratiques</h3>
              <p>Obtenez des conseils concrets que vous pourrez appliquer immédiatement à votre équipe ou à votre produit.</p>
            </div>
            <div className="card">
              <h3>500 participants</h3>
              <p>Rencontrez des fondateurs, des ingénieurs et des leaders du design de l'industrie.</p>
            </div>
          </div>
        </section>

        <section id="schedule" className="section alt-section">
          <div className="section-heading">
            <p className="label">Conférences à venir</p>
            <h2>Apprenez de leaders qui livrent des résultats concrets.</h2>
          </div>

          <div className="session-list">
            {talks.map((talk) => (
              <div className="session-row" key={talk.title}>
                <span>{talk.time}</span>
                <strong>{talk.title}</strong>
                <span>{talk.speaker}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="workshops" className="section">
          <div className="section-heading">
            <p className="label">Ateliers</p>
            <h2>Des sessions profondes pour progresser concrètement.</h2>
          </div>

          <div className="cards">
            {workshops.map((workshop) => (
              <div className="card" key={workshop.title}>
                <h3>{workshop.title}</h3>
                <p>{workshop.speaker}</p>
                <small>{workshop.duration}</small>
              </div>
            ))}
          </div>
        </section>

        <section className="section form-section">
          <div className="tabs">
            <button
              className={activeTab === "register" ? "tab active" : "tab"}
              onClick={() => setActiveTab("register")}
              type="button"
            >
              S'inscrire
            </button>
            <button
              className={activeTab === "submit" ? "tab active" : "tab"}
              onClick={() => setActiveTab("submit")}
              type="button"
            >
              Soumettre une proposition
            </button>
          </div>

          {status && <div className="status-banner">{status}</div>}

          {activeTab === "register" ? (
            <form id="register" className="form-card" onSubmit={handleRegistrationSubmit}>
              <h3>Inscrivez-vous au DevSummit</h3>

              <label>
                Nom complet
                <input
                  type="text"
                  value={registration.name}
                  onChange={(e) =>
                    setRegistration({ ...registration, name: e.target.value })
                  }
                  required
                />
              </label>

              <label>
                Courriel
                <input
                  type="email"
                  value={registration.email}
                  onChange={(e) =>
                    setRegistration({ ...registration, email: e.target.value })
                  }
                  required
                />
              </label>

              <label>
                Entreprise
                <input
                  type="text"
                  value={registration.company}
                  onChange={(e) =>
                    setRegistration({ ...registration, company: e.target.value })
                  }
                />
              </label>

              <label>
                Type de billet
                <select
                  value={registration.ticket}
                  onChange={(e) =>
                    setRegistration({ ...registration, ticket: e.target.value })
                  }
                >
                  <option value="standard">Standard</option>
                  <option value="vip">VIP</option>
                  <option value="student">Étudiant</option>
                </select>
              </label>

              <button className="primary-btn full-width" type="submit">
                Confirmer l'inscription
              </button>
            </form>
          ) : (
            <form id="submit" className="form-card" onSubmit={handleProposalSubmit}>
              <h3>Soumettre une proposition</h3>

              <div className="proposal-toggle" aria-label="Sélecteur de type de proposition">
                <button
                  type="button"
                  className={proposal.type === "talk" ? "proposal-option active" : "proposal-option"}
                  onClick={() => setProposal({ ...proposal, type: "talk" })}
                >
                  Proposition de conférence
                </button>
                <button
                  type="button"
                  className={proposal.type === "workshop" ? "proposal-option active" : "proposal-option"}
                  onClick={() => setProposal({ ...proposal, type: "workshop" })}
                >
                  Proposition d'atelier
                </button>
              </div>

              <label>
                Votre nom
                <input
                  type="text"
                  value={proposal.name}
                  onChange={(e) => setProposal({ ...proposal, name: e.target.value })}
                  required
                />
              </label>

              <label>
                Courriel
                <input
                  type="email"
                  value={proposal.email}
                  onChange={(e) => setProposal({ ...proposal, email: e.target.value })}
                  required
                />
              </label>

              <label>
                {proposal.type === "talk" ? "Titre de la conférence" : "Titre de l'atelier"}
                <input
                  type="text"
                  value={proposal.title}
                  onChange={(e) => setProposal({ ...proposal, title: e.target.value })}
                  required
                />
              </label>

              <label>
                Résumé
                <textarea
                  rows="5"
                  value={proposal.summary}
                  onChange={(e) => setProposal({ ...proposal, summary: e.target.value })}
                  required
                />
              </label>

              <label>
                Niveau d'expérience
                <select
                  value={proposal.experience}
                  onChange={(e) =>
                    setProposal({ ...proposal, experience: e.target.value })
                  }
                >
                  <option value="Beginner">Débutant</option>
                  <option value="Intermediate">Intermédiaire</option>
                  <option value="Advanced">Avancé</option>
                </select>
              </label>

              <button className="primary-btn full-width" type="submit">
                {proposal.type === "talk" ? "Soumettre la proposition de conférence" : "Soumettre la proposition d'atelier"}
              </button>
            </form>
          )}
        </section>
      </main>
    </div>
  );
}
