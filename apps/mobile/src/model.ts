export type Product = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  group: string;
  url: string;
  shot?: string;
  accent?: string;
  poster?: { glyph: string; from: string; to: string };
};
export type HubState = {
  saved: string[];
  recent: string[];
  best: number | null;
};
export const EMPTY: HubState = { saved: [], recent: [], best: null };
export function restore(raw: string | null, ids: readonly string[]): HubState {
  if (!raw) return { ...EMPTY };
  try {
    const value = JSON.parse(raw);
    const clean = (list: unknown) =>
      Array.isArray(list)
        ? [
            ...new Set(
              list.filter(
                (id): id is string =>
                  typeof id === "string" && ids.includes(id),
              ),
            ),
          ]
        : [];
    return {
      saved: clean(value.saved),
      recent: clean(value.recent).slice(0, 6),
      best:
        typeof value.best === "number" &&
        Number.isFinite(value.best) &&
        value.best > 0
          ? value.best
          : null,
    };
  } catch {
    return { ...EMPTY };
  }
}
export function toggleSaved(state: HubState, slug: string): HubState {
  return {
    ...state,
    saved: state.saved.includes(slug)
      ? state.saved.filter((id) => id !== slug)
      : [...state.saved, slug],
  };
}
export function recordOpen(state: HubState, slug: string): HubState {
  return {
    ...state,
    recent: [slug, ...state.recent.filter((id) => id !== slug)].slice(0, 6),
  };
}
export function filterProducts(
  products: Product[],
  query: string,
  group: string,
): Product[] {
  const q = query.trim().toLocaleLowerCase();
  return products.filter(
    (p) =>
      (group === "All" || p.group === group) &&
      `${p.name} ${p.tagline} ${p.category}`.toLocaleLowerCase().includes(q),
  );
}
export function recordScore(state: HubState, ms: number): HubState {
  return Number.isFinite(ms) && ms > 0
    ? { ...state, best: state.best === null ? ms : Math.min(ms, state.best) }
    : state;
}
