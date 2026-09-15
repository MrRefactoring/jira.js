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
  [key: string]: unknown;
}

export interface LinkGroupInput {
  groups?: LinkGroupInput[];
  header?: z.input<typeof SimpleLinkSchema>;
  id?: string;
  links?: z.input<typeof SimpleLinkSchema>[];
  styleClass?: string;
  weight?: number;
}

export const LinkGroupSchema: z.ZodType<LinkGroup, LinkGroupInput> = apiObject({
  groups: z.array(z.lazy(() => LinkGroupSchema)).optional(),
  header: SimpleLinkSchema.optional(),
  id: z.string().optional(),
  links: z.array(SimpleLinkSchema).optional(),
  styleClass: z.string().optional(),
  weight: z.number().optional(),
});
