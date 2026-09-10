import { z } from 'zod';
import { apiObject } from '#/core';

export const MultiDirectoryUserDirectorySchema = apiObject({
  /** Unique directory identifier. */
  directoryId: z.string().optional(),
  /** The name of the directory. */
  name: z.string().optional(),
  /** The URL of the directory's icon. */
  icon: z.string().optional(),
});

export type MultiDirectoryUserDirectory = z.infer<typeof MultiDirectoryUserDirectorySchema>;
