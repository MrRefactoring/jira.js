import { z } from 'zod';
import { DefaultLevelValueSchema } from './defaultLevelValue';

export const SetDefaultLevelsParametersSchema = z.object({
  /** List of objects with issue security scheme ID and new default level ID. */
  defaultValues: z.array(DefaultLevelValueSchema),
});

export type SetDefaultLevelsParameters = z.infer<typeof SetDefaultLevelsParametersSchema>;
