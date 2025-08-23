import { z } from 'zod';
import { AvailableWorkflowConnectRuleSchema } from './availableWorkflowConnectRule';
import { AvailableWorkflowForgeRuleSchema } from './availableWorkflowForgeRule';
import { AvailableWorkflowSystemRuleSchema } from './availableWorkflowSystemRule';
import { AvailableWorkflowTriggersSchema } from './availableWorkflowTriggers';

export const WorkflowCapabilitiesSchema = z.object({
  /** The Connect provided ecosystem rules available. */
  connectRules: z.array(AvailableWorkflowConnectRuleSchema).optional(),
  /**
   * The scope of the workflow capabilities. `GLOBAL` for company-managed projects and `PROJECT` for team-managed
   * projects.
   */
  editorScope: z.enum(['PROJECT', 'GLOBAL']).optional(),
  /** The Forge provided ecosystem rules available. */
  forgeRules: z.array(AvailableWorkflowForgeRuleSchema).optional(),
  /** The types of projects that this capability set is available for. */
  projectTypes: z.array(z.enum(['software', 'service_desk', 'product_discovery', 'business', 'unknown'])).optional(),
  /** The Atlassian provided system rules available. */
  systemRules: z.array(AvailableWorkflowSystemRuleSchema).optional(),
  /** The trigger rules available. */
  triggerRules: z.array(AvailableWorkflowTriggersSchema).optional(),
});

export type WorkflowCapabilities = z.infer<typeof WorkflowCapabilitiesSchema>;
