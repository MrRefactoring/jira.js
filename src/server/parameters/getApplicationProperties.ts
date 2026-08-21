import { z } from 'zod';

export const GetApplicationPropertiesSchema = z.object({
  /**
   * When fetching a list specifies the permission level of all items in the list see
   * {@link com.atlassian.jira.bc.admin.ApplicationPropertiesService.EditPermissionLevel}
   */
  permissionLevel: z.string().optional(),
  /**
   * When fetching a list allows the list to be filtered by the property's start of key e.g. "jira.lf.*" whould fetch
   * only those permissions that are editable and whose keys start with * "jira.lf.". This is a regex.
   */
  keyFilter: z.string().optional(),
  /** A String containing the property key. */
  key: z.string().optional(),
});

export type GetApplicationProperties = z.input<typeof GetApplicationPropertiesSchema>;
