import { CreateWorkflowCondition } from './createWorkflowCondition';
import { CreateWorkflowTransitionRule } from './createWorkflowTransitionRule';

/** The details of a workflow transition rules. */
export interface CreateWorkflowTransitionRulesDetails {
  conditions?: CreateWorkflowCondition;
  /**
   * The workflow validators.
   *
   * _Note:_* The default permission validator is always added to the _initial_ transition, as in:
   *
   * "validators": [ { "type": "PermissionValidator", "configuration": { "permissionKey": "CREATE_ISSUES" } } ]
   */
  validators?: CreateWorkflowTransitionRule[];
  /**
   * The workflow post functions.
   *
   * _Note:_* The default post functions are always added to the _initial_ transition, as in:
   *
   * "postFunctions": [ { "type": "IssueCreateFunction" }, { "type": "IssueReindexFunction" }, { "type":
   * "FireIssueEventFunction", "configuration": { "event": { "id": "1", "name": "issue_created" } } } ]
   *
   * _Note:_* The default post functions are always added to the _global_ and _directed_ transitions, as in:
   *
   * "postFunctions": [ { "type": "UpdateIssueStatusFunction" }, { "type": "CreateCommentFunction" }, { "type":
   * "GenerateChangeHistoryFunction" }, { "type": "IssueReindexFunction" }, { "type": "FireIssueEventFunction",
   * "configuration": { "event": { "id": "13", "name": "issue_generic" } } } ]
   */
  postFunctions?: CreateWorkflowTransitionRule[];
}
