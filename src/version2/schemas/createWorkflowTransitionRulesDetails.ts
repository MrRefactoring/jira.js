import { z } from 'zod';
import { CreateWorkflowTransitionRuleSchema } from './createWorkflowTransitionRule';

/** The details of a workflow transition rules. */
export const CreateWorkflowTransitionRulesDetailsSchema = z.object({
  /** The workflow conditions. */
  conditions: z.unknown().optional(),
  /**
   * The workflow post functions.
   *
   * **Note:** The default post functions are always added to the _initial_ transition, as in:
   *
   *     "postFunctions": [
   *         {
   *             "type": "IssueCreateFunction"
   *         },
   *         {
   *             "type": "IssueReindexFunction"
   *         },
   *         {
   *             "type": "FireIssueEventFunction",
   *             "configuration": {
   *                 "event": {
   *                     "id": "1",
   *                     "name": "issue_created"
   *                 }
   *             }
   *         }
   *     ]
   *
   * **Note:** The default post functions are always added to the _global_ and _directed_ transitions, as in:
   *
   *     "postFunctions": [
   *         {
   *             "type": "UpdateIssueStatusFunction"
   *         },
   *         {
   *             "type": "CreateCommentFunction"
   *         },
   *         {
   *             "type": "GenerateChangeHistoryFunction"
   *         },
   *         {
   *             "type": "IssueReindexFunction"
   *         },
   *         {
   *             "type": "FireIssueEventFunction",
   *             "configuration": {
   *                 "event": {
   *                     "id": "13",
   *                     "name": "issue_generic"
   *                 }
   *             }
   *         }
   *     ]
   */
  postFunctions: z.array(CreateWorkflowTransitionRuleSchema).optional(),
  /**
   * The workflow validators.
   *
   * **Note:** The default permission validator is always added to the _initial_ transition, as in:
   *
   *     "validators": [
   *         {
   *             "type": "PermissionValidator",
   *             "configuration": {
   *                 "permissionKey": "CREATE_ISSUES"
   *             }
   *         }
   *     ]
   */
  validators: z.array(CreateWorkflowTransitionRuleSchema).optional(),
});

export type CreateWorkflowTransitionRulesDetails = z.infer<typeof CreateWorkflowTransitionRulesDetailsSchema>;
