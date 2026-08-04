import { z } from 'zod';
import { IssueTypeSchemeProjectAssociationSchema } from '../models';

export const AssignIssueTypeSchemeToProjectSchema = z.object({}).extend(IssueTypeSchemeProjectAssociationSchema.shape);

export type AssignIssueTypeSchemeToProject = z.input<typeof AssignIssueTypeSchemeToProjectSchema>;
