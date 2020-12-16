import { HistoryMetadataParticipant, HistoryMetadataParticipant, HistoryMetadataParticipant } from './historyMetadataParticipant';

/**
 * Details of issue history metadata. */
export interface HistoryMetadata {
  /** The type of the history record. */
  type?: string;
  /** The description of the history record. */
  description?: string;
  /** The description key of the history record. */
  descriptionKey?: string;
  /** The activity described in the history record. */
  activityDescription?: string;
  /** The key of the activity described in the history record. */
  activityDescriptionKey?: string;
  /** The description of the email address associated the history record. */
  emailDescription?: string;
  /** The description key of the email address associated the history record. */
  emailDescriptionKey?: string;
  /** Details of the user whose action created the history record. */
  actor?: HistoryMetadataParticipant[];
  /** Details of the system that generated the history record. */
  generator?: HistoryMetadataParticipant[];
  /** Details of the cause that triggered the creation the history record. */
  cause?: HistoryMetadataParticipant[];
  /** Additional arbitrary information about the history record. */
  extraData?: {};
}
