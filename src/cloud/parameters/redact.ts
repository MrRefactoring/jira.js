import { z } from 'zod';
import { BulkRedactionRequestSchema } from '../models';

export const RedactSchema = z.object(BulkRedactionRequestSchema.shape);

export type Redact = z.input<typeof RedactSchema>;
