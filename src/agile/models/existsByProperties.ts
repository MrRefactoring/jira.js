import { z } from 'zod';
import { apiObject } from '#/core';
/** Whether there is data for the properties supplied in a query */

export const ExistsByPropertiesSchema = apiObject({
  /** Whether there is data matching the query */
  hasDataMatchingProperties: z.boolean().optional(),
});

export type ExistsByProperties = z.infer<typeof ExistsByPropertiesSchema>;
