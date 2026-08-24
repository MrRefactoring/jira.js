import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const ImportScheduleResponseSchema = apiObject({
  /** The unique identifier of the import schedule */
  id: z.string().optional(),
  /** The ID of the associated import source */
  importSourceId: z.string().optional(),
  /** The start time of the schedule in ISO 8601 format */
  startTime: z.coerce.date().optional(),
  /** The frequency of the scheduled import */
  runInterval: openEnum(['ONCE', 'DAILY', 'WEEKLY', 'MONTHLY']).optional(),
  /** Timestamp when the schedule was created */
  created: z.coerce.date().optional(),
  /** Timestamp when the schedule was last updated */
  updated: z.coerce.date().optional(),
  /** The collection (object schema) ID associated with this import */
  collectionId: z.string().optional(),
});

export type ImportScheduleResponse = z.infer<typeof ImportScheduleResponseSchema>;
