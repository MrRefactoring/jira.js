import { z } from 'zod';
import { apiObject } from '#/core';
/** Details of an insight workspace ID. */

export const InsightWorkspaceSchema = apiObject({
  /** The workspace ID used as the identifier to access the Insight REST API. */
  workspaceId: z.string().optional(),
});

export type InsightWorkspace = z.infer<typeof InsightWorkspaceSchema>;
