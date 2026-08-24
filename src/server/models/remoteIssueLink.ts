import type { z } from 'zod';
import { apiObject } from '#/core';

export const RemoteIssueLinkSchema = apiObject({});

export type RemoteIssueLink = z.infer<typeof RemoteIssueLinkSchema>;
