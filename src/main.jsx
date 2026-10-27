import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Fonts (Geist + Geist Mono) are self-hosted by invin-uix via tokens.css —
// no @fontsource import needed.
import './index.css';
import App from './App.routes.jsx';
import 'invin-uix/tokens.css';
import { LibConfigProvider, DEFAULT_LIB_CONFIG } from './LibConfigContext.jsx';

// ─── Library Configuration ───────────────────────────────────────────────────
// Update version here when upgrading invin-uix - this is the SINGLE source of truth
const LIB_CONFIG = {
  ...DEFAULT_LIB_CONFIG,
  version: '1.4.4', // <-- Update this when library version changes
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LibConfigProvider config={LIB_CONFIG}>
        <App />
      </LibConfigProvider>
    </BrowserRouter>
  </StrictMode>,
);
