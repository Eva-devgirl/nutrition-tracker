import type { Entry } from "./types";

export function entriesForDate(entries: Entry[], date: string) {
   return entries.filter((e) => e.date === date);
}

export function totalCalories(entries: Entry[]) {
   return entries.reduce(
     (sum, e) => sum + (Number.isFinite(e.calories) ? e.calories : 0),
     0
   );
}
