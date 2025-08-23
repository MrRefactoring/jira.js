import { z } from 'zod';
import { EntityPropertySchema } from './entityProperty';

export const CreateIssueParametersSchema = z.object({
  /**
   * Whether the project in which the issue is created is added to the user's **Recently viewed** project list, as shown
   * under **Projects** in Jira. When provided, the issue type and request type are added to the user's history for a
   * project. These values are then used to provide defaults on the issue create screen.
   */
  updateHistory: z.boolean().optional(),
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

export type CreateIssueParameters = z.infer<typeof CreateIssueParametersSchema>;
