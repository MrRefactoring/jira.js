import { z } from 'zod';

export const GetQueueSettingsOnProjectSchema = z.object({
  /** The key of the project. */
  projectKey: z.string(),
});

export type GetQueueSettingsOnProject = z.input<typeof GetQueueSettingsOnProjectSchema>;
