import { z } from 'zod';
import { HistoryMetadataSchema } from '#/models/historyMetadata';
import { EntityPropertySchema } from '#/models/entityProperty';
import { IssueTransitionSchema } from '#/models/issueTransition';

/** Details of an issue update request. */
export const IssueUpdateDetailsSchema = z.object({
  /**
   * List of issue screen fields to update, specifying the sub-field to update and its value for each field. This field
   * provides a straightforward option when setting a sub-field. When multiple sub-fields or other operations are
   * required, use `update`. Fields included in here cannot be included in `update`.
   */
  fields: z.record(z.string(), z.any()).optional(),
  historyMetadata: HistoryMetadataSchema.optional(),
  /** Details of issue properties to be add or update. */
  properties: z.array(EntityPropertySchema).optional(),
  transition: IssueTransitionSchema.optional(),
  /**
   * A Map containing the field field name and a list of operations to perform on the issue screen field. Note that
   * fields included in here cannot be included in `fields`.
   */
  update: z.record(z.string(), z.any()).optional(),
});

export type IssueUpdateDetails = z.infer<typeof IssueUpdateDetailsSchema>;
