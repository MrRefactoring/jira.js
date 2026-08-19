import { z } from 'zod';
import { WorkflowRulesSearchSchema } from '../models';

export const WorkflowRuleSearchSchema = z.object(WorkflowRulesSearchSchema.shape).extend({
  /** The app migration transfer ID. */
  'Atlassian-Transfer-Id': z.string(),
});

export type WorkflowRuleSearch = z.input<typeof WorkflowRuleSearchSchema>;
