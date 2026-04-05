import { z } from 'zod';
import { ProjectPinActionSchema } from '#/models/projectPinAction';

export const ForgePanelProjectPinRequestSchema = z.object({
  /**
   * The moduleId of the Forge panel in the format
   * `ari:cloud:ecosystem::extension/{app-id}/{environment-id}/static/{module-key}`
   */
  moduleId: z.string(),
  /** The list of projects to pin or unpin the issue panel to or from. */
  projectList: z.array(ProjectPinActionSchema),
});

export type ForgePanelProjectPinRequest = z.infer<typeof ForgePanelProjectPinRequestSchema>;
