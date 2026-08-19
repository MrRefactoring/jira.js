import { z } from 'zod';
import { ColumnRequestBodySchema } from '../models';

export const SetIssueNavigatorDefaultColumnsSchema = z.object(ColumnRequestBodySchema.shape);

export type SetIssueNavigatorDefaultColumns = z.input<typeof SetIssueNavigatorDefaultColumnsSchema>;
