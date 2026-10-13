# OctoFit Tracker frontend

React 19 presentation tier for OctoFit Tracker, powered by Vite, React Router, and Bootstrap.

## Run locally

Start the API on port `8000`, then run the frontend:

```bash
npm run dev --prefix octofit-tracker/frontend
```

When `VITE_CODESPACE_NAME` is unset, the frontend uses `http://localhost:8000` for API requests. In Codespaces, Vite automatically uses the available `CODESPACE_NAME` to target the forwarded API port.

## GitHub Codespaces API URL

To override the automatically detected Codespaces name, set `VITE_CODESPACE_NAME`. For example, create `octofit-tracker/frontend/.env.local` with:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Vite exposes `VITE_` variables to browser code. Do not put secrets in this file. Restart the Vite development server after changing environment variables.
