import { z } from 'zod';
import { apiObject } from '#/core';

export const ApplicationErrorSchema = apiObject({
  /** A unique identifier for this particular occurrence of the error. */
  id: z.string().optional(),
  /** The HTTP status code applicable to this error. */
  status: z.string().optional(),
  /**
   * An application-specific error code:
   *
   * - `ADMIN-400-1` - Invalid page cursor
   * - `ADMIN-400-2` - Invalid domain identifier
   * - `ADMIN-400-3` - Invalid time date
   * - `ADMIN-400-4` - Invalid resource
   * - `ADMIN-400-24` - Invalid request body
   * - `ADMIN-400-32` - Too many license breaches
   * - `ADMIN-403-3` - Not allowed to manage the org
   * - `ADMIN-403-5` - Not allowed to manage the group
   * - `ADMIN-403-6` - Not allowed to delete group with default-role attribute
   * - `ADMIN-403-7` - Not allowed to delete group which grants admin access to a product or org
   * - `ADMIN-404-1` - Unknown resource
   * - `ADMIN-404-2` - Organization not found
   * - `ADMIN-404-3` - Domain not found
   * - `ADMIN-404-4` - Event not found
   * - `ADMIN-404-5` - Policy not found
   * - `ADMIN-404-8` - User not found
   * - `ADMIN-404-10` - Group not found
   * - `ADMIN-405-1` - Method not supported
   * - `ADMIN-409-3` - License limit exceeded
   * - `ADMIN-409-5` - Group not empty
   * - `ADMIN-409-28` - Conflict
   * - `ADMIN-429-1` - Rate limit exceeded
   * - `ADMIN-500-1` - Internal error
   */
  code: z.string().optional(),
  /** Human-readable summary of the error. */
  title: z.string().optional(),
  /** Human-readable explanation specific to this occurrence of the error, and a suggested action to resolve it. */
  detail: z.string().optional(),
});

export type ApplicationError = z.infer<typeof ApplicationErrorSchema>;
