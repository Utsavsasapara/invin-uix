import { createContext, useContext } from 'react';

/**
 * Centralized library configuration context
 * 
 * This allows version and config to be managed in one place (main.jsx)
 * and accessed throughout the app without importing from invin-uix/lib-config.
 */

// Default config values - update here when library version changes
export const DEFAULT_LIB_CONFIG = {
  name: 'invin-uix',
  version: '1.4.2',
  componentCount: 70,
  componentCountDisplay: '70+',
  iconCount: 1500,
  iconCountDisplay: '1500+',
  accentCount: 7,
  reactVersion: '19',
  tailwindVersion: '4',
  description: 'React UI component library with Tailwind CSS, design tokens, and Radix primitives.',
  tagline: 'One library. One shell. Seven accents.',
};

const LibConfigContext = createContext(DEFAULT_LIB_CONFIG);

export function LibConfigProvider({ children, config = DEFAULT_LIB_CONFIG }) {
  return (
    <LibConfigContext.Provider value={config}>
      {children}
    </LibConfigContext.Provider>
  );
}

export function useLibConfig() {
  return useContext(LibConfigContext);
}
