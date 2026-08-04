import { z } from 'zod';
import { apiObject } from '#/core';
import { DataClassificationTagSchema } from './dataClassificationTag';
/** The data classification. */

export const DataClassificationLevelsSchema = apiObject({
  /** The data classifications. */
  classifications: z.array(DataClassificationTagSchema).optional(),
});

export type DataClassificationLevels = z.infer<typeof DataClassificationLevelsSchema>;
