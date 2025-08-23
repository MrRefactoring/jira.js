import { z } from 'zod';

/** The details of a custom field context. */
export const CustomFieldContextSchema = z.object({
  /** The description of the context. */
  description: z.string(),
  /** The ID of the context. */
  id: z.string(),
  /** Whether the context apply to all issue types. */
  isAnyIssueType: z.boolean(),
  /** Whether the context is global. */
  isGlobalContext: z.boolean(),
  /** The name of the context. */
  name: z.string(),
});

export type CustomFieldContext = z.infer<typeof CustomFieldContextSchema>;
