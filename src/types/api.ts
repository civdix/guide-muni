export type AnalyzeResponse = {
  text_response: string;
  audio_response_url?: string;
  confidence?: number;
  created_at?: string;
};

export type AnalyzeLocationPayload = {
  latitude: number;
  longitude: number;
  altitude?: number | null;
  accuracy?: number | null;
  source: 'gps' | 'network' | 'tower' | 'fused';
  timestamp: number;
};
