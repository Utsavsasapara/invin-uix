import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Fonts (Geist + Geist Mono) are self-hosted by invin-uix via tokens.css —
// no @fontsource import needed.
import './index.css';
import App from './App.routes.jsx';
import 'invin-uix/tokens.css';
import { LIB_CONFIG as PACKAGE_CONFIG } from 'invin-uix/lib-config';
import { LibConfigProvider, DEFAULT_LIB_CONFIG } from './LibConfigContext.jsx';

// ─── Library Configuration ───────────────────────────────────────────────────
// Version, componentCount and componentCountDisplay are read directly from the
// installed invin-uix package — no manual update needed on future releases.
const LIB_CONFIG = {
  ...DEFAULT_LIB_CONFIG,
  version: PACKAGE_CONFIG.version,
  componentCount: PACKAGE_CONFIG.componentCount,
  componentCountDisplay: PACKAGE_CONFIG.componentCountDisplay,
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
