import { z } from 'zod';

export const DeleteIncidentByIdSchema = z.object({
  /** The ID of the Incident to delete. */
  incidentId: z.string().max(255, 'incidentId must be at most 255 characters'),
});

export type DeleteIncidentById = z.input<typeof DeleteIncidentByIdSchema>;
