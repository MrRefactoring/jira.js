import { z } from 'zod';
import { IssueTypeCreateSchema } from '../models';

export const CreateIssueTypeSchema = z.object({}).extend(IssueTypeCreateSchema.shape);

export type CreateIssueType = z.input<typeof CreateIssueTypeSchema>;
