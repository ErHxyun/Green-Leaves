CREATE TABLE timeline_years (
 id text PRIMARY KEY, year integer UNIQUE NOT NULL CHECK (year BETWEEN 1900 AND 2200),
 status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','archived')),
 sort_order integer NOT NULL DEFAULT 0, icon text NOT NULL DEFAULT 'Leaf'
);
CREATE TABLE timeline_year_translations (
 year_id text REFERENCES timeline_years(id) ON DELETE CASCADE,
 lang text CHECK (lang IN ('cn','en')), title text, summary text, PRIMARY KEY(year_id,lang)
);
CREATE TABLE timeline_events (
 id text PRIMARY KEY, year_id text NOT NULL REFERENCES timeline_years(id),
 slug text UNIQUE NOT NULL, event_date text,
 status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','archived')),
 sort_order integer NOT NULL DEFAULT 0,
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE timeline_event_translations (
 event_id text REFERENCES timeline_events(id) ON DELETE CASCADE,
 lang text CHECK (lang IN ('cn','en')), title text, PRIMARY KEY(event_id,lang)
);
CREATE TABLE media_assets (
 id text PRIMARY KEY, url text NOT NULL UNIQUE, metadata jsonb NOT NULL DEFAULT '{}'
);
CREATE TABLE content_blocks (
 id text PRIMARY KEY, event_id text NOT NULL REFERENCES timeline_events(id) ON DELETE CASCADE,
 type text NOT NULL CHECK (type IN ('subtitle','text','image')), sort_order integer NOT NULL CHECK(sort_order >= 0),
 media_id text REFERENCES media_assets(id),
 status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','archived')),
 CHECK ((type = 'image' AND media_id IS NOT NULL) OR (type <> 'image' AND media_id IS NULL)),
 UNIQUE(event_id,sort_order) DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE content_block_translations (
 block_id text REFERENCES content_blocks(id) ON DELETE CASCADE,
 lang text CHECK (lang IN ('cn','en')), content text, caption text, alt text, PRIMARY KEY(block_id,lang)
);
CREATE TABLE site_content (
 id text PRIMARY KEY, content_key text UNIQUE NOT NULL,
 status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','archived'))
);
CREATE TABLE site_content_translations (
 site_content_id text REFERENCES site_content(id) ON DELETE CASCADE,
 lang text CHECK (lang IN ('cn','en')), value jsonb NOT NULL, PRIMARY KEY(site_content_id,lang)
);
CREATE TABLE content_versions (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, entity_type text NOT NULL,
 entity_id text NOT NULL, action text NOT NULL, snapshot jsonb NOT NULL, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE ai_jobs (
 id text PRIMARY KEY, status text NOT NULL CHECK (status IN ('running','completed','failed')),
 source_text text NOT NULL, provider text NOT NULL, model text, error text,
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE ai_suggestions (
 id text PRIMARY KEY, job_id text NOT NULL REFERENCES ai_jobs(id), payload jsonb NOT NULL,
 warnings jsonb NOT NULL DEFAULT '[]', status text NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','accepted','rejected')),
 event_id text REFERENCES timeline_events(id), reviewed_at timestamptz, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX events_public_idx ON timeline_events(year_id,status,sort_order);
CREATE INDEX blocks_event_idx ON content_blocks(event_id,status,sort_order);
CREATE INDEX versions_entity_idx ON content_versions(entity_type,entity_id,id DESC);
