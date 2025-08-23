import { z } from 'zod';

/** Details of an issue level security item. */
export const SecurityLevelSchema = z.object({
  /** The description of the issue level security item. */
  description: z.string().optional(),
  /** The ID of the issue level security item. */
  id: z.string().optional(),
  /** Whether the issue level security item is the default. */
  isDefault: z.boolean().optional(),
  /** The ID of the issue level security scheme. */
  issueSecuritySchemeId: z.string().optional(),
  /** The name of the issue level security item. */
  name: z.string().optional(),
  /** The URL of the issue level security item. */
  self: z.string().optional(),
});

export type SecurityLevel = z.infer<typeof SecurityLevelSchema>;
