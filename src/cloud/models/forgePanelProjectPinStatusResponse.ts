import { z } from 'zod';
import { apiObject } from '#/core';
import { ForgePanelProjectPinStatusSchema } from './forgePanelProjectPinStatus';

export const ForgePanelProjectPinStatusResponseSchema = apiObject({
  /** The moduleId of the Forge panel that was requested. */
  moduleId: z.string().optional(),
  /** The pin status of the issue panel, with one entry per requested project. */
  statuses: z.array(ForgePanelProjectPinStatusSchema).optional(),
});

export type ForgePanelProjectPinStatusResponse = z.infer<typeof ForgePanelProjectPinStatusResponseSchema>;
