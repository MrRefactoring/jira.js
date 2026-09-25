import { z } from 'zod';
import { apiObject } from '#/core';
import { requiredInResponse } from '#/core/compatibility';
import { WorkflowSchemeSchema } from './workflowScheme';

/** A workflow scheme along with a list of projects that use it. */
export const WorkflowSchemeAssociationsSchema = apiObject({
  /** The list of projects that use the workflow scheme. */
  projectIds: z.array(z.string()),
  workflowScheme: requiredInResponse(WorkflowSchemeSchema),
});

export type WorkflowSchemeAssociations = z.infer<typeof WorkflowSchemeAssociationsSchema>;
