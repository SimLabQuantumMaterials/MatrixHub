# Deploy Matrix Hub to GitHub Pages

This guide walks you through hosting the Matrix Hub website on GitHub Pages using the repo [SimLabQuantumMaterials/MatrixHub](https://github.com/SimLabQuantumMaterials/MatrixHub).

**Live URL after setup:**  
https://simlabquantummaterials.github.io/MatrixHub/

---

## Step 1: Push your code to the MatrixHub repo

From your local project (this `MatrixWebsite` folder):

1. **Add the GitHub repo as remote** (if you haven’t already):
   ```bash
   cd /path/to/MatrixWebsite
   git remote add origin https://github.com/SimLabQuantumMaterials/MatrixHub.git
   ```
   If `origin` already points to another repo, use a different name (e.g. `github`) or change the URL:
   ```bash
   git remote set-url origin https://github.com/SimLabQuantumMaterials/MatrixHub.git
   ```

2. **Commit and push** (include the new config and workflow):
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment"
   git branch -M main
   git push -u origin main
   ```
   Use `main` as the default branch so the workflow runs on push.

---

## Step 2: Turn on GitHub Pages and set source to Actions

1. Open: **https://github.com/SimLabQuantumMaterials/MatrixHub**
2. Go to **Settings** → **Pages** (left sidebar under “Code and automation”).
3. Under **Build and deployment**:
   - **Source:** choose **GitHub Actions**.

You don’t need to pick a branch or folder; the workflow will build and deploy.

---

## Step 3: Run the first deployment

- **Option A – Push:** Any new push to `main` will run the workflow (e.g. after Step 1).
- **Option B – Manual run:**  
  - Go to **Actions** → **Deploy to GitHub Pages**  
  - Click **Run workflow** → **Run workflow**

Wait for the workflow to finish (green check). The first time you use Pages with Actions, GitHub may ask you to approve the `github-pages` environment; approve it if prompted.

---

## Step 4: Open the site

After a successful run:

- **URL:** https://simlabquantummaterials.github.io/MatrixHub/
- It can take 1–2 minutes to appear; refresh if needed.

---

## What’s configured in this repo

| Item | Purpose |
|------|--------|
| `next.config.js` | Uses `basePath: '/MatrixHub'` and `assetPrefix` when `GITHUB_PAGES=true` so links and assets work under the repo path. |
| `.github/workflows/deploy-pages.yml` | On push to `main`: installs deps, builds with `GITHUB_PAGES=true`, uploads `out/MatrixHub` as the Pages artifact, then deploys. |

Local development (`npm run dev`) and normal build (`npm run build`) are unchanged and don’t use the base path.

---

## Test the GitHub Pages build locally (optional)

To build the same output as on GitHub:

```bash
GITHUB_PAGES=true npm run build
```

Then serve the exported site:

```bash
npx serve out/MatrixHub
```

Open http://localhost:3000/MatrixHub/ (or the path `serve` prints). Links and assets should match the live GitHub Pages site.

---

## Troubleshooting

- **404 or blank page:**  
  Make sure **Settings → Pages → Build and deployment** is set to **GitHub Actions**, not “Deploy from a branch”.

- **Wrong base path / broken assets:**  
  The workflow must set `GITHUB_PAGES=true` when running `npm run build` (it does). Don’t remove that env from `.github/workflows/deploy-pages.yml`.

- **Workflow fails:**  
  Open **Actions** → the failed run → expand the failing job. Common fixes: fix `npm ci` errors (e.g. lockfile or Node version) and ensure `out/MatrixHub` exists after build (so basePath is applied).

- **Custom domain later:**  
  In **Settings → Pages** you can add a custom domain. The workflow and basePath stay the same; only DNS and GitHub’s domain settings change.

---

## Summary checklist

- [ ] Code pushed to `main` on https://github.com/SimLabQuantumMaterials/MatrixHub  
- [ ] **Settings → Pages → Source** = **GitHub Actions**  
- [ ] Workflow run completed successfully  
- [ ] Site loads at https://simlabquantummaterials.github.io/MatrixHub/
