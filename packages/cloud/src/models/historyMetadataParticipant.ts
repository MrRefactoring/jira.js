import { z } from 'zod';

/** Details of user or system associated with a issue history metadata item. */
export const HistoryMetadataParticipantSchema = z.object({
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
});

export type HistoryMetadataParticipant = z.infer<typeof HistoryMetadataParticipantSchema>;
