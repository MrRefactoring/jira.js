import { z } from 'zod';
import { WorkflowSchemeProjectAssociationSchema } from '../models';

export const AssignSchemeToProjectSchema = z.object({}).extend(WorkflowSchemeProjectAssociationSchema.shape);

export type AssignSchemeToProject = z.input<typeof AssignSchemeToProjectSchema>;
