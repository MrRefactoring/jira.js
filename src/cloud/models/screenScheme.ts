import { z } from 'zod';
import { apiObject } from '#/core';
import { PageIssueTypeScreenSchemeSchema } from './pageIssueTypeScreenScheme';
import { ScreenTypesSchema } from './screenTypes';
/** A screen scheme. */

export const ScreenSchemeSchema = apiObject({
  /** The description of the screen scheme. */
  description: z.string().optional(),
  /** The ID of the screen scheme. */
  id: z.number().optional(),
  issueTypeScreenSchemes: PageIssueTypeScreenSchemeSchema.optional(),
  /** The name of the screen scheme. */
  name: z.string().optional(),
  screens: ScreenTypesSchema.optional(),
});

export type ScreenScheme = z.infer<typeof ScreenSchemeSchema>;
