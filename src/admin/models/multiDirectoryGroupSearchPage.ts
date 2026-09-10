import { z } from 'zod';
import { apiObject } from '#/core';
import { MultiDirectoryGroupSchema } from './multiDirectoryGroup';
import { LinkPageCursorSchema } from './linkPageCursor';

export const MultiDirectoryGroupSearchPageSchema = apiObject({
  /** A page of groups matching the search criteria. */
  data: z.array(MultiDirectoryGroupSchema),
  links: LinkPageCursorSchema.optional(),
});

export type MultiDirectoryGroupSearchPage = z.infer<typeof MultiDirectoryGroupSearchPageSchema>;
