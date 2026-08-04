import { z } from 'zod';
import { RemoteIssueLinkSchema } from './remoteIssueLink';

export const GetRemoteIssueLinksSchema = z.union([z.array(RemoteIssueLinkSchema), RemoteIssueLinkSchema]);

export type GetRemoteIssueLinks = z.infer<typeof GetRemoteIssueLinksSchema>;
