import { z } from 'zod';
import { apiObject } from '#/core';

/** The pin status of an issue panel (added by a Forge app) for a single project. */
export const ForgePanelProjectPinStatusSchema = apiObject({
  /** The reason the pin status could not be read for the project. Null if the pin status was read successfully. */
  error: z.string().nullish(),
  /** Whether the issue panel is currently pinned to the project. */
  pinned: z.boolean().optional(),
  /** The time the issue panel was pinned to the project, in epoch milliseconds. */
  pinnedAt: z.number().optional(),
  /** The project ID or key supplied in the request. */
  projectIdOrKey: z.string().optional(),
});

export type ForgePanelProjectPinStatus = z.infer<typeof ForgePanelProjectPinStatusSchema>;
