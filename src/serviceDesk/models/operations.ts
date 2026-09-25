import { z } from 'zod';
import { apiObject } from '#/core';
import { LinkGroupSchema, type LinkGroup, type LinkGroupInput } from './linkGroup';

/** Details of the operations that can be performed on the issue. */
export const OperationsSchema = apiObject({
  /** Details of the link groups defining issue operations. */
  linkGroups: z.array(LinkGroupSchema as z.ZodType<LinkGroup, LinkGroupInput>).optional(),
});

export type Operations = z.infer<typeof OperationsSchema>;
