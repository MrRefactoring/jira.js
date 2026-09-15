import { z } from 'zod';
import { apiObject } from '#/core';

/** Classification mapping for classifications in source issues to respective target classification. */
export const TargetClassificationSchema = apiObject({
  /**
   * An object with the key as the ID of the target classification and value with the list of the IDs of the current
   * source classifications.
   */
  classifications: z.record(z.string(), z.array(z.string())),
  /** ID of the source issueType to which issues present in `issueIdOrKeys` belongs. */
  issueType: z.string().optional(),
  /** ID or key of the source project to which issues present in `issueIdOrKeys` belongs. */
  projectKeyOrId: z.string().optional(),
});

export type TargetClassification = z.infer<typeof TargetClassificationSchema>;

/**
 * @deprecated Renamed to `TargetClassificationSchema`, which describes the same shape. This alias is removed in the
 *   next major version.
 */
export const targetClassificationSchema = TargetClassificationSchema;

/**
 * @deprecated Renamed to `TargetClassification`, which describes the same shape. This alias is removed in the next
 *   major version.
 */
export type targetClassification = TargetClassification;
