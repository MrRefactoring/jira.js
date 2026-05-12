import { z } from 'zod';

export const DeleteComponentSchema = z.object({
  /** The ID of the component. */
  id: z.string(),
  /** The ID of the component to replace the deleted component. If this value is null no replacement is made. */
  moveIssuesTo: z.string().optional(),
});

export type DeleteComponent = z.input<typeof DeleteComponentSchema>;
