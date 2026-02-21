import axios from 'axios';
import { APP_CONSTANTS } from '@/constants/appConstants';

export const apiClient = axios.create({
  baseURL: APP_CONSTANTS.backend.baseUrl,
  timeout: APP_CONSTANTS.backend.timeoutMs
});
