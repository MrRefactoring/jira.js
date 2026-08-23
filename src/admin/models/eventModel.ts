import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { EventActorModelSchema } from './eventActorModel';
import { EventObjectModelSchema } from './eventObjectModel';
import { EventLocationModelSchema } from './eventLocationModel';
import { LinkSelfModelSchema } from './linkSelfModel';
import { EventMessageModelSchema } from './eventMessageModel';

export const EventModelSchema = apiObject({
  /** Unique identifier of the Event */
  id: z.string(),
  /** Type name of this object */
  type: openEnum(['events']),
  /** Attributes of this object */
  attributes: apiObject({
    /** The date and time of the event */
    time: z.coerce.date(),
    /** Kind of Event. Complete list see `event-actions` API. */
    action: z.string(),
    actor: EventActorModelSchema,
    /**
     * Describes one or more entities that the action was performed against. This field describes the "what" of the
     * event.
     */
    context: z.array(EventObjectModelSchema),
    /** Describes the location where the action was performed. This field describes the "where" of the event. */
    container: z.array(EventObjectModelSchema).optional(),
    location: EventLocationModelSchema.optional(),
  }),
  links: LinkSelfModelSchema,
  message: EventMessageModelSchema.optional(),
});

export type EventModel = z.infer<typeof EventModelSchema>;
