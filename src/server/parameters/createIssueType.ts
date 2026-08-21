import { z } from 'zod';
import { IssueTypeCreateSchema } from '../models';

export const CreateIssueTypeSchema = z.object(IssueTypeCreateSchema.shape);

export type CreateIssueType = z.input<typeof CreateIssueTypeSchema>;
