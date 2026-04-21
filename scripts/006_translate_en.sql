-- Fill every *_en column across experiences, highlights, hero_content, site_copy,
-- and site_lists so the EN locale stops falling back to ES. Idempotent: updates
-- match by stable keys (company+year, key, list_key+position, etc.) and can be
-- re-run safely. Run AFTER scripts 001–005.

-- ============================================================
-- experiences  (match by company — stable, single-row per brand)
-- ============================================================
UPDATE experiences SET
  role_en     = 'Junior Engineer',
  impact_en   = 'First production system with real users.',
  problem_en  = 'No system existed to monitor logistics, sales, and delivery times.',
  decision_en = 'Build a complete end-to-end solution.',
  solution_en = 'End-to-end system built solo (Java + Spring + Google Maps API): GPS tracking, sales reporting, delay detection, and multi-city route visualization for food delivery trucks.',
  result_en   = 'First product shipped to production. Point of no return as a builder.'
WHERE company = 'CasaLuker';

UPDATE experiences SET
  role_en     = 'Junior Engineer',
  impact_en   = 'First real exposure to decision systems — a pre-LLM AI with rule-based reasoning.',
  problem_en  = 'Mechanical diagnosis depended entirely on unstructured human expertise.',
  decision_en = 'Model that knowledge as logic.',
  solution_en = 'Vehicle diagnostic algorithm that walks a decision tree based on user answers, discarding hypotheses and prioritizing the most likely ones — rule-based reasoning, pre-LLM.',
  result_en   = 'Early introduction to decision systems and applied intelligence.'
WHERE company = 'Aranea Software';

UPDATE experiences SET
  role_en     = 'Software Engineer',
  impact_en   = 'Built a hybrid profile at the intersection of engineering and creativity.',
  problem_en  = 'Large projects under heavy creative and technical pressure.',
  decision_en = 'Not limit myself to code — understand product, business, and narrative.',
  solution_en = 'Movistar''s website, Avantel''s mobile app, multi-brand JS games for campaigns, and a year-long engagement building a document case-management system for a legal client.',
  result_en   = 'Ability to move between creativity and architecture without friction.'
WHERE company = 'BRM';

UPDATE experiences SET
  role_en     = 'Software Engineer',
  impact_en   = 'Safer products, ready to scale.',
  problem_en  = 'Platforms with security risks and fragile architecture.',
  decision_en = 'Prioritize security from the design phase.',
  solution_en = 'End-to-end security layer in Laravel + Angular: user auth, submission rate limiting, and encryption of winning promo codes for Ducales and Colcafé campaigns — plus a JS game framework for interactive pieces.',
  result_en   = 'Greater reliability and robustness in production.'
WHERE company = 'Geometry Colombia';

UPDATE experiences SET
  role_en     = 'Senior Software Engineer',
  impact_en   = 'Product adopted by real shops.',
  problem_en  = 'Neighborhood stores had no tools aligned with their reality.',
  decision_en = 'Design the system from the real user, not from the manual.',
  solution_en = 'Mobile POS (Ionic + Angular + Redux) with inventory, purchases, credit, reporting, debt tracking, and analytics — backed by MySQL, MongoDB, Elasticsearch, Redis, and Firebase on AWS.',
  result_en   = 'Direct impact on the daily operations of small businesses.'
WHERE company = 'TiendAPP';

UPDATE experiences SET
  role_en     = 'Senior Software Engineer / Frontend Lead',
  impact_en   = 'More maintainable platform and more autonomous team.',
  problem_en  = 'Hard-to-maintain frontend code and slow critical flows.',
  decision_en = 'Restructure before adding more features.',
  solution_en = 'Rewrote the credit-request workflow with componentization and a framework upgrade, redesigned backend data handling, and led the modernization of 3 mobile apps with a junior+senior team.',
  result_en   = 'Substantial improvement in stability and development speed.'
WHERE company = 'Aflore';

UPDATE experiences SET
  role_en     = 'Senior Software Engineer',
  impact_en   = 'Sharper technical judgment under pressure.',
  problem_en  = 'Fast delivery under a demanding Kanban model.',
  decision_en = 'Prioritize system understanding over perfection.',
  solution_en = 'Delivery in 3-day Kanban cycles with Figma prototyping before coding, fast onboarding into unfamiliar codebases, and Bit.Cloud to share components across apps.',
  result_en   = 'High adaptability and quick decision-making.'
WHERE company = 'Nowports';

UPDATE experiences SET
  role_en     = 'Senior / Lead Software Engineer',
  impact_en   = 'Centralized, actionable data for the business.',
  problem_en  = 'Data fragmented across multiple marketplaces.',
  decision_en = 'Consolidate information into scalable pipelines.',
  solution_en = 'Serverless ETL on AWS (Step Functions + Lambda + S3 + DynamoDB + Athena + Glue) consolidating MercadoLibre, Amazon Sellers, and Amazon Ads. Led the migration from a Node.js monolith to microservices in Python + Apache Airflow + Elasticsearch.',
  result_en   = 'Reliable foundation for analysis and decision-making.'
WHERE company = 'Growker';

UPDATE experiences SET
  role_en     = 'Chief Technology Officer',
  impact_en   = 'Solid foundation to scale product, team, and vision.',
  problem_en  = 'Infrastructure and data not aligned with product vision.',
  decision_en = 'Modernize the architecture and connect technology with business.',
  solution_en = 'Native desktop app with a model-agnostic conversational copilot (Claude + GPT + Gemini), RAG in Go over BigQuery, streaming agents with guardrails, and an LLM-as-judge eval framework as a deployment gate. Multi-cloud AWS CDK + GCP Terraform with credit-based billing.',
  result_en   = 'Architecture ready for sustainable growth.'
WHERE company = 'Sellerfy';

UPDATE experiences SET
  role_en     = 'Web Designer · Figma',
  impact_en   = 'Demonstrates versatility across product, design, and systems.',
  problem_en  = 'The festival needed a digital experience aligned with its identity and scale.',
  decision_en = 'Design a clear, flexible interface coherent with the event''s narrative.',
  solution_en = 'Full Figma design focused on experience, visual rhythm, and clarity — a proposal ready for implementation and mass communication.',
  result_en   = 'A solid visual proposal, ready for implementation and mass communication.'
WHERE company = 'Festival Estéreo Picnic';

-- ============================================================
-- highlights  (match by year + original ES text)
-- ============================================================
UPDATE highlights SET text_en = 'SENA — Technologist in Systems Analysis and Development'              WHERE year = '2010'      AND text_es = 'SENA — Tecnólogo en Análisis y Desarrollo de Sistemas';
UPDATE highlights SET text_en = 'CasaLuker — First real production system.'                             WHERE year = '2011'      AND text_es = 'CasaLuker — Primer sistema real en producción.';
UPDATE highlights SET text_en = 'Aranea — Question-based diagnostic algorithm.'                         WHERE year = '2012'      AND text_es = 'Aranea — Algoritmo de diagnóstico por preguntas.';
UPDATE highlights SET text_en = 'Los Libertadores — Systems Engineering. Structure.'                    WHERE year = '2015–2018' AND text_es = 'Los Libertadores — Ingeniería de Sistemas. Estructura.';
UPDATE highlights SET text_en = 'Stride — Professional English B2+'                                     WHERE year = '2023'      AND text_es = 'Stride — Inglés Profesional B2+';
UPDATE highlights SET text_en = 'Fundación San José — Systems Engineering. Reinforcement.'             WHERE year = '2023–2025' AND text_es = 'Fundación San José — Ingeniería de Sistemas. Refuerzo.';

-- ============================================================
-- hero_content  (single row)
-- ============================================================
UPDATE hero_content SET
  role_en                = 'CTO · Systems · Product',
  headline_creative_en   = 'I design',
  headline_technical_en  = 'systems',
  headline_action_en     = 'that solve problems',
  micro_context_en       = 'Personal portfolio',
  scroll_text_en         = 'Scroll to see how I got here',
  updated_at             = now();

-- ============================================================
-- site_copy  (only keys whose EN differs from ES; NULL value_en
-- falls back to value_es automatically in getSiteCopy)
-- ============================================================
UPDATE site_copy SET value_en = 'Portfolio — Creative × Technical'                             WHERE key = 'site.meta.title';
UPDATE site_copy SET value_en = 'I design systems that solve problems. CTO · Systems · Product.' WHERE key = 'site.meta.description';
UPDATE site_copy SET value_en = 'Mateo Quintero — Portfolio'                                   WHERE key = 'site.meta.og_title';
UPDATE site_copy SET value_en = 'I design systems that solve problems. CTO · Systems · Product.' WHERE key = 'site.meta.og_description';

UPDATE site_copy SET value_en = 'Available to collaborate'                                     WHERE key = 'hero.availability';
UPDATE site_copy SET value_en = 'See the journey'                                              WHERE key = 'hero.cta.scroll_timeline';

UPDATE site_copy SET value_en = 'search'                                                       WHERE key = 'technologies.search_placeholder';
UPDATE site_copy SET value_en = 'no results'                                                   WHERE key = 'technologies.empty';

UPDATE site_copy SET value_en = 'How I got here.'                                              WHERE key = 'timeline.title';
UPDATE site_copy SET value_en = 'See details'                                                  WHERE key = 'timeline.cta.details';

UPDATE site_copy SET value_en = '01 · the problem'                                             WHERE key = 'experience.section.problem';
UPDATE site_copy SET value_en = '02 · the key decision'                                        WHERE key = 'experience.section.decision';
UPDATE site_copy SET value_en = '03 · how it was solved'                                       WHERE key = 'experience.section.solution';
UPDATE site_copy SET value_en = '04 · impact'                                                  WHERE key = 'experience.section.result';
UPDATE site_copy SET value_en = 'Close'                                                        WHERE key = 'experience.close_aria';

UPDATE site_copy SET value_en = 'manifesto'                                                    WHERE key = 'footer.manifesto_label';
UPDATE site_copy SET value_en = 'contact'                                                      WHERE key = 'footer.contact_label';
UPDATE site_copy SET value_en = 'I can lead the architecture of a distributed system and, the same day, sit with a creative team to co-design a campaign. The crossover between engineering and narrative is where I feel most myself.' WHERE key = 'footer.pitch';
UPDATE site_copy SET value_en = 'copy'                                                         WHERE key = 'footer.copy_label';
UPDATE site_copy SET value_en = 'copied'                                                       WHERE key = 'footer.copied';
-- footer.linkedin_handle identical in EN and ES → leave NULL (fallback).

-- (The following keys are identical in EN and ES; leaving value_en NULL so the
-- fallback keeps them in sync if the ES ever changes:
--   hero.label.creative_track, hero.label.technical_track,
--   hero.contact.linkedin/whatsapp/email,
--   loader.namespace/track_design/track_code/compiling/tagline,
--   technologies.namespace, timeline.namespace,
--   timeline.label.creative, timeline.label.technical)

-- ============================================================
-- site_lists  (match by list_key + position)
-- ============================================================
-- hero.creative_keywords
UPDATE site_lists SET value_en = 'Product'     WHERE list_key = 'hero.creative_keywords'  AND position = 1;
UPDATE site_lists SET value_en = 'Design'      WHERE list_key = 'hero.creative_keywords'  AND position = 2;
UPDATE site_lists SET value_en = 'Narrative'   WHERE list_key = 'hero.creative_keywords'  AND position = 3;
UPDATE site_lists SET value_en = 'AI'          WHERE list_key = 'hero.creative_keywords'  AND position = 4;
UPDATE site_lists SET value_en = 'Creativity'  WHERE list_key = 'hero.creative_keywords'  AND position = 5;

-- hero.technical_keywords
UPDATE site_lists SET value_en = 'Architecture' WHERE list_key = 'hero.technical_keywords' AND position = 1;
UPDATE site_lists SET value_en = 'Systems'      WHERE list_key = 'hero.technical_keywords' AND position = 2;
UPDATE site_lists SET value_en = 'Cloud'        WHERE list_key = 'hero.technical_keywords' AND position = 3;
UPDATE site_lists SET value_en = 'Data'         WHERE list_key = 'hero.technical_keywords' AND position = 4;
UPDATE site_lists SET value_en = 'Backend'      WHERE list_key = 'hero.technical_keywords' AND position = 5;

-- hero.morph_words
UPDATE site_lists SET value_en = 'systems'     WHERE list_key = 'hero.morph_words' AND position = 1;
UPDATE site_lists SET value_en = 'agents'      WHERE list_key = 'hero.morph_words' AND position = 2;
UPDATE site_lists SET value_en = 'experiences' WHERE list_key = 'hero.morph_words' AND position = 3;
UPDATE site_lists SET value_en = 'product'     WHERE list_key = 'hero.morph_words' AND position = 4;
UPDATE site_lists SET value_en = 'interfaces'  WHERE list_key = 'hero.morph_words' AND position = 5;

-- (loader.design_lines and loader.code_lines are already in English in value_es;
-- value_en stays NULL and falls back automatically.)
