import { z } from 'zod';
import { ConnectModuleSchema } from './connectModule';

export const ConnectModulesSchema = z.object({
  /**
   * A list of app modules in the same format as the `modules` property in the [app
   * descriptor](https://developer.atlassian.com/cloud/jira/platform/app-descriptor/).
   */
  modules: z.array(ConnectModuleSchema),
});

export type ConnectModules = z.infer<typeof ConnectModulesSchema>;
