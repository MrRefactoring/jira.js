import { z } from 'zod';
import { TerminologyRequestSchema } from '../models';

export const SetTerminologyEntriesSchema = z.object(TerminologyRequestSchema.shape);

export type SetTerminologyEntries = z.input<typeof SetTerminologyEntriesSchema>;
