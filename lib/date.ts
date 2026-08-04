export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function addDays(dateISO: string, days: number): string {
  const date = new Date(`${dateISO}T00:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}
