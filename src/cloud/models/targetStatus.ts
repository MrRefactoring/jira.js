import { z } from 'zod';
import { apiObject } from '#/core';

/** Status mapping for statuses in source workflow to respective target status in target workflow. */
export const TargetStatusSchema = apiObject({
  /**
   * An object with the key as the ID of the target status and value with the list of the IDs of the current source
   * statuses.
   */
  statuses: z.record(z.string(), z.array(z.string())),
});

export type TargetStatus = z.infer<typeof TargetStatusSchema>;

/**
 * @deprecated Renamed to `TargetStatusSchema`, which describes the same shape. This alias is removed in the next major
 *   version.
 */
export const targetStatusSchema = TargetStatusSchema;

/**
 * @deprecated Renamed to `TargetStatus`, which describes the same shape. This alias is removed in the next major
 *   version.
 */
export type targetStatus = TargetStatus;
