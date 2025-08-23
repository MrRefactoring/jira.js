import { z } from 'zod';

/** The default value for a version picker custom field. */
export const CustomFieldContextDefaultValueSingleVersionPickerSchema = z.object({
  type: z.string(),
  /** The ID of the default version. */
  versionId: z.string(),
  /**
   * The order the pickable versions are displayed in. If not provided, the released-first order is used. Available
   * version orders are `"releasedFirst"` and `"unreleasedFirst"`.
   */
  versionOrder: z.string().optional(),
});

export type CustomFieldContextDefaultValueSingleVersionPicker = z.infer<
  typeof CustomFieldContextDefaultValueSingleVersionPickerSchema
>;
