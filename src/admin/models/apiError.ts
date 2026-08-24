import { z } from 'zod';
import { apiObject } from '#/core';

export const ApiErrorSchema = apiObject({
  /** A unique identifier for this particular occurrence of the error. */
  id: z.string().optional(),
  /**
   * The code of the error. It can be one of the following values: - ADMIN-UAM-400-1: Bad Request - ADMIN-UAM-400-2:
   * Inactive user - ADMIN-UAM-400-3: Invalid Role for Resource - ADMIN-UAM-400-4: Product not licensed -
   * ADMIN-UAM-401-1: Unauthenticated - ADMIN-UAM-401-2: Unauthorized - ADMIN-UAM-402-1: Payment Required -
   * ADMIN-UAM-403-1: Forbidden - ADMIN-UAM-403-2: Not allowed to manage the org - ADMIN-UAM-404-1: Unknown Resource -
   * ADMIN-UAM-404-2: Organization not found - ADMIN-UAM-404-3: Group Not Found - ADMIN-UAM-405-1: Method Not Supported
   *
   * - ADMIN-UAM-409-1: Cannot create default group - ADMIN-UAM-409-2: Resource Conflicts - ADMIN-UAM-409-3: Product
   *   License Limit Exceeded - ADMIN-UAM-415-1: Unsupported Media Type - ADMIN-UAM-500-1: Internal Error
   */
  code: z.string().optional(),
  /** The HTTP status code applicable to this error. */
  status: z.string().optional(),
  /** Human-readable summary of the error. */
  title: z.string().optional(),
  /** Human-readable explanation specific to this occurrence of the error, and a suggested action to resolve it. */
  detail: z.string().nullish(),
});

export type ApiError = z.infer<typeof ApiErrorSchema>;
