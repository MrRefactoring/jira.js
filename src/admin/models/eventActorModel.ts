import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { LinkSelfModelSchema } from './linkSelfModel';
/** The entity that performed the action */

export const EventActorModelSchema = apiObject({
  /** Id of the Actor */
  id: z.string(),
  /** The display name of the Actor. */
  name: z.string().optional(),
  /** The email of the Actor. */
  email: z.string().optional(),
  /** Authentication used by the actor */
  auth: apiObject({
    /** The type of authentication used by the actor */
    authType: openEnum(['container-token', 'api-token', 'connect-token', 'auth-token-for-2LO', 'auth-token-for-3LO']),
    /** The id of the authentication token */
    tokenId: z.string().optional(),
    /** The label/name of the authentication token */
    tokenLabel: z.string().optional(),
  }).optional(),
  /** The user the actor is acting on behalf of */
  onBehalfOf: apiObject({
    /** Id of the user the actor is acting on behalf of */
    id: z.string(),
    /** The display name of the user the actor is acting on behalf of */
    name: z.string().optional(),
    /** The email of the user the actor is acting on behalf of */
    email: z.string().optional(),
  }).optional(),
  /** The app that triggered the action */
  app: apiObject({
    /** Unique identifier of the app */
    id: z.string(),
    /** Type of app */
    type: z.string().optional(),
    /** Attributes of this app */
    attributes: z.record(z.string(), z.any()).optional(),
  }).optional(),
  links: LinkSelfModelSchema.optional(),
});

export type EventActorModel = z.infer<typeof EventActorModelSchema>;
