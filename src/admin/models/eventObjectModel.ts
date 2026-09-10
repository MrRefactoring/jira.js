import { z } from 'zod';
import { apiObject } from '#/core';
import { LinkSelfAltModelSchema } from './linkSelfAltModel';
import { LinkAltModelSchema } from './linkAltModel';

export const EventObjectModelSchema = apiObject({
  /** Unique identifier of the event object */
  id: z.string(),
  /** Type name of this object */
  type: z.string().optional(),
  /** Attributes of this object */
  attributes: z.record(z.string(), z.any()).optional(),
  links: z.union([LinkSelfAltModelSchema, LinkAltModelSchema]).optional(),
});

export type EventObjectModel = z.infer<typeof EventObjectModelSchema>;
