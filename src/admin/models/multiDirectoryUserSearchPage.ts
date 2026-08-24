import { z } from 'zod';
import { apiObject } from '#/core';
import { MultiDirectoryUserSchema } from './multiDirectoryUser';
import { LinkPageCursorSchema } from './linkPageCursor';

export const MultiDirectoryUserSearchPageSchema = apiObject({
  /** A page of users matching the search criteria. */
  data: z.array(MultiDirectoryUserSchema),
  links: LinkPageCursorSchema.optional(),
});

export type MultiDirectoryUserSearchPage = z.infer<typeof MultiDirectoryUserSearchPageSchema>;
