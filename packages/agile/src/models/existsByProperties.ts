import { z } from 'zod';

/** Whether there is data for the properties supplied in a query */
export const ExistsByPropertiesSchema = z.object({
  /** Whether there is data matching the query */
  hasDataMatchingProperties: z.boolean().optional(),
});

export type ExistsByProperties = z.infer<typeof ExistsByPropertiesSchema>;
