import type { z } from 'zod';
import { apiObject } from '#/core';
/**
 * A [Connect module](https://developer.atlassian.com/cloud/jira/platform/about-jira-modules/) in the same format as in
 * the* [app descriptor](https://developer.atlassian.com/cloud/jira/platform/app-descriptor/).
 */

export const ConnectModuleSchema = apiObject({});

export type ConnectModule = z.infer<typeof ConnectModuleSchema>;
