import { z } from 'zod';

export const AttachTemporaryFileSchema = z.object({
  /**
   * The ID of the Service Desk to which the file will be attached. This can alternatively be a [project
   * identifier.](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#project-identifiers)
   */
  serviceDeskId: z.string(),
  body: z.record(z.string(), z.any()),
});

export type AttachTemporaryFile = z.input<typeof AttachTemporaryFileSchema>;
