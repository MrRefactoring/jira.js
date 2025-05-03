import type { HistoryMetadataParticipant } from './historyMetadataParticipant';

/** Details of issue history metadata. */
export interface HistoryMetadata {
  /** The activity described in the history record. */
  activityDescription?: string;
  /** The key of the activity described in the history record. */
  activityDescriptionKey?: string;
  actor?: HistoryMetadataParticipant;
  cause?: HistoryMetadataParticipant;
  /** The description of the history record. */
  description?: string;
  /** The description key of the history record. */
  descriptionKey?: string;
  /** The description of the email address associated the history record. */
  emailDescription?: string;
  /** The description key of the email address associated the history record. */
  emailDescriptionKey?: string;
  /** Additional arbitrary information about the history record. */
  extraData?: unknown;
  generator?: HistoryMetadataParticipant;
  /** The type of the history record. */
  type?: string;
}
