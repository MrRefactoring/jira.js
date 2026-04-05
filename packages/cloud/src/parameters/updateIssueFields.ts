import { z } from 'zod';
import { ConnectCustomFieldValuesSchema } from '../models';

export const UpdateIssueFieldsSchema = z
  .object({
    /** The ID of the transfer. */
    'Atlassian-Transfer-Id': z.string(),
  })
  .extend(ConnectCustomFieldValuesSchema.shape);

export type UpdateIssueFields = z.input<typeof UpdateIssueFieldsSchema>;
