// Adds the jest-dom matchers (toBeInTheDocument, toHaveTextContent, ...) to
// Vitest's expect.
import "@testing-library/jest-dom/vitest";

// jsdom implements neither of these, and the overview page uses both on mount
// (section reveal / scroll-spy observers, and a hover-capability check before
// wiring the parallax overlay).
class NoopIntersectionObserver {
  root = null;
  rootMargin = "";
  thresholds: readonly number[] = [];
  disconnect() {}
  observe() {}
  unobserve() {}
  takeRecords() {
    return [];
  }
}
globalThis.IntersectionObserver =
  NoopIntersectionObserver as unknown as typeof IntersectionObserver;

if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
}
