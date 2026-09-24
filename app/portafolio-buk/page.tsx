import type { Metadata } from "next"

import styles from "./page.module.css"
import {
  cases,
  casesSection,
  contact,
  contactLinks,
  costItems,
  costSection,
  erpDestinations,
  erpsSection,
  hero,
  mappingRows,
  mappingSection,
  patternFlow,
  patternRules,
  patternSection,
  processSection,
  processSteps,
  stack,
  timeline,
  topbar,
  type FlowNode,
  type RichText,
} from "./content"

// Internal deliverable page for Buk's partner program. Not linked from the
// public site nav — must not be indexed by search engines.
export const metadata: Metadata = {
  title: "Matteo Quintero · Partner de integraciones Buk",
  robots: {
    index: false,
    follow: false,
  },
}

// Logos are plain vector/raster assets (see public/portafolio-buk/), not
// currentColor SVG components, so brand proportions are approximated here
// instead of being read off each logo's own viewBox.
const LOGO_HEIGHT: Record<string, number> = {
  "Business Central": 32,
  Siigo: 28,
  Odoo: 22,
  SAP: 26,
  Buk: 22,
}

function logoStyle(alt: string) {
  const height = LOGO_HEIGHT[alt] ?? 28
  return { height, width: "auto" }
}

function Rich({ text }: { text: RichText }) {
  if (typeof text === "string") return <>{text}</>
  return (
    <>
      {text.map((segment, i) => {
        if (segment.code) {
          return (
            <code key={i} className={styles.inlineCode}>
              {segment.text}
            </code>
          )
        }
        if (segment.emphasis) {
          return (
            <strong key={i} className={styles.emphasis}>
              {segment.text}
            </strong>
          )
        }
        return <span key={i}>{segment.text}</span>
      })}
    </>
  )
}

function Flow({ nodes }: { nodes: FlowNode[] }) {
  return (
    <div className={styles.flow}>
      {nodes.map((node, i) => (
        <div className={styles.flowNodeWrap} key={i}>
          <div className={`${styles.flowNode} ${node.highlight ? styles.flowNodeHighlight : ""}`}>
            <small className={styles.flowNodeLabel}>{node.label}</small>
            <strong className={styles.flowNodeTitle}>{node.title}</strong>
          </div>
          {i < nodes.length - 1 && (
            <span className={styles.flowArrow} aria-hidden="true">
              →
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

// Illustrative monthly usage bars: low baseline, spikes around day 15 and day
// 30 — mirrors the mockup's client-side bar-generation script, computed once
// at render time since this is a static server component.
function costChartBars() {
  const x0 = 40
  const w = 470
  const n = 30
  const base = 190
  const bw = w / n - 4
  const bars = []
  for (let i = 0; i < n; i++) {
    const day = i + 1
    let h = 6 + ((day * 7) % 5) * 2
    if (day === 14 || day === 29) h = 60
    if (day === 15 || day === 30) h = 150
    if (day === 16) h = 40
    bars.push({
      x: (x0 + i * (w / n) + 2).toFixed(1),
      y: base - h,
      width: bw.toFixed(1),
      height: h,
      opacity: h > 30 ? 1 : 0.45,
    })
  }
  return bars
}

export default function PortafolioBukPage() {
  const chartBars = costChartBars()

  return (
    <div className={styles.page}>
      <div className={styles.stage}>
        <header className={styles.topbar}>
          <span>
            <b className={styles.topbarName}>{topbar.name}</b> · {topbar.tagline}
          </span>
          <span className={styles.topbarBuk}>
            <img src={topbar.bukLogoSrc} alt={topbar.bukLogoAlt} style={logoStyle("Buk")} />
          </span>
        </header>

        <main className={styles.container}>
          {/* 1. Hero: trajectory */}
          <section className={`${styles.section} ${styles.sectionFirst} ${styles.heroSection}`} aria-labelledby="h-hero">
            <div className={styles.heroGrid}>
              <div className={styles.heroText}>
                <p className={styles.eyebrow}>{hero.eyebrow}</p>
                <h1 id="h-hero" className={styles.heroTitle}>
                  {hero.title}
                </h1>
                <p className={styles.heroLede}>{hero.lede}</p>
              </div>
              <div className={styles.heroPortrait}>
                <img src={hero.photoSrc} alt="" className={styles.heroPortraitImg} />
              </div>
              <div className={styles.heroTimelineWrap}>
                <div className={styles.timeline}>
                  {timeline.map((row) => (
                    <div className={styles.timelineRow} key={`${row.year}-${row.company}`}>
                      <span className={styles.timelineYear}>{row.year}</span>
                      <span className={styles.timelineCompany}>
                        {row.company}
                        <small className={styles.timelineRole}>{row.role}</small>
                      </span>
                      <p className={styles.timelineDescription}>
                        <Rich text={row.description} />
                      </p>
                    </div>
                  ))}
                </div>
                <div className={styles.stack}>
                  {stack.map((chip) => (
                    <span
                      className={`${styles.stackChip} ${chip.key ? styles.stackChipKey : ""}`}
                      key={chip.label}
                    >
                      {chip.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 2. Cases */}
          <section className={styles.section} aria-labelledby="h-casos">
            <div className={styles.sectionHead}>
              <p className={styles.eyebrow}>{casesSection.eyebrow}</p>
              <h2 id="h-casos" className={styles.sectionTitle}>
                {casesSection.title}
              </h2>
            </div>

            {cases.map((erpCase, i) => (
              <article className={`${styles.case} ${i > 0 ? styles.caseSpaced : ""}`} key={erpCase.title}>
                <div className={styles.caseMeta}>
                  <div className={styles.erpId}>
                    <img src={erpCase.logoSrc} alt={erpCase.logoAlt} style={logoStyle(erpCase.logoAlt)} />
                    <span>{erpCase.erpLabel}</span>
                  </div>
                  <h3 className={styles.caseTitle}>{erpCase.title}</h3>
                  <div className={styles.metaList}>
                    {erpCase.meta.map((item) => (
                      <div className={styles.metaItem} key={item.term}>
                        <span className={styles.metaTerm}>{item.term}</span>
                        <p className={styles.metaDetail}>
                          <Rich text={item.detail} />
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.caseBody}>
                  {erpCase.body.map((paragraph, pi) => (
                    <p className={styles.caseBodyText} key={pi}>
                      <Rich text={paragraph} />
                    </p>
                  ))}
                  {erpCase.flows.map((flowDiagram, fi) => (
                    <div key={fi}>
                      {flowDiagram.caption && <p className={styles.flowLabel}>{flowDiagram.caption}</p>}
                      <Flow nodes={flowDiagram.nodes} />
                    </div>
                  ))}
                  {erpCase.ledgers && (
                    <div className={styles.two}>
                      {erpCase.ledgers.map((ledger) => (
                        <div className={styles.mini} key={ledger.heading}>
                          <h4 className={styles.miniHeading}>{ledger.heading}</h4>
                          <ul className={styles.miniList}>
                            <li>{ledger.debit}</li>
                            <li>{ledger.credit}</li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </section>

          {/* 3. Mapping: same problem, different origin */}
          <section className={styles.section} aria-labelledby="h-map">
            <div className={styles.sectionHead}>
              <p className={styles.eyebrow}>{mappingSection.eyebrow}</p>
              <h2 id="h-map" className={styles.sectionTitle}>
                {mappingSection.title}
              </h2>
              <p className={styles.sectionDescription}>{mappingSection.description}</p>
            </div>
            <div className={styles.mapWrap}>
              <table className={styles.mapTable}>
                <thead>
                  <tr>
                    <th />
                    <th className={styles.mapHeaderCell}>{mappingSection.columnOrigin}</th>
                    <th className={styles.mapHeaderCell}>{mappingSection.columnDestination}</th>
                  </tr>
                </thead>
                <tbody>
                  {mappingRows.map((row) => (
                    <tr key={row.label}>
                      <td className={styles.mapLabelCell}>{row.label}</td>
                      <td>{row.origin}</td>
                      <td className={styles.mapDestCell}>{row.destination}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 4. Pattern: how the Buk API would be integrated */}
          <section className={styles.section} aria-labelledby="h-pattern">
            <div className={styles.sectionHead}>
              <p className={styles.eyebrow}>{patternSection.eyebrow}</p>
              <h2 id="h-pattern" className={styles.sectionTitle}>
                {patternSection.title}
              </h2>
            </div>
            <div className={styles.patternFlowWrap}>
              <Flow nodes={patternFlow} />
            </div>
            <div className={styles.ruleGrid}>
              {patternRules.map((rule) => (
                <div className={styles.rule} key={rule.title}>
                  <h4 className={styles.ruleTitle}>{rule.title}</h4>
                  <p className={styles.ruleDescription}>
                    <Rich text={rule.description} />
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 4b. ERP destinations */}
          <section className={styles.section} aria-labelledby="h-erps">
            <div className={styles.sectionHead}>
              <p className={styles.eyebrow}>{erpsSection.eyebrow}</p>
              <h2 id="h-erps" className={styles.sectionTitle}>
                {erpsSection.title}
              </h2>
              <p className={styles.sectionDescription}>{erpsSection.description}</p>
            </div>
            <ul className={styles.erpsList}>
              {erpDestinations.map((erp) => (
                <li className={styles.erpsItem} key={erp.name}>
                  <div className={styles.erpMark}>
                    <img src={erp.logoSrc} alt={erp.logoAlt} style={logoStyle(erp.logoAlt)} />
                  </div>
                  <span className={styles.erpName}>{erp.name}</span>
                  <span className={styles.status}>
                    <span
                      className={`${styles.statusDot} ${erp.status === "live" ? styles.statusDotLive : styles.statusDotOpen}`}
                      aria-hidden="true"
                    />
                    {erp.statusLabel}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* 5. Cost: serverless pricing */}
          <section className={styles.section} aria-labelledby="h-cost">
            <div className={styles.sectionHead}>
              <p className={styles.eyebrow}>{costSection.eyebrow}</p>
              <h2 id="h-cost" className={styles.sectionTitle}>
                {costSection.title}
              </h2>
              <p className={styles.sectionDescription}>{costSection.description}</p>
            </div>
            <div className={styles.costGrid}>
              <figure className={styles.chartFigure}>
                <svg
                  className={styles.chartSvg}
                  viewBox="0 0 520 220"
                  role="img"
                  aria-label={costSection.chartAriaLabel}
                >
                  <g>
                    {chartBars.map((bar, i) => (
                      <rect
                        key={i}
                        x={bar.x}
                        y={bar.y}
                        width={bar.width}
                        height={bar.height}
                        rx={2}
                        fill="var(--accent)"
                        opacity={bar.opacity}
                      />
                    ))}
                  </g>
                  <line x1="40" y1="92" x2="510" y2="92" stroke="var(--warn)" strokeWidth="1.5" strokeDasharray="5 4" />
                  <text x="510" y="84" fill="var(--warn)" className={styles.chartAxisLabel} textAnchor="end">
                    servidor 24/7: costo fijo
                  </text>
                  <line x1="40" y1="190" x2="510" y2="190" stroke="var(--line)" />
                  <text x="40" y="208" fill="var(--faint)" className={styles.chartAxisLabel}>
                    día 1
                  </text>
                  <text x="275" y="208" fill="var(--faint)" className={styles.chartAxisLabel} textAnchor="middle">
                    día 15
                  </text>
                  <text x="510" y="208" fill="var(--faint)" className={styles.chartAxisLabel} textAnchor="end">
                    día 30
                  </text>
                </svg>
                <div className={styles.chartLegend}>
                  {costSection.legend.map((item) => (
                    <span key={item.label}>
                      <i
                        className={styles.legendDot}
                        style={{ background: `var(${item.colorVar})` }}
                        aria-hidden="true"
                      />
                      {item.label}
                    </span>
                  ))}
                </div>
              </figure>
              <div className={styles.costList}>
                {costItems.map((item) => (
                  <div key={item.label}>
                    <b className={styles.costItemLabel}>{item.label}</b>
                    <span className={styles.costItemDescription}>{item.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 7. Process: working with the client */}
          <section className={styles.section} aria-labelledby="h-proc">
            <div className={styles.sectionHead}>
              <p className={styles.eyebrow}>{processSection.eyebrow}</p>
              <h2 id="h-proc" className={styles.sectionTitle}>
                {processSection.title}
              </h2>
              <p className={styles.sectionDescription}>{processSection.description}</p>
            </div>
            <ol className={styles.steps}>
              {processSteps.map((step, i) => (
                <li className={`${styles.step} ${i === 0 ? styles.stepFirst : ""}`} key={step.title}>
                  <span className={styles.stepNumber} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className={styles.stepTitle}>{step.title}</h4>
                  <p className={styles.stepDescription}>{step.description}</p>
                </li>
              ))}
            </ol>
          </section>
        </main>

        {/* 8. Contact */}
        <footer className={styles.contact}>
          <h2 className={styles.contactTitle}>{contact.title}</h2>
          <div className={styles.contactLinks}>
            {contactLinks.map((link) => (
              <span key={link.label}>
                {link.label} ·{" "}
                {link.href ? (
                  <a
                    className={styles.contactLink}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <b className={styles.contactLinkValue}>{link.value}</b>
                  </a>
                ) : (
                  <b className={styles.contactLinkValue}>{link.value}</b>
                )}
              </span>
            ))}
          </div>
        </footer>
      </div>
    </div>
  )
}
