# Deployment Guide - DSA Roadmap

This guide will help you deploy your DSA Roadmap application so others can access it online.

## Deployment Options

### Option 1: Vercel (Frontend) + Railway (Backend) - **RECOMMENDED**
**Best for**: Quick deployment, free tier available, easy setup

#### Frontend Deployment (Vercel)
1. **Sign up** at [vercel.com](https://vercel.com)
2. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```
3. **Deploy**:
   ```bash
   vercel
   ```
4. Follow the prompts and select your project
5. **Update API URL**: After backend is deployed, update `src/context/AuthContext.jsx` and `src/hooks/useProgress.js` to use your Railway backend URL instead of `http://localhost:5160`

#### Backend Deployment (Railway)
1. **Sign up** at [railway.app](https://railway.app)
2. **Create New Project** → **Deploy from GitHub**
3. Select your `antigravity-project` repository
4. **Configure**:
   - Root Directory: `Antigravity.API`
   - Build Command: `dotnet publish -c Release -o out`
   - Start Command: `dotnet out/Antigravity.API.dll`
5. **Add Environment Variables**:
   - `ASPNETCORE_URLS=http://0.0.0.0:$PORT`
   - Update `JwtSettings:SecretKey` in production
6. **Update CORS**: In `Program.cs`, add your Vercel domain to CORS policy
7. Railway will provide a public URL (e.g., `https://your-app.railway.app`)

---

### Option 2: Netlify (Frontend) + Azure (Backend)
**Best for**: Microsoft ecosystem, enterprise-grade

#### Frontend (Netlify)
1. Sign up at [netlify.com](https://netlify.com)
2. **New site from Git** → Connect GitHub
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy!

#### Backend (Azure App Service)
1. Install Azure CLI: `winget install Microsoft.AzureCLI`
2. Login: `az login`
3. Create resource group:
   ```bash
   az group create --name DSARoadmapRG --location eastus
   ```
4. Deploy:
   ```bash
   cd Antigravity.API
   az webapp up --name dsa-roadmap-api --runtime "DOTNET|8.0"
   ```

---

### Option 3: GitHub Pages (Frontend) + Render (Backend)
**Best for**: Free hosting, simple setup

#### Frontend (GitHub Pages)
1. Update `vite.config.js`:
   ```javascript
   export default {
     base: '/antigravity-project/',
   }
   ```
2. Build: `npm run build`
3. Install gh-pages: `npm install -D gh-pages`
4. Add to `package.json`:
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```
5. Deploy: `npm run deploy`
6. Enable GitHub Pages in repo settings

#### Backend (Render)
1. Sign up at [render.com](https://render.com)
2. **New Web Service** → Connect GitHub
3. Settings:
   - Root Directory: `Antigravity.API`
   - Build Command: `dotnet publish -c Release -o out`
   - Start Command: `dotnet out/Antigravity.API.dll`
4. Add environment variable: `ASPNETCORE_URLS=http://0.0.0.0:$PORT`

---

## Important Configuration Changes for Production

### 1. Update API URLs in Frontend
Replace all instances of `http://localhost:5160` with your deployed backend URL:

**Files to update:**
- `src/context/AuthContext.jsx` (lines 30, 52)
- `src/hooks/useProgress.js` (lines 19, 39)
- `src/App.jsx` (line 35)

**Example:**
```javascript
// Before
const response = await axios.post('http://localhost:5160/api/auth/login', {

// After
const response = await axios.post('https://your-backend.railway.app/api/auth/login', {
```

### 2. Update CORS in Backend
In `Antigravity.API/Program.cs`, update CORS to allow your frontend domain:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        b => b.WithOrigins(
            "http://localhost:5173", 
            "http://localhost:5175",
            "https://your-app.vercel.app"  // Add your deployed frontend URL
        )
        .AllowAnyHeader()
        .AllowAnyMethod());
});
```

### 3. Secure JWT Secret
In production, use a strong, random JWT secret:

**Option A: Environment Variable (Recommended)**
```bash
# On Railway/Render/Azure, add environment variable:
JwtSettings__SecretKey=your-super-secure-random-key-here-min-32-chars
```

**Option B: Update appsettings.json**
```json
{
  "JwtSettings": {
    "SecretKey": "CHANGE-THIS-TO-A-SECURE-RANDOM-STRING-MIN-32-CHARACTERS",
    "Issuer": "AntigravityAPI",
    "Audience": "AntigravityClient",
    "DurationInMinutes": 60
  }
}
```

### 4. Database in Production
For production, consider upgrading from SQLite:

**Option A: Keep SQLite** (Simple, but not scalable)
- SQLite file will be stored on the server
- Data persists between deployments on Railway/Render

**Option B: PostgreSQL** (Recommended for production)
1. Add to Railway/Render: **New PostgreSQL Database**
2. Install package: `dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL`
3. Update `Program.cs`:
   ```csharp
   builder.Services.AddDbContext<AppDbContext>(options =>
       options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
   ```
4. Add connection string as environment variable

---

## Quick Start: Deploy in 5 Minutes (Vercel + Railway)

### Step 1: Deploy Backend to Railway
```bash
# 1. Push your code to GitHub (already done!)
# 2. Go to railway.app and sign in with GitHub
# 3. New Project → Deploy from GitHub → Select your repo
# 4. Set root directory to "Antigravity.API"
# 5. Copy the generated URL (e.g., https://antigravity-api.railway.app)
```

### Step 2: Update Frontend API URLs
```bash
# Replace localhost:5160 with your Railway URL in these files:
# - src/context/AuthContext.jsx
# - src/hooks/useProgress.js
# - src/App.jsx
```

### Step 3: Deploy Frontend to Vercel
```bash
npm install -g vercel
vercel login
vercel
# Follow prompts, select your project
```

### Step 4: Update Backend CORS
Add your Vercel URL to CORS in `Antigravity.API/Program.cs`, commit, and push.

**Done!** 🎉 Your site is now live!

---

## Monitoring & Maintenance

### Check Logs
- **Railway**: Dashboard → Deployments → View Logs
- **Vercel**: Dashboard → Deployments → Function Logs
- **Render**: Dashboard → Logs tab

### Update Deployment
Just push to GitHub - most platforms auto-deploy on push!

```bash
git add .
git commit -m "Update: ..."
git push origin main
```

---

## Cost Estimate

| Service | Free Tier | Paid (if needed) |
|---------|-----------|------------------|
| Vercel | ✅ Unlimited (hobby) | $20/month (Pro) |
| Railway | $5 credit/month | $5/month + usage |
| Render | ✅ 750 hours/month | $7/month |
| Netlify | ✅ 100GB bandwidth | $19/month |

**Recommendation**: Start with free tiers (Vercel + Railway). Upgrade only if you get significant traffic.

---

## Need Help?

- **Railway Docs**: https://docs.railway.app
- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs

Good luck with your deployment! 🚀
