import { useEffect } from 'react';
import { APP_CONSTANTS } from '@/constants/appConstants';
import { backendService } from '@/services/backendService';
import { setBackendOnline } from '@/store/appStore';
import { useAppDispatch } from '@/store/hooks';

export const useBackendStatus = (): void => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let mounted = true;

    const check = async (): Promise<void> => {
      const online = await backendService.ping();
      if (mounted) {
        dispatch(setBackendOnline(online));
      }
    };

    check();
    const interval = setInterval(check, APP_CONSTANTS.backend.healthCheckIntervalMs);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [dispatch]);
};
