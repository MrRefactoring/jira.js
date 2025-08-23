import { z } from 'zod';
import { DefaultLevelValueSchema } from './defaultLevelValue';

/** Details of new default levels. */
export const SetDefaultLevelsRequestSchema = z.object({
  /** List of objects with issue security scheme ID and new default level ID. */
  defaultValues: z.array(DefaultLevelValueSchema),
});

export type SetDefaultLevelsRequest = z.infer<typeof SetDefaultLevelsRequestSchema>;
