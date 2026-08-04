import { z } from 'zod';
import { ConnectCustomFieldValuesSchema } from '../models';

export const UpdateIssueFieldsSchema = z.object({}).extend(ConnectCustomFieldValuesSchema.shape).extend({
  /** The ID of the transfer. */
  'Atlassian-Transfer-Id': z.string(),
});

export type UpdateIssueFields = z.input<typeof UpdateIssueFieldsSchema>;
