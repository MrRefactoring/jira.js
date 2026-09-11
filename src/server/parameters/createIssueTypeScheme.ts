import { z } from 'zod';
import { IssueTypeSchemeCreateUpdateSchema } from '../models';

export const CreateIssueTypeSchemeSchema = z.object(IssueTypeSchemeCreateUpdateSchema.shape);

export type CreateIssueTypeScheme = z.input<typeof CreateIssueTypeSchemeSchema>;
