import { z } from 'zod';
import { IssuesJqlMetaDataBeanSchema } from './issuesJqlMetaDataBean';

/** Meta data describing the `issues` context variable. */
export const IssuesMetaBeanSchema = z.object({
  jql: IssuesJqlMetaDataBeanSchema.optional(),
});

export type IssuesMetaBean = z.infer<typeof IssuesMetaBeanSchema>;
