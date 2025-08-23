import { z } from 'zod';
import { IssueTypeScreenSchemeMappingSchema } from './issueTypeScreenSchemeMapping';

export const AppendMappingsForIssueTypeScreenSchemeParametersSchema = z.object({
  /** The ID of the issue type screen scheme. */
  issueTypeScreenSchemeId: z.string(),
  /**
   * The list of issue type to screen scheme mappings. A _default_ entry cannot be specified because a default entry is
   * added when an issue type screen scheme is created.
   */
  issueTypeMappings: z.array(IssueTypeScreenSchemeMappingSchema),
});

export type AppendMappingsForIssueTypeScreenSchemeParameters = z.infer<
  typeof AppendMappingsForIssueTypeScreenSchemeParametersSchema
>;
