import { z } from 'zod';
import { IssueTypeScreenSchemeProjectAssociationSchema } from '../models';

export const AssignIssueTypeScreenSchemeToProjectSchema = z
  .object({})
  .extend(IssueTypeScreenSchemeProjectAssociationSchema.shape);

export type AssignIssueTypeScreenSchemeToProject = z.input<typeof AssignIssueTypeScreenSchemeToProjectSchema>;
