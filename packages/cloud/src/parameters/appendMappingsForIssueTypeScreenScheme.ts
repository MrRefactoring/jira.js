import { z } from 'zod';
import { IssueTypeScreenSchemeMappingDetailsSchema } from '../models';

export const AppendMappingsForIssueTypeScreenSchemeSchema = z
  .object({
    /** The ID of the issue type screen scheme. */
    issueTypeScreenSchemeId: z.string(),
  })
  .extend(IssueTypeScreenSchemeMappingDetailsSchema.shape);

export type AppendMappingsForIssueTypeScreenScheme = z.input<typeof AppendMappingsForIssueTypeScreenSchemeSchema>;
