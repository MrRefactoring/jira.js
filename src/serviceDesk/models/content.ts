import { z } from 'zod';
import { apiObject } from '#/core';

export const ContentSchema = apiObject({
  /** Url containing the body of the article (without title), suitable for rendering in an iframe */
  iframeSrc: z.string().optional(),
});

export type Content = z.infer<typeof ContentSchema>;
