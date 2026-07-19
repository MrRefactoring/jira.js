import { z } from 'zod';
import { BulkRedactionRequestSchema } from '../models';

export const RedactSchema = z.object({}).extend(BulkRedactionRequestSchema.shape);

export type Redact = z.input<typeof RedactSchema>;
