import { z } from 'zod';

export const ExistsByPropertiesSchema = z.object({
  /** An optional property. Filters out entities and repositories which have updateSequenceId greater than specified. */
  updateSequenceId: z.number().optional(),
});

export type ExistsByProperties = z.input<typeof ExistsByPropertiesSchema>;
