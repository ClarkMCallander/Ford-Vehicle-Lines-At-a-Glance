# Ford Vehicle Lines At a Glance

A React + Vite dashboard for exploring Ford vehicle data with an analytics-first UI.

## Why the GitHub Pages site was blank

GitHub Pages cannot run the source files in this repository directly from `index.html` because the app is written in React/JSX and must be **built first**.

Two things were needed:

1. **A production build step** that converts the app into static files under `dist/`.
2. **A GitHub Pages base path** so Vite generates asset URLs for this repo path:
   `/Ford-Vehicle-Lines-At-a-Glance/`

This repository now includes both:

- a Vite production `base` configuration for project Pages deployments
- a GitHub Actions workflow that builds and deploys the app automatically to GitHub Pages

## Local development

```bash
npm install
npm run dev
```

## Local production build

```bash
npm install
npm run build
npm run preview
```

## GitHub Pages deployment

### Recommended setup

Use **GitHub Actions** as the Pages source.

In GitHub:

1. Open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to `main`.
4. GitHub will run `.github/workflows/deploy-pages.yml` and publish the built `dist/` output.

The workflow intentionally uses `npm install` without npm cache configuration so it works even when this repository does not include a committed `package-lock.json`.

### Expected published URL

```text
https://clarkmcallander.github.io/Ford-Vehicle-Lines-At-a-Glance/
```

## Current app structure

- `src/data/vehicles.json`: starter vehicle dataset
- `src/components/VehicleDashboard.jsx`: top-level dashboard state and filtering
- `src/components/VehicleList.jsx`: vehicle selection and filter UI
- `src/components/VehicleDetailView.jsx`: central analytical detail layout
- `src/components/CostPerMileCalculator.jsx`: interactive 10,000-mile energy cost calculator
- `src/styles.css`: responsive dashboard styling
