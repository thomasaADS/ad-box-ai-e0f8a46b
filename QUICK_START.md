# 🚀 AdSync - Quick Start Guide

Welcome to AdSync! This guide will help you get the project up and running quickly.

## 📋 What is AdSync?

AdSync is an AI-powered SaaS platform that generates ready-to-publish ad campaigns for multiple platforms (Meta, Google Ads, Taboola, Outbrain, etc.) in minutes instead of hours.

**Key Features:**
- 🤖 AI-generated ad copy (headlines, descriptions, CTAs)
- 🎨 Automatic image generation
- 🎯 Smart audience targeting
- 📊 Multi-platform support (Meta, Google, native ads)
- 🔗 UTM tracking links
- 📈 Campaign analytics dashboard

---

## ⚡ Quick Setup (5 Minutes)

### 1. Install Dependencies

```bash
# Using npm
npm install

# Or using bun (faster)
bun install
```

### 2. Set Up Supabase

**Option A: Use Existing Supabase Project**
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Copy your Project URL and anon key
3. Create `.env.local` file:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
```

**Option B: Set Up Local Supabase (Recommended for Development)**

```bash
# Install Supabase CLI
brew install supabase/tap/supabase

# Start local Supabase
supabase start

# Run migrations
supabase db push

# Get local credentials (automatically in .env.local)
supabase status
```

### 3. Run Database Migrations

```bash
# If using hosted Supabase
supabase db push

# Or run migrations manually in SQL Editor:
# 1. Go to Supabase Dashboard → SQL Editor
# 2. Copy contents from supabase/migrations/*.sql
# 3. Run each migration
```

### 4. Add OpenAI API Key (Required for AI Generation)

```env
# Add to .env.local
VITE_OPENAI_API_KEY=sk-your-openai-key-here
```

Get your key from [OpenAI Platform](https://platform.openai.com/api-keys)

### 5. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:8080](http://localhost:8080)

---

## 🎯 First Campaign in 3 Steps

### Step 1: Sign Up
1. Click "התחבר" (Login) in the top right
2. Create account with email/password
3. Verify email (check inbox)

### Step 2: Create Brief
1. Click "צור קמפיין חדש" (Create New Campaign)
2. Fill in the form:
   - **Brand Name**: Your business name
   - **Industry**: e.g., "קוסמטיקאית" (beautician)
   - **City**: e.g., "תל אביב" (Tel Aviv)
   - **Offer**: e.g., "טיפול ראשון ב-20% הנחה" (First treatment 20% off)
   - **Platforms**: Select Meta, Google, etc.
3. Click "צור וריאנטים לקמפיין" (Generate Campaign Variants)

### Step 3: Review & Use
1. View generated ad variants
2. Copy text to use in your ad platforms
3. Download/copy image URLs
4. (Optional) Publish directly to Meta (requires Meta API setup)

---

## 🏗️ Project Structure

```
ad-box-ai-e0f8a46b/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── ErrorBoundary.tsx  # ✨ NEW: Error handling
│   │   └── ...
│   ├── lib/
│   │   ├── api.ts          # API utilities (currently mock)
│   │   ├── schemas.ts      # ✨ NEW: Zod validation
│   │   ├── errorHandling.ts  # ✨ NEW: Error utilities
│   │   ├── credits.ts      # ✨ NEW: Credit system
│   │   └── utils.ts
│   ├── pages/              # Route pages
│   ├── contexts/           # React contexts (Auth, Language)
│   └── translations/       # i18n JSON files
├── supabase/
│   ├── migrations/         # Database migrations
│   │   └── 20251125_add_credits_system.sql  # ✨ NEW
│   └── functions/          # Edge functions
├── IMPROVEMENTS.md         # ✨ NEW: Detailed improvement plan
├── ENV_SETUP.md           # ✨ NEW: Environment setup guide
└── QUICK_START.md         # ✨ NEW: This file
```

---

## 🔧 Configuration

### Essential Environment Variables

```env
# Required
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
VITE_OPENAI_API_KEY=sk-your-key

# Optional (for full functionality)
VITE_LEONARDO_API_KEY=your-leonardo-key
VITE_META_ACCESS_TOKEN=your-meta-token
VITE_META_AD_ACCOUNT_ID=act_123456789
```

See [ENV_SETUP.md](./ENV_SETUP.md) for complete configuration guide.

---

## 🎨 What's Been Improved

### ✅ Recently Added (2025-11-25)

1. **Error Handling**
   - ✨ ErrorBoundary component for React errors
   - ✨ Centralized error handling utilities
   - ✨ User-friendly error messages in Hebrew

2. **Validation**
   - ✨ Zod schemas for all forms
   - ✨ Type-safe validation
   - ✨ Helpful error messages

3. **Credit System**
   - ✨ User quota tracking
   - ✨ Credit deduction utilities
   - ✨ Usage logging for analytics

4. **Database Enhancements**
   - ✨ `ad_creatives` table for storing variants
   - ✨ `usage_logs` table for tracking
   - ✨ Row Level Security (RLS) policies
   - ✨ Atomic credit operations

5. **Documentation**
   - ✨ IMPROVEMENTS.md - Comprehensive improvement roadmap
   - ✨ ENV_SETUP.md - Environment variable guide
   - ✨ QUICK_START.md - This quick start guide
   - ✨ Inline code comments and JSDoc

---

## 🚦 Current Status

### ✅ Working Features
- User authentication (Supabase Auth)
- Campaign brief form
- Mock ad variant generation
- Multi-language support (Hebrew, English, Arabic, Russian)
- Dashboard with campaign list
- Protected routes
- Responsive UI with dark theme

### ⏳ In Progress (Mock/Placeholder)
- OpenAI integration (currently mock)
- Image generation (using Unsplash placeholders)
- Meta ad publishing (mock implementation)
- Analytics/performance tracking

### 📋 Next Steps (See IMPROVEMENTS.md)
1. Integrate real OpenAI API
2. Set up Meta Marketing API
3. Add Leonardo AI for image generation
4. Implement proper campaign persistence
5. Add tests (unit + E2E)
6. Performance optimizations

---

## 🐛 Troubleshooting

### Database Connection Issues

```bash
# Check Supabase status
supabase status

# Reset local database
supabase db reset

# Check migrations
supabase db push --dry-run
```

### API Key Not Working

1. Check `.env.local` exists in project root
2. Restart dev server after changing env vars
3. Verify key format (no quotes needed)
4. Check console for error messages

### TypeScript Errors

```bash
# Clear cache and restart
rm -rf node_modules .turbo dist
npm install
npm run dev
```

### Supabase Auth Issues

```bash
# Check auth configuration
supabase auth list-users

# Reset password for user
supabase auth reset-password user@example.com
```

---

## 📚 Key Technologies

- **Frontend:** React 18 + TypeScript + Vite
- **UI:** Tailwind CSS + shadcn/ui
- **Backend:** Supabase (PostgreSQL + Auth + Storage)
- **AI:** OpenAI GPT-4 (for copy), Leonardo AI (for images)
- **State:** React Query + Context API
- **Forms:** React Hook Form + Zod
- **i18n:** Custom translation system
- **Routing:** React Router v6

---

## 🎓 Learning Resources

### Documentation
- [Supabase Docs](https://supabase.com/docs)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Meta Marketing API](https://developers.facebook.com/docs/marketing-apis)
- [shadcn/ui Components](https://ui.shadcn.com)

### Project Guides
- [IMPROVEMENTS.md](./IMPROVEMENTS.md) - What to improve next
- [ENV_SETUP.md](./ENV_SETUP.md) - Environment setup
- [README_ADSYNC.md](./README_ADSYNC.md) - Original project overview

---

## 🤝 Development Workflow

### Adding a New Feature

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes**
   - Add tests if possible
   - Follow existing code style
   - Update documentation

3. **Test locally**
   ```bash
   npm run dev
   npm run lint
   ```

4. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: add your feature"
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**

### Code Style

- Use TypeScript strict mode
- Follow ESLint rules
- Use meaningful variable names
- Add JSDoc comments for utilities
- Keep components small and focused

### Testing (Coming Soon)

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
```

---

## 🔒 Security Best Practices

1. **Never commit** `.env.local` or API keys
2. **Use RLS** policies for all database tables
3. **Move sensitive operations** to Supabase Edge Functions
4. **Validate user input** with Zod schemas
5. **Rate limit** API calls
6. **Monitor** API usage and costs
7. **Rotate keys** regularly (every 90 days)

---

## 📈 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_PUBLISHABLE_KEY
vercel env add VITE_OPENAI_API_KEY
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

### Environment Variables in Production

Make sure to add all required environment variables in your hosting platform:
- Vercel: Settings → Environment Variables
- Netlify: Site Settings → Build & Deploy → Environment

---

## 💰 Cost Estimation

### Development (Free Tier)
- Supabase: Free (500MB DB, 1GB bandwidth)
- OpenAI: Pay-as-you-go (~$0.002 per generation)
- Vercel/Netlify: Free tier sufficient

### Production (100 users, 1000 campaigns/month)
- Supabase: $25/month (Pro plan)
- OpenAI API: ~$2-5/month
- Leonardo AI: ~$10-20/month
- Hosting: Free - $20/month
- **Total: ~$37-70/month** (excluding ad spend)

---

## 🎯 Success Metrics

Track these KPIs for your SaaS:

### User Metrics
- Sign-ups per day
- Active users (DAU/MAU)
- Retention rate (7-day, 30-day)
- Conversion rate (free → paid)

### Product Metrics
- Campaigns generated per user
- Average variants per campaign
- Time to first campaign
- Feature adoption rates

### Business Metrics
- Monthly Recurring Revenue (MRR)
- Customer Acquisition Cost (CAC)
- Lifetime Value (LTV)
- Churn rate

---

## 🆘 Getting Help

### Issues & Bugs
- Check [IMPROVEMENTS.md](./IMPROVEMENTS.md) for known issues
- Search existing [GitHub Issues](https://github.com/your-repo/issues)
- Create a new issue with reproduction steps

### Feature Requests
- Open a GitHub Discussion
- Describe the use case and value
- Provide examples if possible

### Community
- Join our Discord (coming soon)
- Follow on Twitter (coming soon)
- Read the blog (coming soon)

---

## 🎉 You're Ready!

You should now have:
- ✅ Project running locally
- ✅ Database configured
- ✅ First campaign created
- ✅ Understanding of project structure

**Next Steps:**
1. Review [IMPROVEMENTS.md](./IMPROVEMENTS.md) for enhancement ideas
2. Set up real API integrations (OpenAI, Meta)
3. Deploy to production
4. Start building your SaaS! 🚀

---

## 📝 Changelog

### 2025-11-25
- ✨ Added ErrorBoundary component
- ✨ Added Zod validation schemas
- ✨ Added credit system utilities
- ✨ Added database migrations for credits and ad_creatives
- ✨ Added comprehensive documentation
- ✨ Improved error handling throughout app
- ✨ Added React Query caching configuration

### Previous
- Initial project setup with Lovable
- Supabase integration
- Multi-platform ad generation (mock)
- i18n support (4 languages)
- Dashboard and analytics UI

---

*Made with ❤️ for marketers who want to work smarter, not harder.*

**Questions?** Open an issue or check [IMPROVEMENTS.md](./IMPROVEMENTS.md)

