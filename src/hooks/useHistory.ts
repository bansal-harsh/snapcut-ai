import { useCallback, useEffect, useMemo, useState } from "react";
import { addHistoryItem, clearHistory, loadHistory, removeHistoryItem, type HistoryItem } from "@/lib/history";

export function useHistory(email?: string | null) {
  const [items, setItems] = useState<HistoryItem[]>([]);

  const reload = useCallback(() => {
    setItems(loadHistory(email));
  }, [email]);

  useEffect(() => {
    reload();
  }, [reload]);

  const add = useCallback(
    (params: { fileName?: string; originalDataUrl?: string; resultDataUrl: string }) => {
      addHistoryItem(email, params);
      reload();
    },
    [email, reload],
  );

  const remove = useCallback(
    (id: string) => {
      removeHistoryItem(email, id);
      reload();
    },
    [email, reload],
  );

  const clear = useCallback(() => {
    clearHistory(email);
    reload();
  }, [email, reload]);

  return useMemo(
    () => ({ items, add, remove, clear, reload }),
    [items, add, remove, clear, reload],
  );
}

