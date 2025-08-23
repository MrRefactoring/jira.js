import { z } from 'zod';
import { ContentItemSchema } from './contentItem';
import { RedactionPositionSchema } from './redactionPosition';

export const SingleRedactionRequestSchema = z.object({
  contentItem: ContentItemSchema,
  /** Unique id for the redaction request; ID format should be of UUID */
  externalId: z.string(),
  /** The reason why the content is being redacted */
  reason: z.string(),
  redactionPosition: RedactionPositionSchema,
});

export type SingleRedactionRequest = z.infer<typeof SingleRedactionRequestSchema>;
