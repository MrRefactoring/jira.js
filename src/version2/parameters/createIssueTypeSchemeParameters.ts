import { z } from 'zod';

export const CreateIssueTypeSchemeParametersSchema = z.object({
  /** The ID of the default issue type of the issue type scheme. This ID must be included in `issueTypeIds`. */
  defaultIssueTypeId: z.string().optional(),
  /** The description of the issue type scheme. The maximum length is 4000 characters. */
  description: z.string().optional(),
  /** The list of issue types IDs of the issue type scheme. At least one standard issue type ID is required. */
  issueTypeIds: z.array(z.string()),
  /** The name of the issue type scheme. The name must be unique. The maximum length is 255 characters. */
  name: z.string(),
});

export type CreateIssueTypeSchemeParameters = z.infer<typeof CreateIssueTypeSchemeParametersSchema>;
