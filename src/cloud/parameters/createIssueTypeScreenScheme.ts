import { z } from 'zod';
import { IssueTypeScreenSchemeDetailsSchema } from '../models';

export const CreateIssueTypeScreenSchemeSchema = z.object({}).extend(IssueTypeScreenSchemeDetailsSchema.shape);

export type CreateIssueTypeScreenScheme = z.input<typeof CreateIssueTypeScreenSchemeSchema>;
