import { z } from 'zod';
import { apiObject } from '#/core';
import { IssueTypeScreenSchemeMappingSchema } from './issueTypeScreenSchemeMapping';
/** A list of issue type screen scheme mappings. */

export const IssueTypeScreenSchemeMappingDetailsSchema = apiObject({
  /**
   * The list of issue type to screen scheme mappings. A _default_ entry cannot be specified because a default entry is
   * added when an issue type screen scheme is created.
   */
  issueTypeMappings: z.array(IssueTypeScreenSchemeMappingSchema),
});

export type IssueTypeScreenSchemeMappingDetails = z.infer<typeof IssueTypeScreenSchemeMappingDetailsSchema>;
