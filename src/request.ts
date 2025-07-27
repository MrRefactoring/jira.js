import type { OneOrMany } from './interfaces';

export type Request = {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: BodyInit | null | undefined | object;
  query?: Record<string, OneOrMany<string | number | boolean | unknown | null | undefined>>;
  headers?: Record<string, string>;
};
