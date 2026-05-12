import { z } from 'zod';

/** An ordered list of custom field option IDs and information on where to move them. */
export const OrderOfCustomFieldOptionsSchema = z.object({
  /**
   * The ID of the custom field option or cascading option to place the moved options after. Required if `position`
   * isn't provided.
   */
  after: z.string().optional(),
  /**
   * A list of IDs of custom field options to move. The order of the custom field option IDs in the list is the order
   * they are given after the move. The list must contain custom field options or cascading options, but not both.
   */
  customFieldOptionIds: z.array(z.string()),
  /** The position the custom field options should be moved to. Required if `after` isn't provided. */
  position: z.enum(['First', 'Last']).optional(),
});

export type OrderOfCustomFieldOptions = z.infer<typeof OrderOfCustomFieldOptionsSchema>;
