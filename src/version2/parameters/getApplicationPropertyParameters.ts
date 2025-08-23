import { z } from 'zod';

export const GetApplicationPropertyParametersSchema = z.object({
  /** The key of the application property. */
  key: z.string().optional(),
  /** The permission level of all items being returned in the list. */
  permissionLevel: z.string().optional(),
  /**
   * When a `key` isn't provided, this filters the list of results by the application property `key` using a regular
   * expression. For example, using `jira.lf.*` will return all application properties with keys that start with
   * _jira.lf._.
   */
  keyFilter: z.string().optional(),
});

export type GetApplicationPropertyParameters = z.infer<typeof GetApplicationPropertyParametersSchema>;
