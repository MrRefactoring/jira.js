/* eslint-disable @typescript-eslint/no-explicit-any */
export type Request = {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: any; // todo
  query?: any; // todo
  headers?: any; // todo
};
