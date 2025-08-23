import { z } from 'zod';
import { LinkGroupSchema } from './linkGroup';

/** Details of the operations that can be performed on the issue. */
export const OperationsSchema = z.object({
  /** Details of the link groups defining issue operations. */
  linkGroups: z.array(LinkGroupSchema).optional(),
});

export type Operations = z.infer<typeof OperationsSchema>;
