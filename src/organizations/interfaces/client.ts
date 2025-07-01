import type { z, ZodSchema } from 'zod';
import type { Request } from './request';

export interface Client {
  sendRequest<T extends ZodSchema>(request: Request, mapper: T): Promise<z.infer<T>>;
}
