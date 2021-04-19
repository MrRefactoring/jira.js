import { ConnectModule } from './connectModule';

export interface ConnectModules {
  /** A list of app modules in the same format as the `modules` property in the
   [app descriptor](https://developer.atlassian.com/cloud/jira/platform/app-descriptor/). */
  modules: ConnectModule[];
}
