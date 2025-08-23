import { z } from 'zod';
import { EntityPropertySchema } from './entityProperty';

/** Details of an issue update request. */
export const IssueUpdateDetailsSchema = z.object({
  /**
   * List of issue screen fields to update, specifying the sub-field to update and its value for each field. This field
   * provides a straightforward option when setting a sub-field. When multiple sub-fields or other operations are
   * required, use `update`. Fields included in here cannot be included in `update`.
   */
  fields: z.object({}).optional(),
  /** Additional issue history details. */
  historyMetadata: z.unknown().optional(),
  /** Details of issue properties to be add or update. */
  properties: z.array(EntityPropertySchema).optional(),
  /** Details of a transition. Required when performing a transition, optional when creating or editing an issue. */
  transition: z.unknown().optional(),
  /**
   * A Map containing the field field name and a list of operations to perform on the issue screen field. Note that
   * fields included in here cannot be included in `fields`.
   */
  update: z.object({}).optional(),
});

export type IssueUpdateDetails = z.infer<typeof IssueUpdateDetailsSchema>;
