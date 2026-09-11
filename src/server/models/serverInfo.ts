import { z } from 'zod';
import { apiObject } from '#/core';

export const ServerInfoSchema = apiObject({
  baseUrl: z.string(),
  version: z.string(),
  versionNumbers: z.array(z.number()),
  deploymentType: z.string(),
  buildNumber: z.number().optional(),
  buildDate: z.string().optional(),
  databaseBuildNumber: z.number().optional(),
  serverTime: z.string().optional(),
  scmInfo: z.string().optional(),
  serverTitle: z.string().optional(),
});

export type ServerInfo = z.infer<typeof ServerInfoSchema>;
