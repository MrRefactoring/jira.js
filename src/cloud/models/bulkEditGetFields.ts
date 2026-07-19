import { z } from 'zod';
import { apiObject } from '#/core';
import { IssueBulkEditFieldSchema } from './issueBulkEditField';
/** Bulk Edit Get Fields Response. */

export const BulkEditGetFieldsSchema = apiObject({
  /** The end cursor for use in pagination. */
  endingBefore: z.string().optional(),
  /** List of all the fields */
  fields: z.array(IssueBulkEditFieldSchema).optional(),
  /** The start cursor for use in pagination. */
  startingAfter: z.string().optional(),
});

export type BulkEditGetFields = z.infer<typeof BulkEditGetFieldsSchema>;
