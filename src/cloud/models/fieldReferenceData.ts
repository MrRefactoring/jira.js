import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
/** Details of a field that can be used in advanced searches. */

export const FieldReferenceDataSchema = apiObject({
  /** Whether the field provide auto-complete suggestions. */
  auto: openEnum(['true', 'false']).optional(),
  /** If the item is a custom field, the ID of the custom field. */
  cfid: z.string().optional(),
  /** Whether this field has been deprecated. */
  deprecated: openEnum(['true', 'false']).optional(),
  /** The searcher key of the field, only passed when the field is deprecated. */
  deprecatedSearcherKey: z.string().optional(),
  /**
   * The display name contains the following:
   *
   * - For system fields, the field name. For example, `Summary`.
   * - For collapsed custom fields, the field name followed by a hyphen and then the field name and field type. For
   *   example, `Component - Component[Dropdown]`.
   * - For other custom fields, the field name followed by a hyphen and then the custom field ID. For example, `Component
   *
   *   - Cf[10061]`.
   */
  displayName: z.string().optional(),
  /** The valid search operators for the field. */
  operators: z.array(z.string()).optional(),
  /** Whether the field can be used in a query's `ORDER BY` clause. */
  orderable: openEnum(['true', 'false']).optional(),
  /** Whether the content of this field can be searched. */
  searchable: openEnum(['true', 'false']).optional(),
  /** The data types of items in the field. */
  types: z.array(z.string()).optional(),
  /** The field identifier. */
  value: z.string().optional(),
});

export type FieldReferenceData = z.infer<typeof FieldReferenceDataSchema>;
