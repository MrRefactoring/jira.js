import { z } from 'zod';
import { apiObject } from '#/core';
import { MultiDirectoryGroupSchema } from './multiDirectoryGroup';
import { LinkPageCursorSchema } from './linkPageCursor';

export const MultiDirectoryGroupPageSchema = apiObject({
  /** A page of groups. */
  data: z.array(MultiDirectoryGroupSchema).optional(),
  links: LinkPageCursorSchema.optional(),
});

export type MultiDirectoryGroupPage = z.infer<typeof MultiDirectoryGroupPageSchema>;
