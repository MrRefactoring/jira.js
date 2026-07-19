import { z, type ZodRawShape } from 'zod';

export function apiObject<Shape extends ZodRawShape>(shape: Shape) {
  return z.object(shape).loose();
}
