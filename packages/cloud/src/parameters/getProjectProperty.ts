import { z } from 'zod';

export const GetProjectPropertySchema = z.object({
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: z.string(),
  /**
   * The project property key. Use [Get project property
   * keys](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project/#api-rest-api-3-project-projectIdOrKey-properties-get)
   * to get a list of all project property keys.
   */
  propertyKey: z.string(),
});

export type GetProjectProperty = z.input<typeof GetProjectPropertySchema>;
