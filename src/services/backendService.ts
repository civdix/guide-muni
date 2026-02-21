import { API_ENDPOINTS, APP_CONSTANTS } from '@/constants/appConstants';
import type { AnalyzeLocationPayload, AnalyzeResponse } from '@/types/api';
import { withRetry } from '@/utils/retry';
import { apiClient } from './apiClient';

const toFormData = (fields: Record<string, string>): FormData => {
  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => formData.append(key, value));
  return formData;
};

export const backendService = {
  async analyzeText(text: string): Promise<AnalyzeResponse> {
    const response = await withRetry(
      () => apiClient.post<AnalyzeResponse>(API_ENDPOINTS.analyzeText, { text }),
      APP_CONSTANTS.retry.retries,
      APP_CONSTANTS.retry.delayMs
    );
    return response.data;
  },

  async analyzeAudio(audioUri: string, transcribedText?: string): Promise<AnalyzeResponse> {
    const formData = toFormData({ transcribed_text: transcribedText ?? '' });
    formData.append('audio', {
      uri: audioUri,
      name: 'voice-input.m4a',
      type: 'audio/m4a'
    } as never);

    const response = await withRetry(
      () =>
        apiClient.post<AnalyzeResponse>(API_ENDPOINTS.analyzeAudio, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        }),
      APP_CONSTANTS.retry.retries,
      APP_CONSTANTS.retry.delayMs
    );

    return response.data;
  },

  async analyzeImage(imageUri: string): Promise<AnalyzeResponse> {
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      name: 'capture.jpg',
      type: 'image/jpeg'
    } as never);

    const response = await withRetry(
      () =>
        apiClient.post<AnalyzeResponse>(API_ENDPOINTS.analyzeImage, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        }),
      APP_CONSTANTS.retry.retries,
      APP_CONSTANTS.retry.delayMs
    );

    return response.data;
  },

  async analyzeLocation(payload: AnalyzeLocationPayload): Promise<AnalyzeResponse> {
    const response = await withRetry(
      () => apiClient.post<AnalyzeResponse>(API_ENDPOINTS.analyzeLocation, payload),
      APP_CONSTANTS.retry.retries,
      APP_CONSTANTS.retry.delayMs
    );
    return response.data;
  },

  async ping(): Promise<boolean> {
    try {
      await apiClient.get(API_ENDPOINTS.health);
      return true;
    } catch {
      return false;
    }
  }
};
