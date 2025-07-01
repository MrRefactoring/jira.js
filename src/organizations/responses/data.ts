import { z, type ZodSchema } from 'zod';

export const DataSchema = <T extends ZodSchema>(schema: T) => z.strictObject({ data: schema });
