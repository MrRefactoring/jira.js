import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { GroupSortBySchema } from './groupSortBy';
/**
 * Filters for searching groups in a directory.*
 *
 * The request body is optional — sending an empty body returns the first page of all groups in the directory.*
 *
 * Use `expand` to include additional count fields. Other count toggles are not exposed on this endpoint; the `expand`
 * array is the only way to request `counts.resources` or `counts.users`.*
 */

export const MultiDirectoryGroupSearchRequestSchema = apiObject({
  /** Sets the starting point for the page of results to return. */
  cursor: z.string().optional(),
  /** The number of results to return per page. Defaults to 20. */
  limit: z.number().optional(),
  /** List of sort fields. Currently only a single sort field is supported. */
  sortBy: z.array(GroupSortBySchema).optional(),
  /** Filter by account IDs of group members. */
  accountIds: z.array(z.string()).optional(),
  /** Filter by directory IDs. */
  directoryIds: z.array(z.string()).optional(),
  /** Filter by canonical Atlassian role IDs. */
  roleIds: z.array(z.string()).optional(),
  /** Filter by resource type keys. */
  resourceOwners: z.array(z.string()).optional(),
  /** Filter by resource IDs. */
  resourceIds: z.array(z.string()).optional(),
  /**
   * Free-text search term. Matched against the group name.
   *
   * Mutually exclusive with `groupNames` — providing both returns a `400 Bad Request` error.
   */
  searchTerm: z.string().optional(),
  /**
   * Filter by group IDs.
   *
   * Mutually exclusive with `groupNames` — providing both returns a `400 Bad Request` error.
   */
  groupIds: z.array(z.string()).optional(),
  /**
   * List of full group names to filter by (case-insensitive). Only exact matches are returned.
   *
   * Mutually exclusive with `searchTerm` and `groupIds` — providing either combination returns a `400 Bad Request`
   * error.
   */
  groupNames: z.array(z.string()).optional(),
  /**
   * List of additional fields to include in the response. Available values:
   *
   * - `counts.resources` — the number of resources the group has access to.
   * - `counts.users` — the number of users in the group.
   */
  expand: z.array(openEnum(['counts.resources', 'counts.users'])).optional(),
});

export type MultiDirectoryGroupSearchRequest = z.infer<typeof MultiDirectoryGroupSearchRequestSchema>;
