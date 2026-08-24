import { z } from 'zod';
import { apiObject } from '#/core';
import { MultiDirectoryUserSchema } from './multiDirectoryUser';
import { LinkPageCursorSchema } from './linkPageCursor';

export const MultiDirectoryUserPageSchema = apiObject({
  /** A page of users. */
  data: z.array(MultiDirectoryUserSchema).optional(),
  links: LinkPageCursorSchema.optional(),
});

export type MultiDirectoryUserPage = z.infer<typeof MultiDirectoryUserPageSchema>;
