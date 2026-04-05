import { z } from 'zod';

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
export const LinkGroupSchema: z.ZodType<LinkGroup> = z.object({
  groups: z.array(z.lazy(() => LinkGroupSchema)).optional(),
  /** Details about the operations available in this version. */
  header: z
    .object({
      href: z.string().optional(),
      iconClass: z.string().optional(),
      id: z.string().optional(),
      label: z.string().optional(),
      styleClass: z.string().optional(),
      title: z.string().optional(),
      weight: z.number().optional(),
    })
    .optional(),
  id: z.string().optional(),
  links: z
    .array(
      z.object({
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
