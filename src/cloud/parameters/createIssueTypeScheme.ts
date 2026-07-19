import { z } from 'zod';
import { IssueTypeSchemeDetailsSchema } from '../models';

export const CreateIssueTypeSchemeSchema = z.object({}).extend(IssueTypeSchemeDetailsSchema.shape);

export type CreateIssueTypeScheme = z.input<typeof CreateIssueTypeSchemeSchema>;
