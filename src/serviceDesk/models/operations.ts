import { z } from 'zod';
import { apiObject } from '#/core';
import { LinkGroupSchema } from './linkGroup';
/** Details of the operations that can be performed on the issue. */

export const OperationsSchema = apiObject({
  /** Details of the link groups defining issue operations. */
  linkGroups: z.array(LinkGroupSchema).optional(),
});

export type Operations = z.infer<typeof OperationsSchema>;
