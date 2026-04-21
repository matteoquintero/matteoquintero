-- Experiences seed: mixes the user's narrative copy (impact / problem / decision /
-- result) with the concrete technical carne from cv.md (clients, stack, domain)
-- in solution_es. Technology arrays are expanded to include the full CV stack
-- while preserving the user's naming convention (lowercase, spaces, e.g.
-- "mongo db", "postgre sql", "go lang"). Assumes 001_schema.sql has been applied.

TRUNCATE TABLE experiences RESTART IDENTITY;

INSERT INTO experiences
  (year, company, type, image, role_es, impact_es, problem_es, decision_es, solution_es, result_es, technologies)
VALUES
  (
    '2011',
    'CasaLuker',
    'technical',
    'https://sabwogeqwmkkdschyzeo.supabase.co/storage/v1/object/sign/images/gpd.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xZmE3ZjE4MS04NTgwLTQxOWItYjgwMS0zZGU4ZGFmNGM5OGEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvZ3BkLndlYnAiLCJpYXQiOjE3NjU3Njc0ODksImV4cCI6MTc5NzMwMzQ4OX0.FNxShHADRpd8aVv2ujKyJTvXCGIrXdKxc_gWxhnzVo4',
    'Junior Engineer',
    'Primer sistema en producción con usuarios reales.',
    'No existía un sistema para monitorear logística, ventas y tiempos de entrega.',
    'Construir una solución completa de extremo a extremo.',
    'Sistema end-to-end construido en solitario (Java + Spring + Google Maps API): GPS tracking, reporting de ventas, detección de retrasos y visualización de rutas multi-ciudad para camiones de alimentos.',
    'Primer producto en producción. Punto de no retorno como constructor.',
    ARRAY['java','spring','google maps api','real time gps','mysql','oracle','apache tomcat','html','css','js','bash']::text[]
  ),
  (
    '2012',
    'Aranea Software',
    'technical',
    '',
    'Junior Engineer',
    'Primer acercamiento real a sistemas de decisión — una IA pre-LLM con razonamiento por reglas.',
    'El diagnóstico mecánico dependía completamente de experiencia humana no estructurada.',
    'Modelar el conocimiento en forma de lógica.',
    'Algoritmo de diagnóstico vehicular que navega un árbol de decisión según las respuestas, descartando hipótesis y priorizando las más probables — razonamiento rule-based, pre-LLM.',
    'Introducción temprana a sistemas de decisión e inteligencia aplicada.',
    ARRAY['php','jquery','desicion tree','mysql','oracle','apache','sql','css','js']::text[]
  ),
  (
    '2013–2018',
    'BRM',
    'creative',
    '',
    'Software Engineer',
    'Construcción de un perfil híbrido entre ingeniería y creatividad.',
    'Proyectos grandes con alta presión creativa y técnica.',
    'No limitarme al código y entender producto, negocio y narrativa.',
    'Website de Movistar, app mobile de Avantel, juegos JS multi-brand para campañas, y un año dedicado a un sistema de case management documental para un cliente legal.',
    'Capacidad de moverme entre creatividad y arquitectura sin fricción.',
    ARRAY['ionic','play store','app store','php','python','typescript','angular','mongo db','mysql','aws','redis','nginx','andruino','css','html','js','laravel','bash']::text[]
  ),
  (
    '2018–2019',
    'Geometry Colombia',
    'technical',
    '',
    'Software Engineer',
    'Productos más seguros y preparados para escalar.',
    'Plataformas con riesgos de seguridad y arquitectura frágil.',
    'Priorizar seguridad desde el diseño.',
    'Capa de seguridad end-to-end en Laravel + Angular: auth de usuarios, rate limiting de submissions y cifrado de códigos ganadores para campañas de Ducales y Colcafé — más un framework de juegos JS para piezas interactivas.',
    'Mayor confiabilidad y robustez en producción.',
    ARRAY['php','python','typescript','angular','web animate','mongo db','mysql','aws','laravel','nginx','apache','bash']::text[]
  ),
  (
    '2019–2021',
    'TiendAPP',
    'creative',
    'https://sabwogeqwmkkdschyzeo.supabase.co/storage/v1/object/sign/images/tiendapp.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xZmE3ZjE4MS04NTgwLTQxOWItYjgwMS0zZGU4ZGFmNGM5OGEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvdGllbmRhcHAud2VicCIsImlhdCI6MTc2NTc2Nzc0MSwiZXhwIjoxNzk3MzAzNzQxfQ.e20ELYreXgDyyucn0TBl6glu9NcoPfDvG_BZruKGd3E',
    'Senior Software Engineer',
    'Producto adoptado por comercios reales.',
    'Las tiendas de barrio no tenían herramientas alineadas a su realidad.',
    'Diseñar el sistema desde el usuario real, no desde el manual.',
    'POS móvil (Ionic + Angular + Redux) con inventario, compras, crédito, reporting, tracking de deuda y analítica — soportado en MySQL, MongoDB, Elasticsearch, Redis y Firebase sobre AWS.',
    'Impacto directo en la operación diaria de pequeños comercios.',
    ARRAY['ionic','play store','app store','php','python','typescript','angular','redux','mysql','mongo db','elastic search','redis','firebase','aws','js','bash']::text[]
  ),
  (
    '2021–2022',
    'Aflore',
    'technical',
    '',
    'Senior Software Engineer / Frontend Lead',
    'Plataforma más mantenible y equipo más autónomo.',
    'Código frontend difícil de mantener y flujos críticos lentos.',
    'Reestructurar antes de seguir agregando funcionalidades.',
    'Reescribí el workflow de solicitudes de crédito con componentización y upgrade del framework, rediseñé el manejo de datos en backend, y lideré la modernización de 3 apps mobile con un equipo junior+senior.',
    'Mejora sustancial en estabilidad y velocidad de desarrollo.',
    ARRAY['lead','vue js','react js','django','python','php','redux','docker','aws','postgre sql','redis','GraphQL','WebSockets','github actions','circleci']::text[]
  ),
  (
    '2022–2023',
    'Nowports',
    'technical',
    '',
    'Senior Software Engineer',
    'Mayor criterio técnico bajo presión.',
    'Entregas rápidas bajo un modelo Kanban exigente.',
    'Priorizar comprensión del sistema sobre perfección.',
    'Delivery en ciclos Kanban de 3 días con prototipado en Figma antes del código, onboarding rápido en codebases desconocidos, y Bit.Cloud para compartir componentes entre apps.',
    'Alta capacidad de adaptación y decisión rápida.',
    ARRAY['node js','react js','vue js','typescript','python','bit cloud','figma','docker','postgre sql','redis','aws','github actions','css','js']::text[]
  ),
  (
    '2023–Presente',
    'Growker',
    'technical',
    '',
    'Senior / Lead Software Engineer',
    'Datos centralizados y accionables para el negocio.',
    'Datos fragmentados entre múltiples marketplaces.',
    'Centralizar información en pipelines escalables.',
    'ETL serverless en AWS (Step Functions + Lambda + S3 + DynamoDB + Athena + Glue) consolidando MercadoLibre, Amazon Sellers y Amazon Ads. Lideré la migración de monolito Node.js a microservicios en Python + Apache Airflow + Elasticsearch.',
    'Base confiable para análisis y toma de decisiones.',
    ARRAY['lead','node js','python','aws','step functions','lambda','s3','dynamo db','athena','glue','airflow','elastic search','bigquery','postgre sql','docker','digital ocean','bash']::text[]
  ),
  (
    '2024–Presente',
    'Sellerfy',
    'technical',
    '',
    'Chief Technology Officer',
    'Base sólida para escalar producto, equipo y visión.',
    'Infraestructura y datos no alineados con la visión de producto.',
    'Modernizar arquitectura y conectar tecnología con negocio.',
    'App desktop nativa con copilot conversacional model-agnostic (Claude + GPT + Gemini), RAG en Go sobre BigQuery, agentes streaming con guardrails y eval framework LLM-as-judge como deployment gate. Multi-cloud AWS CDK + GCP Terraform con credit-based billing.',
    'Arquitectura preparada para crecimiento sostenible.',
    ARRAY['lead','aws','cdk','terraform','google cloud','bigquery','dynamo db','postgre sql','vector bd','embedings','next js','node js','typescript','airflow','python','go lang','claude','gpt','gemini','ai','rag','bash']::text[]
  ),
  (
    '2025',
    'Festival Estéreo Picnic',
    'creative',
    'https://sabwogeqwmkkdschyzeo.supabase.co/storage/v1/object/sign/images/fep.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xZmE3ZjE4MS04NTgwLTQxOWItYjgwMS0zZGU4ZGFmNGM5OGEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvZmVwLnBuZyIsImlhdCI6MTc2NTYwOTg5MywiZXhwIjoxNzk3MTQ1ODkzfQ.K6dkOA8IVxN_nvbojNA04-woZwFy62lrfWTrZBlIHZ8',
    'Diseñador Web · Figma',
    'Demuestra versatilidad entre producto, diseño y sistemas.',
    'El festival necesitaba una experiencia digital alineada con su identidad y escala.',
    'Diseñar una interfaz clara, flexible y coherente con la narrativa del evento.',
    'Diseño completo en Figma con foco en experiencia, ritmo visual y claridad — propuesta lista para implementación y comunicación masiva.',
    'Una propuesta visual sólida, lista para implementación y comunicación masiva.',
    ARRAY['figma']::text[]
  );
