import { z } from 'zod';
import { HistoryMetadataParticipantSchema } from '#/models/historyMetadataParticipant';

/** Details of issue history metadata. */
export const HistoryMetadataSchema = z.object({
  /** The activity described in the history record. */
  activityDescription: z.string().optional(),
  /** The key of the activity described in the history record. */
  activityDescriptionKey: z.string().optional(),
  actor: HistoryMetadataParticipantSchema.optional(),
  cause: HistoryMetadataParticipantSchema.optional(),
  /** The description of the history record. */
  description: z.string().optional(),
  /** The description key of the history record. */
  descriptionKey: z.string().optional(),
  /** The description of the email address associated the history record. */
  emailDescription: z.string().optional(),
  /** The description key of the email address associated the history record. */
  emailDescriptionKey: z.string().optional(),
  /** Additional arbitrary information about the history record. */
  extraData: z.record(z.string(), z.any()).optional(),
  generator: HistoryMetadataParticipantSchema.optional(),
  /** The type of the history record. */
  type: z.string().optional(),
});

export type HistoryMetadata = z.infer<typeof HistoryMetadataSchema>;
