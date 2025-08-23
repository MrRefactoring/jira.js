import { z } from 'zod';

/** Details of an issue type. */
export const IssueTypeInfoSchema = z.object({
  /** The avatar of the issue type. */
  avatarId: z.number().int().optional(),
  /** The ID of the issue type. */
  id: z.number().int().optional(),
  /** The name of the issue type. */
  name: z.string().optional(),
});

export type IssueTypeInfo = z.infer<typeof IssueTypeInfoSchema>;
