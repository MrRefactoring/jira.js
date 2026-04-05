import { z } from 'zod';

/** The container that the board is located in. */
export const BoardLocationSchema = z.object({
  avatarURI: z.url().optional(),
  displayName: z.string().optional(),
  name: z.string().optional(),
  projectId: z.number().optional(),
  projectKey: z.string().optional(),
  projectName: z.string().optional(),
  projectTypeKey: z.string().optional(),
  userAccountId: z.string().optional(),
  userId: z.number().optional(),
});

export type BoardLocation = z.infer<typeof BoardLocationSchema>;
