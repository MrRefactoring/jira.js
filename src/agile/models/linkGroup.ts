import { z } from 'zod';
import { apiObject } from '#/core';
import { SimpleLinkSchema, type SimpleLink } from './simpleLink';

export interface LinkGroup {
  groups?: LinkGroup[];
  header?: SimpleLink;
  id?: string;
  links?: SimpleLink[];
  styleClass?: string;
  weight?: number;
}
/** Details a link group, which defines issue operations. */

export const LinkGroupSchema: z.ZodType<LinkGroup> = apiObject({
  groups: z.array(z.lazy(() => LinkGroupSchema)).optional(),
  /** Details about the operations available in this version. */
  header: SimpleLinkSchema.optional(),
  id: z.string().optional(),
  links: z.array(SimpleLinkSchema).optional(),
  styleClass: z.string().optional(),
  weight: z.number().optional(),
});
