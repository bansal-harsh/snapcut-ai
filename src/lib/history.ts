export type HistoryItem = {
  id: string;
  createdAt: number;
  fileName?: string;
  originalDataUrl?: string;
  resultDataUrl: string;
};

const GUEST_KEY = "snapcut.history.guest";
const USER_KEY_PREFIX = "snapcut.history.user:";
const MAX_ITEMS = 12;

function keyForUser(email?: string | null) {
  if (!email) return GUEST_KEY;
  return `${USER_KEY_PREFIX}${email.trim().toLowerCase()}`;
}

function isQuotaError(err: unknown) {
  return (
    err instanceof DOMException &&
    (err.name === "QuotaExceededError" || err.name === "NS_ERROR_DOM_QUOTA_REACHED")
  );
}

export function loadHistory(email?: string | null): HistoryItem[] {
  try {
    const raw = localStorage.getItem(keyForUser(email));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as HistoryItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((x) => x && typeof x.id === "string" && typeof x.createdAt === "number" && typeof x.resultDataUrl === "string")
      .sort((a, b) => b.createdAt - a.createdAt);
  } catch {
    return [];
  }
}

export function clearHistory(email?: string | null) {
  try {
    localStorage.removeItem(keyForUser(email));
  } catch {
    // ignore
  }
}

function persistHistory(email: string | null | undefined, items: HistoryItem[]) {
  localStorage.setItem(keyForUser(email), JSON.stringify(items));
}

export function addHistoryItem(email: string | null | undefined, item: Omit<HistoryItem, "id" | "createdAt"> & Partial<Pick<HistoryItem, "originalDataUrl">>) {
  const base: HistoryItem = {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    fileName: item.fileName,
    originalDataUrl: item.originalDataUrl,
    resultDataUrl: item.resultDataUrl,
  };

  let items = [base, ...loadHistory(email)].slice(0, MAX_ITEMS);

  try {
    persistHistory(email, items);
    return base;
  } catch (err) {
    if (!isQuotaError(err)) throw err;
  }

  // Retry without originalDataUrl (largest field).
  items = items.map((x, idx) => (idx === 0 ? { ...x, originalDataUrl: undefined } : x));
  try {
    persistHistory(email, items);
    return { ...base, originalDataUrl: undefined };
  } catch (err) {
    if (!isQuotaError(err)) throw err;
  }

  // Drop oldest until it fits.
  while (items.length > 1) {
    items = items.slice(0, items.length - 1);
    try {
      persistHistory(email, items);
      return items[0];
    } catch (err) {
      if (!isQuotaError(err)) throw err;
    }
  }

  // If even one item doesn't fit, give up silently.
  return null;
}

export function removeHistoryItem(email: string | null | undefined, id: string) {
  const items = loadHistory(email).filter((x) => x.id !== id);
  try {
    persistHistory(email, items);
  } catch {
    // ignore
  }
}

export function migrateGuestHistoryToUser(email: string) {
  const normalized = email.trim().toLowerCase();
  if (!normalized) return;

  const guestItems = loadHistory(null);
  if (guestItems.length === 0) return;

  const userItems = loadHistory(normalized);
  const merged = [...guestItems, ...userItems]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, MAX_ITEMS);

  try {
    persistHistory(normalized, merged);
    clearHistory(null);
  } catch {
    // ignore
  }
}

