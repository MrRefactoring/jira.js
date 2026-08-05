import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { WorkflowElementReferenceSchema } from './workflowElementReference';
/** The details about a workflow validation error. */

export const WorkflowValidationErrorSchema = apiObject({
  /** Additional details about the validation error. */
  additionalDetails: z.string().optional(),
  /** An error code. */
  code: z.string().optional(),
  elementReference: WorkflowElementReferenceSchema.optional(),
  /** The validation error level. */
  level: openEnum(['WARNING', 'ERROR']).optional(),
  /** An error message. */
  message: z.string().optional(),
  /** The type of element the error or warning references. */
  type: openEnum([
    'RULE',
    'STATUS',
    'STATUS_LAYOUT',
    'STATUS_PROPERTY',
    'WORKFLOW',
    'TRANSITION',
    'TRANSITION_PROPERTY',
    'SCOPE',
    'STATUS_MAPPING',
    'TRIGGER',
  ]).optional(),
});

export type WorkflowValidationError = z.infer<typeof WorkflowValidationErrorSchema>;
