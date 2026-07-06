# Weather Forecast App

## Project Description

A lightweight Angular weather dashboard that consumes a public REST API and
displays the 5-day forecast in a table. The app is built with a single
`weather` component and a `WeatherService` that wraps `HttpClient`, and is
automatically built and deployed to GitHub Pages via a GitHub Actions
workflow on every push to `main`.

Data source (public API):
`https://sampleapi20260706g3-bvdacte9b0dvhudv.canadacentral-01.azurewebsites.net/Weatherforecast`

Features:
- Fetches the forecast on page load and shows a `Loading...` state while
  waiting on the API.
- Shows a friendly error message if the API call fails.
- Displays Date, Temperature (°C), Temperature (°F), and Summary in a table.
- Total Forecast Records count.
- Rows with `temperatureC > 30` are highlighted.
- A Refresh button reloads the data on demand.
- Responsive layout — the table collapses into stacked cards on narrow
  (mobile) viewports.

## Angular Version

Angular CLI 22 (standalone components, no NgModules; Vitest for unit tests).

## Installation Steps

```bash
# Install dependencies
npm ci

# Run locally (http://localhost:4200)
npm start

# Run unit tests
npx ng test --watch=false

# Production build (matches the CI build, base-href required for Pages)
npx ng build --configuration production --base-href /Azure-Angular-App-Github-Pages/
```

## Deployment URL

https://sri-manikandan.github.io/Azure-Angular-App-Github-Pages/

Deployment is automatic: every push to `main` triggers
`.github/workflows/deploy.yml`, which builds the app and publishes
`dist/weather-app/browser` to GitHub Pages.
