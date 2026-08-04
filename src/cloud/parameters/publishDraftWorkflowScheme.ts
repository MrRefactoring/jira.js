import { z } from 'zod';
import { PublishDraftWorkflowSchemeSchema as PublishDraftWorkflowSchemeModelSchema } from '../models';

export const PublishDraftWorkflowSchemeSchema = z
  .object({})
  .extend(PublishDraftWorkflowSchemeModelSchema.shape)
  .extend({
    /** The ID of the workflow scheme that the draft belongs to. */
    id: z.number(),
    /** Whether the request only performs a validation. */
    validateOnly: z.boolean().optional(),
  });

export type PublishDraftWorkflowScheme = z.input<typeof PublishDraftWorkflowSchemeSchema>;
