import { z } from 'zod';

export const UpdateIssueTypeSchemeParametersSchema = z.object({
  /** The ID of the issue type scheme. */
  issueTypeSchemeId: z.number().int(),
  /** The ID of the default issue type of the issue type scheme. */
  defaultIssueTypeId: z.string().optional(),
  /** The description of the issue type scheme. The maximum length is 4000 characters. */
  description: z.string().optional(),
  /** The name of the issue type scheme. The name must be unique. The maximum length is 255 characters. */
  name: z.string().optional(),
});

export type UpdateIssueTypeSchemeParameters = z.infer<typeof UpdateIssueTypeSchemeParametersSchema>;
