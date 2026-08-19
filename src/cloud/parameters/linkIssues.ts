import { z } from 'zod';
import { LinkIssueRequestSchema } from '../models';

export const LinkIssuesSchema = z.object(LinkIssueRequestSchema.shape);

export type LinkIssues = z.input<typeof LinkIssuesSchema>;
