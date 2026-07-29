import { z } from 'zod';
import { apiObject } from '#/core';
/** The default value for a version picker custom field. */

export const CustomFieldContextDefaultValueSingleVersionPickerSchema = apiObject({
  /** The ID of the context. */
  contextId: z.string(),
  type: z.enum(['version.single']),
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
