import { z } from 'zod';

/** Result for requested redactions */
export const SingleRedactionResponseSchema = z.object({
  /** An unique id for the redaction request */
  externalId: z.string(),
  /** Indicates if redaction was success/failure */
  successful: z.boolean(),
});

export type SingleRedactionResponse = z.infer<typeof SingleRedactionResponseSchema>;
