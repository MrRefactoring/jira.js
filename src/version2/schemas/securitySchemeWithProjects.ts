import { z } from 'zod';

/** Details about an issue security scheme. */
export const SecuritySchemeWithProjectsSchema = z.object({
  /** The default level ID of the issue security scheme. */
  defaultLevel: z.number().int().optional(),
  /** The description of the issue security scheme. */
  description: z.string().optional(),
  /** The ID of the issue security scheme. */
  id: z.number().int(),
  /** The name of the issue security scheme. */
  name: z.string(),
  /** The list of project IDs associated with the issue security scheme. */
  projectIds: z.array(z.number().int()).optional(),
  /** The URL of the issue security scheme. */
  self: z.string(),
});

export type SecuritySchemeWithProjects = z.infer<typeof SecuritySchemeWithProjectsSchema>;
