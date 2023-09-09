import { effect, signal } from "@preact/signals";

export const sessionSignal = <T = any>(key: string, initial: T) => {
  try {
    const storedRaw = window.sessionStorage.getItem(key);
    if (storedRaw === "undefined") initial = undefined;
    else if (storedRaw != null) initial = JSON.parse(storedRaw);
  } catch (e) {
    console.warn(e);
  }
  const s = signal(initial);
  effect(() => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(s.value));
    } catch (e) {}
  });
  return s;
};
