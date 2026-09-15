import { z } from 'zod';
import { apiObject } from '#/core';

export const ForgePanelProjectPinStatusRequestSchema = apiObject({
  /**
   * The moduleId of the Forge panel in the format
   * `ari:cloud:ecosystem::extension/{app-id}/{environment-id}/static/{module-key}`
   */
  moduleId: z.string(),
  /** The IDs or keys of the projects to check the issue panel pin status for. */
  projectList: z.array(z.string()),
});

export type ForgePanelProjectPinStatusRequest = z.infer<typeof ForgePanelProjectPinStatusRequestSchema>;
