:root {
  --bg: #08111f;
  --bg-soft: #0f172a;
  --panel: #101b2e;
  --panel-alt: #131f35;
  --card: rgba(17, 24, 39, 0.85);
  --text: #eff6ff;
  --muted: #bfd4f6;
  --primary: #7c3aed;
  --primary-strong: #5b21b6;
  --accent: #22c55e;
  --border: rgba(148, 163, 184, 0.18);
  --shadow: 0 20px 50px rgba(3, 7, 18, 0.38);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: "Inter", sans-serif;
  background:
    radial-gradient(circle at top, rgba(124, 58, 237, 0.25), transparent 30%),
    var(--bg);
  color: var(--text);
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
textarea,
select {
  font: inherit;
}

button {
  cursor: pointer;
}

.app-shell {
  min-height: 100vh;
}

.hero {
  padding: 28px 6vw 88px;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.96), rgba(37, 99, 235, 0.86));
  border-bottom: 1px solid var(--border);
}

.nav {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.brand {
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.04em;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 24px;
  color: var(--muted);
  font-weight: 500;
}

.nav-admin {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: var(--text);
  border-radius: 10px;
  padding: 9px 12px;
}

.hero-content {
  max-width: 1200px;
  margin: 92px auto 0;
}

.eyebrow,
.label {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.75rem;
  font-weight: 700;
  color: #c7d2fe;
}

.hero h1 {
  margin: 18px 0 16px;
  max-width: 720px;
  font-size: clamp(2.8rem, 5vw, 5rem);
  line-height: 0.98;
  letter-spacing: -0.06em;
}

.subtext {
  max-width: 700px;
  color: var(--muted);
  font-size: 1.1rem;
  line-height: 1.7;
}

.cta-row {
  margin-top: 32px;
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
}

.primary-btn,
.ghost-btn,
.tab {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: 0.2s ease;
  font-weight: 700;
}

.primary-btn {
  background: white;
  color: var(--bg);
  padding: 14px 22px;
}

.primary-btn:hover {
  transform: translateY(-1px);
}

.ghost-btn {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: white;
  padding: 14px 22px;
}

.section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 84px 6vw;
}

.alt-section {
  background: rgba(15, 23, 42, 0.55);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.section-heading h2 {
  margin: 12px 0 0;
  font-size: clamp(2rem, 4vw, 3rem);
  letter-spacing: -0.05em;
}

.cards {
  margin-top: 32px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 24px;
  box-shadow: var(--shadow);
}

.card h3 {
  margin-top: 0;
  margin-bottom: 12px;
  font-size: 1.3rem;
}

.card p,
.card small {
  color: var(--muted);
  line-height: 1.7;
}

.session-list {
  margin-top: 28px;
  background: rgba(15, 23, 42, 0.4);
  border: 1px solid var(--border);
  border-radius: 18px;
  overflow: hidden;
}

.session-row {
  display: grid;
  grid-template-columns: 120px 1fr 200px;
  gap: 16px;
  padding: 18px 22px;
  border-bottom: 1px solid var(--border);
}

.session-row:last-child {
  border-bottom: none;
}

.session-row span {
  color: var(--muted);
}

.form-section {
  padding-top: 60px;
  padding-bottom: 100px;
}

.tabs {
  display: inline-flex;
  gap: 10px;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 10px;
  margin-bottom: 18px;
}

.tab {
  background: transparent;
  color: var(--text);
  padding: 12px 18px;
  border-radius: 10px;
}

.tab.active {
  background: linear-gradient(135deg, var(--primary), var(--primary-strong));
  box-shadow: 0 10px 25px rgba(124, 58, 237, 0.35);
}

.proposal-toggle {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 6px;
}

.proposal-option {
  background: #0b1220;
  border: 1px solid var(--border);
  color: var(--text);
  border-radius: 12px;
  padding: 12px 14px;
  cursor: pointer;
  font-weight: 600;
}

.proposal-option.active {
  background: linear-gradient(135deg, var(--primary), var(--primary-strong));
  border-color: transparent;
}

.status-banner {
  margin-bottom: 18px;
  background: rgba(34, 197, 94, 0.12);
  border: 1px solid rgba(34, 197, 94, 0.4);
  color: #d1fae5;
  border-radius: 12px;
  padding: 12px 16px;
}

.form-card {
  max-width: 720px;
  display: grid;
  gap: 18px;
  background: rgba(15, 23, 42, 0.82);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 28px;
  box-shadow: var(--shadow);
}

.form-card h3 {
  margin: 0 0 8px;
  font-size: 1.8rem;
}

.form-card label {
  display: grid;
  gap: 8px;
  font-weight: 600;
  color: var(--muted);
}

.form-card input,
.form-card select,
.form-card textarea {
  width: 100%;
  background: #0b1220;
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--text);
  padding: 14px 16px;
  resize: vertical;
}

.form-card textarea {
  min-height: 140px;
}

.full-width {
  width: 100%;
}

.admin-shell {
  max-width: 1200px;
  margin: 0 auto;
  padding: 84px 6vw;
}

.card-panel {
  background: rgba(15, 23, 42, 0.84);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 28px;
  box-shadow: var(--shadow);
}

.admin-login {
  max-width: 560px;
  margin: 0 auto;
}

.admin-form {
  display: grid;
  gap: 14px;
  margin-top: 20px;
}

.admin-form input {
  background: #0b1220;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 14px 16px;
  color: var(--text);
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 18px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 18px;
  margin-bottom: 28px;
}

.metric-box {
  background: rgba(11, 18, 32, 0.9);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 18px;
  display: grid;
  gap: 8px;
}

.metric-box span {
  color: var(--muted);
}

.metric-box strong {
  font-size: 2rem;
}

.admin-section {
  margin-top: 28px;
}

.table-wrap {
  overflow-x: auto;
  background: rgba(11, 18, 32, 0.9);
  border: 1px solid var(--border);
  border-radius: 16px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  text-align: left;
  padding: 14px 16px;
  border-bottom: 1px solid var(--border);
  vertical-align: top;
}

th {
  color: #dbeafe;
  font-weight: 700;
}

select {
  background: #0b1220;
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 8px 10px;
}

@media (max-width: 640px) {
  .nav {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-links {
    flex-wrap: wrap;
    gap: 14px;
  }

  .hero {
    padding-bottom: 60px;
  }

  .session-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .proposal-toggle {
    grid-template-columns: 1fr;
  }

  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
  }
}

