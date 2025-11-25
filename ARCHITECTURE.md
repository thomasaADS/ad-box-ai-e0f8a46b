# 🏗️ AdSync Architecture Documentation

## System Overview

AdSync is a full-stack SaaS application that uses AI to generate multi-platform advertising campaigns. The system follows a modern serverless architecture with a React frontend and Supabase backend.

---

## 📐 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  React 18 + TypeScript + Vite                        │  │
│  │  ├── Pages (Brief, Generate, Dashboard)             │  │
│  │  ├── Components (UI, Business Logic)                │  │
│  │  ├── Contexts (Auth, Language)                      │  │
│  │  └── Lib (API, Utils, Validation)                   │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓ ↑                                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  State Management                                     │  │
│  │  ├── React Query (Server State)                     │  │
│  │  ├── Context API (Global State)                     │  │
│  │  └── SessionStorage (Temporary Data)                │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                           ↓ ↑
                    HTTPS / REST API
                           ↓ ↑
┌─────────────────────────────────────────────────────────────┐
│                    Supabase Backend                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  PostgreSQL Database (with RLS)                       │  │
│  │  ├── campaigns                                       │  │
│  │  ├── ad_creatives                                    │  │
│  │  ├── profiles                                        │  │
│  │  └── usage_logs                                      │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Authentication (Supabase Auth)                       │  │
│  │  ├── Email/Password                                  │  │
│  │  ├── OAuth (Google, Facebook - future)              │  │
│  │  └── JWT Tokens                                      │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Storage (Supabase Storage)                           │  │
│  │  └── ad-images/ (User uploaded images)              │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Edge Functions (Serverless)                          │  │
│  │  ├── /chat (AI assistant)                           │  │
│  │  ├── /generate-campaign (future)                    │  │
│  │  ├── /generate-image (future)                       │  │
│  │  └── /publish-ad (future)                           │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                           ↓ ↑
                    External APIs
                           ↓ ↑
┌─────────────────────────────────────────────────────────────┐
│                    External Services                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   OpenAI     │  │  Leonardo AI │  │   Meta API   │     │
│  │   GPT-4      │  │   Images     │  │   Ads        │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Google Ads  │  │   Sentry     │  │  Analytics   │     │
│  │   API        │  │   Errors     │  │   GA/Mixpanel│     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow

### 1. Campaign Creation Flow

```
User → Brief Form → Validation (Zod) → Supabase (campaigns table)
                                      ↓
                             SessionStorage (temporary)
                                      ↓
Generate Page ← OpenAI API ← Edge Function ← Credits Check
      ↓
Store Variants → Supabase (ad_creatives table)
      ↓
Display to User → Copy/Export/Publish
```

### 2. Authentication Flow

```
Login Form → Supabase Auth → JWT Token → LocalStorage
                                      ↓
                              AuthContext (React)
                                      ↓
                         Protected Routes (ProtectedRoute)
                                      ↓
                              User Profile Data
```

### 3. Credit System Flow

```
User Action → Check Credits (credits.ts) → Supabase RPC
                     ↓
          Yes (sufficient) → Deduct Credits → Log Usage
                     ↓                              ↓
             Perform Action                  usage_logs table
                     ↓
          No (insufficient) → Show Upgrade Prompt
```

---

## 🗄️ Database Schema

### Tables

#### `campaigns`
```sql
id              uuid PRIMARY KEY
user_id         uuid REFERENCES auth.users(id)
brand_name      text NOT NULL
website         text
industry        text
city            text
offer           text
budget          numeric
tone            text
objective       text
languages       text[]
platforms       text[]
created_at      timestamptz
updated_at      timestamptz
```

#### `ad_creatives`
```sql
id                  uuid PRIMARY KEY
campaign_id         uuid REFERENCES campaigns(id)
platform            text NOT NULL
primary_text        text
headline            text NOT NULL
description         text
cta                 text
final_url           text NOT NULL
utm_params          jsonb
audience_config     jsonb
image_urls          jsonb
status              text DEFAULT 'draft'
performance_metrics jsonb
external_id         text (platform ad ID)
created_at          timestamptz
updated_at          timestamptz
```

#### `profiles`
```sql
id                  uuid PRIMARY KEY
user_id             uuid REFERENCES auth.users(id)
full_name           text
avatar_url          text
company_name        text
phone               text
credits_remaining   integer DEFAULT 10
subscription_tier   text DEFAULT 'free'
created_at          timestamptz
updated_at          timestamptz
```

#### `usage_logs`
```sql
id              uuid PRIMARY KEY
user_id         uuid REFERENCES auth.users(id)
action_type     text NOT NULL
credits_used    integer DEFAULT 1
metadata        jsonb
created_at      timestamptz
```

### Relationships

```
auth.users (1) ──→ (n) profiles
auth.users (1) ──→ (n) campaigns
auth.users (1) ──→ (n) usage_logs
campaigns  (1) ──→ (n) ad_creatives
```

### Indexes

```sql
-- Performance indexes
CREATE INDEX idx_campaigns_user_id ON campaigns(user_id);
CREATE INDEX idx_ad_creatives_campaign_id ON ad_creatives(campaign_id);
CREATE INDEX idx_ad_creatives_platform ON ad_creatives(platform);
CREATE INDEX idx_usage_logs_user_id ON usage_logs(user_id);
CREATE INDEX idx_usage_logs_created_at ON usage_logs(created_at DESC);
```

---

## 🔐 Security Architecture

### Row Level Security (RLS)

All tables have RLS enabled with policies:

```sql
-- Users can only access their own data
CREATE POLICY "users_own_data" ON campaigns
  FOR ALL USING (auth.uid() = user_id);

-- Ad creatives inherit campaign permissions
CREATE POLICY "users_own_creatives" ON ad_creatives
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM campaigns
      WHERE campaigns.id = ad_creatives.campaign_id
      AND campaigns.user_id = auth.uid()
    )
  );
```

### Authentication

- **JWT Tokens**: Stored in localStorage
- **Auto-refresh**: Handled by Supabase client
- **Session persistence**: Enabled by default
- **Protected routes**: ProtectedRoute component checks auth state

### API Key Management

**Current (Development):**
- Client-side API calls (NOT RECOMMENDED for production)
- Keys in `.env.local`

**Recommended (Production):**
```typescript
// Move to Supabase Edge Function
// supabase/functions/generate-campaign/index.ts

serve(async (req) => {
  // API keys are server-side environment variables
  const openaiKey = Deno.env.get('OPENAI_API_KEY');
  
  // Validate user authentication
  const authHeader = req.headers.get('Authorization');
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: { user } } = await supabase.auth.getUser(authHeader);
  
  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  // Perform action with secure API key
  const result = await callOpenAI(openaiKey, ...);
  
  return new Response(JSON.stringify(result));
});
```

---

## 🎨 Frontend Architecture

### Component Structure

```
src/
├── components/
│   ├── ui/                   # shadcn/ui primitives
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── ErrorBoundary.tsx    # Error handling
│   ├── VariantCard.tsx      # Business component
│   ├── TopNav.tsx           # Layout component
│   └── ...
├── pages/                    # Route pages
│   ├── Index.tsx            # Landing page
│   ├── Brief.tsx            # Campaign brief form
│   ├── Generate.tsx         # Variant generation
│   └── Dashboard.tsx        # User dashboard
├── contexts/                 # Global state
│   ├── AuthContext.tsx      # User authentication
│   └── LanguageContext.tsx  # i18n
├── lib/                      # Utilities
│   ├── api.ts               # API calls
│   ├── schemas.ts           # Zod validation
│   ├── errorHandling.ts     # Error utilities
│   ├── credits.ts           # Credit system
│   └── utils.ts             # General utilities
└── hooks/                    # Custom hooks
    ├── useTranslation.ts    # i18n hook
    └── use-toast.ts         # Toast notifications
```

### State Management Strategy

1. **Server State**: React Query
   - API data caching
   - Automatic refetching
   - Optimistic updates

2. **Global State**: Context API
   - Authentication
   - Language/locale
   - Theme (future)

3. **Local State**: useState
   - Form inputs
   - UI toggles
   - Component-specific data

4. **Temporary State**: SessionStorage
   - Form data between pages
   - Wizard/multi-step flows

### Design Patterns

#### Error Boundary Pattern
```tsx
<ErrorBoundary fallback={<ErrorPage />}>
  <YourComponent />
</ErrorBoundary>
```

#### Protected Route Pattern
```tsx
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

#### Custom Hook Pattern
```tsx
const { user, loading, signOut } = useAuth();
const { t } = useTranslation();
```

#### Validation Pattern
```tsx
const form = useForm({
  resolver: zodResolver(briefSchema),
  defaultValues: { ... }
});
```

---

## 🚀 Performance Optimizations

### Current Optimizations

1. **Code Splitting**: Lazy loading (planned)
2. **Image Optimization**: WebP format (planned)
3. **Caching**: React Query (implemented)
4. **Minification**: Vite production build (automatic)
5. **Tree Shaking**: ES modules (automatic)

### Planned Optimizations

1. **Virtual Scrolling**: For large lists
2. **Service Worker**: For offline support
3. **CDN**: For static assets
4. **Database Indexes**: Already added
5. **Query Optimization**: Use Supabase views

### Performance Targets

- **Lighthouse Score**: > 90
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Bundle Size**: < 500KB (gzipped)

---

## 🔄 API Integration Architecture

### Current (Mock)

```typescript
// src/lib/api.ts
export async function generateCampaign(data) {
  // Mock delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Return mock data
  return { variants: [...] };
}
```

### Future (Real)

```typescript
// supabase/functions/generate-campaign/index.ts
export async function generateCampaign(data) {
  // Call OpenAI API
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    headers: {
      'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
    },
    method: 'POST',
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }]
    })
  });
  
  const result = await response.json();
  
  // Store in database
  await supabase.from('ad_creatives').insert(variants);
  
  return result;
}
```

---

## 📦 Deployment Architecture

### Development

```
Local Machine
├── Vite Dev Server (port 8080)
├── Local Supabase (Docker)
└── .env.local (local config)
```

### Production

```
┌─────────────────────────────────────┐
│  Vercel/Netlify (Frontend)          │
│  ├── Static files (CDN)             │
│  ├── Serverless functions           │
│  └── Environment variables          │
└─────────────────────────────────────┘
              ↓ ↑
┌─────────────────────────────────────┐
│  Supabase (Backend)                  │
│  ├── PostgreSQL (managed)           │
│  ├── Auth (managed)                  │
│  ├── Storage (S3-compatible)        │
│  └── Edge Functions (Deno)          │
└─────────────────────────────────────┘
```

### CI/CD Pipeline (Planned)

```
GitHub Push → GitHub Actions → Tests → Build → Deploy
                                 ↓
                         Lint + Type Check
                                 ↓
                         E2E Tests (Playwright)
                                 ↓
                         Deploy to Staging
                                 ↓
                         Manual Approval
                                 ↓
                         Deploy to Production
```

---

## 🔍 Monitoring & Observability

### Logging

```typescript
// Structured logging
import { logError } from '@/lib/errorHandling';

try {
  // operation
} catch (error) {
  logError(error, {
    context: 'campaign_generation',
    userId: user.id,
    campaignId: campaign.id
  });
}
```

### Error Tracking

**Planned Integration: Sentry**

```typescript
// src/main.tsx
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.VITE_APP_ENV,
  tracesSampleRate: 1.0,
});
```

### Analytics

**Planned Integration: Mixpanel / GA4**

```typescript
// Track user events
trackEvent('campaign_created', {
  platform: 'meta',
  variants: 3,
  credits_used: 1
});
```

### Performance Monitoring

**Planned Integration: Vercel Analytics**

```typescript
// Automatic performance tracking
import { Analytics } from '@vercel/analytics/react';

<App>
  <Analytics />
</App>
```

---

## 🧪 Testing Strategy

### Unit Tests (Vitest)
- Utility functions
- Custom hooks
- Component logic

### Integration Tests (React Testing Library)
- Component interactions
- Form submissions
- API mocking

### E2E Tests (Playwright)
- User flows
- Critical paths
- Cross-browser testing

### Test Coverage Goals
- Utilities: 90%+
- Components: 70%+
- Pages: 60%+
- Overall: 75%+

---

## 📊 Scalability Considerations

### Database Scaling
- **Read Replicas**: For analytics queries
- **Connection Pooling**: PgBouncer (Supabase built-in)
- **Partitioning**: For usage_logs table (by date)
- **Indexes**: Already optimized

### Application Scaling
- **Serverless**: Auto-scaling edge functions
- **CDN**: Static asset distribution
- **Caching**: Redis (future, if needed)
- **Queue**: BullMQ for background jobs (future)

### Rate Limiting
- **User Credits**: Already implemented
- **API Rate Limits**: Per endpoint (future)
- **IP Rate Limiting**: Cloudflare/Vercel (future)

---

## 🔮 Future Architecture Enhancements

1. **Microservices**: Separate services for image gen, publishing
2. **Event-Driven**: Pub/sub for async operations
3. **GraphQL**: Replace REST with GraphQL (Hasura)
4. **Real-time**: WebSockets for live updates
5. **Multi-tenancy**: Organization/team support
6. **API Gateway**: Kong or AWS API Gateway
7. **Data Warehouse**: For advanced analytics

---

## 📝 Architecture Decision Records (ADRs)

### ADR-001: Use Supabase for Backend
**Decision**: Use Supabase instead of building custom backend
**Reasoning**: Faster development, managed infrastructure, built-in auth
**Alternatives**: Firebase, AWS Amplify, custom Node.js
**Status**: Accepted

### ADR-002: Use React Query for Server State
**Decision**: Use React Query instead of Redux
**Reasoning**: Better caching, less boilerplate, automatic refetching
**Alternatives**: Redux, Zustand, SWR
**Status**: Accepted

### ADR-003: Use Zod for Validation
**Decision**: Use Zod for runtime validation and TypeScript integration
**Reasoning**: Type-safe, great DX, integrates with React Hook Form
**Alternatives**: Yup, Joi, class-validator
**Status**: Accepted

---

*Last Updated: 2025-11-25*
*This document should be updated as the architecture evolves.*

