# Content backend

Node 22+, Express 5 and PostgreSQL 18. Run the root commands from the repository directory. API responses never use the old sample JSON in src/data/2016.json.

## Local startup

1. `npm run setup` installs both packages from lockfiles.
2. Use your PostgreSQL and copy `backend/.env.example` to `backend/.env`, or run `npm run db:local`. The local helper creates random credentials in ignored files and listens on 127.0.0.1:55432. Keep it running. On Windows with a Unicode path set `$env:LOCAL_POSTGRES_DIR='C:\AMPL\tmp\green-leaves-postgres'` (or another writable ASCII directory) first. This contains native binaries, DB data and logs only; the project remains in its original directory.
3. `npm run extract`, `npm run migrate`, `npm run seed`.
4. `npm run start:backend`; in another terminal `npm run start:frontend`.
5. `npm test`; `npm run build`.

Backend reads backend/.env. Frontend dev proxy points to localhost:8080. For a separate API origin set REACT_APP_CONTENT_API_URL before the frontend build (see frontend/.env.example). CORS_ORIGIN accepts comma-separated origins. Never put admin or OpenAI keys in frontend environment variables.

## Database and migration

Migration files run in one transaction under an advisory lock and are recorded in schema_migrations. The normalized tables store translation records per cn/en, stable content IDs, block order, lifecycle status, media URL/metadata, version snapshots, AI jobs and suggestions. No image binary is stored in PostgreSQL.

The AST extractor reads literal data without evaluating arbitrary JavaScript. Block IDs are deterministic hashes of the original event/type/content plus duplicate occurrence; the block index is only preserved as legacy provenance, never used to join database translations. Once imported, edit using API IDs, not the legacy arrays.

generated/seed.json and generated/consistency-report.json include all source text, media inventory, missing translations, possible numeric/date differences, unmapped translations and duplicated IDs. They are ignored generated files. Number comparisons are deliberately conservative and include Chinese numerals; flagged differences are review candidates, not established errors. No factual text is rewritten. There is no structured activity-date field in the source: dates stay in their original titles/body, and event_date is null until editorial review. Do not invent day precision.

English 2019–2025 translation records were found at the JSON root rather than under timeline. To preserve existing rendering, effective component English stays authoritative for these years. The complete original dictionaries (including misplaced English and two unmapped Chinese blocks) are archived in content_versions with entity_type=legacy. They are NOT exposed through site-content, which would circumvent timeline status controls.

Seed is insert-only per entity, under a transaction and advisory lock. It does not overwrite edits, restore deleted blocks, or republish archived records. Run it repeatedly safely. Future source changes must be reviewed/imported separately through management APIs. Both picture trees remain intact; a missing public reflection GIF was copied byte-for-byte from the existing source tree.

## Public API

- GET /api/health — 200 connected; 503 unavailable.
- GET /api/v1/timeline?lang=cn — {data: years[]}.
- GET /api/v1/timeline/:year?lang=en — {data: year}.
- GET /api/v1/events/:slug?lang=cn — {data: event}.
- GET /api/v1/site-content?lang=cn — {resources, translation}.

Default language is en; invalid language is 400. Only published years/events/blocks/site records are public. Unknown or nonpublic years/events return 404. Missing fields fall back to English with explicit translation.fallbackFields / fallbackKeys metadata. Missing English is empty, never an invented translation. The frontend displays built-in timeline only on API error; a successful empty response remains empty.

## Management API

Send `X-Admin-API-Key: <ADMIN_API_KEY>` or `Authorization: Bearer <ADMIN_API_KEY>`. Unconfigured admin returns 503; invalid credentials 401. All writes validate their bodies, reject unknown fields and return {error:{message,details?}}. Constraint conflicts return 409. Use HTTPS and keep this key server-side or in your private administration client.

- PUT /api/admin/years/:year — {year, sort_order?, icon?, status?, translations:{en:{title,summary},cn?:{title,summary}}}.
- POST /api/admin/events — {year_id,slug,event_date?,sort_order?,translations:{en:{title},cn?:{title}}}. Always draft.
- GET /api/admin/events/:id — private event and blocks, all translations.
- PUT /api/admin/events/:id — same body as create; always draft.
- POST /api/admin/events/:id/draft — {}.
- POST /api/admin/events/:id/publish — {}. Requires published parent year, English title and English text blocks.
- POST /api/admin/events/:id/archive — {}.
- POST /api/admin/events/:id/blocks — {id?,type,sort_order,media_id?,translations:{en:{content?,caption?,alt?},cn?:{...}}}.
- PUT /api/admin/events/:id/blocks/:blockId — same body.
- POST /api/admin/events/:id/blocks/reorder — {block_ids:[every stable block ID, in new order]}.
- GET /api/admin/events/:id/versions.
- POST /api/admin/events/:id/versions/:versionId/restore — {}. Always restores as draft, preserving IDs.
- GET /api/admin/versions?entity_type=year&entity_id=year-2025 (also event/site/legacy/media).
- POST /api/admin/versions/:versionId/restore — {} for year/site; restored status is draft. Legacy/media archives are read-only.
- POST /api/admin/media — {url,metadata?}; register a URL, no upload/binary storage.
- PUT /api/admin/site-content/:id — {content_key,status?,translations:{en:{value},cn?:{value}}}. Numeric timeline keys are reserved.

Draft editing preserves the previous public release in published_content. Explicit publish atomically replaces that snapshot; archive removes it. Years, site copy and page image sections follow the same rule. Each successful event write stores a version transactionally; failed writes roll back. Existing built-in fallback remains in the shipped frontend during this migration, so it can still display the historical static snapshot during outages even if an old event has since been archived in the DB.

## AI content assistant

Set OPENAI_API_KEY and OPENAI_MODEL explicitly; OPENAI_BASE_URL defaults to https://api.openai.com/v1. No paid API request is needed for tests. The interchangeable provider contract is configured(), generate(source), name and model.

Uses [Responses API Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs) with text.format json_schema, strict=true and store=false. Source text is untrusted input; no tools or publication capability are provided to the model. Word input means already extracted plain text, not a binary DOCX upload.

- POST /api/admin/ai/drafts — {source_text:"article, extracted Word text, or notes"} -> {job_id,suggestion_id,status:"pending"}. No event is created.
- GET /api/admin/ai/jobs/:id — status/error.
- GET /api/admin/ai/suggestions — latest 100.
- GET /api/admin/ai/suggestions/:id — original source, generated payload, warnings.
- POST /api/admin/ai/suggestions/:id/accept — {warnings_acknowledged:true}. Creates one draft event transactionally.
- POST /api/admin/ai/suggestions/:id/reject — {}. Creates no event.

Accept never publishes or changes existing year translations. If needed it creates a draft year carrying the suggested bilingual summary. Review existing-year summaries in the suggestion and update the year separately. Accept/reject are serialized and cannot be replayed. Unknown year or unresolved image URL blocks acceptance. Edit accepted drafts through management APIs, then publish independently. Reject and regenerate with clearer source if the year is unknown.

Warnings include model-identified conflicts/uncertainty and deterministic checks for number tokens, contact information and child/school/address references. These checks cannot prove factual correctness or detect every identifying detail. Review both languages and image captions against original evidence before accepting/publishing.

## Verification

`npm test` runs unit tests plus actual PostgreSQL integration/API tests in a new randomly named database; only that temporary test database is dropped afterward. DATABASE_URL must permit CREATE DATABASE for this suite. Never point these tests at production. The local helper is suitable for this. Tests cover extraction, references, fallback, order, draft separation, authentication, 404/503, AI review, versions and idempotent seeding.

Docker: copy root .env.example to root .env and fill unique random secrets; `docker compose up --build -d`; `docker compose exec backend npm run seed`. The backend serves the built frontend at http://localhost:8080. PostgreSQL has no host port; data uses a named volume. Root .env is for Compose; backend/.env is for local Node. Do not run `docker compose down -v` unless you intend to permanently erase the DB.

## Visual administration

Open `/admin` on the backend (or frontend dev server), sign in with ADMIN_API_KEY from backend/.env. The editor supports private activity lists, bilingual blocks and previews, media selection, transactional draft saves, separate publishing, archival and version restore. AI acceptance remains a draft-only action. No new runtime dependencies were required. See [the administration guide](ADMIN_GUIDE.md) for details and browser verification.

### OpenRouter / DeepSeek

Set these values in local `backend/.env` (Compose uses root `.env`):

```dotenv
AI_PROVIDER=openrouter
OPENROUTER_API_KEY=
OPENROUTER_MODEL=deepseek/deepseek-v4-flash
```

Enter your OpenRouter key locally and restart the backend. Never put keys in frontend variables or chat. OpenAI settings remain available by selecting `AI_PROVIDER=openai`; no automatic cross-provider fallback occurs.

OpenRouter uses Chat Completions with strict JSON Schema and `require_parameters: true`, disables reasoning for this extraction task, limits output to 12,000 tokens and selects providers with `data_collection: deny`. Local schema and factual-warning checks remain mandatory. Endpoint compatibility and availability vary; errors do not silently downgrade to plain JSON. Generated suggestions must be accepted as drafts and published separately.

Run the opt-in live test from the repository root:
```powershell
node --env-file=backend/.env backend/scripts/live-ai-smoke.js
```
It makes a paid model request using synthetic non-personal text, creates and drops its own temporary PostgreSQL database, and verifies pending suggestions and draft isolation. It never publishes content. Results are written to ignored `backend/generated/live-ai-report.json`. Requires CREATE DATABASE permission.

References: https://openrouter.ai/docs/guides/features/structured-outputs

Uploads: see ADMIN_GUIDE.md. Back up backend/uploads (or the media_uploads Compose volume) together with PostgreSQL.

Migration 002 adds published snapshots, editable page images and private assistant conversations/proposals. See ADMIN_GUIDE.md for workflows and new APIs. Run migrate then seed to backfill page assets and newly localized copy without overwriting edits.


## 官网问答助手

首页聊天窗口调用 POST /api/v1/chat，请求包含 message、lang 和最多 4 条历史问题。只检索已发布页面及活动，AI 仅选择原文片段 ID；返回文本和站内链接由服务器生成。缺少依据则拒答，不访问管理草稿、不执行写操作、不收集报名。问题与少量官网原文发送至现有 AI provider；本应用不保存聊天记录。

运行迁移后启用。PUBLIC_CHAT_ENABLED=false 可关闭；PUBLIC_CHAT_DAILY_LIMIT=50 默认限制全站每天 UTC 50 次模型尝试，数据库原子计数跨重启保留，失败调用也计数。另有每来源连接 IP 每分钟 6 次、每进程同时 2 次上限；不信任转发头，因此反向代理部署时访客可能共享分钟额度。额度是调用次数，不是美元硬预算；请另在 AI 提供商设置消费限制。最多 36 个候选原文片段、输出上限 300 tokens，没有向量数据库费用。每次重新读取已发布内容并在返回前复核，无过期内容缓存。
