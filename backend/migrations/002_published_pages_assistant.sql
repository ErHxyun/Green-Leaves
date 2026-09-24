CREATE TABLE published_content (
 entity_type text NOT NULL, entity_id text NOT NULL, snapshot jsonb NOT NULL,
 published_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY(entity_type,entity_id)
);
CREATE UNIQUE INDEX published_event_slug ON published_content((snapshot->>'slug')) WHERE entity_type='event';
CREATE UNIQUE INDEX published_site_key ON published_content((snapshot->>'content_key')) WHERE entity_type='site';
-- Capture exactly the current public state; never resurrect an archived/draft entity.
INSERT INTO published_content SELECT 'year', y.id, to_jsonb(y)||jsonb_build_object('translations',COALESCE((SELECT jsonb_object_agg(lang,jsonb_build_object('title',title,'summary',summary)) FROM timeline_year_translations WHERE year_id=y.id),'{}'::jsonb)),now() FROM timeline_years y WHERE status='published';
INSERT INTO published_content SELECT 'site',s.id,to_jsonb(s)||jsonb_build_object('translations',COALESCE((SELECT jsonb_object_agg(lang,jsonb_build_object('value',value)) FROM site_content_translations WHERE site_content_id=s.id),'{}'::jsonb)),now() FROM site_content s WHERE status='published';
INSERT INTO published_content
SELECT 'event',e.id,to_jsonb(e)||jsonb_build_object(
 'translations',COALESCE((SELECT jsonb_object_agg(lang,jsonb_build_object('title',title)) FROM timeline_event_translations WHERE event_id=e.id),'{}'::jsonb),
 'blocks',COALESCE((SELECT jsonb_agg(to_jsonb(b)||jsonb_build_object('translations',COALESCE((SELECT jsonb_object_agg(lang,jsonb_build_object('content',content,'caption',caption,'alt',alt)) FROM content_block_translations WHERE block_id=b.id),'{}'::jsonb)) ORDER BY sort_order,id) FROM content_blocks b WHERE event_id=e.id AND status='published'),'[]'::jsonb)),now()
FROM timeline_events e WHERE status='published';
-- Version writes and release changes are atomic with their surrounding transaction.
CREATE FUNCTION sync_published_content() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
 IF NEW.entity_type IN ('event','year','site','page') THEN
  IF NEW.snapshot->>'status'='published' THEN
   INSERT INTO published_content(entity_type,entity_id,snapshot) VALUES(NEW.entity_type,NEW.entity_id,NEW.snapshot||jsonb_build_object('id',NEW.entity_id))
   ON CONFLICT(entity_type,entity_id) DO UPDATE SET snapshot=EXCLUDED.snapshot,published_at=now();
  ELSIF NEW.snapshot->>'status'='archived' THEN
   DELETE FROM published_content WHERE entity_type=NEW.entity_type AND entity_id=NEW.entity_id;
  END IF;
 END IF;
 RETURN NEW;
END $$;
CREATE TRIGGER content_release AFTER INSERT ON content_versions FOR EACH ROW EXECUTE FUNCTION sync_published_content();

CREATE TABLE page_sections (
 id text PRIMARY KEY, label text NOT NULL, status text NOT NULL CHECK(status IN ('draft','published','archived')),
 revision integer NOT NULL DEFAULT 0
);
CREATE TABLE page_images (
 id text PRIMARY KEY, section_id text NOT NULL REFERENCES page_sections(id),
 media_id text NOT NULL REFERENCES media_assets(id), sort_order integer NOT NULL,
 UNIQUE(section_id,sort_order) DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE page_image_translations (
 image_id text REFERENCES page_images(id) ON DELETE CASCADE,lang text CHECK(lang IN ('cn','en')),
 alt text NOT NULL DEFAULT '',caption text NOT NULL DEFAULT '',PRIMARY KEY(image_id,lang)
);
CREATE TABLE assistant_threads(id text PRIMARY KEY,created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE assistant_messages(
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,thread_id text NOT NULL REFERENCES assistant_threads(id),
 role text NOT NULL CHECK(role IN ('user','assistant')),content text NOT NULL,created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE assistant_proposals(
 id text PRIMARY KEY,thread_id text REFERENCES assistant_threads(id),job_id text REFERENCES ai_jobs(id),
 site_id text NOT NULL REFERENCES site_content(id),before_snapshot jsonb NOT NULL,after_snapshot jsonb NOT NULL,
 status text NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','accepted','rejected')),warnings jsonb NOT NULL DEFAULT '[]',
 created_at timestamptz NOT NULL DEFAULT now()
);
