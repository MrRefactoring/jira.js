import { z } from 'zod';
import { DataClassificationTagSchema } from '#/models/dataClassificationTag';

/** The data classification. */
export const DataClassificationLevelsSchema = z.object({
  /** The data classifications. */
  classifications: z.array(DataClassificationTagSchema).optional(),
});

export type DataClassificationLevels = z.infer<typeof DataClassificationLevelsSchema>;
