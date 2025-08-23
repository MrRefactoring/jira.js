import { z } from 'zod';
import { ConnectCustomFieldValueSchema } from './connectCustomFieldValue';

export const UpdateIssueFieldsParametersSchema = z.object({
  /** The ID of the transfer. */
  'Atlassian-Transfer-Id': z.string(),
  /** The list of custom field update details. */
  updateValueList: z.array(ConnectCustomFieldValueSchema).optional(),
});

export type UpdateIssueFieldsParameters = z.infer<typeof UpdateIssueFieldsParametersSchema>;
