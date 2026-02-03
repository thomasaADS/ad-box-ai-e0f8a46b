-- ============================================================
-- Agent System Database Schema
-- Created: 2025-02-03
-- Purpose: AI agents registry, prompt versioning, run logging, memory
-- ============================================================

-- ============================================================
-- ENUMS
-- ============================================================

-- Agent status enum
CREATE TYPE agent_status AS ENUM ('active', 'inactive', 'deprecated');

-- Agent run status enum
CREATE TYPE agent_run_status AS ENUM ('pending', 'running', 'completed', 'failed', 'timeout');

-- Memory role enum
CREATE TYPE memory_role AS ENUM ('user', 'assistant', 'system');

-- ============================================================
-- TABLE: ai_agents
-- Registry of all AI agents with their configuration
-- ============================================================

CREATE TABLE IF NOT EXISTS ai_agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Identity
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  name_en TEXT,
  nickname TEXT,

  -- Description
  description TEXT NOT NULL,
  role TEXT NOT NULL,
  personality TEXT,

  -- Visual
  avatar_id TEXT, -- References avatar component (maya, adam, etc.)
  gradient_from TEXT DEFAULT '#7c3aed',
  gradient_to TEXT DEFAULT '#2563eb',
  icon TEXT DEFAULT 'Bot',

  -- Capabilities
  specialties TEXT[] DEFAULT '{}',
  sample_questions TEXT[] DEFAULT '{}',

  -- Config
  status agent_status DEFAULT 'active',
  is_public BOOLEAN DEFAULT true,
  requires_auth BOOLEAN DEFAULT false,
  max_tokens INTEGER DEFAULT 2048,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Indexes
CREATE INDEX idx_ai_agents_slug ON ai_agents(slug);
CREATE INDEX idx_ai_agents_status ON ai_agents(status);

-- ============================================================
-- TABLE: prompt_versions
-- Versioned prompts for each agent, enabling A/B testing and rollback
-- ============================================================

CREATE TABLE IF NOT EXISTS prompt_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Relationships
  agent_id UUID NOT NULL REFERENCES ai_agents(id) ON DELETE CASCADE,

  -- Version info
  version INTEGER NOT NULL DEFAULT 1,
  version_tag TEXT, -- e.g., 'v1.0.0', 'production', 'experiment-a'

  -- Prompt config
  system_prompt TEXT NOT NULL,
  model TEXT DEFAULT 'google/gemini-2.5-flash',
  temperature DECIMAL(3,2) DEFAULT 0.7 CHECK (temperature >= 0 AND temperature <= 2),
  top_p DECIMAL(3,2) DEFAULT 0.95,
  max_output_tokens INTEGER DEFAULT 2048,

  -- Output validation
  output_schema JSONB, -- Zod-compatible JSON schema for validation

  -- Status
  is_active BOOLEAN DEFAULT false,

  -- Metadata
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),

  -- Ensure unique active version per agent
  CONSTRAINT unique_agent_version UNIQUE (agent_id, version)
);

-- Indexes
CREATE INDEX idx_prompt_versions_agent ON prompt_versions(agent_id);
CREATE INDEX idx_prompt_versions_active ON prompt_versions(agent_id, is_active) WHERE is_active = true;

-- Function to ensure only one active prompt per agent
CREATE OR REPLACE FUNCTION ensure_single_active_prompt()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_active = true THEN
    UPDATE prompt_versions
    SET is_active = false
    WHERE agent_id = NEW.agent_id
      AND id != NEW.id
      AND is_active = true;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_single_active_prompt
  BEFORE INSERT OR UPDATE ON prompt_versions
  FOR EACH ROW
  EXECUTE FUNCTION ensure_single_active_prompt();

-- ============================================================
-- TABLE: agent_runs
-- Logs every AI agent execution for analytics and debugging
-- ============================================================

CREATE TABLE IF NOT EXISTS agent_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Relationships
  agent_id UUID NOT NULL REFERENCES ai_agents(id) ON DELETE SET NULL,
  prompt_version_id UUID REFERENCES prompt_versions(id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT, -- For grouping conversations

  -- Input/Output
  input_messages JSONB NOT NULL DEFAULT '[]',
  input_context JSONB, -- Additional context (brief data, campaign info, etc.)
  output_raw TEXT, -- Raw AI response
  output_parsed JSONB, -- Parsed and validated output

  -- Execution metrics
  status agent_run_status DEFAULT 'pending',
  error_message TEXT,
  error_code TEXT,

  -- Performance
  latency_ms INTEGER,
  tokens_input INTEGER,
  tokens_output INTEGER,
  tokens_total INTEGER,
  estimated_cost_usd DECIMAL(10,6),

  -- Metadata
  model_used TEXT,
  temperature_used DECIMAL(3,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,

  -- Client info
  client_ip INET,
  user_agent TEXT
);

-- Indexes for analytics queries
CREATE INDEX idx_agent_runs_agent ON agent_runs(agent_id);
CREATE INDEX idx_agent_runs_user ON agent_runs(user_id);
CREATE INDEX idx_agent_runs_session ON agent_runs(session_id);
CREATE INDEX idx_agent_runs_status ON agent_runs(status);
CREATE INDEX idx_agent_runs_created ON agent_runs(created_at DESC);

-- ============================================================
-- TABLE: agent_memories
-- Persistent conversation memory per user/session
-- ============================================================

CREATE TABLE IF NOT EXISTS agent_memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Relationships
  agent_id UUID NOT NULL REFERENCES ai_agents(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,

  -- Message
  role memory_role NOT NULL,
  content TEXT NOT NULL,

  -- Metadata
  metadata JSONB DEFAULT '{}',
  token_count INTEGER,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Composite index for efficient retrieval
  CONSTRAINT unique_memory_entry UNIQUE (agent_id, user_id, session_id, created_at)
);

-- Indexes
CREATE INDEX idx_agent_memories_agent_user ON agent_memories(agent_id, user_id);
CREATE INDEX idx_agent_memories_session ON agent_memories(session_id);
CREATE INDEX idx_agent_memories_created ON agent_memories(created_at DESC);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE ai_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompt_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_memories ENABLE ROW LEVEL SECURITY;

-- ai_agents: Public read for active agents, admin write
CREATE POLICY "Anyone can read active agents"
  ON ai_agents FOR SELECT
  USING (status = 'active' AND is_public = true);

CREATE POLICY "Authenticated users can read all public agents"
  ON ai_agents FOR SELECT
  TO authenticated
  USING (is_public = true);

-- prompt_versions: Only active prompts visible, admin write
CREATE POLICY "Anyone can read active prompts"
  ON prompt_versions FOR SELECT
  USING (is_active = true);

-- agent_runs: Users can see own runs, insert own runs
CREATE POLICY "Users can view own runs"
  ON agent_runs FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create runs"
  ON agent_runs FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Anonymous can create runs with null user"
  ON agent_runs FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL);

CREATE POLICY "Users can update own pending runs"
  ON agent_runs FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid() AND status IN ('pending', 'running'));

-- agent_memories: Users can CRUD own memories
CREATE POLICY "Users can view own memories"
  ON agent_memories FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own memories"
  ON agent_memories FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own memories"
  ON agent_memories FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Allow anonymous to read/write memories with session_id only
CREATE POLICY "Anonymous can read memories by session"
  ON agent_memories FOR SELECT
  TO anon
  USING (user_id IS NULL);

CREATE POLICY "Anonymous can insert memories"
  ON agent_memories FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL);

-- ============================================================
-- VIEWS
-- ============================================================

-- View: Agent with active prompt (for easy querying)
CREATE OR REPLACE VIEW agent_with_prompt AS
SELECT
  a.*,
  p.id as prompt_id,
  p.version as prompt_version,
  p.system_prompt,
  p.model,
  p.temperature,
  p.output_schema
FROM ai_agents a
LEFT JOIN prompt_versions p ON a.id = p.agent_id AND p.is_active = true
WHERE a.status = 'active';

-- View: Agent run stats (for analytics)
CREATE OR REPLACE VIEW agent_run_stats AS
SELECT
  agent_id,
  DATE(created_at) as run_date,
  COUNT(*) as total_runs,
  COUNT(*) FILTER (WHERE status = 'completed') as successful_runs,
  COUNT(*) FILTER (WHERE status = 'failed') as failed_runs,
  AVG(latency_ms) as avg_latency_ms,
  SUM(tokens_total) as total_tokens,
  SUM(estimated_cost_usd) as total_cost_usd
FROM agent_runs
GROUP BY agent_id, DATE(created_at);

-- ============================================================
-- FUNCTIONS
-- ============================================================

-- Function to get or create session
CREATE OR REPLACE FUNCTION get_or_create_session(
  p_agent_id UUID,
  p_user_id UUID DEFAULT NULL
)
RETURNS TEXT AS $$
DECLARE
  v_session_id TEXT;
BEGIN
  -- Generate a new session ID
  v_session_id := encode(gen_random_bytes(16), 'hex');
  RETURN v_session_id;
END;
$$ LANGUAGE plpgsql;

-- Function to clean up old memories (retention policy)
CREATE OR REPLACE FUNCTION cleanup_old_memories(retention_days INTEGER DEFAULT 30)
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM agent_memories
  WHERE created_at < NOW() - (retention_days || ' days')::INTERVAL;

  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- SEED DATA: Initial 10 agents from current hardcoded data
-- ============================================================

INSERT INTO ai_agents (slug, name, name_en, nickname, role, description, personality, avatar_id, gradient_from, gradient_to, icon, specialties, sample_questions, status) VALUES
('maya', 'מאיה', 'Maya', 'מלכת החיפוש', 'מומחית SEO וצמיחה אורגנית', 'מומחית SEO מנוסה שעוזרת לך לכבוש את הדירוג בגוגל, לנתח מילות מפתח, לבנות אסטרטגיית תוכן אורגני ולמקסם תנועה.', 'אני מאיה, מומחית SEO עם ניסיון רב בשוק הישראלי. אני חיה ונושמת קידום אורגני - ממחקר מילות מפתח, דרך אופטימיזציה טכנית ועד בניית תוכן שמושך תנועה. תמיד מעודכנת באלגוריתמים האחרונים של גוגל.', 'maya', '#059669', '#10b981', 'Search', ARRAY['מחקר מילות מפתח', 'אופטימיזציית On-Page', 'בניית קישורים', 'SEO טכני', 'תוכן SEO', 'SEO מקומי'], ARRAY['איך אני משפר את ה-SEO של האתר שלי?', 'עזרי לי למצוא מילות מפתח לעסק שלי', 'מה זה SEO טכני ולמה זה חשוב?', 'איך בונים אסטרטגיית קישורים?'], 'active'),
('adam', 'אדם', 'Adam', 'קוסם הקמפיינים', 'מומחה PPC ומדיה ממומנת', 'מומחה בקמפיינים ממומנים בגוגל, פייסבוק, אינסטגרם וטיקטוק. עוזר לך למקסם ROI ולהוריד עלויות.', 'אני אדם, מומחה PPC שחי ונושם פרסום ממומן. מתמחה בגוגל, פייסבוק וכל הפלטפורמות. אני עוזר לעסקים למקסם ROI, לבנות קמפיינים ממוקדים ולהגיע לקהל הנכון במחיר הנכון.', 'adam', '#2563eb', '#7c3aed', 'Target', ARRAY['Google Ads', 'Facebook Ads', 'TikTok Ads', 'אופטימיזציית CPC', 'טרגוט קהלים', 'A/B Testing'], ARRAY['איך אני מגדיר קמפיין גוגל?', 'מה התקציב המומלץ לפרסום בפייסבוק?', 'איך אני מוריד את עלות הקליק?', 'עזור לי לבנות קמפיין לידים'], 'active'),
('noa', 'נועה', 'Noa', 'מלכת הקופי', 'קופירייטרית וסטרטגית תוכן', 'מומחית ביצירת קופי שמוכר, אסטרטגיית תוכן, פוסטים לרשתות חברתיות וטקסטים שמושכים לקוחות.', 'אני נועה, קופירייטרית שמתמחית בתוכן שמוכר ומרגש. מכל משפט אני יוצרת חוויה - מקופי למודעות, דרך פוסטים לסושיאל ועד סטוריטלינג שמייצר מעורבות אמיתית.', 'noa', '#ec4899', '#f97316', 'PenTool', ARRAY['קופירייטינג', 'שיווק תוכן', 'כותרות ממירות', 'בלוג עסקי', 'ניוזלטר', 'סטוריטלינג'], ARRAY['כתבי לי פוסט לפייסבוק על העסק שלי', 'איך בונים אסטרטגיית תוכן?', 'עזרי לי לכתוב כותרות מושכות', 'תני לי רעיונות לפוסטים לאינסטגרם'], 'active'),
('dan', 'דן', 'Dan', 'חכם הנתונים', 'מומחה אנליטיקס וBI', 'מנתח נתוני קמפיינים, מדדי ביצוע, המרות ו-ROI. עוזר לקבל החלטות מבוססות נתונים.', 'אני דן, חכם הנתונים של הצוות. אני הופך מספרים לתובנות ותובנות להחלטות חכמות. Google Analytics, דשבורדים, A/B testing - הכל עובר דרכי. אני רואה את הסיפור שמסתתר מאחורי כל מספר.', 'dan', '#06b6d4', '#2563eb', 'BarChart3', ARRAY['Google Analytics', 'דוחות ביצוע', 'ניתוח המרות', 'A/B Testing', 'דשבורדים', 'תחזיות'], ARRAY['איך מנתחים ביצועי קמפיין?', 'מה המדדים החשובים לעקוב אחריהם?', 'עזור לי להבין דוח Google Analytics', 'איך משפרים שיעור המרה?'], 'active'),
('lior', 'ליאור', 'Lior', 'אמן הזהות', 'מומחה מיתוג וזהות חזותית', 'מומחה במיתוג, זהות חזותית, פלטת צבעים, טיפוגרפיה ובניית מותג חזק וייחודי.', 'אני ליאור, אמן הזהות. אני מתמחה בבניית מותגים שנחרטים בזיכרון - מלוגו ופלטת צבעים ועד טון דיבור וחווית מותג שלמה. כל עסק הוא יצירת אומנות שמחכה שייתנו לה צורה.', 'lior', '#7c3aed', '#ec4899', 'Palette', ARRAY['זהות מותג', 'עיצוב לוגו', 'פלטת צבעים', 'טון דיבור', 'חווית מותג', 'מיצוב'], ARRAY['איך בונים זהות מותגית?', 'עזור לי לבחור צבעים למותג', 'מה עושה לוגו טוב?', 'איך מגדירים טון דיבור למותג?'], 'active'),
('roni', 'רוני', 'Roni', 'אדריכל הצמיחה', 'יועץ אסטרטגיה דיגיטלית', 'יועץ אסטרטגי שבונה תוכנית שיווק מקיפה, מתכנן תקציבים ומגדיר מטרות עסקיות.', 'אני רוני, אדריכל הצמיחה. אני רואה את התמונה הגדולה - מניתוח שוק ומתחרים, דרך תכנון תקציבים חכם ועד בניית אסטרטגיה שמביאה תוצאות. כל עסק צריך תוכנית, ואני בונה אותה.', 'roni', '#f59e0b', '#dc2626', 'Brain', ARRAY['אסטרטגיה דיגיטלית', 'תכנון תקציב', 'הגדרת KPIs', 'ניתוח שוק', 'תוכנית שיווק', 'צמיחה'], ARRAY['עזור לי לבנות תוכנית שיווק', 'מה התקציב הנכון לעסק שלי?', 'איך מגדירים KPIs?', 'תן לי אסטרטגיה לצמיחה'], 'active'),
('yael', 'יעל', 'Yael', 'כוכבת הסושיאל', 'מנהלת סושיאל מדיה', 'מומחית ברשתות חברתיות - אסטרטגיית תוכן, לוח פרסום, מעורבות קהל, טרנדים וויראליות.', 'אני יעל, כוכבת הסושיאל. אני יודעת בדיוק מה עובד ברשתות - מאינסטגרם וטיקטוק ועד לינקדאין ופייסבוק. אני בונה אסטרטגיות תוכן שמייצרות מעורבות אמיתית וצמיחה אורגנית.', 'yael', '#14b8a6', '#06b6d4', 'Share2', ARRAY['אסטרטגיית סושיאל', 'לוח תוכן', 'Instagram Reels', 'TikTok', 'קהילות', 'ויראליות'], ARRAY['איך בונים נוכחות חזקה באינסטגרם?', 'עזרי לי ליצור לוח תוכן שבועי', 'מה הטרנדים החמים בטיקטוק?', 'איך מגדילים מעורבות בפוסטים?'], 'active'),
('omer', 'עומר', 'Omer', 'יוצר הווידאו', 'מומחה וידאו וקריאייטיב', 'מומחה בייצור סרטוני פרסום, Reels, סטוריז ותוכן וידאו שמושך תשומת לב ומוכר.', 'אני עומר, יוצר הווידאו של הצוות. אני מתמחה בסרטוני פרסום שעוצרים את האגודל - ממודעות וידאו לפייסבוק ויוטיוב, דרך Reels וסטוריז ועד UGC. אני יודע בדיוק מה עובד בכל פלטפורמה.', 'omer', '#4b5563', '#db2777', 'Video', ARRAY['סרטוני מודעות', 'YouTube Ads', 'Reels', 'סטוריז', 'UGC', 'סקריפטים'], ARRAY['איך יוצרים סרטון מודעה אפקטיבי?', 'מה האורך האידיאלי לסרטון פרסומי?', 'עזור לי לכתוב סקריפט לסרטון', 'איך יוצרים Reels שמקבלים צפיות?'], 'active'),
('shira', 'שירה', 'Shira', 'מלכת המיילים', 'מומחית Email Marketing', 'מומחית באוטומציות שיווק, ניוזלטרים, סדרות טיפוח לידים וקמפיינים מבוססי מייל.', 'אני שירה, מלכת המיילים. אימייל מרקטינג זה לא סתם לשלוח מיילים - זה אומנות. אני מתמחה באוטומציות שיווק, ניוזלטרים שפותחים, סדרות טיפוח ושיווק מבוסס דאטה שמייצר מכירות.', 'shira', '#6366f1', '#7c3aed', 'Mail', ARRAY['אוטומציות מייל', 'ניוזלטרים', 'טיפוח לידים', 'סגמנטציה', 'A/B Testing מיילים', 'כותרות מיילים'], ARRAY['איך בונים רשימת תפוצה?', 'עזרי לי לכתוב ניוזלטר ממיר', 'מה שיעור פתיחה טוב למיילים?', 'איך בונים אוטומציית טיפוח לידים?'], 'active'),
('eyal', 'אייל', 'Eyal', 'מאסטר ההמרות', 'מומחה CRO וחווית משתמש', 'מומחה באופטימיזציית שיעורי המרה, חווית משתמש, A/B Testing ושיפור דפי נחיתה.', 'אני אייל, מאסטר ההמרות. כל אחוז של שיפור בשיעור ההמרה שווה כסף רב. אני מתמחה ב-CRO, A/B testing, מפות חום ופסיכולוגיית שיווק - ועוזר לך להפוך יותר מבקרים ללקוחות.', 'eyal', '#059669', '#0891b2', 'TrendingUp', ARRAY['CRO', 'A/B Testing', 'חווית משתמש', 'מפות חום', 'אופטימיזציית טפסים', 'פסיכולוגיית שיווק'], ARRAY['איך מעלים את שיעור ההמרה?', 'עזור לי לשפר את דף הנחיתה', 'מה A/B Testing ואיך עושים את זה?', 'איך משתמשים במפות חום?'], 'active')
ON CONFLICT (slug) DO NOTHING;

-- Insert initial prompt versions for each agent
INSERT INTO prompt_versions (agent_id, version, version_tag, system_prompt, model, temperature, is_active)
SELECT
  a.id,
  1,
  'v1.0.0',
  format(
    E'אתה %s (%s), %s בצוות הדיגיטלי של AdSync - פלטפורמת AI לפרסום דיגיטלי.\n\nהכינוי שלך: "%s".\n\n%s\n\nההתמחויות שלך: %s.\n\nהנחיות חשובות:\n- ענה תמיד בעברית\n- היה מקצועי אבל ידידותי ונגיש\n- תן תשובות ממוקדות בתחום ההתמחות שלך\n- אם נשאלת שאלה מחוץ לתחום שלך, הפנה לסוכן המתאים בצוות\n- השתמש בפורמט markdown לתשובות מסודרות\n- תן דוגמאות מעשיות מהשוק הישראלי\n- היה תמציתי ולעניין\n- שמור על הקשר השיחה',
    a.name,
    a.name_en,
    a.role,
    a.nickname,
    a.personality,
    array_to_string(a.specialties, ', ')
  ),
  'google/gemini-2.5-flash',
  0.7,
  true
FROM ai_agents a
WHERE a.status = 'active';

-- ============================================================
-- COMMENTS
-- ============================================================

COMMENT ON TABLE ai_agents IS 'Registry of AI agents with their configuration and visual settings';
COMMENT ON TABLE prompt_versions IS 'Versioned system prompts for each agent, enabling A/B testing and rollback';
COMMENT ON TABLE agent_runs IS 'Execution log for every AI agent run, for analytics and debugging';
COMMENT ON TABLE agent_memories IS 'Persistent conversation memory per user/session';
COMMENT ON VIEW agent_with_prompt IS 'Convenience view joining agents with their active prompt';
COMMENT ON VIEW agent_run_stats IS 'Aggregated daily stats per agent for analytics dashboards';
