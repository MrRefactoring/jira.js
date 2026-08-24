import { z } from 'zod';
import { apiObject } from '#/core';
import { MultiDirectoryUserDirectorySchema } from './multiDirectoryUserDirectory';
import { LinkPageCursorSchema } from './linkPageCursor';

export const MultiDirectoryUserDirectoryPageSchema = apiObject({
  /** A page of user directory information. */
  data: z.array(MultiDirectoryUserDirectorySchema).optional(),
  links: LinkPageCursorSchema.optional(),
});

export type MultiDirectoryUserDirectoryPage = z.infer<typeof MultiDirectoryUserDirectoryPageSchema>;
