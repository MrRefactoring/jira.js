import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { SandboxSchema } from './sandbox';
import { LinkSelfModelSchema } from './linkSelfModel';

export const WorkspaceModelSchema = apiObject({
  id: z.string().optional(),
  type: z.string().optional(),
  attributes: apiObject({
    name: z.string().optional(),
    typeKey: z.string().optional(),
    type: z.string().optional(),
    owner: z.string().nullish(),
    status: openEnum(['online', 'offline', 'deprecated']).optional(),
    statusDetails: z.array(z.string()).optional(),
    icons: z.record(z.string(), z.any()).optional(),
    avatars: z.record(z.string(), z.any()).optional(),
    labels: z.array(z.string()).optional(),
    sandbox: SandboxSchema.optional(),
    /**
     * The maximum number of active users/seats allowed for the workspace (soft limit). Only populated for Bitbucket
     * workspaces. Not available for other workspace types
     */
    usage: z.number().nullish(),
    /**
     * The maximum number of users/seats allowed for the workspace. Populated for Bitbucket workspaces. May also be
     * present for sited workspaces (e.g. Jira, Confluence) when license data is available. Not available for Trello
     * workspaces.
     */
    capacity: z.number().nullish(),
    /**
     * The ISO 8601 timestamp indicating when the workspace was created (activated). Only populated populated for sited
     * workspaces (e.g. Jira, Confluence) when created at timestamp is available. Not available for Bitbucket or Trello
     * workspaces.
     */
    createdAt: z.string().nullish(),
    /**
     * The ARI (Atlassian Resource Identifier) of the Atlassian account that created the workspace. Only populated for
     * sited workspaces (e.g. Jira, Confluence) when a creator account identifier is available. Not available for
     * Bitbucket or Trello workspaces.
     */
    createdBy: z.string().nullish(),
    /**
     * The ISO 8601 timestamp indicating when the workspace was last updated. This field is not populated for any
     * workspace type and will always be absent.
     */
    updatedAt: z.string().nullish(),
    hostUrl: z.string().nullish(),
    realm: z.string().optional(),
    regions: z.array(z.string()).optional(),
  }).optional(),
  links: LinkSelfModelSchema.optional(),
  relationships: z.record(z.string(), z.any()).optional(),
});

export type WorkspaceModel = z.infer<typeof WorkspaceModelSchema>;
