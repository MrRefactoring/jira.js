import { z } from 'zod';
import { apiObject } from '#/core';
import { EventActionModelSchema } from './eventActionModel';

export const EventActionsSchema = apiObject({
  /** 0 or more values of event actions are returned. */
  data: z.array(EventActionModelSchema).optional(),
});

export type EventActions = z.infer<typeof EventActionsSchema>;
