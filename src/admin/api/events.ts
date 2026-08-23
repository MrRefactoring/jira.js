import { EventPageSchema, type EventPage } from '../models/eventPage';
import { PollingEventPageSchema, type PollingEventPage } from '../models/pollingEventPage';
import { EventSchema, type Event } from '../models/event';
import { EventActionsSchema, type EventActions } from '../models/eventActions';
import type { GetEvents } from '../parameters/getEvents';
import type { PollEvents } from '../parameters/pollEvents';
import type { GetEventById } from '../parameters/getEventById';
import type { GetEventActions } from '../parameters/getEventActions';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Returns a filtered list of audit log events for an organization. Use this endpoint for more granular and detailed
 * querying.
 *
 * If you simply need to paginate through all events, consider using the
 * [/events-stream](https://developer.atlassian.com/cloud/admin/organization/rest/api-group-events/#api-v1-orgs-orgid-events-stream-get)
 * endpoint.
 *
 * These rate limits for this endpoint be lowered effective end of May 2025 as follows:
 *
 * - _Rate limit per user_: _10_ requests per minute
 * - _Rate limit per API path_: _10_ requests per minute
 *
 * Please migrate to the polling API to guarantee uninterrupted service for use cases involving a high request rate.
 *
 * #### Scopes
 *
 * **[Authorization scopes](/cloud/admin/scopes/) required:** `read:events:admin`
 */
export async function getEvents(client: Client, parameters: GetEvents, options?: RequestOptions): Promise<EventPage> {
  const config: SendRequestOptions<EventPage> = {
    url: `/admin/v1/orgs/${parameters.orgId}/events`,
    method: 'GET',
    searchParams: {
      cursor: parameters.cursor,
      q: parameters.q,
      from: parameters.from,
      to: parameters.to,
      action: parameters.action,
      actor: parameters.actor,
      ip: parameters.ip,
      product: parameters.product,
      location: parameters.location,
      limit: parameters.limit,
    },
    schema: EventPageSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a paginated list of audit logs events for an organization. Use this endpoint if you want to retrieve events
 * in a simple, paginated manner with time-based filtering.
 *
 * If you need more advanced filtering, refer to the
 * [/events](https://developer.atlassian.com/cloud/admin/organization/rest/api-group-events/#api-v1-orgs-orgid-events-get)
 * endpoint.
 *
 * #### Scopes
 *
 * **[Authorization scopes](/cloud/admin/scopes/) required:** `read:events:admin`
 */
export async function pollEvents(
  client: Client,
  parameters: PollEvents,
  options?: RequestOptions,
): Promise<PollingEventPage> {
  const config: SendRequestOptions<PollingEventPage> = {
    url: `/admin/v1/orgs/${parameters.orgId}/events-stream`,
    method: 'GET',
    searchParams: {
      cursor: parameters.cursor,
      from: parameters.from,
      to: parameters.to,
      limit: parameters.limit,
      sortOrder: parameters.sortOrder,
    },
    schema: PollingEventPageSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns information about a single event by ID.
 *
 * #### Scopes
 *
 * **[Authorization scopes](/cloud/admin/scopes/) required:** `read:events:admin`
 */
export async function getEventById(client: Client, parameters: GetEventById, options?: RequestOptions): Promise<Event> {
  const config: SendRequestOptions<Event> = {
    url: `/admin/v1/orgs/${parameters.orgId}/events/${parameters.eventId}`,
    method: 'GET',
    schema: EventSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns information localized event actions
 *
 * #### Scopes
 *
 * **[Authorization scopes](/cloud/admin/scopes/) required:** `read:events:admin`
 */
export async function getEventActions(
  client: Client,
  parameters: GetEventActions,
  options?: RequestOptions,
): Promise<EventActions> {
  const config: SendRequestOptions<EventActions> = {
    url: `/admin/v1/orgs/${parameters.orgId}/event-actions`,
    method: 'GET',
    schema: EventActionsSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
