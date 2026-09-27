import { useCallback, useEffect, useState } from "react";

type Settled<T> = {
  load: () => Promise<T>;
  data: T | null;
  error: boolean;
};

export const useFetch = <T>(
  load: () => Promise<T>,
  { keepPreviousData = false } = {},
) => {
  const [reloadCount, setReloadCount] = useState(0);
  const [settled, setSettled] = useState<Settled<T> | null>(null);

  useEffect(() => {
    let active = true;
    const settle = (data: T | null, error: boolean) => {
      if (active) setSettled({ load, data, error });
    };

    load().then(
      (data) => settle(data, false),
      () => settle(null, true),
    );

    return () => {
      active = false;
    };
  }, [load, reloadCount]);

  const reload = useCallback(() => setReloadCount((count) => count + 1), []);

  const hasResult = settled?.load === load;
  const showsData = hasResult || keepPreviousData;

  return {
    data: showsData ? (settled?.data ?? null) : null,
    loading: !hasResult,
    error: hasResult && settled.error,
    reload,
  };
};
