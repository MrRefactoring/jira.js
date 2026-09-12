import { z } from 'zod';

export const GetPortalByProjectKeySchema = z.object({
  /** The key of the project. */
  projectKey: z.string(),
});

export type GetPortalByProjectKey = z.input<typeof GetPortalByProjectKeySchema>;
