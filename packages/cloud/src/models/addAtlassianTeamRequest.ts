import { z } from 'zod';

export const AddAtlassianTeamRequestSchema = z.object({
  /** The capacity for the Atlassian team. */
  capacity: z.number().optional(),
  /** The Atlassian team ID. */
  id: z.string(),
  /** The ID of the issue source for the Atlassian team. */
  issueSourceId: z.number().optional(),
  /** The planning style for the Atlassian team. This must be "Scrum" or "Kanban". */
  planningStyle: z.enum(['Scrum', 'Kanban']),
  /** The sprint length for the Atlassian team. */
  sprintLength: z.number().optional(),
});

export type AddAtlassianTeamRequest = z.infer<typeof AddAtlassianTeamRequestSchema>;
