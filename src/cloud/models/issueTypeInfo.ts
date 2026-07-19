import { z } from 'zod';
import { apiObject } from '#/core';
/** Details of an issue type. */

export const IssueTypeInfoSchema = apiObject({
  /** The avatar of the issue type. */
  avatarId: z.number().optional(),
  /** The ID of the issue type. */
  id: z.number().optional(),
  /** The name of the issue type. */
  name: z.string().optional(),
});

export type IssueTypeInfo = z.infer<typeof IssueTypeInfoSchema>;
