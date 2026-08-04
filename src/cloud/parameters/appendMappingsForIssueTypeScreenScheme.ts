import { z } from 'zod';
import { IssueTypeScreenSchemeMappingDetailsSchema } from '../models';

export const AppendMappingsForIssueTypeScreenSchemeSchema = z
  .object({})
  .extend(IssueTypeScreenSchemeMappingDetailsSchema.shape)
  .extend({
    /** The ID of the issue type screen scheme. */
    issueTypeScreenSchemeId: z.string(),
  });

export type AppendMappingsForIssueTypeScreenScheme = z.input<typeof AppendMappingsForIssueTypeScreenSchemeSchema>;
