export const APP_CONSTANTS = {
  appName: 'Guide Muni',
  defaultLocale: 'en-US',
  backend: {
    baseUrl: 'https://example.com',
    timeoutMs: 15_000,
    healthCheckIntervalMs: 15_000
  },
  retry: {
    retries: 2,
    delayMs: 600
  },
  storage: {
    historyKey: 'guide_muni_history',
    maxHistoryItems: 20
  }
} as const;

export const API_ENDPOINTS = {
  health: '/health',
  analyzeAudio: '/analyze/audio',
  analyzeText: '/analyze/text',
  analyzeImage: '/analyze/image',
  analyzeLocation: '/analyze/location'
} as const;

export const UI_TEXT = {
  homeTagline: 'Smart multimodal guide',
  emptyHistory: 'No responses yet',
  responseFallback: 'No response available yet.',
  voicePlaceholder: '...'
} as const;
