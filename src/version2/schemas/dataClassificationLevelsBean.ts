import { z } from 'zod';
import { DataClassificationTagBeanSchema } from './dataClassificationTagBean';

/** The data classification. */
export const DataClassificationLevelsBeanSchema = z.object({
  /** The data classifications. */
  classifications: z.array(DataClassificationTagBeanSchema).optional(),
});

export type DataClassificationLevelsBean = z.infer<typeof DataClassificationLevelsBeanSchema>;
