import type { ErrorResponse, RedirectResponse } from './types';

export function isErrorResponse(data: unknown): data is ErrorResponse {
  return typeof data === 'object' && data !== null && 'error' in data && typeof (data as ErrorResponse).error === 'string';
}

export function isRedirectResponse(data: unknown): data is RedirectResponse {
  return typeof data === 'object' && data !== null && 'redirectTo' in data && typeof (data as RedirectResponse).redirectTo === 'string';
}
