import type { AvailableWorkflowConnectRule } from './availableWorkflowConnectRule';
import type { AvailableWorkflowForgeRule } from './availableWorkflowForgeRule';
import type { AvailableWorkflowSystemRule } from './availableWorkflowSystemRule';
import type { AvailableWorkflowTriggers } from './availableWorkflowTriggers';

export interface WorkflowCapabilities {
  /** The Connect provided ecosystem rules available. */
  connectRules?: AvailableWorkflowConnectRule[];
  /**
   * The scope of the workflow capabilities. `GLOBAL` for company-managed projects and `PROJECT` for team-managed
   * projects.
   */
  editorScope?: string;
  /** The Forge provided ecosystem rules available. */
  forgeRules?: AvailableWorkflowForgeRule[];
  /** The types of projects that this capability set is available for. */
  projectTypes?: string[];
  /** The Atlassian provided system rules available. */
  systemRules?: AvailableWorkflowSystemRule[];
  /** The trigger rules available. */
  triggerRules?: AvailableWorkflowTriggers[];
}
