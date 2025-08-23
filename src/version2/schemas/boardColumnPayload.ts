import { z } from 'zod';
import { ProjectCreateResourceIdentifierSchema } from './projectCreateResourceIdentifier';

/** The payload for creating a board column */
export const BoardColumnPayloadSchema = z.object({
  /** The maximum issue constraint for the column */
  maximumIssueConstraint: z.number().int().optional(),
  /** The minimum issue constraint for the column */
  minimumIssueConstraint: z.number().int().optional(),
  /** The name of the column */
  name: z.string().optional(),
  /** The status IDs for the column */
  statusIds: z.array(ProjectCreateResourceIdentifierSchema).optional(),
});

export type BoardColumnPayload = z.infer<typeof BoardColumnPayloadSchema>;
