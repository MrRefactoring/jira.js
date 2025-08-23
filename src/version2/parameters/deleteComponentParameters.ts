import { z } from 'zod';

export const DeleteComponentParametersSchema = z.object({
  /** The ID of the component. */
  id: z.string(),
  /** The ID of the component to replace the deleted component. If this value is null no replacement is made. */
  moveIssuesTo: z.string().optional(),
});

export type DeleteComponentParameters = z.infer<typeof DeleteComponentParametersSchema>;
