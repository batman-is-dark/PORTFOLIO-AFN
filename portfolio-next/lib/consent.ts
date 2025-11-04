// Stubbed consent helpers (no-op for now)

/** Returns true if user granted consent for a given key. Always true for now. */
export function hasConsent(_key: string): boolean {
  return true;
}

/** Record a consent decision. No-op placeholder. */
export function setConsent(_key: string, _value: boolean): void {
  // no-op
}