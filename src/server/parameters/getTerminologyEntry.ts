import { z } from 'zod';

export const GetTerminologyEntrySchema = z.object({
  /** A numeric StatusCategory id or a status category key */
  originalName: z.string(),
});

export type GetTerminologyEntry = z.input<typeof GetTerminologyEntrySchema>;
