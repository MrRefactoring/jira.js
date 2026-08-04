import { z } from 'zod';
import { apiObject } from '#/core';
/** The IDs of the screen schemes for the issue type IDs. */

export const IssueTypeScreenSchemeMappingSchema = apiObject({
  /**
   * The ID of the issue type or _default_. Only issue types used in classic projects are accepted. An entry for
   * _default_ must be provided and defines the mapping for all issue types without a screen scheme.
   */
  issueTypeId: z.string(),
  /** The ID of the screen scheme. Only screen schemes used in classic projects are accepted. */
  screenSchemeId: z.string(),
});

export type IssueTypeScreenSchemeMapping = z.infer<typeof IssueTypeScreenSchemeMappingSchema>;
