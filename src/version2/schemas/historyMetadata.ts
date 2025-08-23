import { z } from 'zod';

/** Details of issue history metadata. */
export const HistoryMetadataSchema = z.object({
  /** The activity described in the history record. */
  activityDescription: z.string().optional(),
  /** The key of the activity described in the history record. */
  activityDescriptionKey: z.string().optional(),
  /** Details of the user whose action created the history record. */
  actor: z.unknown().optional(),
  /** Details of the cause that triggered the creation the history record. */
  cause: z.unknown().optional(),
  /** The description of the history record. */
  description: z.string().optional(),
  /** The description key of the history record. */
  descriptionKey: z.string().optional(),
  /** The description of the email address associated the history record. */
  emailDescription: z.string().optional(),
  /** The description key of the email address associated the history record. */
  emailDescriptionKey: z.string().optional(),
  /** Additional arbitrary information about the history record. */
  extraData: z.object({}).optional(),
  /** Details of the system that generated the history record. */
  generator: z.unknown().optional(),
  /** The type of the history record. */
  type: z.string().optional(),
});

export type HistoryMetadata = z.infer<typeof HistoryMetadataSchema>;
