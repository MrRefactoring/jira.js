import { z } from 'zod';

export const IncludedFieldsSchema = z.object({
  actuallyIncluded: z.array(z.string()).optional(),
  excluded: z.array(z.string()).optional(),
  included: z.array(z.string()).optional(),
});

export type IncludedFields = z.infer<typeof IncludedFieldsSchema>;
