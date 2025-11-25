# 🔐 הגדרת התחברות עם Google - AdSync

## ✅ מה נוסף לפרויקט

1. **✨ כפתור "התחבר עם גוגל"** בדף ההתחברות
2. **🔒 פונקציית `signInWithGoogle()`** ב-AuthContext
3. **🎨 עיצוב מודרני** עם אייקון Chrome

---

## 🚀 כדי להפעיל את ההתחברות עם גוגל

### שלב 1: הכנס ל-Supabase Dashboard

1. לך ל-[Supabase Dashboard](https://app.supabase.com)
2. בחר את הפרויקט שלך
3. לחץ על **Authentication** בצד שמאל
4. לחץ על **Providers**

### שלב 2: הפעל את Google Provider

1. מצא את **Google** ברשימה
2. לחץ על **Enable**
3. תצטרך להוסיף:
   - **Client ID** (מגוגל)
   - **Client Secret** (מגוגל)

### שלב 3: צור OAuth Credentials בגוגל

1. לך ל-[Google Cloud Console](https://console.cloud.google.com)
2. צור פרויקט חדש (או בחר קיים)
3. לך ל-**APIs & Services** → **Credentials**
4. לחץ **Create Credentials** → **OAuth 2.0 Client ID**
5. בחר **Web application**
6. הוסף את ה-URLs הבאים:

**Authorized JavaScript origins:**
```
http://localhost:8080
https://your-domain.com
```

**Authorized redirect URIs:**
```
https://YOUR_SUPABASE_PROJECT_ID.supabase.co/auth/v1/callback
http://localhost:8080
```

> **חשוב:** החלף את `YOUR_SUPABASE_PROJECT_ID` ב-Project ID האמיתי שלך מ-Supabase

7. שמור ותקבל:
   - **Client ID**
   - **Client Secret**

### שלב 4: הוסף את ה-Credentials ל-Supabase

1. חזור ל-Supabase Dashboard → Authentication → Providers → Google
2. הדבק את ה-**Client ID**
3. הדבק את ה-**Client Secret**
4. לחץ **Save**

### שלב 5: בדוק שזה עובד! 🎉

1. רענן את האתר שלך
2. לך לדף ההתחברות
3. לחץ על "התחבר עם גוגל"
4. אמור להפתח חלון גוגל להתחברות

---

## 🎯 איך זה עובד?

```typescript
// קוד פשוט להתחברות עם גוגל:

const { signInWithGoogle } = useAuth();

// בלחיצה על הכפתור:
await signInWithGoogle();

// Supabase מטפל בכל השאר! ✨
```

---

## 🔧 Troubleshooting

### הכפתור לא עובד?

1. ✅ בדוק ב-Supabase Dashboard שGoogle Provider מופעל
2. ✅ בדוק שה-Client ID ו-Secret נכונים
3. ✅ בדוק שה-redirect URI נכון
4. ✅ רענן את הדפדפן (Ctrl+Shift+R)

### שגיאת Redirect URI?

הוודא שהוספת את ה-callback URL בדיוק כמו שהוא:
```
https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback
```

### המשתמש לא נשמר בדאטהבייס?

הקוד יוצר פרופיל אוטומטית בטבלה `profiles` כשמשתמש נרשם דרך גוגל.

---

## 📱 התחברות נוספת (אופציונלי)

ניתן להוסיף גם:
- **Facebook Login** 
- **Twitter/X Login**
- **GitHub Login**
- **Apple Login**

אותו תהליך - פשוט הפעל Provider ב-Supabase והוסף credentials!

---

## ✨ מה עוד נוסף?

- **הכל בעברית** - כל הטקסטים באתר עכשיו בעברית
- **כפתור גוגל מעוצב** - עם אייקון Chrome וסגנון מודרני
- **מפריד "או"** - בין התחברות גוגל להתחברות רגילה
- **כפתורים צבעוניים** - גרדיאנט סגול-ורוד יפהפה

---

**נהנת מההתחברות החדשה? 🚀**

