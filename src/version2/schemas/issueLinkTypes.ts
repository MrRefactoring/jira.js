import { z } from 'zod';
import { IssueLinkTypeSchema } from './issueLinkType';

/** A list of issue link type beans. */
export const IssueLinkTypesSchema = z.object({
  /** The issue link type bean. */
  issueLinkTypes: z.array(IssueLinkTypeSchema).optional(),
});

export type IssueLinkTypes = z.infer<typeof IssueLinkTypesSchema>;
