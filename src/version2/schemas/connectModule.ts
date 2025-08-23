import { z } from 'zod';

/**
 * A [Connect module](https://developer.atlassian.com/cloud/jira/platform/about-jira-modules/) in the same format as in
 * the
 *
 * - [app descriptor](https://developer.atlassian.com/cloud/jira/platform/app-descriptor/).
 */
export const ConnectModuleSchema = z.object({});

export type ConnectModule = z.infer<typeof ConnectModuleSchema>;
