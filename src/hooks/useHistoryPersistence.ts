import { useEffect } from 'react';
import { HISTORY_KEY, loadObject, saveObject } from '@/utils/storage';
import { hydrateHistory } from '@/store/appStore';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { ResponseHistoryItem } from '@/types/history';

export const useHistoryPersistence = (): void => {
  const dispatch = useAppDispatch();
  const history = useAppSelector((state) => state.app.history);

  useEffect(() => {
    loadObject<ResponseHistoryItem[]>(HISTORY_KEY)
      .then((cached) => {
        if (cached?.length) {
          dispatch(hydrateHistory(cached));
        }
      })
      .catch(() => undefined);
  }, [dispatch]);

  useEffect(() => {
    saveObject(HISTORY_KEY, history).catch(() => undefined);
  }, [history]);
};
