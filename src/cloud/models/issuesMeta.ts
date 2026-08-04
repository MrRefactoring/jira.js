import type { z } from 'zod';
import { apiObject } from '#/core';
import { IssuesJqlMetaDataSchema } from './issuesJqlMetaData';
/** Meta data describing the `issues` context variable. */

export const IssuesMetaSchema = apiObject({
  jql: IssuesJqlMetaDataSchema.optional(),
});

export type IssuesMeta = z.infer<typeof IssuesMetaSchema>;
