-- UI strings that don't belong to hero_content or experiences/highlights.
-- hero_content already owns: name, role, headline_creative/technical/action,
-- micro_context, scroll_text. This file covers labels, buttons, loader lines,
-- timeline/technologies namespaces, and the ordered lists (keywords, morph words,
-- loader design/code lines). Idempotent via ON CONFLICT DO UPDATE.

INSERT INTO site_copy (key, value_es, context) VALUES
  ('site.meta.title',                 'Portafolio — Creativo × Técnico',                         'HTML <title>'),
  ('site.meta.description',           'Diseño sistemas que resuelven problemas. CTO · Sistemas · Producto.', 'Meta description'),
  ('site.meta.og_title',              'Mateo Quintero — Portafolio',                             'OpenGraph title'),
  ('site.meta.og_description',        'Diseño sistemas que resuelven problemas. CTO · Sistemas · Producto.', 'OpenGraph description'),

  ('hero.label.creative_track',       'creative',                                                 'Left column label inside hero'),
  ('hero.label.technical_track',      'technical',                                                'Right column label inside hero'),
  ('hero.availability',               'Disponible para colaborar',                                'Status pill'),
  ('hero.cta.scroll_timeline',        'Ver el recorrido',                                         'Primary CTA button'),
  ('hero.contact.linkedin',           'LinkedIn',                                                 'Contact link label'),
  ('hero.contact.whatsapp',           'WhatsApp',                                                 'Contact link label'),
  ('hero.contact.email',              'Email',                                                    'Contact link label'),

  ('loader.namespace',                'init · mateoquintero',                                     'Loader header tag'),
  ('loader.track_design',             'design',                                                   'Loader left column'),
  ('loader.track_code',               'code',                                                     'Loader right column'),
  ('loader.compiling',                'compiling portfolio',                                      'Loader progress label'),
  ('loader.tagline',                  'creative × technical',                                     'Loader footer tagline'),

  ('technologies.namespace',          'stack',                                                    'Section label'),
  ('technologies.search_placeholder', 'buscar',                                                   'Search input placeholder'),
  ('technologies.empty',              'sin resultados',                                           'No matches message'),

  ('timeline.namespace',              'timeline · 2011 → 2025',                                   'Section label'),
  ('timeline.title',                  'Cómo llegué hasta aquí.',                                  'Section heading'),
  ('timeline.cta.details',            'Ver detalles',                                             'Per-item CTA'),
  ('timeline.label.creative',         'creative',                                                 'Type badge'),
  ('timeline.label.technical',        'technical',                                                'Type badge'),

  ('experience.section.problem',      '01 · el problema',                                         'Modal section heading'),
  ('experience.section.decision',     '02 · la decisión clave',                                   'Modal section heading'),
  ('experience.section.solution',     '03 · cómo se resolvió',                                    'Modal section heading'),
  ('experience.section.result',       '04 · impacto',                                             'Modal section heading'),
  ('experience.close_aria',           'Cerrar',                                                   'Modal close button aria-label')
ON CONFLICT (key) DO UPDATE
  SET value_es = EXCLUDED.value_es,
      context  = EXCLUDED.context,
      updated_at = now();

-- ---------------------------------------------------------------
-- site_lists: ordered string arrays
-- ---------------------------------------------------------------
DELETE FROM site_lists WHERE list_key IN (
  'hero.creative_keywords',
  'hero.technical_keywords',
  'hero.morph_words',
  'loader.design_lines',
  'loader.code_lines'
);

INSERT INTO site_lists (list_key, position, value_es) VALUES
  ('hero.creative_keywords',  1, 'Producto'),
  ('hero.creative_keywords',  2, 'Diseño'),
  ('hero.creative_keywords',  3, 'Narrativa'),
  ('hero.creative_keywords',  4, 'AI'),
  ('hero.creative_keywords',  5, 'Creatividad'),

  ('hero.technical_keywords', 1, 'Arquitectura'),
  ('hero.technical_keywords', 2, 'Sistemas'),
  ('hero.technical_keywords', 3, 'Cloud'),
  ('hero.technical_keywords', 4, 'Datos'),
  ('hero.technical_keywords', 5, 'Backend'),

  -- Empty this list to pin the hero title to profile.headline_technical as a
  -- single static word. Adding ≥ 2 rows turns on the gooey morph.
  ('hero.morph_words',        1, 'sistemas'),
  ('hero.morph_words',        2, 'agentes'),
  ('hero.morph_words',        3, 'experiencias'),
  ('hero.morph_words',        4, 'producto'),
  ('hero.morph_words',        5, 'interfaces'),

  ('loader.design_lines',     1, 'composing visual system'),
  ('loader.design_lines',     2, 'resolving tension'),
  ('loader.design_lines',     3, 'typesetting story'),
  ('loader.design_lines',     4, 'balancing negative space'),

  ('loader.code_lines',       1, 'bundling components'),
  ('loader.code_lines',       2, 'hydrating timeline'),
  ('loader.code_lines',       3, 'linking systems'),
  ('loader.code_lines',       4, 'streaming experiences');
