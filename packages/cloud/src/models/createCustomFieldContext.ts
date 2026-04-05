import { z } from 'zod';

/** The details of a created custom field context. */
export const CreateCustomFieldContextSchema = z.object({
  /** The description of the context. */
  description: z.string().optional(),
  /** The ID of the context. */
  id: z.string().optional(),
  /** The list of issue types IDs for the context. If the list is empty, the context refers to all issue types. */
  issueTypeIds: z.array(z.string()).optional(),
  /** The name of the context. */
  name: z.string(),
  /** The list of project IDs associated with the context. If the list is empty, the context is global. */
  projectIds: z.array(z.string()).optional(),
});

export type CreateCustomFieldContext = z.infer<typeof CreateCustomFieldContextSchema>;
