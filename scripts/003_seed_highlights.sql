-- Highlights seed: the 6 rows the user had (education + certifications + milestones).

TRUNCATE TABLE highlights RESTART IDENTITY;

INSERT INTO highlights (year, text_es)
VALUES
  ('2010',      'SENA — Tecnólogo en Análisis y Desarrollo de Sistemas'),
  ('2011',      'CasaLuker — Primer sistema real en producción.'),
  ('2012',      'Aranea — Algoritmo de diagnóstico por preguntas.'),
  ('2015–2018', 'Los Libertadores — Ingeniería de Sistemas. Estructura.'),
  ('2023',      'Stride — Inglés Profesional B2+'),
  ('2023–2025', 'Fundación San José — Ingeniería de Sistemas. Refuerzo.');
