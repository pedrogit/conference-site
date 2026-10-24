import { useState } from "react";
import { supabase } from "./lib/supabase";
import "./App.css";

const talks = [
  { title: "Designing Systems That Scale", speaker: "Alicia Moore", time: "09:30" },
  { title: "From Prototype to Product", speaker: "Priya Shah", time: "11:00" },
  { title: "Ship Faster with Automation", speaker: "Luca Kim", time: "14:00" },
];

const workshops = [
  { title: "React Performance Tuning", speaker: "Nina Hart", duration: "90 min" },
  { title: "AI for Product Teams", speaker: "Sam Lee", duration: "60 min" },
  { title: "Design Systems at Scale", speaker: "Mira Chen", duration: "120 min" },
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
      setStatus("Registration saved successfully.");
      setRegistration({ name: "", email: "", company: "", ticket: "standard" });
    } catch (error) {
      setStatus("Error saving registration. Please try again.");
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
          ? "Talk proposal submitted successfully."
          : "Workshop proposal submitted successfully."
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
      setStatus("Error submitting proposal. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="app-shell">
      <header className="hero">
        <nav className="nav">
          <div className="brand">DevSummit 2026</div>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#schedule">Schedule</a>
            <a href="#workshops">Workshops</a>
            <a href="#register">Register</a>
          </div>
        </nav>

        <div className="hero-content">
          <p className="eyebrow">October 24–25 • Quebec City</p>
          <h1>Build the future of product engineering.</h1>
          <p className="subtext">
            Join engineers, designers, founders, and product leaders for two days of
            powerful talks, practical workshops, and unforgettable networking.
          </p>

          <div className="cta-row">
            <a href="#register" className="primary-btn">Register now</a>
            <a href="#submit" className="ghost-btn">Submit a talk</a>
          </div>
        </div>
      </header>

      <main>
        <section id="about" className="section">
          <div className="section-heading">
            <p className="label">Why attend</p>
            <h2>Everything you need to build smarter products.</h2>
          </div>

          <div className="cards">
            <div className="card">
              <h3>12+ speakers</h3>
              <p>Learn from the people building the tools and teams behind modern products.</p>
            </div>
            <div className="card">
              <h3>6 hands-on workshops</h3>
              <p>Get practical guidance you can apply immediately to your team or product.</p>
            </div>
            <div className="card">
              <h3>500 attendees</h3>
              <p>Meet founders, engineers, and design leaders from across the industry.</p>
            </div>
          </div>
        </section>

        <section id="schedule" className="section alt-section">
          <div className="section-heading">
            <p className="label">Featured talks</p>
            <h2>Learn from leaders shipping real outcomes.</h2>
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
            <p className="label">Workshops</p>
            <h2>Deep-dive sessions for practical growth.</h2>
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
              Register
            </button>
            <button
              className={activeTab === "submit" ? "tab active" : "tab"}
              onClick={() => setActiveTab("submit")}
              type="button"
            >
              Submit a proposal
            </button>
          </div>

          {status && <div className="status-banner">{status}</div>}

          {activeTab === "register" ? (
            <form id="register" className="form-card" onSubmit={handleRegistrationSubmit}>
              <h3>Register for DevSummit</h3>

              <label>
                Full name
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
                Email
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
                Company
                <input
                  type="text"
                  value={registration.company}
                  onChange={(e) =>
                    setRegistration({ ...registration, company: e.target.value })
                  }
                />
              </label>

              <label>
                Ticket type
                <select
                  value={registration.ticket}
                  onChange={(e) =>
                    setRegistration({ ...registration, ticket: e.target.value })
                  }
                >
                  <option value="standard">Standard</option>
                  <option value="vip">VIP</option>
                  <option value="student">Student</option>
                </select>
              </label>

              <button className="primary-btn full-width" type="submit">
                Confirm registration
              </button>
            </form>
          ) : (
            <form id="submit" className="form-card" onSubmit={handleProposalSubmit}>
              <h3>Submit a proposal</h3>

              <div className="proposal-toggle" aria-label="Proposal type selector">
                <button
                  type="button"
                  className={proposal.type === "talk" ? "proposal-option active" : "proposal-option"}
                  onClick={() => setProposal({ ...proposal, type: "talk" })}
                >
                  Talk proposal
                </button>
                <button
                  type="button"
                  className={proposal.type === "workshop" ? "proposal-option active" : "proposal-option"}
                  onClick={() => setProposal({ ...proposal, type: "workshop" })}
                >
                  Workshop proposal
                </button>
              </div>

              <label>
                Your name
                <input
                  type="text"
                  value={proposal.name}
                  onChange={(e) => setProposal({ ...proposal, name: e.target.value })}
                  required
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  value={proposal.email}
                  onChange={(e) => setProposal({ ...proposal, email: e.target.value })}
                  required
                />
              </label>

              <label>
                {proposal.type === "talk" ? "Talk title" : "Workshop title"}
                <input
                  type="text"
                  value={proposal.title}
                  onChange={(e) => setProposal({ ...proposal, title: e.target.value })}
                  required
                />
              </label>

              <label>
                Summary
                <textarea
                  rows="5"
                  value={proposal.summary}
                  onChange={(e) => setProposal({ ...proposal, summary: e.target.value })}
                  required
                />
              </label>

              <label>
                Experience level
                <select
                  value={proposal.experience}
                  onChange={(e) =>
                    setProposal({ ...proposal, experience: e.target.value })
                  }
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </label>

              <button className="primary-btn full-width" type="submit">
                {proposal.type === "talk" ? "Submit talk proposal" : "Submit workshop proposal"}
              </button>
            </form>
          )}
        </section>
      </main>
    </div>
  );
}
