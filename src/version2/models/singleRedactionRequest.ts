import type { ContentItem } from './contentItem';
import type { RedactionPosition } from './redactionPosition';

export interface SingleRedactionRequest {
  contentItem: ContentItem;
  /** Unique id for the redaction request; ID format should be of UUID */
  externalId: string;
  /** The reason why the content is being redacted */
  reason: string;
  redactionPosition: RedactionPosition;
}
