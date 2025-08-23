import { z } from 'zod';
import { IssueTypeScreenSchemeMappingSchema } from './issueTypeScreenSchemeMapping';

/** The details of an issue type screen scheme. */
export const IssueTypeScreenSchemeDetailsSchema = z.object({
  /** The description of the issue type screen scheme. The maximum length is 255 characters. */
  description: z.string().optional(),
  /**
   * The IDs of the screen schemes for the issue type IDs and _default_. A _default_ entry is required to create an
   * issue type screen scheme, it defines the mapping for all issue types without a screen scheme.
   */
  issueTypeMappings: z.array(IssueTypeScreenSchemeMappingSchema),
  /** The name of the issue type screen scheme. The name must be unique. The maximum length is 255 characters. */
  name: z.string(),
});

export type IssueTypeScreenSchemeDetails = z.infer<typeof IssueTypeScreenSchemeDetailsSchema>;
