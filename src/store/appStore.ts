import { createSlice, configureStore, type PayloadAction } from '@reduxjs/toolkit';
import { APP_CONSTANTS } from '@/constants/appConstants';
import type { AnalyzeResponse } from '@/types/api';
import type { ResponseHistoryItem } from '@/types/history';

export type AppState = {
  backendOnline: boolean;
  loading: boolean;
  latestResponse: AnalyzeResponse | null;
  history: ResponseHistoryItem[];
};

const initialState: AppState = {
  backendOnline: false,
  loading: false,
  latestResponse: null,
  history: []
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setBackendOnline(state, action: PayloadAction<boolean>) {
      state.backendOnline = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setLatestResponse(state, action: PayloadAction<AnalyzeResponse | null>) {
      state.latestResponse = action.payload;
    },
    hydrateHistory(state, action: PayloadAction<ResponseHistoryItem[]>) {
      state.history = action.payload;
    },
    pushHistory(state, action: PayloadAction<ResponseHistoryItem>) {
      state.history = [action.payload, ...state.history].slice(0, APP_CONSTANTS.storage.maxHistoryItems);
    }
  }
});

export const { setBackendOnline, setLoading, setLatestResponse, hydrateHistory, pushHistory } = appSlice.actions;

export const store = configureStore({
  reducer: {
    app: appSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
