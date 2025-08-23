import { z } from 'zod';
import { CustomFieldReplacementSchema } from './customFieldReplacement';

export const DeleteAndReplaceVersionBeanSchema = z.object({
  /**
   * An array of custom field IDs (`customFieldId`) and version IDs (`moveTo`) to update when the fields contain the
   * deleted version.
   */
  customFieldReplacementList: z.array(CustomFieldReplacementSchema).optional(),
  /** The ID of the version to update `affectedVersion` to when the field contains the deleted version. */
  moveAffectedIssuesTo: z.number().int().optional(),
  /** The ID of the version to update `fixVersion` to when the field contains the deleted version. */
  moveFixIssuesTo: z.number().int().optional(),
});

export type DeleteAndReplaceVersionBean = z.infer<typeof DeleteAndReplaceVersionBeanSchema>;
