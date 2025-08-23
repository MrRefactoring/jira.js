import { z } from 'zod';
import { LinkGroupSchema } from './linkGroup';
import { SimpleLinkSchema } from './simpleLink';

/** Details a link group, which defines issue operations. */
export const LinkGroupSchema = z.object({
  groups: z.array(LinkGroupSchema).optional(),
  header: SimpleLinkSchema.optional(),
  id: z.string().optional(),
  links: z.array(SimpleLinkSchema).optional(),
  styleClass: z.string().optional(),
  weight: z.number().int().optional(),
});

export type LinkGroup = z.infer<typeof LinkGroupSchema>;
