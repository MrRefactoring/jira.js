import { z } from 'zod';
import { StatusMigrationSchema } from '#/models/statusMigration';
import { WorkflowLayoutSchema } from '#/models/workflowLayout';
import { StatusMappingDTOSchema } from '#/models/statusMappingDTO';
import { StatusLayoutUpdateSchema } from '#/models/statusLayoutUpdate';
import { TransitionUpdateDTOSchema } from '#/models/transitionUpdateDTO';
import { DocumentVersionSchema } from '#/models/documentVersion';

/** The details of the workflows to update. */
export const WorkflowUpdateSchema = z.object({
  /** The mapping of old to new status ID. */
  defaultStatusMappings: z.array(StatusMigrationSchema).optional(),
  /** The new description for this workflow. */
  description: z.string().optional(),
  /** The ID of this workflow. */
  id: z.string(),
  loopedTransitionContainerLayout: WorkflowLayoutSchema.optional(),
  startPointLayout: WorkflowLayoutSchema.optional(),
  /** The mapping of old to new status ID for a specific project and issue type. */
  statusMappings: z.array(StatusMappingDTOSchema).optional(),
  /** The statuses associated with this workflow. */
  statuses: z.array(StatusLayoutUpdateSchema),
  /** The transitions of this workflow. */
  transitions: z.array(TransitionUpdateDTOSchema),
  version: DocumentVersionSchema,
});

export type WorkflowUpdate = z.infer<typeof WorkflowUpdateSchema>;
