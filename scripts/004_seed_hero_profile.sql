-- Seed / upsert the single profile row using the user's exact values.
-- Preserves an existing id if a row already exists.

DO $$
DECLARE
  existing_id UUID;
BEGIN
  SELECT id INTO existing_id FROM hero_content LIMIT 1;

  IF existing_id IS NULL THEN
    INSERT INTO hero_content (
      name,
      role_es,
      headline_creative_es,
      headline_technical_es,
      headline_action_es,
      micro_context_es,
      scroll_text_es,
      profile_image,
      linkedin_url,
      whatsapp_number,
      email
    ) VALUES (
      'Mateo',
      'CTO · Sistemas · Producto',
      'Diseño',
      'sistemas',
      'que resuelven problemas',
      'Portafolio personal',
      'Desliza para ver cómo llegué hasta aquí',
      '/professional-portrait-bw.png',
      'https://linkedin.com/in/matteoquintero',
      '573106441111',
      'mateo@example.com'
    );
  ELSE
    UPDATE hero_content SET
      name                   = 'Mateo',
      role_es                = 'CTO · Sistemas · Producto',
      headline_creative_es   = 'Diseño',
      headline_technical_es  = 'sistemas',
      headline_action_es     = 'que resuelven problemas',
      micro_context_es       = 'Portafolio personal',
      scroll_text_es         = 'Desliza para ver cómo llegué hasta aquí',
      profile_image          = COALESCE(profile_image, '/professional-portrait-bw.png'),
      linkedin_url           = COALESCE(linkedin_url, 'https://linkedin.com/in/matteoquintero'),
      whatsapp_number        = COALESCE(whatsapp_number, '573106441111'),
      email                  = COALESCE(email, 'mateo@example.com'),
      updated_at             = now()
    WHERE id = existing_id;
  END IF;
END $$;
