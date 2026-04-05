import { z } from 'zod';
import { IssuesJqlMetaDataSchema } from '#/models/issuesJqlMetaData';

/** Meta data describing the `issues` context variable. */
export const IssuesMetaSchema = z.object({
  jql: IssuesJqlMetaDataSchema.optional(),
});

export type IssuesMeta = z.infer<typeof IssuesMetaSchema>;
