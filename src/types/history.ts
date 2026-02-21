export type ResponseHistoryItem = {
  id: string;
  source: 'voice' | 'text' | 'image' | 'location';
  inputSummary: string;
  responseText: string;
  confidence?: number;
  createdAt: string;
};
