import { z } from 'zod';
import { IssueTypeScreenSchemeDetailsSchema } from '../models';

export const CreateIssueTypeScreenSchemeSchema = z.object(IssueTypeScreenSchemeDetailsSchema.shape);

export type CreateIssueTypeScreenScheme = z.input<typeof CreateIssueTypeScreenSchemeSchema>;
