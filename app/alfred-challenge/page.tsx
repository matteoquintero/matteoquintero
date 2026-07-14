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
              <span className={styles.stepperText}>
                <span className={styles.stepperTitle}>Research</span>
                <span className={styles.stepperDesc}>Reseñas + fundadores: el problema real</span>
              </span>
            </li>
            <li className={styles.stepperItem}>
              <span className={styles.stepperNode}>2</span>
              <span className={styles.stepperText}>
                <span className={styles.stepperTitle}>Modelo &amp; flujo</span>
                <span className={styles.stepperDesc}>Entidades y flujo end-to-end</span>
              </span>
            </li>
            <li className={styles.stepperItem}>
              <span className={styles.stepperNode}>3</span>
              <span className={styles.stepperText}>
                <span className={styles.stepperTitle}>Arquitectura &amp; IA</span>
                <span className={styles.stepperDesc}>Monolito, IA aislada, 2 iniciativas</span>
              </span>
            </li>
            <li className={styles.stepperItem}>
              <span className={styles.stepperNode}>4</span>
              <span className={styles.stepperText}>
                <span className={styles.stepperTitle}>Documento &amp; video</span>
                <span className={styles.stepperDesc}>PDF final + guión practicado</span>
              </span>
            </li>
          </ol>
        </div>
        <p className={styles.pathQuote}>
          Nace de escuchar al usuario —reseñas de Google Maps, App Store y Play + entrevistas a los
          fundadores—: dos apuestas de IA, una Vitrina B2C de aliados curados para quien disfruta
          cuidar su carro —detailing y accesorios, nada obligatorio; pagan por pertenecer, no por
          posición— y un Score de Salud de Flota B2B que avisa antes de que sea tarde. Todo sobre un
          monolito modular con la IA aislada tras un gate determinístico: propone, rankea y explica,
          pero nunca decide elegibilidad ni cobro —y si falla, los recordatorios siguen— con la
          privacidad protegida por diseño.
        </p>
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
              <a
                href="/alfred-challenge/entrega.pdf"
                target="_blank"
                rel="noopener"
                aria-label="Open PDF in new tab"
                className={styles.panelExternalLink}
              >
                ↗
              </a>
            </div>
            <div className={styles.viewerWrap}>
              <iframe
                title="Deliverable PDF (PDF.js)"
                src="/pdfjs/web/viewer.html?file=%2Falfred-challenge%2Fentrega.pdf#toolbar=1"
              />
            </div>
          </div>
          <div className={styles.panel}>
            <p className={styles.panelTitle}>Walkthrough</p>
            <div className={styles.viewerWrap}>
              <video
                title="Walkthrough"
                src="/alfred-challenge/entrega.mp4"
                controls
                preload="metadata"
                playsInline
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
        <div className={styles.resourceRow}>
          <ul className={styles.resourceList}>
            <li>
              <a className={styles.resourceLink} href="/alfred-challenge/entrega.mp4" download>
                Download video
              </a>
            </li>
            <li>
              <a className={styles.resourceLink} href="/alfred-challenge/entrega.pdf" download>
                Download PDF
              </a>
            </li>
          </ul>
          <div className={styles.resourceExtra}>
            <span className={styles.resourceExtraLabel}>Extra resources</span>
            <ul className={styles.resourceList}>
              <li>
                <a className={styles.resourceLinkGhost} href="/alfred-challenge/modelo.html" target="_blank" rel="noopener">
                  Modelo conceptual
                </a>
              </li>
              <li>
                <a className={styles.resourceLinkGhost} href="/alfred-challenge/flujo.html" target="_blank" rel="noopener">
                  Flujo
                </a>
              </li>
              <li>
                <a className={styles.resourceLinkGhost} href="/alfred-challenge/arquitectura.html" target="_blank" rel="noopener">
                  Arquitectura
                </a>
              </li>
              <li>
                <a className={styles.resourceLinkGhost} href="/alfred-challenge/roadmap.html" target="_blank" rel="noopener">
                  Roadmap IA
                </a>
              </li>
              <li>
                <a className={styles.resourceLinkGhost} href="/alfred-challenge/tradeoffs.html" target="_blank" rel="noopener">
                  Trade-offs
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
