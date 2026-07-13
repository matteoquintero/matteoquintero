import type { Metadata } from "next"

import { gotham } from "./fonts"
import styles from "./page.module.css"

// Internal deliverable page for the Alfred challenge. Not linked from the
// public site nav — must not be indexed by search engines.
export const metadata: Metadata = {
  title: "Alfred Challenge",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AlfredChallengePage() {
  return (
    <main className={`${gotham.variable} ${styles.page}`}>
      <header className={styles.header}>
        {/* Logo-only masthead; visually-hidden h1 keeps the heading hierarchy. */}
        <h1 className={styles.srOnly}>Alfred Challenge</h1>
        {/* TODO: confirm final logo asset/alt text */}
        <img src="/alfred-challenge/alfred-logo-white.svg" alt="Alfred" className={styles.logo} />
      </header>

      <section className={styles.path} aria-labelledby="path-heading">
        <div className={styles.pathHeader}>
          <div className={styles.sectionLabel}>
            <span className={styles.sectionNum}>01</span>
            <h2 id="path-heading" className={styles.sectionName}>
              Path to made challenge
            </h2>
          </div>
          <ol className={styles.stepper} aria-label="Process phases">
            <li className={styles.stepperItem}>
              <span className={styles.stepperNode}>1</span>
              {/* TODO: short phase label */}
              <span className={styles.stepperLabel}>TODO: paso 1</span>
            </li>
            <li className={styles.stepperConnector} aria-hidden="true" />
            <li className={styles.stepperItem}>
              <span className={styles.stepperNode}>2</span>
              {/* TODO: short phase label */}
              <span className={styles.stepperLabel}>TODO: paso 2</span>
            </li>
            <li className={styles.stepperConnector} aria-hidden="true" />
            <li className={styles.stepperItem}>
              <span className={styles.stepperNode}>3</span>
              {/* TODO: short phase label */}
              <span className={styles.stepperLabel}>TODO: paso 3</span>
            </li>
            <li className={styles.stepperConnector} aria-hidden="true" />
            <li className={styles.stepperItem}>
              <span className={styles.stepperNode}>4</span>
              {/* TODO: short phase label */}
              <span className={styles.stepperLabel}>TODO: paso 4</span>
            </li>
          </ol>
        </div>
        {/* TODO: intro quote — el usuario pasará el copy */}
        <p className={styles.pathQuote}>TODO: intro quote — el usuario pasará el copy</p>
      </section>

      <section className={styles.output} aria-labelledby="output-heading">
        <div className={styles.sectionLabel}>
          <span className={styles.sectionNum}>02</span>
          <h2 id="output-heading" className={styles.sectionName}>
            Container output
          </h2>
        </div>
        <div className={styles.outputGrid}>
          <div className={styles.panel}>
            <div className={styles.panelTitleRow}>
              <p className={styles.panelTitle}>Deliverable PDF</p>
              {/* TODO: replace /alfred-challenge/output.pdf with the real deliverable PDF */}
              <a
                href="/alfred-challenge/output.pdf"
                target="_blank"
                rel="noopener"
                aria-label="Open PDF in new tab"
                className={styles.panelExternalLink}
              >
                ↗
              </a>
            </div>
            <div className={styles.viewerWrap}>
              {/* TODO: replace /alfred-challenge/output.pdf with the real deliverable PDF */}
              <iframe
                title="Deliverable PDF (PDF.js)"
                src="/pdfjs/web/viewer.html?file=%2Falfred-challenge%2Foutput.pdf#toolbar=1"
              />
            </div>
          </div>
          <div className={styles.panel}>
            <p className={styles.panelTitle}>Walkthrough</p>
            <div className={styles.viewerWrap}>
              {/* TODO: replace LOOM_ID_TODO with the real Loom embed id */}
              <iframe
                title="Walkthrough (Loom)"
                src="https://www.loom.com/embed/LOOM_ID_TODO"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.resources} aria-labelledby="resources-heading">
        <div className={styles.sectionLabel}>
          <span className={styles.sectionNum}>03</span>
          <h2 id="resources-heading" className={styles.sectionName}>
            Resources
          </h2>
        </div>
        <ul className={styles.resourceList}>
          <li>
            {/* TODO: replace /alfred-challenge/video.mp4 with the real walkthrough recording */}
            <a className={styles.resourceLink} href="/alfred-challenge/video.mp4" download>
              Download video
            </a>
          </li>
          <li>
            {/* TODO: replace /alfred-challenge/output.pdf with the real deliverable PDF */}
            <a className={styles.resourceLink} href="/alfred-challenge/output.pdf" download>
              Download PDF
            </a>
          </li>
          <li>
            <a className={styles.resourceLink} href="/alfred-challenge/modelo.html" target="_blank" rel="noopener">
              Modelo conceptual
            </a>
          </li>
          <li>
            <a className={styles.resourceLink} href="/alfred-challenge/flujo.html" target="_blank" rel="noopener">
              Flujo
            </a>
          </li>
          <li>
            <a className={styles.resourceLink} href="/alfred-challenge/arquitectura.html" target="_blank" rel="noopener">
              Arquitectura
            </a>
          </li>
          <li>
            <a className={styles.resourceLink} href="/alfred-challenge/roadmap.html" target="_blank" rel="noopener">
              Roadmap IA
            </a>
          </li>
          <li>
            <a className={styles.resourceLink} href="/alfred-challenge/tradeoffs.html" target="_blank" rel="noopener">
              Trade-offs
            </a>
          </li>
        </ul>
      </section>
    </main>
  )
}
