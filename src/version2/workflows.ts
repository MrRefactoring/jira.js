import type { Client } from '../client';
import type { Request } from '../request';
import type { DeleteInactiveWorkflowParameters } from './parameters/deleteInactiveWorkflowParameters';
import type { GetWorkflowProjectIssueTypeUsagesParameters } from './parameters/getWorkflowProjectIssueTypeUsagesParameters';
import type { GetProjectUsagesForWorkflowParameters } from './parameters/getProjectUsagesForWorkflowParameters';
import type { GetWorkflowSchemeUsagesForWorkflowParameters } from './parameters/getWorkflowSchemeUsagesForWorkflowParameters';
import type { ReadWorkflowsParameters } from './parameters/readWorkflowsParameters';
import type { WorkflowCapabilitiesParameters } from './parameters/workflowCapabilitiesParameters';
import type { CreateWorkflowsParameters } from './parameters/createWorkflowsParameters';
import type { ValidateCreateWorkflowsParameters } from './parameters/validateCreateWorkflowsParameters';
import type { SearchWorkflowsParameters } from './parameters/searchWorkflowsParameters';
import type { UpdateWorkflowsParameters } from './parameters/updateWorkflowsParameters';
import type { ValidateUpdateWorkflowsParameters } from './parameters/validateUpdateWorkflowsParameters';

export class Workflows {
  constructor(private client: Client) {}
  /**
   * Deletes a workflow. *
   *
   * - The workflow cannot be deleted if it is:
   * -
   * - - An active workflow.
   * - - A system workflow.
   * - - Associated with any workflow scheme.
   * - - Associated with any draft workflow scheme.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteInactiveWorkflow(parameters: DeleteInactiveWorkflowParameters) {
    const request: Request = {
      url: `/rest/api/2/workflow/${parameters.entityId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /** Returns a page of issue types using a given workflow within a project. */
  async getWorkflowProjectIssueTypeUsages(parameters: GetWorkflowProjectIssueTypeUsagesParameters) {
    const request: Request = {
      url: `/rest/api/2/workflow/${parameters.workflowId}/project/${parameters.projectId}/issueTypeUsages`,
      method: 'GET',
      query: {
        nextPageToken: parameters.nextPageToken,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(request);
  }

  /** Returns a page of projects using a given workflow. */
  async getProjectUsagesForWorkflow(parameters: GetProjectUsagesForWorkflowParameters) {
    const request: Request = {
      url: `/rest/api/2/workflow/${parameters.workflowId}/projectUsages`,
      method: 'GET',
      query: {
        nextPageToken: parameters.nextPageToken,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(request);
  }

  /** Returns a page of workflow schemes using a given workflow. */
  async getWorkflowSchemeUsagesForWorkflow(parameters: GetWorkflowSchemeUsagesForWorkflowParameters) {
    const request: Request = {
      url: `/rest/api/2/workflow/${parameters.workflowId}/workflowSchemes`,
      method: 'GET',
      query: {
        nextPageToken: parameters.nextPageToken,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a list of workflows and related statuses by providing workflow names, workflow IDs, or project and issue
   * types. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Administer Jira_ global permission to access all, including project-scoped, workflows
   * - - At least one of the _Administer projects_ and _View (read-only) workflow_ project permissions to access
   *       project-scoped workflows
   */
  async readWorkflows(parameters: ReadWorkflowsParameters) {
    const request: Request = {
      url: '/rest/api/2/workflows',
      method: 'POST',
      query: {
        useApprovalConfiguration: parameters.useApprovalConfiguration,
      },
      body: {
        projectAndIssueTypes: parameters.projectAndIssueTypes,
        workflowIds: parameters.workflowIds,
        workflowNames: parameters.workflowNames,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Get the list of workflow capabilities for a specific workflow using either the workflow ID, or the project and
   * issue type ID pair. The response includes the scope of the workflow, defined as global/project-based, and a list of
   * project types that the workflow is scoped to. It also includes all rules organised into their broad categories
   * (conditions, validators, actions, triggers, screens) as well as the source location (Atlassian-provided, Connect,
   * Forge). *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Administer Jira_ project permission to access all, including global-scoped, workflows
   * - - _Administer projects_ project permissions to access project-scoped workflows
   * -
   * - The current list of Atlassian-provided rules:
   * -
   * - #### Validators
   * -
   * - A validator rule that checks if a user has the required permissions to execute the transition in the workflow.
   * -
   * - ##### Permission validator
   * -
   * - A validator rule that checks if a user has the required permissions to execute the transition in the workflow.
   * -
   * - {
   * - "ruleKey": "system:check-permission-validator",
   * - "parameters": {
   * - "permissionKey": "ADMINISTER_PROJECTS"
   * - }
   * - }
   * -
   * - Parameters:
   * -
   * - - `permissionKey` The permission required to perform the transition. Allowed values: [built-in Jira
   *       permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-permission-schemes/#built-in-permissions).
   * -
   * - ##### Parent or child blocking validator
   * -
   * - A validator to block the child issue's transition depending on the parent issue's status.
   * -
   * - {
   * - "ruleKey" : "system:parent-or-child-blocking-validator"
   * - "parameters" : {
   * - "blocker" : "PARENT"
   * - "statusIds" : "1,2,3"
   * - }
   * - }
   * -
   * - Parameters:
   * -
   * - - `blocker` currently only supports `PARENT`.
   * - - `statusIds` a comma-separated list of status IDs.
   * -
   * - ##### Previous status validator
   * -
   * - A validator that checks if an issue has transitioned through specified previous status(es) before allowing the
   *   current transition to occur.
   * -
   * - {
   * - "ruleKey": "system:previous-status-validator",
   * - "parameters": {
   * - "previousStatusIds": "10014",
   * - "mostRecentStatusOnly": "true"
   * - }
   * - }
   * -
   * - Parameters:
   * -
   * - - `previousStatusIds` a comma-separated list of status IDs, currently only support one ID.
   * - - `mostRecentStatusOnly` when `true` only considers the most recent status for the condition evaluation. Allowed
   *       values: `true`, `false`.
   * -
   * - ##### Validate a field value
   * -
   * - A validation that ensures a specific field's value meets the defined criteria before allowing an issue to
   *   transition in the workflow.
   * -
   * - Depending on the rule type, the result will vary:
   * -
   * - ###### Field required
   * -
   * - {
   * - "ruleKey": "system:validate-field-value",
   * - "parameters": {
   * - "ruleType": "fieldRequired",
   * - "fieldsRequired": "assignee",
   * - "ignoreContext": "true",
   * - "errorMessage": "An assignee must be set!"
   * - }
   * - }
   * -
   * - Parameters:
   * -
   * - - `fieldsRequired` the ID of the field that is required. For a custom field, it would look like `customfield_123`.
   * - - `ignoreContext` controls the impact of context settings on field validation. When set to `true`, the validator
   *       doesn't check a required field if its context isn't configured for the current issue. When set to `false`,
   *       the validator requires a field even if its context is invalid. Allowed values: `true`, `false`.
   * - - `errorMessage` is the error message to display if the user does not provide a value during the transition. A
   *       default error message will be shown if you don't provide one (Optional).
   * -
   * - ###### Field changed
   * -
   * - {
   * - "ruleKey": "system:validate-field-value",
   * - "parameters": {
   * - "ruleType": "fieldChanged",
   * - "groupsExemptFromValidation": "6862ac20-8672-4f68-896d-4854f5efb79e",
   * - "fieldKey": "versions",
   * - "errorMessage": "Affect versions must be modified before transition"
   * - }
   * - }
   * -
   * - Parameters:
   * -
   * - - `groupsExemptFromValidation` a comma-separated list of group IDs to be exempt from the validation.
   * - - `fieldKey` the ID of the field that has changed. For a custom field, it would look like `customfield_123`.
   * - - `errorMessage` the error message to display if the user does not provide a value during the transition. A default
   *       error message will be shown if you don't provide one (Optional).
   * -
   * - ###### Field has a single value
   * -
   * - {
   * - "ruleKey": "system:validate-field-value",
   * - "parameters": {
   * - "ruleType": "fieldHasSingleValue",
   * - "fieldKey": "created",
   * - "excludeSubtasks": "true"
   * - }
   * - }
   * -
   * - Parameters:
   * -
   * - - `fieldKey` the ID of the field to validate. For a custom field, it would look like `customfield_123`.
   * - - `excludeSubtasks` Option to exclude values copied from sub-tasks. Allowed values: `true`, `false`.
   * -
   * - ###### Field matches regular expression
   * -
   * - {
   * - "ruleKey": "system:validate-field-value",
   * - "parameters": {
   * - "ruleType": "fieldMatchesRegularExpression",
   * - "regexp": "[0-9]{4}",
   * - "fieldKey": "description"
   * - }
   * - }
   * -
   * - Parameters:
   * -
   * - - `regexp` the regular expression used to validate the field\u2019s content.
   * - - `fieldKey` the ID of the field to validate. For a custom field, it would look like `customfield_123`.
   * -
   * - ###### Date field comparison
   * -
   * - {
   * - "ruleKey": "system:validate-field-value",
   * - "parameters": {
   * - "ruleType": "dateFieldComparison",
   * - "date1FieldKey": "duedate",
   * - "date2FieldKey": "customfield_10054",
   * - "includeTime": "true",
   * - "conditionSelected": ">="
   * - }
   * - }
   * -
   * - Parameters:
   * -
   * - - `date1FieldKey` the ID of the first field to compare. For a custom field, it would look like `customfield_123`.
   * - - `date2FieldKey` the ID of the second field to compare. For a custom field, it would look like `customfield_123`.
   * - - `includeTime` if `true`, compares both date and time. Allowed values: `true`, `false`.
   * - - `conditionSelected` the condition to compare with. Allowed values: `>`, `>=`, `=`, `<=`, `<`, `!=`.
   * -
   * - ###### Date range comparison
   * -
   * - {
   * - "ruleKey": "system:validate-field-value",
   * - "parameters": {
   * - "ruleType": "windowDateComparison",
   * - "date1FieldKey": "customfield_10009",
   * - "date2FieldKey": "customfield_10054",
   * - "numberOfDays": "3"
   * - }
   * - }
   * -
   * - Parameters:
   * -
   * - - `date1FieldKey` the ID of the first field to compare. For a custom field, it would look like `customfield_123`.
   * - - `date2FieldKey` the ID of the second field to compare. For a custom field, it would look like `customfield_123`.
   * - - `numberOfDays` maximum number of days past the reference date (`date2FieldKey`) to pass validation.
   * -
   * - This rule is composed by aggregating the following legacy rules:
   * -
   * - - FieldRequiredValidator
   * - - FieldChangedValidator
   * - - FieldHasSingleValueValidator
   * - - RegexpFieldValidator
   * - - DateFieldValidator
   * - - WindowsDateValidator
   * -
   * - ##### Pro forma: Forms attached validator
   * -
   * - Validates that one or more forms are attached to the issue.
   * -
   * - {
   * - "ruleKey" : "system:proforma-forms-attached"
   * - "parameters" : {}
   * - }
   * -
   * - ##### Proforma: Forms submitted validator
   * -
   * - Validates that all forms attached to the issue have been submitted.
   * -
   * - {
   * - "ruleKey" : "system:proforma-forms-submitted"
   * - "parameters" : {}
   * - }
   * -
   * - #### Conditions
   * -
   * - Conditions enable workflow rules that govern whether a transition can execute.
   * -
   * - ##### Check field value
   * -
   * - A condition rule evaluates as true if a specific field's value meets the defined criteria. This rule ensures that
   *   an issue can only transition to the next step in the workflow if the field's value matches the desired
   *   condition.
   * -
   * - {
   * - "ruleKey": "system:check-field-value",
   * - "parameters": {
   * - "fieldId": "description",
   * - "fieldValue": "["Done"]",
   * - "comparator": "=",
   * - "comparisonType": "STRING"
   * - }
   * - }
   * -
   * - Parameters:
   * -
   * - - `fieldId` The ID of the field to check the value of. For non-system fields, it will look like `customfield_123`.
   *       Note: `fieldId` is used interchangeably with the idea of `fieldKey` here, they refer to the same field.
   * - - `fieldValue` the list of values to check against the field\u2019s value.
   * - - `comparator` The comparison logic. Allowed values: `>`, `>=`, `=`, `<=`, `<`, `!=`.
   * - - `comparisonType` The type of data being compared. Allowed values: `STRING`, `NUMBER`, `DATE`, `DATE_WITHOUT_TIME`,
   *       `OPTIONID`.
   * -
   * - ##### Restrict issue transition
   * -
   * - This rule ensures that issue transitions are restricted based on user accounts, roles, group memberships, and
   *   permissions, maintaining control over who can transition an issue. This condition evaluates as `true` if any of
   *   the following criteria is met.
   * -
   * - {
   * - "ruleKey": "system:restrict-issue-transition",
   * - "parameters": {
   * - "accountIds": "allow-reporter,5e68ac137d64450d01a77fa0",
   * - "roleIds": "10002,10004",
   * - "groupIds": "703ff44a-7dc8-4f4b-9aa6-a65bf3574fa4",
   * - "permissionKeys": "ADMINISTER_PROJECTS",
   * - "groupCustomFields": "customfield_10028",
   * - "allowUserCustomFields": "customfield_10072,customfield_10144,customfield_10007",
   * - "denyUserCustomFields": "customfield_10107"
   * - }
   * - }
   * -
   * - Parameters:
   * -
   * - - `accountIds` a comma-separated list of the user account IDs. It also allows generic values like: `allow-assignee`,
   *       `allow-reporter`, and `accountIds` Note: This is only supported in team-managed projects
   * - - `roleIds` a comma-separated list of role IDs.
   * - - `groupIds` a comma-separated list of group IDs.
   * - - `permissionKeys` a comma-separated list of permission keys. Allowed values: [built-in Jira
   *       permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-permission-schemes/#built-in-permissions).
   * - - `groupCustomFields` a comma-separated list of group custom field IDs.
   * - - `allowUserCustomFields` a comma-separated list of user custom field IDs to allow for issue transition.
   * - - `denyUserCustomFields` a comma-separated list of user custom field IDs to deny for issue transition.
   * -
   * - This rule is composed by aggregating the following legacy rules:
   * -
   * - - AllowOnlyAssignee
   * - - AllowOnlyReporter
   * - - InAnyProjectRoleCondition
   * - - InProjectRoleCondition
   * - - UserInAnyGroupCondition
   * - - UserInGroupCondition
   * - - PermissionCondtion
   * - - InGroupCFCondition
   * - - UserIsInCustomFieldCondition
   * -
   * - ##### Previous status condition
   * -
   * - A condition that evaluates based on an issue's previous status(es) and specific criteria.
   * -
   * - {
   * - "ruleKey" : "system:previous-status-condition"
   * - "parameters" : {
   * - "previousStatusIds" : "10004",
   * - "not": "true",
   * - "mostRecentStatusOnly" : "true",
   * - "includeCurrentStatus": "true",
   * - "ignoreLoopTransitions": "true"
   * - }
   * - }
   * -
   * - Parameters:
   * -
   * - - `previousStatusIds` a comma-separated list of status IDs, current only support one ID.
   * - - `not` indicates if the condition should be reversed. When `true` it checks that the issue has not been in the
   *       selected statuses. Allowed values: `true`, `false`.
   * - - `mostRecentStatusOnly` when true only considers the most recent status for the condition evaluation. Allowed
   *       values: `true`, `false`.
   * - - `includeCurrentStatus` includes the current status when evaluating if the issue has been through the selected
   *       statuses. Allowed values: `true`, `false`.
   * - - `ignoreLoopTransitions` ignore loop transitions. Allowed values: `true`, `false`.
   * -
   * - ##### Parent or child blocking condition
   * -
   * - A condition to block the parent\u2019s issue transition depending on the child\u2019s issue status.
   * -
   * - {
   * - "ruleKey" : "system:parent-or-child-blocking-condition"
   * - "parameters" : {
   * - "blocker" : "CHILD",
   * - "statusIds" : "1,2,3"
   * - }
   * - }
   * -
   * - Parameters:
   * -
   * - - `blocker` currently only supports `CHILD`.
   * - - `statusIds` a comma-separated list of status IDs.
   * -
   * - ##### Separation of duties
   * -
   * - A condition preventing the user from performing, if the user has already performed a transition on the issue.
   * -
   * - {
   * - "ruleKey": "system:separation-of-duties",
   * - "parameters": {
   * - "fromStatusId": "10161",
   * - "toStatusId": "10160"
   * - }
   * - }
   * -
   * - Parameters:
   * -
   * - - `fromStatusId` represents the status ID from which the issue is transitioning. It ensures that the user performing
   *       the current transition has not performed any actions when the issue was in the specified status.
   * - - `toStatusId` represents the status ID to which the issue is transitioning. It ensures that the user performing the
   *       current transition is not the same user who has previously transitioned the issue.
   * -
   * - ##### Restrict transitions
   * -
   * - A condition preventing all users from transitioning the issue can also optionally include APIs as well.
   * -
   * - {
   * - "ruleKey": "system:restrict-from-all-users",
   * - "parameters": {
   * - "restrictMode": "users"
   * - }
   * - }
   * -
   * - Parameters:
   * -
   * - - `restrictMode` restricts the issue transition including/excluding APIs. Allowed values: `"users"`, `"usersAndAPI"`.
   * -
   * - ##### Jira Service Management block until approved
   * -
   * - Block an issue transition until approval. Note: This is only supported in team-managed projects.
   * -
   * - {
   * - "ruleKey": "system:jsd-approvals-block-until-approved",
   * - "parameters": {
   * - "approvalConfigurationJson": "{"statusExternalUuid...}"
   * - }
   * - }
   * -
   * - Parameters:
   * -
   * - - `approvalConfigurationJson` a stringified JSON holding the Jira Service Management approval configuration.
   * -
   * - ##### Jira Service Management block until rejected
   * -
   * - Block an issue transition until rejected. Note: This is only supported in team-managed projects.
   * -
   * - {
   * - "ruleKey": "system:jsd-approvals-block-until-rejected",
   * - "parameters": {
   * - "approvalConfigurationJson": "{"statusExternalUuid...}"
   * - }
   * - }
   * -
   * - Parameters:
   * -
   * - - `approvalConfigurationJson` a stringified JSON holding the Jira Service Management approval configuration.
   * -
   * - ##### Block in progress approval
   * -
   * - Condition to block issue transition if there is pending approval. Note: This is only supported in company-managed
   *   projects.
   * -
   * - {
   * - "ruleKey": "system:block-in-progress-approval",
   * - "parameters": {}
   * - }
   * -
   * - #### Post functions
   * -
   * - Post functions carry out any additional processing required after a workflow transition is executed.
   * -
   * - ##### Change assignee
   * -
   * - A post function rule that changes the assignee of an issue after a transition.
   * -
   * - {
   * - "ruleKey": "system:change-assignee",
   * - "parameters": {
   * - "type": "to-selected-user",
   * - "accountId": "example-account-id"
   * - }
   * - }
   * -
   * - Parameters:
   * -
   * - - `type` the parameter used to determine the new assignee. Allowed values: `to-selected-user`, `to-unassigned`,
   *       `to-current-user`, `to-current-user`, `to-default-user`, `to-default-user`
   * - - `accountId` the account ID of the user to assign the issue to. This parameter is required only when the type is
   *       `"to-selected-user"`.
   * -
   * - ##### Copy field value
   * -
   * - A post function that automates the process of copying values between fields during a specific transition, ensuring
   *   data consistency and reducing manual effort.
   * -
   * - {
   * - "ruleKey": "system:copy-value-from-other-field",
   * - "parameters": {
   * - "sourceFieldKey": "description",
   * - "targetFieldKey": "components",
   * - "issueSource": "SAME"
   * - }
   * - }
   * -
   * - Parameters:
   * -
   * - - `sourceFieldKey` the field key to copy from. For a custom field, it would look like `customfield_123`
   * - - `targetFieldKey` the field key to copy to. For a custom field, it would look like `customfield_123`
   * - - `issueSource` `SAME` or `PARENT`. Defaults to `SAME` if no value is provided.
   * -
   * - ##### Update field
   * -
   * - A post function that updates or appends a specific field with the given value.
   * -
   * - {
   * - "ruleKey": "system:update-field",
   * - "parameters": {
   * - "field": "customfield_10056",
   * - "value": "asdf",
   * - "mode": "append"
   * - }
   * - }
   * -
   * - Parameters:
   * -
   * - - `field` the ID of the field to update. For a custom field, it would look like `customfield_123`
   * - - `value` the value to update the field with.
   * - - `mode` `append` or `replace`. Determines if a value will be appended to the current value, or if the current value
   *       will be replaced.
   * -
   * - ##### Trigger webhook
   * -
   * - A post function that automatically triggers a predefined webhook when a transition occurs in the workflow.
   * -
   * - {
   * - "ruleKey": "system:trigger-webhook",
   * - "parameters": {
   * - "webhookId": "1"
   * - }
   * - }
   * -
   * - Parameters:
   * -
   * - - `webhookId` the ID of the webhook.
   * -
   * - #### Screen
   * -
   * - ##### Remind people to update fields
   * -
   * - A screen rule that prompts users to update a specific field when they interact with an issue screen during a
   *   transition. This rule is useful for ensuring that users provide or modify necessary information before moving an
   *   issue to the next step in the workflow.
   * -
   * - {
   * - "ruleKey": "system:remind-people-to-update-fields",
   * - "params": {
   * - "remindingFieldIds": "assignee,customfield_10025",
   * - "remindingMessage": "The message",
   * - "remindingAlwaysAsk": "true"
   * - }
   * - }
   * -
   * - Parameters:
   * -
   * - - `remindingFieldIds` a comma-separated list of field IDs. Note: `fieldId` is used interchangeably with the idea of
   *       `fieldKey` here, they refer to the same field.
   * - - `remindingMessage` the message to display when prompting the users to update the fields.
   * - - `remindingAlwaysAsk` always remind to update fields. Allowed values: `true`, `false`.
   * -
   * - ##### Shared transition screen
   * -
   * - A common screen that is shared between transitions in a workflow.
   * -
   * - {
   * - "ruleKey": "system:transition-screen",
   * - "params": {
   * - "screenId": "3"
   * - }
   * - }
   * -
   * - Parameters:
   * -
   * - - `screenId` the ID of the screen.
   * -
   * - #### Connect & Forge
   * -
   * - ##### Connect rules
   * -
   * - Validator/Condition/Post function for Connect app.
   * -
   * - {
   * - "ruleKey": "connect:expression-validator",
   * - "parameters": {
   * - "appKey": "com.atlassian.app",
   * - "config": "",
   * - "id": "90ce590f-e90c-4cd3-8281-165ce41f2ac3",
   * - "disabled": "false",
   * - "tag": ""
   * - }
   * - }
   * -
   * - Parameters:
   * -
   * - - `ruleKey` Validator: `connect:expression-validator`, Condition: `connect:expression-condition`, and Post function:
   *       `connect:remote-workflow-function`
   * - - `appKey` the reference to the Connect app
   * - - `config` a JSON payload string describing the configuration
   * - - `id` the ID of the rule
   * - - `disabled` determine if the Connect app is disabled. Allowed values: `true`, `false`.
   * - - `tag` additional tags for the Connect app
   * -
   * - ##### Forge rules
   * -
   * - Validator/Condition/Post function for Forge app.
   * -
   * - {
   * - "ruleKey": "forge:expression-validator",
   * - "parameters": {
   * - "key": "ari:cloud:ecosystem::extension/{appId}/{environmentId}/static/{moduleKey}",
   * - "config": "{"searchString":"workflow validator"}",
   * - "id": "a865ddf6-bb3f-4a7b-9540-c2f8b3f9f6c2"
   * - }
   * - }
   * -
   * - Parameters:
   * -
   * - - `ruleKey` Validator: `forge:expression-validator`, Condition: `forge:expression-condition`, and Post function:
   *       `forge:workflow-post-function`
   * - - `key` the identifier for the Forge app
   * - - `config` the persistent stringified JSON configuration for the Forge rule
   * - - `id` the ID of the Forge rule
   */
  async workflowCapabilities(parameters: WorkflowCapabilitiesParameters) {
    const request: Request = {
      url: '/rest/api/2/workflows/capabilities',
      method: 'GET',
      query: {
        workflowId: parameters.workflowId,
        projectId: parameters.projectId,
        issueTypeId: parameters.issueTypeId,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Create workflows and related statuses. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Administer Jira_ project permission to create all, including global-scoped, workflows
   * - - _Administer projects_ project permissions to create project-scoped workflows
   */
  async createWorkflows(parameters: CreateWorkflowsParameters) {
    const request: Request = {
      url: '/rest/api/2/workflows/create',
      method: 'POST',
      body: {
        scope: parameters.scope,
        statuses: parameters.statuses,
        workflows: parameters.workflows,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Validate the payload for bulk create workflows. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Administer Jira_ project permission to create all, including global-scoped, workflows
   * - - _Administer projects_ project permissions to create project-scoped workflows
   */
  async validateCreateWorkflows(parameters: ValidateCreateWorkflowsParameters) {
    const request: Request = {
      url: '/rest/api/2/workflows/create/validation',
      method: 'POST',
      body: {
        payload: parameters.payload,
        validationOptions: parameters.validationOptions,
      },
    };

    return this.client.sendRequest(request);
  }

  /** Get the user's default workflow editor. This can be either the new editor or the legacy editor. */
  async getDefaultEditor() {
    const request: Request = {
      url: '/rest/api/2/workflows/defaultEditor',
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of global
   * and project workflows. If workflow names are specified in the query string, details of those workflows are
   * returned. Otherwise, all workflows are returned. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Administer Jira_ global permission to access all, including project-scoped, workflows
   * - - At least one of the _Administer projects_ and _View (read-only) workflow_ project permissions to access
   *       project-scoped workflows
   */
  async searchWorkflows(parameters: SearchWorkflowsParameters) {
    const request: Request = {
      url: '/rest/api/2/workflows/search',
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        expand: parameters.expand,
        queryString: parameters.queryString,
        orderBy: parameters.orderBy,
        scope: parameters.scope,
        isActive: parameters.isActive,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Update workflows and related statuses. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Administer Jira_ project permission to create all, including global-scoped, workflows
   * - - _Administer projects_ project permissions to create project-scoped workflows
   */
  async updateWorkflows(parameters: UpdateWorkflowsParameters) {
    const request: Request = {
      url: '/rest/api/2/workflows/update',
      method: 'POST',
      body: {
        statuses: parameters.statuses,
        workflows: parameters.workflows,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Validate the payload for bulk update workflows. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Administer Jira_ project permission to create all, including global-scoped, workflows
   * - - _Administer projects_ project permissions to create project-scoped workflows
   */
  async validateUpdateWorkflows(parameters: ValidateUpdateWorkflowsParameters) {
    const request: Request = {
      url: '/rest/api/2/workflows/update/validation',
      method: 'POST',
      body: {
        payload: parameters.payload,
        validationOptions: parameters.validationOptions,
      },
    };

    return this.client.sendRequest(request);
  }
}
