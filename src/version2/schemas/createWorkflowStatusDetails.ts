import { z } from 'zod';

/** The details of a transition status. */
export const CreateWorkflowStatusDetailsSchema = z.object({
  /** The ID of the status. */
  id: z.string(),
  /** The properties of the status. */
  properties: z.object({}).optional(),
});

export type CreateWorkflowStatusDetails = z.infer<typeof CreateWorkflowStatusDetailsSchema>;
