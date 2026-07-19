import { z } from 'zod';
import { apiObject } from '#/core';
import { DefaultLevelValueSchema } from './defaultLevelValue';
/** Details of new default levels. */

export const SetDefaultLevelsRequestSchema = apiObject({
  /** List of objects with issue security scheme ID and new default level ID. */
  defaultValues: z.array(DefaultLevelValueSchema),
});

export type SetDefaultLevelsRequest = z.infer<typeof SetDefaultLevelsRequestSchema>;
