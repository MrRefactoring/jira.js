import { z } from 'zod';
import { ProjectAndIssueTypePairSchema } from './projectAndIssueTypePair';

/** A reference to the location of the error. This will be null if the error does not refer to a specific element. */
export const WorkflowElementReferenceSchema = z.object({
  /** A property key. */
  propertyKey: z.string().optional(),
  /** A rule ID. */
  ruleId: z.string().optional(),
  statusMappingReference: ProjectAndIssueTypePairSchema.optional(),
  /** A status reference. */
  statusReference: z.string().optional(),
  /** A transition ID. */
  transitionId: z.string().optional(),
});

export type WorkflowElementReference = z.infer<typeof WorkflowElementReferenceSchema>;
