import type { z } from 'zod';
import { apiObject } from '#/core';
import { EventModelSchema } from './eventModel';

export const EventSchema = apiObject({
  data: EventModelSchema.optional(),
});

export type Event = z.infer<typeof EventSchema>;
