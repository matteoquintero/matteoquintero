-- Create experiences table for timeline
CREATE TABLE IF NOT EXISTS experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year TEXT NOT NULL,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  impact TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('creative', 'technical')),
  image TEXT NOT NULL,
  problem TEXT NOT NULL,
  decision TEXT NOT NULL,
  solution TEXT NOT NULL,
  result TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for sorting
CREATE INDEX IF NOT EXISTS idx_experiences_sort_order ON experiences(sort_order DESC);

-- Enable RLS (but allow public read access since this is a portfolio)
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read experiences (public portfolio)
CREATE POLICY "Allow public read access to experiences"
  ON experiences
  FOR SELECT
  USING (true);

-- Insert seed data with existing experiences
INSERT INTO experiences (year, company, role, impact, type, image, problem, decision, solution, result, sort_order)
VALUES
  (
    '2024',
    'TechCorp',
    'Principal Engineer',
    'Rediseñé la arquitectura de datos para procesar 10M eventos/día',
    'technical',
    '/data-architecture-diagram-with-flowing-nodes.jpg',
    'Sistema legacy colapsaba con >100K eventos/hora. Latencia promedio de 8s.',
    'Migrar de monolito a event-driven con Kafka + streaming processors.',
    'Event sourcing con CQRS, particionamiento inteligente, CDC con Debezium.',
    'Latencia <200ms. 10M eventos/día. Zero downtime durante migración.',
    1
  ),
  (
    '2023',
    'DesignLab',
    'Creative Technologist',
    'Lideré el rediseño que aumentó conversión 340% en onboarding',
    'creative',
    '/modern-onboarding-flow-interface-colorful.jpg',
    '68% de usuarios abandonaban en el primer paso. Flujo confuso y genérico.',
    'Personalización progresiva basada en intención, no en formularios.',
    'Microcopy dinámico, ilustraciones adaptativas, validación en tiempo real.',
    'Conversión de 12% a 53%. NPS +34 puntos. Finalistas Awwwards.',
    2
  ),
  (
    '2022',
    'CloudScale',
    'Staff Engineer',
    'Construí la plataforma de observabilidad que monitoreaba 450 servicios',
    'technical',
    '/monitoring-dashboard-dark-theme-metrics.jpg',
    'Incidentes tardaban 4h en detectarse. Alertas ruidosas. Debugging manual.',
    'Centralizar telemetría con OpenTelemetry + correlación automática.',
    'Tracing distribuido, métricas custom, dashboards auto-generados, AI anomaly detection.',
    'MTTR de 4h a 12min. 94% de incidentes auto-detectados. SLA 99.95%.',
    3
  ),
  (
    '2021',
    'Productify',
    'Lead Product Designer',
    'Redefiní la experiencia de colaboración en tiempo real para equipos remotos',
    'creative',
    '/collaborative-workspace-interface-vibrant-colors.jpg',
    'Equipos remotos perdían contexto. 15+ herramientas desconectadas.',
    'Canvas infinito multiplayer con presencia en tiempo real.',
    'WebRTC para cursores en vivo, CRDT para sync, spatial audio, widgets modulares.',
    'DAU +220%. Tiempo en app de 8min a 45min. Adquisición por FigmaLabs.',
    4
  ),
  (
    '2020',
    'DataFlow',
    'Backend Architect',
    'Diseñé la pipeline que procesaba 2TB/día con <$400/mes en cloud',
    'technical',
    '/data-pipeline-architecture-diagram-serverless.jpg',
    'Costos de procesamiento: $8K/mes. Batch jobs de 6 horas.',
    'Serverless-first con procesamiento incremental y caching inteligente.',
    'Lambda + Step Functions, S3 particionado, DynamoDB streams, spot instances.',
    'Costos a $380/mes (95% reducción). Processing en 45min. Auto-scaling real.',
    5
  )
ON CONFLICT DO NOTHING;
