import { z } from 'zod';

/** The default value for a multiple version picker custom field. */
export const CustomFieldContextDefaultValueMultipleVersionPickerSchema = z.object({
  type: z.string(),
  /** The IDs of the default versions. */
  versionIds: z.array(z.string()),
  /**
   * The order the pickable versions are displayed in. If not provided, the released-first order is used. Available
   * version orders are `"releasedFirst"` and `"unreleasedFirst"`.
   */
  versionOrder: z.string().optional(),
});

export type CustomFieldContextDefaultValueMultipleVersionPicker = z.infer<
  typeof CustomFieldContextDefaultValueMultipleVersionPickerSchema
>;
