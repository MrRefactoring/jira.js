import { z } from 'zod';
import { WorkflowMappingSchema } from './workflowMapping';

export const GetWorkflowSchema = z.union([WorkflowMappingSchema, z.array(WorkflowMappingSchema)]);

export type GetWorkflow = z.infer<typeof GetWorkflowSchema>;
