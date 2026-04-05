import { z } from 'zod';

/** Details of issue history metadata. */
export const HistoryMetadataSchema = z.object({
  /** The activity described in the history record. */
  activityDescription: z.string().optional(),
  /** The key of the activity described in the history record. */
  activityDescriptionKey: z.string().optional(),
  /** Details of user or system associated with a issue history metadata item. */
  actor: z
    .object({
      /** The URL to an avatar for the user or system associated with a history record. */
      avatarUrl: z.string().optional(),
      /** The display name of the user or system associated with a history record. */
      displayName: z.string().optional(),
      /** The key of the display name of the user or system associated with a history record. */
      displayNameKey: z.string().optional(),
      /** The ID of the user or system associated with a history record. */
      id: z.string().optional(),
      /** The type of the user or system associated with a history record. */
      type: z.string().optional(),
      /** The URL of the user or system associated with a history record. */
      url: z.string().optional(),
    })
    .optional(),
  /** Details of user or system associated with a issue history metadata item. */
  cause: z
    .object({
      /** The URL to an avatar for the user or system associated with a history record. */
      avatarUrl: z.string().optional(),
      /** The display name of the user or system associated with a history record. */
      displayName: z.string().optional(),
      /** The key of the display name of the user or system associated with a history record. */
      displayNameKey: z.string().optional(),
      /** The ID of the user or system associated with a history record. */
      id: z.string().optional(),
      /** The type of the user or system associated with a history record. */
      type: z.string().optional(),
      /** The URL of the user or system associated with a history record. */
      url: z.string().optional(),
    })
    .optional(),
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
  /** Details of user or system associated with a issue history metadata item. */
  generator: z
    .object({
      /** The URL to an avatar for the user or system associated with a history record. */
      avatarUrl: z.string().optional(),
      /** The display name of the user or system associated with a history record. */
      displayName: z.string().optional(),
      /** The key of the display name of the user or system associated with a history record. */
      displayNameKey: z.string().optional(),
      /** The ID of the user or system associated with a history record. */
      id: z.string().optional(),
      /** The type of the user or system associated with a history record. */
      type: z.string().optional(),
      /** The URL of the user or system associated with a history record. */
      url: z.string().optional(),
    })
    .optional(),
  /** The type of the history record. */
  type: z.string().optional(),
});

export type HistoryMetadata = z.infer<typeof HistoryMetadataSchema>;
