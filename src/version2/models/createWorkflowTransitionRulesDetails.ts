import { CreateWorkflowCondition } from './createWorkflowCondition';
import { CreateWorkflowTransitionRule } from './createWorkflowTransitionRule';

/** The details of a workflow transition rules. */
export interface CreateWorkflowTransitionRulesDetails {
  conditions?: CreateWorkflowCondition;
  /**
   * The workflow validators.
   *
   * *Note:** The default permission validator is always added to the *initial* transition, as in:
   *
   * "validators": [ { "type": "PermissionValidator", "configuration": { "permissionKey": "CREATE_ISSUES" } } ]
   */
  validators?: CreateWorkflowTransitionRule[];
  /**
   * The workflow post functions.
   *
   * *Note:** The default post functions are always added to the *initial* transition, as in:
   *
   * "postFunctions": [ { "type": "IssueCreateFunction" }, { "type": "IssueReindexFunction" }, { "type":
   * "FireIssueEventFunction", "configuration": { "event": { "id": "1", "name": "issue_created" } } } ]
   *
   * *Note:** The default post functions are always added to the *global* and *directed* transitions, as in:
   *
   * "postFunctions": [ { "type": "UpdateIssueStatusFunction" }, { "type": "CreateCommentFunction" }, { "type":
   * "GenerateChangeHistoryFunction" }, { "type": "IssueReindexFunction" }, { "type": "FireIssueEventFunction",
   * "configuration": { "event": { "id": "13", "name": "issue_generic" } } } ]
   */
  postFunctions?: CreateWorkflowTransitionRule[];
}
