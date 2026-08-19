import { z } from 'zod';
import { WorkflowSchemeProjectAssociationSchema } from '../models';

export const AssignSchemeToProjectSchema = z.object(WorkflowSchemeProjectAssociationSchema.shape);

export type AssignSchemeToProject = z.input<typeof AssignSchemeToProjectSchema>;
