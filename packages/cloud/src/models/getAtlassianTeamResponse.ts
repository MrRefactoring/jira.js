import { z } from 'zod';

export const GetAtlassianTeamResponseSchema = z.object({
  /** The capacity for the Atlassian team. */
  capacity: z.number().optional(),
  /** The Atlassian team ID. */
  id: z.string(),
  /** The ID of the issue source for the Atlassian team. */
  issueSourceId: z.number().optional(),
  /** The planning style for the Atlassian team. This is "Scrum" or "Kanban". */
  planningStyle: z.enum(['Scrum', 'Kanban']),
  /** The sprint length for the Atlassian team. */
  sprintLength: z.number().optional(),
});

export type GetAtlassianTeamResponse = z.infer<typeof GetAtlassianTeamResponseSchema>;
