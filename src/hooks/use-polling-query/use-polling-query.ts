import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';

export interface UsePollingQueryOptions<T> {
  pollingInterval: number;
  pollUntil: (data: T) => boolean;
  onFinishedPolling?: (data: T) => void;
  enabled?: boolean;
}

export function usePollingQuery<T>(
  queryKey: string[],
  queryDataFunction: () => Promise<T>,
  options: UsePollingQueryOptions<T>
) {
  const polling = useRef({ enabled: true });

  return useQuery(queryKey, queryDataFunction, {
    refetchOnWindowFocus: () => polling.current.enabled,
    refetchOnMount: () => polling.current.enabled,
    refetchOnReconnect: () => polling.current.enabled,
    refetchIntervalInBackground: false,
    refetchInterval: () => (polling.current.enabled ? options.pollingInterval : false),
    enabled: (typeof options.enabled === 'boolean' ? options.enabled : true) && polling.current.enabled,

    onSuccess: (data) => {
      const shouldStopPolling = options.pollUntil(data);

      if (!shouldStopPolling) {
        return;
      }

      polling.current = { enabled: false };

      if (options.onFinishedPolling) {
        options.onFinishedPolling(data);
      }
    },
  });
}
