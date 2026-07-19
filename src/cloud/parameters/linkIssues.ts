import { z } from 'zod';
import { LinkIssueRequestJsonSchema } from '../models';

export const LinkIssuesSchema = z.object({}).extend(LinkIssueRequestJsonSchema.shape);

export type LinkIssues = z.input<typeof LinkIssuesSchema>;
