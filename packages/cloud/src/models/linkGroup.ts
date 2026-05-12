import { z } from 'zod';
import { SimpleLinkSchema, type SimpleLink } from '#/models/simpleLink';

export type LinkGroup = {
  groups?: LinkGroup[];
  header?: SimpleLink;
  id?: string;
  links?: SimpleLink[];
  styleClass?: string;
  weight?: number;
};

/** Details a link group, which defines issue operations. */
export const LinkGroupSchema: z.ZodType<LinkGroup> = z.object({
  groups: z.array(z.lazy(() => LinkGroupSchema)).optional(),
  header: SimpleLinkSchema.optional(),
  id: z.string().optional(),
  links: z.array(SimpleLinkSchema).optional(),
  styleClass: z.string().optional(),
  weight: z.number().optional(),
});
