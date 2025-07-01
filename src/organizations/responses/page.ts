import { z, type ZodSchema } from 'zod';
import { LinksSchema } from './links';

export const PageSchema = <T extends ZodSchema>(schema: T) => z.strictObject({
  data: z.array(schema),
  links: LinksSchema,
  meta: z.null().optional(),
});

export type Page<T extends ZodSchema> = z.infer<ReturnType<typeof PageSchema<T>>>;
