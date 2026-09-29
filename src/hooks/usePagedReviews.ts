import { useCallback, useRef, useState } from "react";
import type { Page } from "../api/reviews";
import { useFetch } from "./useFetch";

export const usePagedReviews = <T>(
  loadPage: (page: number) => Promise<Page<T>>,
) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const { data, loading, error, reload } = useFetch(
    useCallback(() => loadPage(page), [loadPage, page]),
    { keepPreviousData: true },
  );

  const lastPage = Math.max(1, data?.totalPages ?? 1);
  if (data && page > lastPage) setPage(lastPage);

  const changePage = (nextPage: number) => {
    setPage(nextPage);
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return { listRef, page, setPage, changePage, data, loading, error, reload };
};
