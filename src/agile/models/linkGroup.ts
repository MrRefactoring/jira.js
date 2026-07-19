import { z } from 'zod';
import { apiObject } from '#/core';

export type LinkGroup = {
  groups?: LinkGroup[];
  header?: {
    href?: string;
    iconClass?: string;
    id?: string;
    label?: string;
    styleClass?: string;
    title?: string;
    weight?: number;
  };
  id?: string;
  links?: {
    href?: string;
    iconClass?: string;
    id?: string;
    label?: string;
    styleClass?: string;
    title?: string;
    weight?: number;
  }[];
  styleClass?: string;
  weight?: number;
};
/** Details a link group, which defines issue operations. */

export const LinkGroupSchema: z.ZodType<LinkGroup> = apiObject({
  groups: z.array(z.lazy(() => LinkGroupSchema)).optional(),
  /** Details about the operations available in this version. */
  header: apiObject({
    href: z.string().optional(),
    iconClass: z.string().optional(),
    id: z.string().optional(),
    label: z.string().optional(),
    styleClass: z.string().optional(),
    title: z.string().optional(),
    weight: z.number().optional(),
  }).optional(),
  id: z.string().optional(),
  links: z
    .array(
      apiObject({
        href: z.string().optional(),
        iconClass: z.string().optional(),
        id: z.string().optional(),
        label: z.string().optional(),
        styleClass: z.string().optional(),
        title: z.string().optional(),
        weight: z.number().optional(),
      }),
    )
    .optional(),
  styleClass: z.string().optional(),
  weight: z.number().optional(),
});
