const rawApiBaseUrl = process.env.NEXT_PUBLIC_API_URL?.trim() ?? "";

export const API_BASE_URL = rawApiBaseUrl.replace(/\/+$/, "");

export const appConfig = {
  apiBaseUrl: API_BASE_URL,
} as const;
