import { z } from 'zod';
import { SingleRedactionRequestSchema } from './singleRedactionRequest';

export const RedactParametersSchema = z.object({
  redactions: z.array(SingleRedactionRequestSchema).optional(),
});

export type RedactParameters = z.infer<typeof RedactParametersSchema>;
