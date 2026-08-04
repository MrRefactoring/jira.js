import { z } from 'zod';
import { apiObject } from '#/core';

export const ParameterRemovalDetailsSchema = apiObject({
  /** Set of parameter names to remove */
  parameters: z.array(z.string()).optional(),
  /** ID of the field scheme */
  schemeId: z.number().optional(),
  /** Set of work type (issue type) IDs */
  workTypeIds: z.array(z.number()).optional(),
});

export type ParameterRemovalDetails = z.infer<typeof ParameterRemovalDetailsSchema>;
