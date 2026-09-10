import { z } from 'zod';
import { apiObject } from '#/core';

export const EventActionModelSchema = apiObject({
  /** Unique identifier of the event action object. */
  id: z.string(),
  /** Type name of this object. */
  type: z.string(),
  /** Attributes of this object. */
  attributes: apiObject({
    /** Display name of the event action. */
    displayName: z.string(),
    /** Display name of the event action group. */
    groupDisplayName: z.string().optional(),
    groupDisplayNames: z.array(z.string()).optional(),
  }),
  links: z.record(z.string(), z.any()).optional(),
  message: z.unknown().optional(),
});

export type EventActionModel = z.infer<typeof EventActionModelSchema>;
