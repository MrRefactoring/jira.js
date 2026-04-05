import { z } from 'zod';
import { WorkflowRulesSearchSchema } from '../models';

export const WorkflowRuleSearchSchema = z
  .object({
    /** The app migration transfer ID. */
    'Atlassian-Transfer-Id': z.string(),
  })
  .extend(WorkflowRulesSearchSchema.shape);

export type WorkflowRuleSearch = z.input<typeof WorkflowRuleSearchSchema>;
