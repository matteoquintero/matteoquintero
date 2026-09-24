// Typed content for the standalone /portafolio-buk page.
// Copy is Spanish-only and lives here (not in Supabase site_copy), per the
// user-approved deviation documented in odd/tasks/portafolio-buk.md.
// Source of truth: approved mockup (artifact v10).

export type TextSegment = {
  text: string
  emphasis?: boolean
  code?: boolean
}

export type RichText = string | TextSegment[]

export type FlowNode = {
  label: string
  title: string
  highlight?: boolean
}

export type FlowDiagram = {
  caption?: string
  nodes: FlowNode[]
}

export type KeyValue = {
  term: string
  detail: RichText
}

export type Ledger = {
  heading: string
  debit: string
  credit: string
}

export type ErpCase = {
  logoSrc: string
  logoAlt: string
  erpLabel: string
  title: string
  meta: KeyValue[]
  body: RichText[]
  flows: FlowDiagram[]
  ledgers?: Ledger[]
}

export type MappingRow = {
  label: string
  origin: string
  destination: string
}

export type PatternRule = {
  title: string
  description: RichText
}

export type ErpDestination = {
  logoSrc: string
  logoAlt: string
  name: string
  status: "live" | "open"
  statusLabel: string
}

export type CostItem = {
  label: string
  description: string
}

export type ProcessStep = {
  title: string
  description: string
}

export type TimelineRow = {
  year: string
  company: string
  role: string
  description: RichText
}

export type StackChip = {
  label: string
  key?: boolean
}

export type ContactLink = {
  label: string
  value: string
  href?: string
}

// ---------------------------------------------------------------------------
// Topbar
// ---------------------------------------------------------------------------

export const topbar = {
  name: "Matteo Quintero",
  tagline: "Portafolio para el programa de partners de Buk",
  bukLogoSrc: "/portafolio-buk/buk.svg",
  bukLogoAlt: "Buk",
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const hero = {
  eyebrow: "Ingeniero de software · ex-CTO · integraciones ERP",
  title: "Quince años conectando sistemas",
  lede: "Integraciones con Business Central y Siigo Nube sobre AWS serverless. Busco sumarme como partner de integración de Buk.",
  photoSrc: "/portafolio-buk/profile.jpg",
}

export const timeline: TimelineRow[] = [
  {
    year: "2024–hoy",
    company: "Sellerfy",
    role: "CTO",
    description: [
      { text: "Infraestructura multi-cloud con " },
      { text: "AWS CDK y GCP Terraform", emphasis: true },
      { text: ", facturación por consumo y datos en BigQuery." },
    ],
  },
  {
    year: "2023–2026",
    company: "Growker",
    role: "Lead engineer",
    description: [
      { text: "ETL serverless en AWS (" },
      { text: "Step Functions, Lambda, S3, DynamoDB, Athena, Glue", emphasis: true },
      { text: ") que unifica MercadoLibre, Amazon Sellers y Amazon Ads." },
    ],
  },
  {
    year: "2021–2022",
    company: "Aflore",
    role: "Frontend lead",
    description: "Rediseño del flujo de solicitudes de crédito y del manejo de datos en backend.",
  },
  {
    year: "2019–2021",
    company: "TiendAPP",
    role: "Senior engineer",
    description: "POS móvil con inventario, crédito y deudas para tiendas de barrio, sobre AWS.",
  },
  {
    year: "2011",
    company: "CasaLuker",
    role: "Junior engineer",
    description: [
      { text: "Primer sistema en producción: rastreo GPS de camiones con " },
      { text: "API de Google Maps", emphasis: true },
      { text: " y reportes de ventas." },
    ],
  },
]

export const stack: StackChip[] = [
  { label: "python", key: true },
  { label: "aws lambda", key: true },
  { label: "sqs", key: true },
  { label: "dynamo db", key: true },
  { label: "step functions", key: true },
  { label: "business central", key: true },
  { label: "siigo nube", key: true },
  { label: "node js" },
  { label: "typescript" },
  { label: "go" },
  { label: "airflow" },
  { label: "postgres" },
  { label: "bigquery" },
  { label: "terraform" },
  { label: "aws cdk" },
  { label: "docker" },
]

// ---------------------------------------------------------------------------
// Cases ("Casos reales con ERP")
// ---------------------------------------------------------------------------

export const casesSection = {
  eyebrow: "Integraciones en producción",
  title: "Casos reales con ERP",
}

export const cases: ErpCase[] = [
  {
    logoSrc: "/portafolio-buk/business-central.svg",
    logoAlt: "Business Central",
    erpLabel: "Business Central",
    title: "Punto de venta ↔ Business Central",
    meta: [
      { term: "Cliente", detail: "Ferretería" },
      { term: "Dirección", detail: "Doble vía" },
      { term: "Stack", detail: "Python · AWS · API de Business Central" },
    ],
    body: [
      "Construí el punto de venta de la ferretería en Python sobre AWS. Cada venta crea la factura en Business Central, y esa factura genera dos asientos con su centro de costo por sucursal o categoría. Antes de vender, el sistema consulta el inventario en BC para no vender algo que ya no hay.",
    ],
    flows: [
      {
        caption: "→ Vía de salida: venta a contabilidad",
        nodes: [
          { label: "Origen", title: "Venta en POS" },
          { label: "AWS · Python", title: "Arma la factura" },
          { label: "Business Central", title: "Factura de venta", highlight: true },
          { label: "Resultado", title: "2 asientos + centro de costo" },
        ],
      },
      {
        caption: "← Vía de entrada: inventario antes de vender",
        nodes: [
          { label: "Origen", title: "Cajero agrega ítem" },
          { label: "Business Central", title: "Consulta disponibilidad", highlight: true },
          { label: "Resultado", title: "Vende solo lo que hay" },
        ],
      },
    ],
    ledgers: [
      {
        heading: "Asiento 1 · la venta",
        debit: "Débito: banco o cuentas por cobrar",
        credit: "Crédito: ventas",
      },
      {
        heading: "Asiento 2 · el costo",
        debit: "Débito: costo de ventas",
        credit: "Crédito: inventario",
      },
    ],
  },
  {
    logoSrc: "/portafolio-buk/siigo.svg",
    logoAlt: "Siigo",
    erpLabel: "Siigo Nube",
    title: "Implementación de nómina en Siigo Nube",
    meta: [
      { term: "Rol", detail: "Acompañamiento técnico" },
      { term: "Con", detail: "Abogado laboral y RRHH de la empresa" },
      {
        term: "Alcance",
        detail: "Configuración de la nómina. La habilitación ante la DIAN la hizo la empresa.",
      },
    ],
    body: [
      "Acompañé la puesta en marcha de la nómina en Siigo Nube en la parte técnica. El abogado y RRHH definían las reglas; mi trabajo era llevarlas a la configuración del sistema y revisar que el resultado coincidiera con lo acordado.",
      "En el proceso aprendí la parte legal detrás de cada concepto de nómina: por qué existe un devengado, qué deducciones son de ley y qué cambia según el tipo de contrato. Es la misma conversación que hay que tener con un cliente de Buk antes de conectar su nómina con la contabilidad.",
    ],
    flows: [
      {
        nodes: [
          { label: "Abogado + RRHH", title: "Definen las reglas" },
          { label: "Mi parte", title: "Configuración y revisión", highlight: true },
          { label: "Siigo Nube", title: "Nómina en operación" },
        ],
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// Mapping ("El mismo problema, otro origen")
// ---------------------------------------------------------------------------

export const mappingSection = {
  eyebrow: "Cómo se traslada a Buk",
  title: "El mismo problema, otro origen",
  description:
    "Una liquidación de nómina es un evento de negocio igual que una venta. Cambian el dato de entrada, las cuentas y la dimensión del centro de costo.",
  columnOrigin: "Ferretería",
  columnDestination: "Buk",
}

export const mappingRows: MappingRow[] = [
  {
    label: "Evento",
    origin: "Venta en el punto de venta",
    destination: "Liquidación de nómina calculada en Buk",
  },
  {
    label: "Documento en BC",
    origin: "Factura de venta",
    destination: "Diario contable",
  },
  {
    label: "Débito",
    origin: "Banco o cuentas por cobrar · costo de ventas",
    destination: "Sueldos y prestaciones",
  },
  {
    label: "Crédito",
    origin: "Ventas · inventario",
    destination: "Bancos (lo que se paga) · retenciones (lo pendiente de girar)",
  },
  {
    label: "Centro de costo",
    origin: "Sucursal o categoría",
    destination: "Área",
  },
  {
    label: "Consulta de vuelta",
    origin: "Inventario disponible",
    destination: "Terceros y cuentas vigentes en el ERP",
  },
]

// ---------------------------------------------------------------------------
// Pattern ("Cómo integraría la API de Buk")
// ---------------------------------------------------------------------------

export const patternSection = {
  eyebrow: "Arquitectura de referencia",
  title: "Cómo integraría la API de Buk",
}

export const patternFlow: FlowNode[] = [
  { label: "Buk", title: "Webhook de cambio", highlight: true },
  { label: "API Gateway", title: "Recibe y responde rápido" },
  { label: "SQS", title: "Cola + DLQ" },
  { label: "Lambda", title: "Pide el detalle a Buk y mapea" },
  { label: "ERP", title: "Asiento sin contabilizar", highlight: true },
]

export const patternRules: PatternRule[] = [
  {
    title: "El webhook solo avisa",
    description:
      "Buk notifica que algo cambió. El detalle se pide después por API, así que el worker siempre lee el dato vigente.",
  },
  {
    title: "Sin duplicados",
    description:
      "El ID de la liquidación es la llave en DynamoDB y el número de documento en el ERP. Un reintento no crea un segundo asiento.",
  },
  {
    title: "Fallas visibles",
    description: "Lo que no se puede procesar va a una cola de errores con alerta. Nada se pierde en silencio.",
  },
  {
    title: "Autenticación de Buk",
    description: [
      { text: "Token en el header " },
      { text: "auth_token", code: true },
      { text: ", subdominio del cliente y país en la ruta, por ejemplo " },
      { text: "/api/v1/colombia", code: true },
      { text: "." },
    ],
  },
  {
    title: "Permisos mínimos",
    description:
      "Un token por integración, con lectura solo sobre los módulos que usa y restricción por IP cuando el cliente lo permite.",
  },
  {
    title: "Revisión contable",
    description:
      "El asiento llega al ERP sin contabilizar para que el contador lo apruebe durante el periodo en paralelo.",
  },
]

// ---------------------------------------------------------------------------
// ERP destinations ("El patrón no depende del ERP")
// ---------------------------------------------------------------------------

export const erpsSection = {
  eyebrow: "Destinos",
  title: "El patrón no depende del ERP",
  description:
    "De esta arquitectura solo cambia el último paso: el conector que escribe en el ERP. Ya lo construí para Business Central y Siigo Nube. Odoo y SAP Business One los conozco y estoy abierto a integrarlos. Todavía no tengo uno en producción; un caso nuevo lo estudiaría a fondo y lo resolvería con el mismo método.",
}

export const erpDestinations: ErpDestination[] = [
  {
    logoSrc: "/portafolio-buk/business-central.svg",
    logoAlt: "Business Central",
    name: "Business Central",
    status: "live",
    statusLabel: "En producción",
  },
  {
    logoSrc: "/portafolio-buk/siigo.svg",
    logoAlt: "Siigo",
    name: "Siigo Nube",
    status: "live",
    statusLabel: "En producción",
  },
  {
    logoSrc: "/portafolio-buk/odoo.svg",
    logoAlt: "Odoo",
    name: "Odoo",
    status: "open",
    statusLabel: "Abierto a integrar",
  },
  {
    logoSrc: "/portafolio-buk/sap.svg",
    logoAlt: "SAP",
    name: "SAP Business One",
    status: "open",
    statusLabel: "Abierto a integrar",
  },
]

// ---------------------------------------------------------------------------
// Cost ("Se paga lo que se usa")
// ---------------------------------------------------------------------------

export const costSection = {
  eyebrow: "Por qué serverless en AWS",
  title: "Se paga lo que se usa",
  description:
    "Una integración de nómina trabaja en picos: quincena y cierre de mes. El resto del tiempo casi no hay tráfico. Un servidor encendido todo el mes cobra igual aunque esté quieto.",
  chartAriaLabel:
    "Uso ilustrativo de una integración de nómina durante un mes, con picos en el día 15 y el día 30",
  legend: [
    { label: "Ejecuciones serverless (ilustrativo)", colorVar: "--accent" },
    { label: "Capacidad pagada de un servidor fijo", colorVar: "--warn" },
  ],
}

export const costItems: CostItem[] = [
  {
    label: "Lambda",
    description: "Cobra por ejecución y por milisegundo de cómputo. Sin tráfico, no cobra.",
  },
  {
    label: "SQS",
    description: "Cobra por mensaje. Absorbe los picos del cierre de mes sin agrandar nada.",
  },
  {
    label: "DynamoDB on-demand",
    description: "Cobra por lectura y escritura. Guarda el estado de cada liquidación procesada.",
  },
  {
    label: "Por cliente",
    description:
      "Cada cliente de Buk tiene su propia pila. Su costo es proporcional a su nómina y se puede estimar antes de empezar.",
  },
]

// ---------------------------------------------------------------------------
// Process ("Cómo acompaño una integración")
// ---------------------------------------------------------------------------

export const processSection = {
  eyebrow: "Con el cliente que Buk refiera",
  title: "Cómo acompaño una integración",
  description: "Del CTO traigo la parte que no es código: hablar con finanzas, acordar alcance y responder cuando algo falla.",
}

export const processSteps: ProcessStep[] = [
  { title: "Diagnóstico", description: "ERP, módulos de Buk y qué debe viajar." },
  { title: "Mapeo", description: "Cuentas, terceros y centros de costo con el contador." },
  { title: "Piloto", description: "Entorno de pruebas con una nómina real." },
  { title: "Paralelo", description: "Un cierre comparando contra el proceso actual." },
  { title: "Producción", description: "Salida con alertas activas." },
  { title: "Soporte", description: "Responsable definido ante cambios de API." },
]

// ---------------------------------------------------------------------------
// Contact
// ---------------------------------------------------------------------------

export const contact = {
  title: "Listo para tomar el primer cliente referido.",
}

export const contactLinks: ContactLink[] = [
  { label: "Correo", value: "me@matteoquintero.com" },
  { label: "WhatsApp", value: "+57 319 388 8291", href: "https://wa.me/573193888291" },
  { label: "LinkedIn", value: "linkedin.com/in/matteoquintero", href: "https://linkedin.com/in/matteoquintero" },
  { label: "Portafolio", value: "matteoquintero.com", href: "https://matteoquintero.com" },
]
