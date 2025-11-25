# Environment Variables Setup Guide

This document explains how to set up environment variables for the AdSync project.

## Quick Setup

1. Create a `.env.local` file in the project root:

```bash
cp ENV_SETUP.md .env.local
# Then edit .env.local with your actual values
```

2. Add your configuration values (see sections below)

3. Restart your development server:

```bash
npm run dev
```

---

## Required Environment Variables

### Supabase Configuration

Get these from your [Supabase Dashboard](https://app.supabase.com)

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key_here
```

**How to find:**
1. Go to Supabase Dashboard → Your Project
2. Click "Settings" → "API"
3. Copy "Project URL" and "anon public" key

---

### OpenAI Configuration (for AI Copy Generation)

Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)

```env
VITE_OPENAI_API_KEY=sk-your-openai-api-key-here
```

**Note:** For production, this should be moved to Supabase Edge Functions to keep it secure.

**How to get:**
1. Go to [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Click "Create new secret key"
3. Copy the key (you won't see it again!)

**Pricing:** ~$0.002 per campaign generation (GPT-4)

---

### Leonardo AI Configuration (for Image Generation)

Get your API key from [Leonardo.ai](https://leonardo.ai)

```env
VITE_LEONARDO_API_KEY=your-leonardo-api-key-here
```

**How to get:**
1. Sign up at [Leonardo.ai](https://leonardo.ai)
2. Go to Settings → API Access
3. Generate an API key

**Alternative:** You can use DALL-E, Midjourney API, or Stable Diffusion instead.

---

### Meta Marketing API (for Ad Publishing)

Setup is more complex. Follow [Meta's setup guide](https://developers.facebook.com/docs/marketing-apis/get-started)

```env
VITE_META_ACCESS_TOKEN=your-meta-access-token
VITE_META_AD_ACCOUNT_ID=act_1234567890
VITE_META_APP_ID=your-app-id
VITE_META_APP_SECRET=your-app-secret
```

**How to get:**

1. Create a [Meta for Developers](https://developers.facebook.com/) account
2. Create a new app
3. Add "Marketing API" product
4. Request advanced access for `ads_management` permission
5. Generate access token with required permissions:
   - `ads_management`
   - `ads_read`
   - `business_management`

**Test with:** [Graph API Explorer](https://developers.facebook.com/tools/explorer/)

---

### Google Ads API (Optional - Future Feature)

```env
VITE_GOOGLE_ADS_CLIENT_ID=your-client-id
VITE_GOOGLE_ADS_CLIENT_SECRET=your-client-secret
VITE_GOOGLE_ADS_DEVELOPER_TOKEN=your-developer-token
VITE_GOOGLE_ADS_REFRESH_TOKEN=your-refresh-token
VITE_GOOGLE_ADS_CUSTOMER_ID=123-456-7890
```

**How to get:** Follow [Google Ads API Setup](https://developers.google.com/google-ads/api/docs/first-call/overview)

---

## Optional Environment Variables

### Analytics

```env
# Google Analytics
VITE_GA_TRACKING_ID=G-XXXXXXXXXX

# Mixpanel
VITE_MIXPANEL_TOKEN=your-mixpanel-token

# Posthog
VITE_POSTHOG_KEY=phc_your-posthog-key
VITE_POSTHOG_HOST=https://app.posthog.com
```

### Error Tracking

```env
# Sentry
VITE_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
VITE_SENTRY_ENVIRONMENT=development
```

### App Configuration

```env
VITE_APP_URL=http://localhost:8080
VITE_APP_NAME=AdSync
VITE_APP_ENV=development

# Feature Flags
VITE_ENABLE_CHAT_WIDGET=true
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=true
```

---

## Complete `.env.local` Template

Copy this template and fill in your values:

```env
# ============================================
# REQUIRED - Supabase
# ============================================
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key_here

# ============================================
# REQUIRED - OpenAI (AI Copy Generation)
# ============================================
VITE_OPENAI_API_KEY=sk-your-openai-api-key-here

# ============================================
# OPTIONAL - Leonardo AI (Image Generation)
# ============================================
# VITE_LEONARDO_API_KEY=your-leonardo-api-key-here

# ============================================
# OPTIONAL - Meta Marketing API
# ============================================
# VITE_META_ACCESS_TOKEN=your-meta-access-token
# VITE_META_AD_ACCOUNT_ID=act_1234567890
# VITE_META_APP_ID=your-app-id
# VITE_META_APP_SECRET=your-app-secret

# ============================================
# OPTIONAL - Google Ads API (Future)
# ============================================
# VITE_GOOGLE_ADS_CLIENT_ID=your-client-id
# VITE_GOOGLE_ADS_CLIENT_SECRET=your-client-secret
# VITE_GOOGLE_ADS_DEVELOPER_TOKEN=your-developer-token

# ============================================
# OPTIONAL - Analytics
# ============================================
# VITE_GA_TRACKING_ID=G-XXXXXXXXXX
# VITE_MIXPANEL_TOKEN=your-mixpanel-token

# ============================================
# OPTIONAL - Error Tracking
# ============================================
# VITE_SENTRY_DSN=https://xxxxx.ingest.sentry.io/xxxxx

# ============================================
# App Configuration
# ============================================
VITE_APP_URL=http://localhost:8080
VITE_APP_NAME=AdSync
VITE_APP_ENV=development
```

---

## Security Best Practices

### ⚠️ IMPORTANT: Never Commit Secrets

1. `.env.local` is already in `.gitignore`
2. Never commit API keys to version control
3. Use different keys for development and production

### Production Setup

For production, set environment variables in your hosting platform:

**Vercel:**
```bash
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_PUBLISHABLE_KEY
# ... repeat for all variables
```

**Netlify:**
- Go to Site Settings → Build & Deploy → Environment
- Add each variable

**Environment-Specific Variables:**
```env
# Development
VITE_APP_ENV=development
VITE_APP_URL=http://localhost:8080

# Production
VITE_APP_ENV=production
VITE_APP_URL=https://your-domain.com
```

---

## API Key Security Checklist

- [ ] Added `.env.local` to `.gitignore`
- [ ] Using different keys for dev/prod
- [ ] Restricted API keys by domain/IP where possible
- [ ] Moved sensitive operations to Supabase Edge Functions
- [ ] Set up rate limiting
- [ ] Monitoring API usage and costs
- [ ] Rotating keys regularly (every 90 days)

---

## Troubleshooting

### Variables Not Loading

1. **Restart dev server** after changing `.env.local`
2. **Check variable names** - must start with `VITE_`
3. **No quotes needed** for values
4. **No spaces** around `=`

### TypeScript Errors

Add type definitions for env variables:

```typescript
// src/vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_PUBLISHABLE_KEY: string
  readonly VITE_OPENAI_API_KEY: string
  // ... add all your variables
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

### API Key Not Working

1. **Check permissions** - Ensure key has correct scopes
2. **Verify key format** - Copy-paste carefully
3. **Check quotas** - You might have hit rate limits
4. **Test in isolation** - Use Postman/curl to verify key works

---

## Cost Estimates (Monthly)

Based on 1000 campaigns/month:

- **Supabase:** Free tier (up to 500MB DB, 1GB bandwidth)
- **OpenAI GPT-4:** ~$2-5 (2000 campaigns × $0.002)
- **Leonardo AI:** ~$10-20 (500 images × $0.02-0.04)
- **Meta API:** Free (but ad spend separate)
- **Google Ads API:** Free (but ad spend separate)

**Total:** ~$12-25/month for API costs (excluding ad spend)

---

## Next Steps

1. ✅ Set up Supabase (required)
2. ✅ Get OpenAI API key (required)
3. ⏳ Set up Meta API (optional, for publishing)
4. ⏳ Configure Leonardo AI (optional, for image generation)
5. ⏳ Add analytics (optional)
6. ⏳ Set up error tracking (recommended for production)

---

## Support

- **Supabase:** [docs.supabase.com](https://docs.supabase.com)
- **OpenAI:** [platform.openai.com/docs](https://platform.openai.com/docs)
- **Meta API:** [developers.facebook.com/docs/marketing-apis](https://developers.facebook.com/docs/marketing-apis)
- **Project Issues:** [GitHub Issues](https://github.com/your-repo/issues)

---

*Last Updated: 2025-11-25*

