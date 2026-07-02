const longMonthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const shortMonthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

export function formatJPY(value: number): string {
  const amount = Number.isFinite(value) ? value : 0;

  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatCurrency(value: number, currency = "JPY", locale = "ja-JP"): string {
  const amount = Number.isFinite(value) ? value : 0;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(amount);
}

export function toValidDate(value?: string | number | Date | null): Date | null {
  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value === "string" && value.trim() === "") {
    return null;
  }

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

export function formatDate(value?: string | number | Date | null, _locale = "en-US"): string {
  const date = toValidDate(value);

  if (!date) {
    return "";
  }

  return longMonthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
}

export function formatShortDate(value?: string | number | Date | null, _locale = "en-US"): string {
  const date = toValidDate(value);

  if (!date) {
    return "";
  }

  return shortMonthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
}

export function toISOStringSafe(value?: string | number | Date | null): string {
  const date = toValidDate(value);
  return date ? date.toISOString() : "";
}

export function normalizeList(value: string | string[] | null | undefined): string[] {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.map((item: string) => item.trim()).filter(Boolean);
  }

  return value
    .split(",")
    .map((item: string) => item.trim())
    .filter(Boolean);
}