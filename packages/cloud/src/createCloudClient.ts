import { type ClientConfig, createClient } from '@jira.js/base';
import * as announcementBanner from '#/api/announcementBanner';
import * as jql from '#/api/jql';
import * as jqlFunctionsApps from '#/api/jqlFunctionsApps';
import * as myself from '#/api/myself';
import * as serverInfo from '#/api/serverInfo';
import * as projects from '#/api/projects';
import * as issues from '#/api/issues';
import * as issueAttachments from '#/api/issueAttachments';
import * as labels from '#/api/labels';
import * as applicationRoles from '#/api/applicationRoles';
import * as permissions from '#/api/permissions';
import * as projectKeyAndNameValidation from '#/api/projectKeyAndNameValidation';
import * as workflowStatusCategories from '#/api/workflowStatusCategories';
import * as workflowStatuses from '#/api/workflowStatuses';
import * as jiraSettings from '#/api/jiraSettings';
import * as timeTracking from '#/api/timeTracking';
import * as issueResolutions from '#/api/issueResolutions';
import * as issuePriorities from '#/api/issuePriorities';
import * as issueFields from '#/api/issueFields';
import * as issueTypes from '#/api/issueTypes';
import * as issueLinkTypes from '#/api/issueLinkTypes';
import * as status from '#/api/status';
import * as auditRecords from '#/api/auditRecords';
import * as avatars from '#/api/avatars';
import * as projectTypes from '#/api/projectTypes';
import * as projectCategories from '#/api/projectCategories';
import * as issueNavigatorSettings from '#/api/issueNavigatorSettings';
import * as groupAndUserPicker from '#/api/groupAndUserPicker';
import * as groups from '#/api/groups';
import * as users from '#/api/users';
import * as userSearch from '#/api/userSearch';
import * as dashboards from '#/api/dashboards';
import * as filters from '#/api/filters';
import * as filterSharing from '#/api/filterSharing';
import * as issueComments from '#/api/issueComments';
import * as issueLinks from '#/api/issueLinks';
import * as issueSearch from '#/api/issueSearch';
import * as issueVotes from '#/api/issueVotes';
import * as issueWatchers from '#/api/issueWatchers';
import * as issueWorklogs from '#/api/issueWorklogs';
import * as issueProperties from '#/api/issueProperties';
import * as issueRemoteLinks from '#/api/issueRemoteLinks';
import * as issueNotificationSchemes from '#/api/issueNotificationSchemes';
import * as projectComponents from '#/api/projectComponents';
import * as projectRoles from '#/api/projectRoles';
import * as projectRoleActors from '#/api/projectRoleActors';
import * as projectVersions from '#/api/projectVersions';
import * as projectEmail from '#/api/projectEmail';
import * as projectFeatures from '#/api/projectFeatures';
import * as projectProperties from '#/api/projectProperties';
import * as permissionSchemes from '#/api/permissionSchemes';
import * as issueTypeSchemes from '#/api/issueTypeSchemes';
import * as issueTypeScreenSchemes from '#/api/issueTypeScreenSchemes';
import * as workflows from '#/api/workflows';
import * as workflowSchemes from '#/api/workflowSchemes';
import * as workflowSchemeProjectAssociations from '#/api/workflowSchemeProjectAssociations';
import * as screens from '#/api/screens';
import * as screenSchemes from '#/api/screenSchemes';
import * as screenTabs from '#/api/screenTabs';
import * as screenTabFields from '#/api/screenTabFields';
import * as userProperties from '#/api/userProperties';
import * as webhooks from '#/api/webhooks';
import * as tasks from '#/api/tasks';
import * as appDataPolicies from '#/api/appDataPolicies';
import * as issueBulkOperations from '#/api/issueBulkOperations';
import * as issueCommentProperties from '#/api/issueCommentProperties';
import * as issueCustomFieldContexts from '#/api/issueCustomFieldContexts';
import * as issueCustomFieldOptions from '#/api/issueCustomFieldOptions';
import * as issueRedaction from '#/api/issueRedaction';
import * as issueSecurityLevel from '#/api/issueSecurityLevel';
import * as issueSecuritySchemes from '#/api/issueSecuritySchemes';
import * as issueTypeProperties from '#/api/issueTypeProperties';
import * as issueWorklogProperties from '#/api/issueWorklogProperties';
import * as jiraExpressions from '#/api/jiraExpressions';
import * as projectAvatars from '#/api/projectAvatars';
import * as projectPermissionSchemes from '#/api/projectPermissionSchemes';
import * as workflowSchemeDrafts from '#/api/workflowSchemeDrafts';
import * as workflowTransitionRules from '#/api/workflowTransitionRules';
import * as appMigration from '#/api/appMigration';
import * as appProperties from '#/api/appProperties';
import * as dynamicModules from '#/api/dynamicModules';
import * as issueCustomFieldConfigurationApps from '#/api/issueCustomFieldConfigurationApps';
import * as issueCustomFieldOptionsApps from '#/api/issueCustomFieldOptionsApps';
import * as issueCustomFieldValuesApps from '#/api/issueCustomFieldValuesApps';
import * as issuePanels from '#/api/issuePanels';
import * as migrationOfConnectModulesToForge from '#/api/migrationOfConnectModulesToForge';
import * as projectTemplates from '#/api/projectTemplates';
import * as uiModificationsApps from '#/api/uiModificationsApps';
import type {
  GetAttachmentContent,
  GetAttachmentThumbnail,
  GetAttachment,
  RemoveAttachment,
  AddAttachment,
  SetBanner,
  GetCurrentUser,
  GetPreference,
  SetPreference,
  RemovePreference,
  GetAutoCompletePost,
  GetFieldAutoCompleteForQueryString,
  ParseJqlQueries,
  MigrateQueries,
  GetPrecomputations,
  UpdatePrecomputations,
  GetPrecomputationsByID,
  GetAllLabels,
  GetApplicationRole,
  GetMyPermissions,
  GetBulkPermissions,
  GetPermittedProjects,
  ValidateProjectKey,
  GetValidProjectKey,
  GetValidProjectName,
  GetStatusCategory,
  GetStatus,
  GetApplicationProperty,
  SetApplicationProperty,
  SelectTimeTrackingImplementation,
  SetSharedTimeTrackingConfiguration,
  GetResolution,
  SetDefaultPriority,
  MovePriorities,
  GetPriority,
  DeletePriority,
  CreateCustomField,
  GetFieldsPaginated,
  GetTrashedFieldsPaginated,
  UpdateCustomField,
  DeleteCustomField,
  RestoreCustomField,
  TrashCustomField,
  CreateIssueType,
  GetIssueType,
  UpdateIssueType,
  DeleteIssueType,
  GetAlternativeIssueTypes,
  CreateIssueTypeAvatar,
  CreateIssueLinkType,
  GetIssueLinkType,
  UpdateIssueLinkType,
  DeleteIssueLinkType,
  GetStatusesById,
  CreateStatuses,
  UpdateStatuses,
  DeleteStatusesById,
  GetStatusesByName,
  Search,
  GetProjectIssueTypeUsagesForStatus,
  GetProjectUsagesForStatus,
  GetWorkflowUsagesForStatus,
  GetAuditRecords,
  GetAllSystemAvatars,
  GetAvatars,
  StoreAvatar,
  DeleteAvatar,
  GetProjectTypeByKey,
  GetAccessibleProjectTypeByKey,
  CreateProjectCategory,
  GetProjectCategoryById,
  UpdateProjectCategory,
  RemoveProjectCategory,
  SetIssueNavigatorDefaultColumns,
  FindUsersAndGroups,
  CreateGroup,
  RemoveGroup,
  GetUsersFromGroup,
  AddUserToGroup,
  RemoveUserFromGroup,
  FindGroups,
  GetUser,
  CreateUser,
  RemoveUser,
  GetUserDefaultColumns,
  SetUserColumns,
  ResetUserColumns,
  GetUserEmail,
  GetUserEmailBulk,
  GetUserGroups,
  GetAllUsersDefault,
  GetAllUsers,
  FindBulkAssignableUsers,
  FindAssignableUsers,
  FindUsersWithAllPermissions,
  FindUsersForPicker,
  FindUsers,
  FindUsersByQuery,
  FindUserKeysByQuery,
  FindUsersWithBrowsePermission,
  GetAllDashboards,
  GetDashboardsPaginated,
  GetDashboardItemPropertyKeys,
  GetDashboardItemProperty,
  SetDashboardItemProperty,
  DeleteDashboardItemProperty,
  GetDashboard,
  CreateFilter,
  GetFavouriteFilters,
  GetMyFilters,
  GetFiltersPaginated,
  GetFilter,
  UpdateFilter,
  DeleteFilter,
  GetColumns,
  SetColumns,
  ResetColumns,
  SetFavouriteForFilter,
  DeleteFavouriteForFilter,
  SetDefaultShareScope,
  GetSharePermissions,
  AddSharePermission,
  GetSharePermission,
  DeleteSharePermission,
  GetCommentsByIds,
  GetComments,
  AddComment,
  GetComment,
  UpdateComment,
  DeleteComment,
  LinkIssues,
  GetIssueLink,
  DeleteIssueLink,
  GetIssuePickerResource,
  MatchIssues,
  CountIssues,
  SearchAndReconsileIssuesUsingJql,
  SearchAndReconsileIssuesUsingJqlPost,
  GetVotes,
  AddVote,
  RemoveVote,
  GetIsWatchingIssueBulk,
  GetIssueWatchers,
  AddWatcher,
  RemoveWatcher,
  GetIssueWorklog,
  AddWorklog,
  GetWorklog,
  UpdateWorklog,
  DeleteWorklog,
  GetIdsOfWorklogsDeletedSince,
  GetWorklogsForIds,
  GetIdsOfWorklogsModifiedSince,
  BulkSetIssuesPropertiesList,
  BulkSetIssuePropertiesByIssue,
  BulkSetIssueProperty,
  BulkDeleteIssueProperty,
  GetIssuePropertyKeys,
  GetIssueProperty,
  SetIssueProperty,
  DeleteIssueProperty,
  GetRemoteIssueLinks,
  CreateOrUpdateRemoteIssueLink,
  DeleteRemoteIssueLinkByGlobalId,
  GetRemoteIssueLinkById,
  UpdateRemoteIssueLink,
  DeleteRemoteIssueLinkById,
  GetNotificationSchemes,
  GetNotificationSchemeToProjectMappings,
  GetNotificationScheme,
  AddNotifications,
  RemoveNotificationFromNotificationScheme,
  FindComponentsForProjects,
  CreateComponent,
  GetComponent,
  UpdateComponent,
  DeleteComponent,
  GetComponentRelatedIssues,
  GetProjectComponentsPaginated,
  GetProjectComponents,
  GetProjectRoles,
  GetProjectRole,
  GetProjectRoleDetails,
  CreateProjectRole,
  GetProjectRoleById,
  PartialUpdateProjectRole,
  FullyUpdateProjectRole,
  DeleteProjectRole,
  AddActorUsers,
  SetActors,
  DeleteActor,
  GetProjectRoleActorsForRole,
  AddProjectRoleActorsToRole,
  DeleteProjectRoleActorsFromRole,
  GetProjectVersionsPaginated,
  GetProjectVersions,
  CreateVersion,
  GetVersion,
  UpdateVersion,
  MergeVersions,
  MoveVersion,
  GetVersionRelatedIssues,
  GetRelatedWork,
  CreateRelatedWork,
  UpdateRelatedWork,
  DeleteAndReplaceVersion,
  GetVersionUnresolvedIssues,
  DeleteRelatedWork,
  GetProjectEmail,
  UpdateProjectEmail,
  GetFeaturesForProject,
  ToggleFeatureForProject,
  GetProjectPropertyKeys,
  GetProjectProperty,
  SetProjectProperty,
  DeleteProjectProperty,
  GetAllPermissionSchemes,
  CreatePermissionScheme,
  GetPermissionScheme,
  UpdatePermissionScheme,
  DeletePermissionScheme,
  GetPermissionSchemeGrants,
  CreatePermissionGrant,
  GetPermissionSchemeGrant,
  DeletePermissionSchemeEntity,
  GetAllIssueTypeSchemes,
  CreateIssueTypeScheme,
  GetIssueTypeSchemesMapping,
  GetIssueTypeSchemeForProjects,
  AssignIssueTypeSchemeToProject,
  UpdateIssueTypeScheme,
  DeleteIssueTypeScheme,
  AddIssueTypesToIssueTypeScheme,
  ReorderIssueTypesInIssueTypeScheme,
  RemoveIssueTypeFromIssueTypeScheme,
  GetIssueTypeScreenSchemes,
  CreateIssueTypeScreenScheme,
  GetIssueTypeScreenSchemeMappings,
  GetIssueTypeScreenSchemeProjectAssociations,
  AssignIssueTypeScreenSchemeToProject,
  UpdateIssueTypeScreenScheme,
  DeleteIssueTypeScreenScheme,
  AppendMappingsForIssueTypeScreenScheme,
  UpdateDefaultScreenScheme,
  RemoveMappingsFromIssueTypeScreenScheme,
  GetProjectsForIssueTypeScreenScheme,
  ReadWorkflowFromHistory,
  ListWorkflowHistory,
  DeleteInactiveWorkflow,
  GetWorkflowProjectIssueTypeUsages,
  GetProjectUsagesForWorkflow,
  GetWorkflowSchemeUsagesForWorkflow,
  ReadWorkflows,
  CreateWorkflows,
  ValidateCreateWorkflows,
  ReadWorkflowPreviews,
  SearchWorkflows,
  UpdateWorkflows,
  ValidateUpdateWorkflows,
  GetAllWorkflowSchemes,
  CreateWorkflowScheme,
  ReadWorkflowSchemes,
  UpdateSchemes,
  GetRequiredWorkflowSchemeMappings,
  GetWorkflowScheme,
  UpdateWorkflowScheme,
  DeleteWorkflowScheme,
  GetDefaultWorkflow,
  UpdateDefaultWorkflow,
  DeleteDefaultWorkflow,
  GetWorkflowSchemeIssueType,
  SetWorkflowSchemeIssueType,
  DeleteWorkflowSchemeIssueType,
  GetWorkflow,
  UpdateWorkflowMapping,
  DeleteWorkflowMapping,
  GetProjectUsagesForWorkflowScheme,
  GetWorkflowSchemeProjectAssociations,
  AssignSchemeToProject,
  GetScreensForField,
  GetScreens,
  AddFieldToDefaultScreen,
  GetAvailableScreenFields,
  GetScreenSchemes,
  CreateScreenScheme,
  UpdateScreenScheme,
  DeleteScreenScheme,
  GetAllScreenTabs,
  AddScreenTab,
  RenameScreenTab,
  DeleteScreenTab,
  MoveScreenTab,
  GetAllScreenTabFields,
  AddScreenTabField,
  RemoveScreenTabField,
  MoveScreenTabField,
  GetUserPropertyKeys,
  GetUserProperty,
  SetUserProperty,
  DeleteUserProperty,
  GetDynamicWebhooksForApp,
  RegisterDynamicWebhooks,
  DeleteWebhookById,
  RefreshWebhooks,
  GetTask,
  GetPolicies,
  SubmitBulkDelete,
  GetBulkEditableFields,
  SubmitBulkEdit,
  SubmitBulkMove,
  GetAvailableTransitions,
  SubmitBulkTransition,
  SubmitBulkUnwatch,
  SubmitBulkWatch,
  GetBulkOperationProgress,
  GetCommentPropertyKeys,
  GetCommentProperty,
  SetCommentProperty,
  DeleteCommentProperty,
  GetContextsForField,
  CreateCustomFieldContext,
  GetIssueTypeMappingsForContexts,
  GetCustomFieldContextsForProjectsAndIssueTypes,
  GetProjectContextMapping,
  UpdateCustomFieldContext,
  DeleteCustomFieldContext,
  AddIssueTypesToContext,
  RemoveIssueTypesFromContext,
  AssignProjectsToCustomFieldContext,
  RemoveCustomFieldContextFromProjects,
  GetCustomFieldOption,
  GetOptionsForContext,
  CreateCustomFieldOption,
  UpdateCustomFieldOption,
  ReorderCustomFieldOptions,
  DeleteCustomFieldOption,
  ReplaceCustomFieldOption,
  Redact,
  GetRedactionStatus,
  GetIssueSecurityLevelMembers,
  GetIssueSecurityLevel,
  GetIssueSecurityScheme,
  GetIssueTypePropertyKeys,
  GetIssueTypeProperty,
  SetIssueTypeProperty,
  DeleteIssueTypeProperty,
  GetWorklogPropertyKeys,
  GetWorklogProperty,
  SetWorklogProperty,
  DeleteWorklogProperty,
  AnalyseExpression,
  EvaluateJSISJiraExpression,
  UpdateProjectAvatar,
  DeleteProjectAvatar,
  CreateProjectAvatar,
  GetAllProjectAvatars,
  GetProjectIssueSecurityScheme,
  GetAssignedPermissionScheme,
  AssignPermissionScheme,
  GetSecurityLevelsForProject,
  CreateWorkflowSchemeDraftFromParent,
  GetWorkflowSchemeDraft,
  UpdateWorkflowSchemeDraft,
  DeleteWorkflowSchemeDraft,
  GetDraftDefaultWorkflow,
  UpdateDraftDefaultWorkflow,
  DeleteDraftDefaultWorkflow,
  GetWorkflowSchemeDraftIssueType,
  SetWorkflowSchemeDraftIssueType,
  DeleteWorkflowSchemeDraftIssueType,
  PublishDraftWorkflowScheme,
  GetDraftWorkflow,
  UpdateDraftWorkflowMapping,
  DeleteDraftWorkflowMapping,
  GetWorkflowTransitionRuleConfigurations,
  UpdateWorkflowTransitionRuleConfigurations,
  DeleteWorkflowTransitionRuleConfigurations,
  UpdateIssueFields,
  UpdateEntityPropertiesValue,
  WorkflowRuleSearch,
  GetAddonProperties,
  GetAddonProperty,
  PutAddonProperty,
  DeleteAddonProperty,
  RegisterModules,
  RemoveModules,
  GetCustomFieldConfiguration,
  UpdateCustomFieldConfiguration,
  GetAllIssueFieldOptions,
  CreateIssueFieldOption,
  GetSelectableIssueFieldOptions,
  GetVisibleIssueFieldOptions,
  GetIssueFieldOption,
  UpdateIssueFieldOption,
  DeleteIssueFieldOption,
  ReplaceIssueFieldOption,
  UpdateMultipleCustomFieldValues,
  UpdateCustomFieldValue,
  BulkPinUnpinProjectsAsync,
  FetchMigrationTask,
  SubmitTask,
  CreateProjectWithCustomTemplate,
  GetUiModifications,
  CreateUiModification,
  UpdateUiModification,
  DeleteUiModification,
} from '#/parameters';
import { type WorkflowCapabilities as WorkflowCapabilitiesParameters } from '#/parameters/workflowCapabilities';
import {
  type CreateProject,
  type SearchProjects,
  type GetProject,
  type UpdateProject,
  type DeleteProject,
  type ArchiveProject,
  type GetAllStatuses,
  type GetHierarchy,
  type GetNotificationSchemeForProject,
  type GetBulkChangelogs,
  type CreateIssue,
  type CreateIssues,
  type BulkFetchIssues,
  type GetCreateIssueMetaIssueTypes,
  type GetCreateIssueMetaIssueTypeId,
  type GetIssue,
  type EditIssue,
  type DeleteIssue,
  type AssignIssue,
  type GetChangeLogs,
  type GetChangeLogsByIds,
  type GetEditIssueMeta,
  type Notify,
  type GetTransitions,
  type DoTransition,
} from '#/parameters';
import type { AttachmentSettings, AttachmentMetadata, Attachment } from '#/models';
import {
  type AnnouncementBannerConfiguration,
  type DashboardUser,
  type JQLReferenceData,
  type AutoCompleteSuggestions,
  type ParsedJqlQueries,
  type ConvertedJQLQueries,
  type PageJqlFunctionPrecomputation,
  type JqlFunctionPrecomputationGetByIdResponse,
  type ServerInformation,
  type Locale,
  type PageString,
  type ApplicationRole,
  type Permissions,
  type ErrorCollection,
  type BulkPermissionGrants,
  type PermittedProjects,
  type StatusCategory,
  type StatusDetails,
  type ApplicationProperty,
  type Configuration,
  type TimeTrackingProvider,
  type TimeTrackingConfiguration,
  type Resolution,
  type Priority,
  type FieldDetails,
  type PageField,
  type IssueTypeDetails,
  type Avatar,
  type IssueLinkTypes,
  type IssueLinkType,
  type JiraStatus,
  type PageOfStatuses,
  type StatusProjectIssueTypeUsageDTO,
  type StatusProjectUsageDTO,
  type StatusWorkflowUsageDTO,
  type AuditRecords,
  type SystemAvatars,
  type Avatars,
  type ProjectType,
  type ProjectCategory,
  type UpdatedProjectCategory,
  type ColumnItem,
  type FoundUsersAndGroups,
  type Group,
  type PageUserDetails,
  type FoundGroups,
  type UnrestrictedUserEmail,
  type GroupName,
  type FoundUsers,
  type PageUser,
  type PageUserKey,
  type PageOfDashboards,
  type PageDashboard,
  type PropertyKeys,
  type EntityProperty,
  type Dashboard,
  type Filter,
  type PageFilterDetails,
} from '#/models';
import {
  type NotificationScheme,
  type ProjectIdentifiers,
  type PageProject,
  type Project,
  type IssueTypeWithStatus,
  type ProjectIssueTypeHierarchy,
  type BulkChangelogResponse,
  type CreatedIssue,
  type CreatedIssues,
  type BulkIssueResults,
  type PageOfCreateMetaIssueTypes,
  type PageOfCreateMetaIssueTypeWithField,
  type Issue,
  type PageChangelog,
  type PageOfChangelogs,
  type IssueUpdateMetadata,
  type Transitions,
} from '#/models';
import {
  type DefaultShareScope,
  type SharePermission,
  type IssuePickerSuggestions,
  type IssueMatches,
  type JQLCountResults,
  type SearchAndReconcileResults,
  type PageComment,
  type PageOfComments,
  type Comment,
  type IssueLink,
  type Votes,
  type BulkIssueIsWatching,
  type Watchers,
  type PageOfWorklogs,
  type Worklog,
  type ChangedWorklogs,
  type RemoteIssueLinkIdentifies,
  type RemoteIssueLink,
  type PageNotificationScheme,
  type Page2ComponentJson,
  type ProjectComponent,
  type ComponentIssuesCount,
  type ProjectRole,
  type ProjectRoleDetails,
  type PageVersion,
  type Version,
  type VersionIssueCounts,
  type VersionRelatedWork,
  type ProjectEmailAddress,
  type ContainerForProjectFeatures,
  type PermissionSchemes,
  type PermissionScheme,
  type PermissionGrants,
  type PermissionGrant,
  type VersionUnresolvedIssuesCount,
  type NotificationSchemeAndProjectMappingPage,
  type PageIssueTypeScheme,
  type IssueTypeSchemeID,
  type PageIssueTypeSchemeMapping,
  type PageIssueTypeSchemeProjects,
  type PageIssueTypeScreenScheme,
  type IssueTypeScreenSchemeId,
  type PageIssueTypeScreenSchemeItem,
  type PageIssueTypeScreenSchemesProjects,
  type PageProjectDetails,
  type WorkflowHistoryReadResponseDTO,
  type WorkflowHistoryListResponseDTO,
  type WorkflowProjectIssueTypeUsageDTO,
  type WorkflowProjectUsageDTO,
  type WorkflowSchemeUsageDTO,
  type WorkflowReadResponse,
  type WorkflowCapabilities,
  type WorkflowCreateResponse,
  type WorkflowValidationErrorList,
  type DefaultWorkflowEditorResponse,
  type WorkflowPreviewResponse,
  type WorkflowSearchResponse,
  type WorkflowUpdateResponse,
  type PageWorkflowScheme,
  type WorkflowScheme,
  type WorkflowSchemeReadResponse,
  type WorkflowSchemeUpdateRequiredMappingsResponse,
  type DefaultWorkflow,
  type IssueTypeWorkflowMapping,
  type IssueTypesWorkflowMapping,
  type WorkflowSchemeProjectUsageDTO,
  type ContainerOfWorkflowSchemeAssociations,
  type PageScreenWithTab,
  type PageScreen,
  type PageScreenScheme,
  type ScreenSchemeId,
  type ScreenableTab,
  type ScreenableField,
  type PageWebhook,
  type WebhooksExpirationDate,
  type TaskProgressObject,
  type WorkspaceDataPolicy,
  type ProjectDataPolicies,
  type SubmittedBulkOperation,
  type BulkEditGetFields,
  type BulkOperationProgress,
  type BulkTransitionGetAvailableTransitions,
  type PageCustomFieldContext,
  type PageIssueTypeToContextMapping,
  type PageContextForProjectAndIssueType,
  type PageCustomFieldContextProjectMapping,
  type CustomFieldCreatedContextOptionsList,
  type CustomFieldOption,
  type CustomFieldUpdatedContextOptionsList,
  type PageCustomFieldContextOption,
  type RedactionJobStatusResponse,
  type PageIssueSecurityLevelMember,
  type SecurityLevel,
  type SecurityScheme,
  type SecuritySchemes,
  type JExpEvaluateJiraExpressionResult,
  type JiraExpressionsAnalysis,
  type ProjectAvatars,
  type ProjectIssueSecurityLevels,
  type PageWorkflowTransitionRules,
  type WorkflowTransitionRulesUpdateErrors,
  type WorkflowRulesSearchDetails,
  type OperationMessage,
  type ConnectModules,
  type PageContextualConfiguration,
  type PageIssueFieldOption,
  type IssueFieldOption,
  type ForgePanelProjectPinAsyncResponse,
  type TaskProgress,
  type PageUiModificationDetails,
  type UiModificationIdentifiers,
} from '#/models';

/**
 * Creates a Jira Cloud REST API v3 client.
 *
 * @example
 *   ```typescript
 *   import { createCloudClient } from '@jira.js/cloud';
 *
 *   const client = createCloudClient({
 *     host: 'https://your-domain.atlassian.net',
 *     auth: { type: 'basic', email: 'you@example.com', apiToken: 'TOKEN' },
 *   });
 *
 *   const issue = await client.issues.getIssue({ issueIdOrKey: 'PROJ-1' });
 *   ```;
 *
 * @stable
 */
export function createCloudClient(clientConfig: ClientConfig) {
  const client = createClient(clientConfig);

  return {
    serverInfo: {
      getServerInfo: (): Promise<ServerInformation> => serverInfo.getServerInfo(client),
    },
    myself: {
      getCurrentUser: (parameters?: GetCurrentUser): Promise<DashboardUser> =>
        myself.getCurrentUser(client, parameters),
      getLocale: (): Promise<Locale> => myself.getLocale(client),
      getPreference: (parameters: GetPreference): Promise<string> => myself.getPreference(client, parameters),
      setPreference: (parameters: SetPreference): Promise<void> => myself.setPreference(client, parameters),
      removePreference: (parameters: RemovePreference): Promise<void> => myself.removePreference(client, parameters),
    },
    jql: {
      getAutoComplete: (): Promise<JQLReferenceData> => jql.getAutoComplete(client),
      getAutoCompletePost: (parameters?: GetAutoCompletePost): Promise<JQLReferenceData> =>
        jql.getAutoCompletePost(client, parameters ?? {}),
      getFieldAutoCompleteForQueryString: (
        parameters?: GetFieldAutoCompleteForQueryString,
      ): Promise<AutoCompleteSuggestions> => jql.getFieldAutoCompleteForQueryString(client, parameters),
      parseJqlQueries: (parameters: ParseJqlQueries): Promise<ParsedJqlQueries> =>
        jql.parseJqlQueries(client, parameters),
      migrateQueries: (parameters: MigrateQueries): Promise<ConvertedJQLQueries> =>
        jql.migrateQueries(client, parameters),
    },
    jqlFunctionsApps: {
      getPrecomputations: (parameters?: GetPrecomputations): Promise<PageJqlFunctionPrecomputation> =>
        jqlFunctionsApps.getPrecomputations(client, parameters),
      updatePrecomputations: (parameters: UpdatePrecomputations): Promise<void> =>
        jqlFunctionsApps.updatePrecomputations(client, parameters),
      getPrecomputationsByID: (parameters: GetPrecomputationsByID): Promise<JqlFunctionPrecomputationGetByIdResponse> =>
        jqlFunctionsApps.getPrecomputationsByID(client, parameters),
    },
    announcementBanner: {
      getBanner: (): Promise<AnnouncementBannerConfiguration> => announcementBanner.getBanner(client),
      setBanner: (parameters: SetBanner): Promise<void> => announcementBanner.setBanner(client, parameters),
    },
    projects: {
      createProject: (parameters: CreateProject): Promise<ProjectIdentifiers> =>
        projects.createProject(client, parameters),
      searchProjects: (parameters?: SearchProjects): Promise<PageProject> =>
        projects.searchProjects(client, parameters),
      getProject: (parameters: GetProject): Promise<Project> => projects.getProject(client, parameters),
      updateProject: (parameters: UpdateProject): Promise<Project> => projects.updateProject(client, parameters),
      deleteProject: (parameters: DeleteProject): Promise<void> => projects.deleteProject(client, parameters),
      archiveProject: (parameters: ArchiveProject): Promise<void> => projects.archiveProject(client, parameters),
      getAllStatuses: (parameters: GetAllStatuses): Promise<IssueTypeWithStatus[]> =>
        projects.getAllStatuses(client, parameters),
      getHierarchy: (parameters: GetHierarchy): Promise<ProjectIssueTypeHierarchy> =>
        projects.getHierarchy(client, parameters),
      getNotificationSchemeForProject: (parameters: GetNotificationSchemeForProject): Promise<NotificationScheme> =>
        projects.getNotificationSchemeForProject(client, parameters),
    },
    issueAttachments: {
      getAttachmentContent: (parameters: GetAttachmentContent): Promise<unknown> =>
        issueAttachments.getAttachmentContent(client, parameters),
      getAttachmentMeta: (): Promise<AttachmentSettings> => issueAttachments.getAttachmentMeta(client),
      getAttachmentThumbnail: (parameters: GetAttachmentThumbnail): Promise<unknown> =>
        issueAttachments.getAttachmentThumbnail(client, parameters),
      getAttachment: (parameters: GetAttachment): Promise<AttachmentMetadata> =>
        issueAttachments.getAttachment(client, parameters),
      removeAttachment: (parameters: RemoveAttachment): Promise<void> =>
        issueAttachments.removeAttachment(client, parameters),
      addAttachment: (parameters: AddAttachment): Promise<Attachment[]> =>
        issueAttachments.addAttachment(client, parameters),
    },
    issues: {
      getBulkChangelogs: (parameters: GetBulkChangelogs): Promise<BulkChangelogResponse> =>
        issues.getBulkChangelogs(client, parameters),
      createIssue: (parameters: CreateIssue): Promise<CreatedIssue> => issues.createIssue(client, parameters),
      createIssues: (parameters: CreateIssues): Promise<CreatedIssues> => issues.createIssues(client, parameters),
      bulkFetchIssues: (parameters: BulkFetchIssues): Promise<BulkIssueResults> =>
        issues.bulkFetchIssues(client, parameters),
      getCreateIssueMetaIssueTypes: (parameters: GetCreateIssueMetaIssueTypes): Promise<PageOfCreateMetaIssueTypes> =>
        issues.getCreateIssueMetaIssueTypes(client, parameters),
      getCreateIssueMetaIssueTypeId: (
        parameters: GetCreateIssueMetaIssueTypeId,
      ): Promise<PageOfCreateMetaIssueTypeWithField> => issues.getCreateIssueMetaIssueTypeId(client, parameters),
      getIssue: (parameters: GetIssue): Promise<Issue> => issues.getIssue(client, parameters),
      editIssue: (parameters: EditIssue): Promise<void> => issues.editIssue(client, parameters),
      deleteIssue: (parameters: DeleteIssue): Promise<void> => issues.deleteIssue(client, parameters),
      assignIssue: (parameters: AssignIssue): Promise<void> => issues.assignIssue(client, parameters),
      getChangeLogs: (parameters: GetChangeLogs): Promise<PageChangelog> => issues.getChangeLogs(client, parameters),
      getChangeLogsByIds: (parameters: GetChangeLogsByIds): Promise<PageOfChangelogs> =>
        issues.getChangeLogsByIds(client, parameters),
      getEditIssueMeta: (parameters: GetEditIssueMeta): Promise<IssueUpdateMetadata> =>
        issues.getEditIssueMeta(client, parameters),
      notify: (parameters: Notify): Promise<void> => issues.notify(client, parameters),
      getTransitions: (parameters: GetTransitions): Promise<Transitions> => issues.getTransitions(client, parameters),
      doTransition: (parameters: DoTransition): Promise<void> => issues.doTransition(client, parameters),
    },
    labels: {
      getAllLabels: (parameters?: GetAllLabels): Promise<PageString> => labels.getAllLabels(client, parameters),
    },
    applicationRoles: {
      getAllApplicationRoles: (): Promise<ApplicationRole[]> => applicationRoles.getAllApplicationRoles(client),
      getApplicationRole: (parameters: GetApplicationRole): Promise<ApplicationRole> =>
        applicationRoles.getApplicationRole(client, parameters),
    },
    permissions: {
      getMyPermissions: (parameters?: GetMyPermissions): Promise<Permissions> =>
        permissions.getMyPermissions(client, parameters),
      getAllPermissions: (): Promise<Permissions> => permissions.getAllPermissions(client),
      getBulkPermissions: (parameters: GetBulkPermissions): Promise<BulkPermissionGrants> =>
        permissions.getBulkPermissions(client, parameters),
      getPermittedProjects: (parameters: GetPermittedProjects): Promise<PermittedProjects> =>
        permissions.getPermittedProjects(client, parameters),
    },
    projectKeyAndNameValidation: {
      validateProjectKey: (parameters?: ValidateProjectKey): Promise<ErrorCollection> =>
        projectKeyAndNameValidation.validateProjectKey(client, parameters),
      getValidProjectKey: (parameters?: GetValidProjectKey): Promise<string> =>
        projectKeyAndNameValidation.getValidProjectKey(client, parameters),
      getValidProjectName: (parameters: GetValidProjectName): Promise<string> =>
        projectKeyAndNameValidation.getValidProjectName(client, parameters),
    },
    workflowStatusCategories: {
      getStatusCategories: (): Promise<StatusCategory[]> => workflowStatusCategories.getStatusCategories(client),
      getStatusCategory: (parameters: GetStatusCategory): Promise<StatusCategory> =>
        workflowStatusCategories.getStatusCategory(client, parameters),
    },
    workflowStatuses: {
      getStatuses: (): Promise<StatusDetails[]> => workflowStatuses.getStatuses(client),
      getStatus: (parameters: GetStatus): Promise<StatusDetails> => workflowStatuses.getStatus(client, parameters),
    },
    jiraSettings: {
      getApplicationProperty: (parameters?: GetApplicationProperty): Promise<ApplicationProperty[]> =>
        jiraSettings.getApplicationProperty(client, parameters),
      getAdvancedSettings: (): Promise<ApplicationProperty[]> => jiraSettings.getAdvancedSettings(client),
      setApplicationProperty: (parameters: SetApplicationProperty): Promise<ApplicationProperty> =>
        jiraSettings.setApplicationProperty(client, parameters),
      getConfiguration: (): Promise<Configuration> => jiraSettings.getConfiguration(client),
    },
    timeTracking: {
      getSelectedTimeTrackingImplementation: (): Promise<void> =>
        timeTracking.getSelectedTimeTrackingImplementation(client),
      selectTimeTrackingImplementation: (parameters: SelectTimeTrackingImplementation): Promise<void> =>
        timeTracking.selectTimeTrackingImplementation(client, parameters),
      getAvailableTimeTrackingImplementations: (): Promise<TimeTrackingProvider[]> =>
        timeTracking.getAvailableTimeTrackingImplementations(client),
      getSharedTimeTrackingConfiguration: (): Promise<TimeTrackingConfiguration> =>
        timeTracking.getSharedTimeTrackingConfiguration(client),
      setSharedTimeTrackingConfiguration: (
        parameters: SetSharedTimeTrackingConfiguration,
      ): Promise<TimeTrackingConfiguration> => timeTracking.setSharedTimeTrackingConfiguration(client, parameters),
    },
    issueResolutions: {
      getResolution: (parameters: GetResolution): Promise<Resolution> =>
        issueResolutions.getResolution(client, parameters),
    },
    issuePriorities: {
      setDefaultPriority: (parameters: SetDefaultPriority): Promise<void> =>
        issuePriorities.setDefaultPriority(client, parameters),
      movePriorities: (parameters: MovePriorities): Promise<void> => issuePriorities.movePriorities(client, parameters),
      getPriority: (parameters: GetPriority): Promise<Priority> => issuePriorities.getPriority(client, parameters),
      deletePriority: (parameters: DeletePriority): Promise<unknown> =>
        issuePriorities.deletePriority(client, parameters),
    },
    issueFields: {
      getFields: (): Promise<FieldDetails[]> => issueFields.getFields(client),
      createCustomField: (parameters: CreateCustomField): Promise<FieldDetails> =>
        issueFields.createCustomField(client, parameters),
      getFieldsPaginated: (parameters?: GetFieldsPaginated): Promise<PageField> =>
        issueFields.getFieldsPaginated(client, parameters),
      getTrashedFieldsPaginated: (parameters?: GetTrashedFieldsPaginated): Promise<PageField> =>
        issueFields.getTrashedFieldsPaginated(client, parameters),
      updateCustomField: (parameters: UpdateCustomField): Promise<void> =>
        issueFields.updateCustomField(client, parameters),
      deleteCustomField: (parameters: DeleteCustomField): Promise<unknown> =>
        issueFields.deleteCustomField(client, parameters),
      restoreCustomField: (parameters: RestoreCustomField): Promise<unknown> =>
        issueFields.restoreCustomField(client, parameters),
      trashCustomField: (parameters: TrashCustomField): Promise<unknown> =>
        issueFields.trashCustomField(client, parameters),
    },
    issueTypes: {
      getIssueAllTypes: (): Promise<IssueTypeDetails[]> => issueTypes.getIssueAllTypes(client),
      createIssueType: (parameters: CreateIssueType): Promise<IssueTypeDetails> =>
        issueTypes.createIssueType(client, parameters),
      getIssueType: (parameters: GetIssueType): Promise<IssueTypeDetails> =>
        issueTypes.getIssueType(client, parameters),
      updateIssueType: (parameters: UpdateIssueType): Promise<IssueTypeDetails> =>
        issueTypes.updateIssueType(client, parameters),
      deleteIssueType: (parameters: DeleteIssueType): Promise<void> => issueTypes.deleteIssueType(client, parameters),
      getAlternativeIssueTypes: (parameters: GetAlternativeIssueTypes): Promise<IssueTypeDetails[]> =>
        issueTypes.getAlternativeIssueTypes(client, parameters),
      createIssueTypeAvatar: (parameters: CreateIssueTypeAvatar): Promise<Avatar> =>
        issueTypes.createIssueTypeAvatar(client, parameters),
    },
    issueLinkTypes: {
      getIssueLinkTypes: (): Promise<IssueLinkTypes> => issueLinkTypes.getIssueLinkTypes(client),
      createIssueLinkType: (parameters: CreateIssueLinkType): Promise<IssueLinkType> =>
        issueLinkTypes.createIssueLinkType(client, parameters),
      getIssueLinkType: (parameters: GetIssueLinkType): Promise<IssueLinkType> =>
        issueLinkTypes.getIssueLinkType(client, parameters),
      updateIssueLinkType: (parameters: UpdateIssueLinkType): Promise<IssueLinkType> =>
        issueLinkTypes.updateIssueLinkType(client, parameters),
      deleteIssueLinkType: (parameters: DeleteIssueLinkType): Promise<void> =>
        issueLinkTypes.deleteIssueLinkType(client, parameters),
    },
    status: {
      getStatusesById: (parameters: GetStatusesById): Promise<JiraStatus[]> =>
        status.getStatusesById(client, parameters),
      createStatuses: (parameters: CreateStatuses): Promise<JiraStatus[]> => status.createStatuses(client, parameters),
      updateStatuses: (parameters: UpdateStatuses): Promise<void> => status.updateStatuses(client, parameters),
      deleteStatusesById: (parameters: DeleteStatusesById): Promise<void> =>
        status.deleteStatusesById(client, parameters),
      getStatusesByName: (parameters: GetStatusesByName): Promise<JiraStatus[]> =>
        status.getStatusesByName(client, parameters),
      search: (parameters?: Search): Promise<PageOfStatuses> => status.search(client, parameters),
      getProjectIssueTypeUsagesForStatus: (
        parameters: GetProjectIssueTypeUsagesForStatus,
      ): Promise<StatusProjectIssueTypeUsageDTO> => status.getProjectIssueTypeUsagesForStatus(client, parameters),
      getProjectUsagesForStatus: (parameters: GetProjectUsagesForStatus): Promise<StatusProjectUsageDTO> =>
        status.getProjectUsagesForStatus(client, parameters),
      getWorkflowUsagesForStatus: (parameters: GetWorkflowUsagesForStatus): Promise<StatusWorkflowUsageDTO> =>
        status.getWorkflowUsagesForStatus(client, parameters),
    },
    auditRecords: {
      getAuditRecords: (parameters?: GetAuditRecords): Promise<AuditRecords> =>
        auditRecords.getAuditRecords(client, parameters),
    },
    avatars: {
      getAllSystemAvatars: (parameters: GetAllSystemAvatars): Promise<SystemAvatars> =>
        avatars.getAllSystemAvatars(client, parameters),
      getAvatars: (parameters: GetAvatars): Promise<Avatars> => avatars.getAvatars(client, parameters),
      storeAvatar: (parameters: StoreAvatar): Promise<Avatar> => avatars.storeAvatar(client, parameters),
      deleteAvatar: (parameters: DeleteAvatar): Promise<void> => avatars.deleteAvatar(client, parameters),
    },
    projectTypes: {
      getAllProjectTypes: (): Promise<ProjectType[]> => projectTypes.getAllProjectTypes(client),
      getAllAccessibleProjectTypes: (): Promise<ProjectType[]> => projectTypes.getAllAccessibleProjectTypes(client),
      getProjectTypeByKey: (parameters: GetProjectTypeByKey): Promise<ProjectType> =>
        projectTypes.getProjectTypeByKey(client, parameters),
      getAccessibleProjectTypeByKey: (parameters: GetAccessibleProjectTypeByKey): Promise<ProjectType> =>
        projectTypes.getAccessibleProjectTypeByKey(client, parameters),
    },
    projectCategories: {
      getAllProjectCategories: (): Promise<ProjectCategory[]> => projectCategories.getAllProjectCategories(client),
      createProjectCategory: (parameters: CreateProjectCategory): Promise<UpdatedProjectCategory> =>
        projectCategories.createProjectCategory(client, parameters),
      getProjectCategoryById: (parameters: GetProjectCategoryById): Promise<ProjectCategory> =>
        projectCategories.getProjectCategoryById(client, parameters),
      updateProjectCategory: (parameters: UpdateProjectCategory): Promise<UpdatedProjectCategory> =>
        projectCategories.updateProjectCategory(client, parameters),
      removeProjectCategory: (parameters: RemoveProjectCategory): Promise<void> =>
        projectCategories.removeProjectCategory(client, parameters),
    },
    issueNavigatorSettings: {
      getIssueNavigatorDefaultColumns: (): Promise<ColumnItem[]> =>
        issueNavigatorSettings.getIssueNavigatorDefaultColumns(client),
      setIssueNavigatorDefaultColumns: (parameters: SetIssueNavigatorDefaultColumns): Promise<unknown> =>
        issueNavigatorSettings.setIssueNavigatorDefaultColumns(client, parameters),
    },
    groupAndUserPicker: {
      findUsersAndGroups: (parameters: FindUsersAndGroups): Promise<FoundUsersAndGroups> =>
        groupAndUserPicker.findUsersAndGroups(client, parameters),
    },
    groups: {
      createGroup: (parameters: CreateGroup): Promise<Group> => groups.createGroup(client, parameters),
      removeGroup: (parameters: RemoveGroup): Promise<unknown> => groups.removeGroup(client, parameters),
      getUsersFromGroup: (parameters: GetUsersFromGroup): Promise<PageUserDetails> =>
        groups.getUsersFromGroup(client, parameters),
      addUserToGroup: (parameters: AddUserToGroup): Promise<Group> => groups.addUserToGroup(client, parameters),
      removeUserFromGroup: (parameters: RemoveUserFromGroup): Promise<unknown> =>
        groups.removeUserFromGroup(client, parameters),
      findGroups: (parameters?: FindGroups): Promise<FoundGroups> => groups.findGroups(client, parameters),
    },
    users: {
      getUser: (parameters?: GetUser): Promise<DashboardUser> => users.getUser(client, parameters),
      createUser: (parameters: CreateUser): Promise<DashboardUser> => users.createUser(client, parameters),
      removeUser: (parameters: RemoveUser): Promise<void> => users.removeUser(client, parameters),
      getUserDefaultColumns: (parameters?: GetUserDefaultColumns): Promise<ColumnItem[]> =>
        users.getUserDefaultColumns(client, parameters),
      setUserColumns: (parameters: SetUserColumns): Promise<unknown> => users.setUserColumns(client, parameters),
      resetUserColumns: (parameters: ResetUserColumns): Promise<void> => users.resetUserColumns(client, parameters),
      getUserEmail: (parameters: GetUserEmail): Promise<UnrestrictedUserEmail> =>
        users.getUserEmail(client, parameters),
      getUserEmailBulk: (parameters: GetUserEmailBulk): Promise<UnrestrictedUserEmail> =>
        users.getUserEmailBulk(client, parameters),
      getUserGroups: (parameters: GetUserGroups): Promise<GroupName[]> => users.getUserGroups(client, parameters),
      getAllUsersDefault: (parameters?: GetAllUsersDefault): Promise<DashboardUser[]> =>
        users.getAllUsersDefault(client, parameters),
      getAllUsers: (parameters?: GetAllUsers): Promise<DashboardUser[]> => users.getAllUsers(client, parameters),
    },
    userSearch: {
      findBulkAssignableUsers: (parameters: FindBulkAssignableUsers): Promise<DashboardUser[]> =>
        userSearch.findBulkAssignableUsers(client, parameters),
      findAssignableUsers: (parameters?: FindAssignableUsers): Promise<DashboardUser[]> =>
        userSearch.findAssignableUsers(client, parameters),
      findUsersWithAllPermissions: (parameters: FindUsersWithAllPermissions): Promise<DashboardUser[]> =>
        userSearch.findUsersWithAllPermissions(client, parameters),
      findUsersForPicker: (parameters: FindUsersForPicker): Promise<FoundUsers> =>
        userSearch.findUsersForPicker(client, parameters),
      findUsers: (parameters?: FindUsers): Promise<DashboardUser[]> => userSearch.findUsers(client, parameters),
      findUsersByQuery: (parameters: FindUsersByQuery): Promise<PageUser> =>
        userSearch.findUsersByQuery(client, parameters),
      findUserKeysByQuery: (parameters: FindUserKeysByQuery): Promise<PageUserKey> =>
        userSearch.findUserKeysByQuery(client, parameters),
      findUsersWithBrowsePermission: (parameters?: FindUsersWithBrowsePermission): Promise<DashboardUser[]> =>
        userSearch.findUsersWithBrowsePermission(client, parameters),
    },
    dashboards: {
      getAllDashboards: (parameters?: GetAllDashboards): Promise<PageOfDashboards> =>
        dashboards.getAllDashboards(client, parameters),
      getDashboardsPaginated: (parameters?: GetDashboardsPaginated): Promise<PageDashboard> =>
        dashboards.getDashboardsPaginated(client, parameters),
      getDashboardItemPropertyKeys: (parameters: GetDashboardItemPropertyKeys): Promise<PropertyKeys> =>
        dashboards.getDashboardItemPropertyKeys(client, parameters),
      getDashboardItemProperty: (parameters: GetDashboardItemProperty): Promise<EntityProperty> =>
        dashboards.getDashboardItemProperty(client, parameters),
      setDashboardItemProperty: (parameters: SetDashboardItemProperty): Promise<unknown> =>
        dashboards.setDashboardItemProperty(client, parameters),
      deleteDashboardItemProperty: (parameters: DeleteDashboardItemProperty): Promise<void> =>
        dashboards.deleteDashboardItemProperty(client, parameters),
      getDashboard: (parameters: GetDashboard): Promise<Dashboard> => dashboards.getDashboard(client, parameters),
    },
    filters: {
      createFilter: (parameters: CreateFilter): Promise<Filter> => filters.createFilter(client, parameters),
      getFavouriteFilters: (parameters?: GetFavouriteFilters): Promise<Filter[]> =>
        filters.getFavouriteFilters(client, parameters),
      getMyFilters: (parameters?: GetMyFilters): Promise<Filter[]> => filters.getMyFilters(client, parameters),
      getFiltersPaginated: (parameters?: GetFiltersPaginated): Promise<PageFilterDetails> =>
        filters.getFiltersPaginated(client, parameters),
      getFilter: (parameters: GetFilter): Promise<Filter> => filters.getFilter(client, parameters),
      updateFilter: (parameters: UpdateFilter): Promise<Filter> => filters.updateFilter(client, parameters),
      deleteFilter: (parameters: DeleteFilter): Promise<void> => filters.deleteFilter(client, parameters),
      getColumns: (parameters: GetColumns): Promise<ColumnItem[]> => filters.getColumns(client, parameters),
      setColumns: (parameters: SetColumns): Promise<unknown> => filters.setColumns(client, parameters),
      resetColumns: (parameters: ResetColumns): Promise<void> => filters.resetColumns(client, parameters),
      setFavouriteForFilter: (parameters: SetFavouriteForFilter): Promise<Filter> =>
        filters.setFavouriteForFilter(client, parameters),
      deleteFavouriteForFilter: (parameters: DeleteFavouriteForFilter): Promise<Filter> =>
        filters.deleteFavouriteForFilter(client, parameters),
    },
    filterSharing: {
      getDefaultShareScope: (): Promise<DefaultShareScope> => filterSharing.getDefaultShareScope(client),
      setDefaultShareScope: (parameters: SetDefaultShareScope): Promise<DefaultShareScope> =>
        filterSharing.setDefaultShareScope(client, parameters),
      getSharePermissions: (parameters: GetSharePermissions): Promise<SharePermission[]> =>
        filterSharing.getSharePermissions(client, parameters),
      addSharePermission: (parameters: AddSharePermission): Promise<SharePermission[]> =>
        filterSharing.addSharePermission(client, parameters),
      getSharePermission: (parameters: GetSharePermission): Promise<SharePermission> =>
        filterSharing.getSharePermission(client, parameters),
      deleteSharePermission: (parameters: DeleteSharePermission): Promise<void> =>
        filterSharing.deleteSharePermission(client, parameters),
    },
    issueComments: {
      getCommentsByIds: (parameters: GetCommentsByIds): Promise<PageComment> =>
        issueComments.getCommentsByIds(client, parameters),
      getComments: (parameters: GetComments): Promise<PageOfComments> => issueComments.getComments(client, parameters),
      addComment: (parameters: AddComment): Promise<Comment> => issueComments.addComment(client, parameters),
      getComment: (parameters: GetComment): Promise<Comment> => issueComments.getComment(client, parameters),
      updateComment: (parameters: UpdateComment): Promise<Comment> => issueComments.updateComment(client, parameters),
      deleteComment: (parameters: DeleteComment): Promise<void> => issueComments.deleteComment(client, parameters),
    },
    issueLinks: {
      linkIssues: (parameters: LinkIssues): Promise<unknown> => issueLinks.linkIssues(client, parameters),
      getIssueLink: (parameters: GetIssueLink): Promise<IssueLink> => issueLinks.getIssueLink(client, parameters),
      deleteIssueLink: (parameters: DeleteIssueLink): Promise<void> => issueLinks.deleteIssueLink(client, parameters),
    },
    issueSearch: {
      getIssuePickerResource: (parameters?: GetIssuePickerResource): Promise<IssuePickerSuggestions> =>
        issueSearch.getIssuePickerResource(client, parameters),
      matchIssues: (parameters: MatchIssues): Promise<IssueMatches> => issueSearch.matchIssues(client, parameters),
      countIssues: (parameters?: CountIssues): Promise<JQLCountResults> =>
        issueSearch.countIssues(client, parameters ?? {}),
      searchAndReconcileIssuesUsingJql: (
        parameters?: SearchAndReconsileIssuesUsingJql,
      ): Promise<SearchAndReconcileResults> => issueSearch.searchAndReconcileIssuesUsingJql(client, parameters),
      searchAndReconcileIssuesUsingJqlPost: (
        parameters: SearchAndReconsileIssuesUsingJqlPost,
      ): Promise<SearchAndReconcileResults> => issueSearch.searchAndReconcileIssuesUsingJqlPost(client, parameters),
      /** @deprecated Typo in original name. Use `searchAndReconcileIssuesUsingJql` instead. Will be removed in v1.0.0. */
      searchAndReconsileIssuesUsingJql: (
        parameters?: SearchAndReconsileIssuesUsingJql,
      ): Promise<SearchAndReconcileResults> => issueSearch.searchAndReconcileIssuesUsingJql(client, parameters),
      /**
       * @deprecated Typo in original name. Use `searchAndReconcileIssuesUsingJqlPost` instead. Will be removed in
       *   v1.0.0.
       */
      searchAndReconsileIssuesUsingJqlPost: (
        parameters: SearchAndReconsileIssuesUsingJqlPost,
      ): Promise<SearchAndReconcileResults> => issueSearch.searchAndReconcileIssuesUsingJqlPost(client, parameters),
    },
    issueVotes: {
      getVotes: (parameters: GetVotes): Promise<Votes> => issueVotes.getVotes(client, parameters),
      addVote: (parameters: AddVote): Promise<unknown> => issueVotes.addVote(client, parameters),
      removeVote: (parameters: RemoveVote): Promise<void> => issueVotes.removeVote(client, parameters),
    },
    issueWatchers: {
      getIsWatchingIssueBulk: (parameters: GetIsWatchingIssueBulk): Promise<BulkIssueIsWatching> =>
        issueWatchers.getIsWatchingIssueBulk(client, parameters),
      getIssueWatchers: (parameters: GetIssueWatchers): Promise<Watchers> =>
        issueWatchers.getIssueWatchers(client, parameters),
      addWatcher: (parameters: AddWatcher): Promise<unknown> => issueWatchers.addWatcher(client, parameters),
      removeWatcher: (parameters: RemoveWatcher): Promise<void> => issueWatchers.removeWatcher(client, parameters),
    },
    issueWorklogs: {
      getIssueWorklog: (parameters: GetIssueWorklog): Promise<PageOfWorklogs> =>
        issueWorklogs.getIssueWorklog(client, parameters),
      addWorklog: (parameters: AddWorklog): Promise<Worklog> => issueWorklogs.addWorklog(client, parameters),
      getWorklog: (parameters: GetWorklog): Promise<Worklog> => issueWorklogs.getWorklog(client, parameters),
      updateWorklog: (parameters: UpdateWorklog): Promise<Worklog> => issueWorklogs.updateWorklog(client, parameters),
      deleteWorklog: (parameters: DeleteWorklog): Promise<void> => issueWorklogs.deleteWorklog(client, parameters),
      getIdsOfWorklogsDeletedSince: (parameters?: GetIdsOfWorklogsDeletedSince): Promise<ChangedWorklogs> =>
        issueWorklogs.getIdsOfWorklogsDeletedSince(client, parameters),
      getWorklogsForIds: (parameters: GetWorklogsForIds): Promise<Worklog[]> =>
        issueWorklogs.getWorklogsForIds(client, parameters),
      getIdsOfWorklogsModifiedSince: (parameters?: GetIdsOfWorklogsModifiedSince): Promise<ChangedWorklogs> =>
        issueWorklogs.getIdsOfWorklogsModifiedSince(client, parameters),
    },
    issueProperties: {
      bulkSetIssuesPropertiesList: (parameters: BulkSetIssuesPropertiesList): Promise<unknown> =>
        issueProperties.bulkSetIssuesPropertiesList(client, parameters),
      bulkSetIssuePropertiesByIssue: (parameters: BulkSetIssuePropertiesByIssue): Promise<unknown> =>
        issueProperties.bulkSetIssuePropertiesByIssue(client, parameters),
      bulkSetIssueProperty: (parameters: BulkSetIssueProperty): Promise<unknown> =>
        issueProperties.bulkSetIssueProperty(client, parameters),
      bulkDeleteIssueProperty: (parameters: BulkDeleteIssueProperty): Promise<unknown> =>
        issueProperties.bulkDeleteIssueProperty(client, parameters),
      getIssuePropertyKeys: (parameters: GetIssuePropertyKeys): Promise<PropertyKeys> =>
        issueProperties.getIssuePropertyKeys(client, parameters),
      getIssueProperty: (parameters: GetIssueProperty): Promise<EntityProperty> =>
        issueProperties.getIssueProperty(client, parameters),
      setIssueProperty: (parameters: SetIssueProperty): Promise<unknown> =>
        issueProperties.setIssueProperty(client, parameters),
      deleteIssueProperty: (parameters: DeleteIssueProperty): Promise<void> =>
        issueProperties.deleteIssueProperty(client, parameters),
    },
    issueRemoteLinks: {
      getRemoteIssueLinks: (parameters: GetRemoteIssueLinks): Promise<unknown> =>
        issueRemoteLinks.getRemoteIssueLinks(client, parameters),
      createOrUpdateRemoteIssueLink: (parameters: CreateOrUpdateRemoteIssueLink): Promise<RemoteIssueLinkIdentifies> =>
        issueRemoteLinks.createOrUpdateRemoteIssueLink(client, parameters),
      deleteRemoteIssueLinkByGlobalId: (parameters: DeleteRemoteIssueLinkByGlobalId): Promise<void> =>
        issueRemoteLinks.deleteRemoteIssueLinkByGlobalId(client, parameters),
      getRemoteIssueLinkById: (parameters: GetRemoteIssueLinkById): Promise<RemoteIssueLink> =>
        issueRemoteLinks.getRemoteIssueLinkById(client, parameters),
      updateRemoteIssueLink: (parameters: UpdateRemoteIssueLink): Promise<void> =>
        issueRemoteLinks.updateRemoteIssueLink(client, parameters),
      deleteRemoteIssueLinkById: (parameters: DeleteRemoteIssueLinkById): Promise<void> =>
        issueRemoteLinks.deleteRemoteIssueLinkById(client, parameters),
    },
    issueNotificationSchemes: {
      getNotificationSchemes: (parameters?: GetNotificationSchemes): Promise<PageNotificationScheme> =>
        issueNotificationSchemes.getNotificationSchemes(client, parameters),
      getNotificationSchemeToProjectMappings: (
        parameters?: GetNotificationSchemeToProjectMappings,
      ): Promise<NotificationSchemeAndProjectMappingPage> =>
        issueNotificationSchemes.getNotificationSchemeToProjectMappings(client, parameters),
      getNotificationScheme: (parameters: GetNotificationScheme): Promise<NotificationScheme> =>
        issueNotificationSchemes.getNotificationScheme(client, parameters),
      addNotifications: (parameters: AddNotifications): Promise<unknown> =>
        issueNotificationSchemes.addNotifications(client, parameters),
      removeNotificationFromNotificationScheme: (
        parameters: RemoveNotificationFromNotificationScheme,
      ): Promise<unknown> => issueNotificationSchemes.removeNotificationFromNotificationScheme(client, parameters),
    },
    projectComponents: {
      findComponentsForProjects: (parameters?: FindComponentsForProjects): Promise<Page2ComponentJson> =>
        projectComponents.findComponentsForProjects(client, parameters),
      createComponent: (parameters: CreateComponent): Promise<ProjectComponent> =>
        projectComponents.createComponent(client, parameters),
      getComponent: (parameters: GetComponent): Promise<ProjectComponent> =>
        projectComponents.getComponent(client, parameters),
      updateComponent: (parameters: UpdateComponent): Promise<ProjectComponent> =>
        projectComponents.updateComponent(client, parameters),
      deleteComponent: (parameters: DeleteComponent): Promise<void> =>
        projectComponents.deleteComponent(client, parameters),
      getComponentRelatedIssues: (parameters: GetComponentRelatedIssues): Promise<ComponentIssuesCount> =>
        projectComponents.getComponentRelatedIssues(client, parameters),
      getProjectComponentsPaginated: (parameters: GetProjectComponentsPaginated): Promise<Page2ComponentJson> =>
        projectComponents.getProjectComponentsPaginated(client, parameters),
      getProjectComponents: (parameters: GetProjectComponents): Promise<ProjectComponent[]> =>
        projectComponents.getProjectComponents(client, parameters),
    },
    projectRoles: {
      getProjectRoles: (parameters: GetProjectRoles): Promise<unknown> =>
        projectRoles.getProjectRoles(client, parameters),
      getProjectRole: (parameters: GetProjectRole): Promise<ProjectRole> =>
        projectRoles.getProjectRole(client, parameters),
      getProjectRoleDetails: (parameters: GetProjectRoleDetails): Promise<ProjectRoleDetails[]> =>
        projectRoles.getProjectRoleDetails(client, parameters),
      getAllProjectRoles: (): Promise<ProjectRole[]> => projectRoles.getAllProjectRoles(client),
      createProjectRole: (parameters: CreateProjectRole): Promise<ProjectRole> =>
        projectRoles.createProjectRole(client, parameters),
      getProjectRoleById: (parameters: GetProjectRoleById): Promise<ProjectRole> =>
        projectRoles.getProjectRoleById(client, parameters),
      partialUpdateProjectRole: (parameters: PartialUpdateProjectRole): Promise<ProjectRole> =>
        projectRoles.partialUpdateProjectRole(client, parameters),
      fullyUpdateProjectRole: (parameters: FullyUpdateProjectRole): Promise<ProjectRole> =>
        projectRoles.fullyUpdateProjectRole(client, parameters),
      deleteProjectRole: (parameters: DeleteProjectRole): Promise<void> =>
        projectRoles.deleteProjectRole(client, parameters),
    },
    projectRoleActors: {
      addActorUsers: (parameters: AddActorUsers): Promise<ProjectRole> =>
        projectRoleActors.addActorUsers(client, parameters),
      setActors: (parameters: SetActors): Promise<ProjectRole> => projectRoleActors.setActors(client, parameters),
      deleteActor: (parameters: DeleteActor): Promise<void> => projectRoleActors.deleteActor(client, parameters),
      getProjectRoleActorsForRole: (parameters: GetProjectRoleActorsForRole): Promise<ProjectRole> =>
        projectRoleActors.getProjectRoleActorsForRole(client, parameters),
      addProjectRoleActorsToRole: (parameters: AddProjectRoleActorsToRole): Promise<ProjectRole> =>
        projectRoleActors.addProjectRoleActorsToRole(client, parameters),
      deleteProjectRoleActorsFromRole: (parameters: DeleteProjectRoleActorsFromRole): Promise<ProjectRole> =>
        projectRoleActors.deleteProjectRoleActorsFromRole(client, parameters),
    },
    projectVersions: {
      getProjectVersionsPaginated: (parameters: GetProjectVersionsPaginated): Promise<PageVersion> =>
        projectVersions.getProjectVersionsPaginated(client, parameters),
      getProjectVersions: (parameters: GetProjectVersions): Promise<Version[]> =>
        projectVersions.getProjectVersions(client, parameters),
      createVersion: (parameters: CreateVersion): Promise<Version> => projectVersions.createVersion(client, parameters),
      getVersion: (parameters: GetVersion): Promise<Version> => projectVersions.getVersion(client, parameters),
      updateVersion: (parameters: UpdateVersion): Promise<Version> => projectVersions.updateVersion(client, parameters),
      mergeVersions: (parameters: MergeVersions): Promise<void> => projectVersions.mergeVersions(client, parameters),
      moveVersion: (parameters: MoveVersion): Promise<Version> => projectVersions.moveVersion(client, parameters),
      getVersionRelatedIssues: (parameters: GetVersionRelatedIssues): Promise<VersionIssueCounts> =>
        projectVersions.getVersionRelatedIssues(client, parameters),
      getRelatedWork: (parameters: GetRelatedWork): Promise<VersionRelatedWork[]> =>
        projectVersions.getRelatedWork(client, parameters),
      createRelatedWork: (parameters: CreateRelatedWork): Promise<VersionRelatedWork> =>
        projectVersions.createRelatedWork(client, parameters),
      updateRelatedWork: (parameters: UpdateRelatedWork): Promise<VersionRelatedWork> =>
        projectVersions.updateRelatedWork(client, parameters),
      deleteAndReplaceVersion: (parameters: DeleteAndReplaceVersion): Promise<void> =>
        projectVersions.deleteAndReplaceVersion(client, parameters),
      getVersionUnresolvedIssues: (parameters: GetVersionUnresolvedIssues): Promise<VersionUnresolvedIssuesCount> =>
        projectVersions.getVersionUnresolvedIssues(client, parameters),
      deleteRelatedWork: (parameters: DeleteRelatedWork): Promise<void> =>
        projectVersions.deleteRelatedWork(client, parameters),
    },
    projectEmail: {
      getProjectEmail: (parameters: GetProjectEmail): Promise<ProjectEmailAddress> =>
        projectEmail.getProjectEmail(client, parameters),
      updateProjectEmail: (parameters: UpdateProjectEmail): Promise<void> =>
        projectEmail.updateProjectEmail(client, parameters),
    },
    projectFeatures: {
      getFeaturesForProject: (parameters: GetFeaturesForProject): Promise<ContainerForProjectFeatures> =>
        projectFeatures.getFeaturesForProject(client, parameters),
      toggleFeatureForProject: (parameters: ToggleFeatureForProject): Promise<ContainerForProjectFeatures> =>
        projectFeatures.toggleFeatureForProject(client, parameters),
    },
    projectProperties: {
      getProjectPropertyKeys: (parameters: GetProjectPropertyKeys): Promise<PropertyKeys> =>
        projectProperties.getProjectPropertyKeys(client, parameters),
      getProjectProperty: (parameters: GetProjectProperty): Promise<EntityProperty> =>
        projectProperties.getProjectProperty(client, parameters),
      setProjectProperty: (parameters: SetProjectProperty): Promise<unknown> =>
        projectProperties.setProjectProperty(client, parameters),
      deleteProjectProperty: (parameters: DeleteProjectProperty): Promise<void> =>
        projectProperties.deleteProjectProperty(client, parameters),
    },
    permissionSchemes: {
      getAllPermissionSchemes: (parameters?: GetAllPermissionSchemes): Promise<PermissionSchemes> =>
        permissionSchemes.getAllPermissionSchemes(client, parameters),
      createPermissionScheme: (parameters: CreatePermissionScheme): Promise<PermissionScheme> =>
        permissionSchemes.createPermissionScheme(client, parameters),
      getPermissionScheme: (parameters: GetPermissionScheme): Promise<PermissionScheme> =>
        permissionSchemes.getPermissionScheme(client, parameters),
      updatePermissionScheme: (parameters: UpdatePermissionScheme): Promise<PermissionScheme> =>
        permissionSchemes.updatePermissionScheme(client, parameters),
      deletePermissionScheme: (parameters: DeletePermissionScheme): Promise<void> =>
        permissionSchemes.deletePermissionScheme(client, parameters),
      getPermissionSchemeGrants: (parameters: GetPermissionSchemeGrants): Promise<PermissionGrants> =>
        permissionSchemes.getPermissionSchemeGrants(client, parameters),
      createPermissionGrant: (parameters: CreatePermissionGrant): Promise<PermissionGrant> =>
        permissionSchemes.createPermissionGrant(client, parameters),
      getPermissionSchemeGrant: (parameters: GetPermissionSchemeGrant): Promise<PermissionGrant> =>
        permissionSchemes.getPermissionSchemeGrant(client, parameters),
      deletePermissionSchemeEntity: (parameters: DeletePermissionSchemeEntity): Promise<void> =>
        permissionSchemes.deletePermissionSchemeEntity(client, parameters),
    },
    issueTypeSchemes: {
      getAllIssueTypeSchemes: (parameters?: GetAllIssueTypeSchemes): Promise<PageIssueTypeScheme> =>
        issueTypeSchemes.getAllIssueTypeSchemes(client, parameters),
      createIssueTypeScheme: (parameters: CreateIssueTypeScheme): Promise<IssueTypeSchemeID> =>
        issueTypeSchemes.createIssueTypeScheme(client, parameters),
      getIssueTypeSchemesMapping: (parameters?: GetIssueTypeSchemesMapping): Promise<PageIssueTypeSchemeMapping> =>
        issueTypeSchemes.getIssueTypeSchemesMapping(client, parameters),
      getIssueTypeSchemeForProjects: (
        parameters: GetIssueTypeSchemeForProjects,
      ): Promise<PageIssueTypeSchemeProjects> => issueTypeSchemes.getIssueTypeSchemeForProjects(client, parameters),
      assignIssueTypeSchemeToProject: (parameters: AssignIssueTypeSchemeToProject): Promise<void> =>
        issueTypeSchemes.assignIssueTypeSchemeToProject(client, parameters),
      updateIssueTypeScheme: (parameters: UpdateIssueTypeScheme): Promise<void> =>
        issueTypeSchemes.updateIssueTypeScheme(client, parameters),
      deleteIssueTypeScheme: (parameters: DeleteIssueTypeScheme): Promise<void> =>
        issueTypeSchemes.deleteIssueTypeScheme(client, parameters),
      addIssueTypesToIssueTypeScheme: (parameters: AddIssueTypesToIssueTypeScheme): Promise<void> =>
        issueTypeSchemes.addIssueTypesToIssueTypeScheme(client, parameters),
      reorderIssueTypesInIssueTypeScheme: (parameters: ReorderIssueTypesInIssueTypeScheme): Promise<void> =>
        issueTypeSchemes.reorderIssueTypesInIssueTypeScheme(client, parameters),
      removeIssueTypeFromIssueTypeScheme: (parameters: RemoveIssueTypeFromIssueTypeScheme): Promise<void> =>
        issueTypeSchemes.removeIssueTypeFromIssueTypeScheme(client, parameters),
    },
    issueTypeScreenSchemes: {
      getIssueTypeScreenSchemes: (parameters?: GetIssueTypeScreenSchemes): Promise<PageIssueTypeScreenScheme> =>
        issueTypeScreenSchemes.getIssueTypeScreenSchemes(client, parameters),
      createIssueTypeScreenScheme: (parameters: CreateIssueTypeScreenScheme): Promise<IssueTypeScreenSchemeId> =>
        issueTypeScreenSchemes.createIssueTypeScreenScheme(client, parameters),
      getIssueTypeScreenSchemeMappings: (
        parameters?: GetIssueTypeScreenSchemeMappings,
      ): Promise<PageIssueTypeScreenSchemeItem> =>
        issueTypeScreenSchemes.getIssueTypeScreenSchemeMappings(client, parameters),
      getIssueTypeScreenSchemeProjectAssociations: (
        parameters: GetIssueTypeScreenSchemeProjectAssociations,
      ): Promise<PageIssueTypeScreenSchemesProjects> =>
        issueTypeScreenSchemes.getIssueTypeScreenSchemeProjectAssociations(client, parameters),
      assignIssueTypeScreenSchemeToProject: (parameters: AssignIssueTypeScreenSchemeToProject): Promise<void> =>
        issueTypeScreenSchemes.assignIssueTypeScreenSchemeToProject(client, parameters),
      updateIssueTypeScreenScheme: (parameters: UpdateIssueTypeScreenScheme): Promise<void> =>
        issueTypeScreenSchemes.updateIssueTypeScreenScheme(client, parameters),
      deleteIssueTypeScreenScheme: (parameters: DeleteIssueTypeScreenScheme): Promise<void> =>
        issueTypeScreenSchemes.deleteIssueTypeScreenScheme(client, parameters),
      appendMappingsForIssueTypeScreenScheme: (parameters: AppendMappingsForIssueTypeScreenScheme): Promise<void> =>
        issueTypeScreenSchemes.appendMappingsForIssueTypeScreenScheme(client, parameters),
      updateDefaultScreenScheme: (parameters: UpdateDefaultScreenScheme): Promise<void> =>
        issueTypeScreenSchemes.updateDefaultScreenScheme(client, parameters),
      removeMappingsFromIssueTypeScreenScheme: (parameters: RemoveMappingsFromIssueTypeScreenScheme): Promise<void> =>
        issueTypeScreenSchemes.removeMappingsFromIssueTypeScreenScheme(client, parameters),
      getProjectsForIssueTypeScreenScheme: (
        parameters: GetProjectsForIssueTypeScreenScheme,
      ): Promise<PageProjectDetails> => issueTypeScreenSchemes.getProjectsForIssueTypeScreenScheme(client, parameters),
    },
    workflows: {
      readWorkflowFromHistory: (parameters: ReadWorkflowFromHistory): Promise<WorkflowHistoryReadResponseDTO> =>
        workflows.readWorkflowFromHistory(client, parameters),
      listWorkflowHistory: (parameters: ListWorkflowHistory): Promise<WorkflowHistoryListResponseDTO> =>
        workflows.listWorkflowHistory(client, parameters),
      deleteInactiveWorkflow: (parameters: DeleteInactiveWorkflow): Promise<void> =>
        workflows.deleteInactiveWorkflow(client, parameters),
      getWorkflowProjectIssueTypeUsages: (
        parameters: GetWorkflowProjectIssueTypeUsages,
      ): Promise<WorkflowProjectIssueTypeUsageDTO> => workflows.getWorkflowProjectIssueTypeUsages(client, parameters),
      getProjectUsagesForWorkflow: (parameters: GetProjectUsagesForWorkflow): Promise<WorkflowProjectUsageDTO> =>
        workflows.getProjectUsagesForWorkflow(client, parameters),
      getWorkflowSchemeUsagesForWorkflow: (
        parameters: GetWorkflowSchemeUsagesForWorkflow,
      ): Promise<WorkflowSchemeUsageDTO> => workflows.getWorkflowSchemeUsagesForWorkflow(client, parameters),
      readWorkflows: (parameters: ReadWorkflows): Promise<WorkflowReadResponse> =>
        workflows.readWorkflows(client, parameters),
      workflowCapabilities: (parameters?: WorkflowCapabilitiesParameters): Promise<WorkflowCapabilities> =>
        workflows.workflowCapabilities(client, parameters),
      createWorkflows: (parameters: CreateWorkflows): Promise<WorkflowCreateResponse> =>
        workflows.createWorkflows(client, parameters),
      validateCreateWorkflows: (parameters: ValidateCreateWorkflows): Promise<WorkflowValidationErrorList> =>
        workflows.validateCreateWorkflows(client, parameters),
      getDefaultEditor: (): Promise<DefaultWorkflowEditorResponse> => workflows.getDefaultEditor(client),
      readWorkflowPreviews: (parameters: ReadWorkflowPreviews): Promise<WorkflowPreviewResponse> =>
        workflows.readWorkflowPreviews(client, parameters),
      searchWorkflows: (parameters?: SearchWorkflows): Promise<WorkflowSearchResponse> =>
        workflows.searchWorkflows(client, parameters),
      updateWorkflows: (parameters: UpdateWorkflows): Promise<WorkflowUpdateResponse> =>
        workflows.updateWorkflows(client, parameters),
      validateUpdateWorkflows: (parameters: ValidateUpdateWorkflows): Promise<WorkflowValidationErrorList> =>
        workflows.validateUpdateWorkflows(client, parameters),
    },
    workflowSchemes: {
      getAllWorkflowSchemes: (parameters?: GetAllWorkflowSchemes): Promise<PageWorkflowScheme> =>
        workflowSchemes.getAllWorkflowSchemes(client, parameters),
      createWorkflowScheme: (parameters: CreateWorkflowScheme): Promise<WorkflowScheme> =>
        workflowSchemes.createWorkflowScheme(client, parameters),
      readWorkflowSchemes: (parameters: ReadWorkflowSchemes): Promise<WorkflowSchemeReadResponse[]> =>
        workflowSchemes.readWorkflowSchemes(client, parameters),
      updateSchemes: (parameters: UpdateSchemes): Promise<unknown> => workflowSchemes.updateSchemes(client, parameters),
      getRequiredWorkflowSchemeMappings: (
        parameters: GetRequiredWorkflowSchemeMappings,
      ): Promise<WorkflowSchemeUpdateRequiredMappingsResponse> =>
        workflowSchemes.getRequiredWorkflowSchemeMappings(client, parameters),
      getWorkflowScheme: (parameters: GetWorkflowScheme): Promise<WorkflowScheme> =>
        workflowSchemes.getWorkflowScheme(client, parameters),
      updateWorkflowScheme: (parameters: UpdateWorkflowScheme): Promise<WorkflowScheme> =>
        workflowSchemes.updateWorkflowScheme(client, parameters),
      deleteWorkflowScheme: (parameters: DeleteWorkflowScheme): Promise<void> =>
        workflowSchemes.deleteWorkflowScheme(client, parameters),
      getDefaultWorkflow: (parameters: GetDefaultWorkflow): Promise<DefaultWorkflow> =>
        workflowSchemes.getDefaultWorkflow(client, parameters),
      updateDefaultWorkflow: (parameters: UpdateDefaultWorkflow): Promise<WorkflowScheme> =>
        workflowSchemes.updateDefaultWorkflow(client, parameters),
      deleteDefaultWorkflow: (parameters: DeleteDefaultWorkflow): Promise<WorkflowScheme> =>
        workflowSchemes.deleteDefaultWorkflow(client, parameters),
      getWorkflowSchemeIssueType: (parameters: GetWorkflowSchemeIssueType): Promise<IssueTypeWorkflowMapping> =>
        workflowSchemes.getWorkflowSchemeIssueType(client, parameters),
      setWorkflowSchemeIssueType: (parameters: SetWorkflowSchemeIssueType): Promise<WorkflowScheme> =>
        workflowSchemes.setWorkflowSchemeIssueType(client, parameters),
      deleteWorkflowSchemeIssueType: (parameters: DeleteWorkflowSchemeIssueType): Promise<WorkflowScheme> =>
        workflowSchemes.deleteWorkflowSchemeIssueType(client, parameters),
      getWorkflow: (parameters: GetWorkflow): Promise<IssueTypesWorkflowMapping> =>
        workflowSchemes.getWorkflow(client, parameters),
      updateWorkflowMapping: (parameters: UpdateWorkflowMapping): Promise<WorkflowScheme> =>
        workflowSchemes.updateWorkflowMapping(client, parameters),
      deleteWorkflowMapping: (parameters: DeleteWorkflowMapping): Promise<unknown> =>
        workflowSchemes.deleteWorkflowMapping(client, parameters),
      getProjectUsagesForWorkflowScheme: (
        parameters: GetProjectUsagesForWorkflowScheme,
      ): Promise<WorkflowSchemeProjectUsageDTO> =>
        workflowSchemes.getProjectUsagesForWorkflowScheme(client, parameters),
    },
    workflowSchemeProjectAssociations: {
      getWorkflowSchemeProjectAssociations: (
        parameters: GetWorkflowSchemeProjectAssociations,
      ): Promise<ContainerOfWorkflowSchemeAssociations> =>
        workflowSchemeProjectAssociations.getWorkflowSchemeProjectAssociations(client, parameters),
      assignSchemeToProject: (parameters: AssignSchemeToProject): Promise<void> =>
        workflowSchemeProjectAssociations.assignSchemeToProject(client, parameters),
    },
    screens: {
      getScreensForField: (parameters: GetScreensForField): Promise<PageScreenWithTab> =>
        screens.getScreensForField(client, parameters),
      getScreens: (parameters?: GetScreens): Promise<PageScreen> => screens.getScreens(client, parameters),
      addFieldToDefaultScreen: (parameters: AddFieldToDefaultScreen): Promise<unknown> =>
        screens.addFieldToDefaultScreen(client, parameters),
      getAvailableScreenFields: (parameters: GetAvailableScreenFields): Promise<ScreenableField[]> =>
        screens.getAvailableScreenFields(client, parameters),
    },
    screenSchemes: {
      getScreenSchemes: (parameters?: GetScreenSchemes): Promise<PageScreenScheme> =>
        screenSchemes.getScreenSchemes(client, parameters),
      createScreenScheme: (parameters: CreateScreenScheme): Promise<ScreenSchemeId> =>
        screenSchemes.createScreenScheme(client, parameters),
      updateScreenScheme: (parameters: UpdateScreenScheme): Promise<void> =>
        screenSchemes.updateScreenScheme(client, parameters),
      deleteScreenScheme: (parameters: DeleteScreenScheme): Promise<void> =>
        screenSchemes.deleteScreenScheme(client, parameters),
    },
    screenTabs: {
      getAllScreenTabs: (parameters: GetAllScreenTabs): Promise<ScreenableTab[]> =>
        screenTabs.getAllScreenTabs(client, parameters),
      addScreenTab: (parameters: AddScreenTab): Promise<ScreenableTab> => screenTabs.addScreenTab(client, parameters),
      renameScreenTab: (parameters: RenameScreenTab): Promise<ScreenableTab> =>
        screenTabs.renameScreenTab(client, parameters),
      deleteScreenTab: (parameters: DeleteScreenTab): Promise<void> => screenTabs.deleteScreenTab(client, parameters),
      moveScreenTab: (parameters: MoveScreenTab): Promise<void> => screenTabs.moveScreenTab(client, parameters),
    },
    screenTabFields: {
      getAllScreenTabFields: (parameters: GetAllScreenTabFields): Promise<ScreenableField[]> =>
        screenTabFields.getAllScreenTabFields(client, parameters),
      addScreenTabField: (parameters: AddScreenTabField): Promise<ScreenableField> =>
        screenTabFields.addScreenTabField(client, parameters),
      removeScreenTabField: (parameters: RemoveScreenTabField): Promise<void> =>
        screenTabFields.removeScreenTabField(client, parameters),
      moveScreenTabField: (parameters: MoveScreenTabField): Promise<void> =>
        screenTabFields.moveScreenTabField(client, parameters),
    },
    userProperties: {
      getUserPropertyKeys: (parameters: GetUserPropertyKeys): Promise<PropertyKeys> =>
        userProperties.getUserPropertyKeys(client, parameters),
      getUserProperty: (parameters: GetUserProperty): Promise<EntityProperty> =>
        userProperties.getUserProperty(client, parameters),
      setUserProperty: (parameters: SetUserProperty): Promise<unknown> =>
        userProperties.setUserProperty(client, parameters),
      deleteUserProperty: (parameters: DeleteUserProperty): Promise<void> =>
        userProperties.deleteUserProperty(client, parameters),
    },
    webhooks: {
      getDynamicWebhooksForApp: (parameters?: GetDynamicWebhooksForApp): Promise<PageWebhook> =>
        webhooks.getDynamicWebhooksForApp(client, parameters),
      registerDynamicWebhooks: (parameters: RegisterDynamicWebhooks): Promise<unknown> =>
        webhooks.registerDynamicWebhooks(client, parameters),
      deleteWebhookById: (parameters: DeleteWebhookById): Promise<unknown> =>
        webhooks.deleteWebhookById(client, parameters),
      refreshWebhooks: (parameters: RefreshWebhooks): Promise<WebhooksExpirationDate> =>
        webhooks.refreshWebhooks(client, parameters),
    },
    tasks: {
      getTask: (parameters: GetTask): Promise<TaskProgressObject> => tasks.getTask(client, parameters),
    },
    appDataPolicies: {
      getPolicy: (): Promise<WorkspaceDataPolicy> => appDataPolicies.getPolicy(client),
      getPolicies: (parameters?: GetPolicies): Promise<ProjectDataPolicies> =>
        appDataPolicies.getPolicies(client, parameters),
    },
    issueBulkOperations: {
      submitBulkDelete: (parameters: SubmitBulkDelete): Promise<SubmittedBulkOperation> =>
        issueBulkOperations.submitBulkDelete(client, parameters),
      getBulkEditableFields: (parameters: GetBulkEditableFields): Promise<BulkEditGetFields> =>
        issueBulkOperations.getBulkEditableFields(client, parameters),
      submitBulkEdit: (parameters: SubmitBulkEdit): Promise<SubmittedBulkOperation> =>
        issueBulkOperations.submitBulkEdit(client, parameters),
      submitBulkMove: (parameters: SubmitBulkMove): Promise<SubmittedBulkOperation> =>
        issueBulkOperations.submitBulkMove(client, parameters),
      getAvailableTransitions: (parameters: GetAvailableTransitions): Promise<BulkTransitionGetAvailableTransitions> =>
        issueBulkOperations.getAvailableTransitions(client, parameters),
      submitBulkTransition: (parameters: SubmitBulkTransition): Promise<SubmittedBulkOperation> =>
        issueBulkOperations.submitBulkTransition(client, parameters),
      submitBulkUnwatch: (parameters: SubmitBulkUnwatch): Promise<SubmittedBulkOperation> =>
        issueBulkOperations.submitBulkUnwatch(client, parameters),
      submitBulkWatch: (parameters: SubmitBulkWatch): Promise<SubmittedBulkOperation> =>
        issueBulkOperations.submitBulkWatch(client, parameters),
      getBulkOperationProgress: (parameters: GetBulkOperationProgress): Promise<BulkOperationProgress> =>
        issueBulkOperations.getBulkOperationProgress(client, parameters),
    },
    issueCommentProperties: {
      getCommentPropertyKeys: (parameters: GetCommentPropertyKeys): Promise<PropertyKeys> =>
        issueCommentProperties.getCommentPropertyKeys(client, parameters),
      getCommentProperty: (parameters: GetCommentProperty): Promise<EntityProperty> =>
        issueCommentProperties.getCommentProperty(client, parameters),
      setCommentProperty: (parameters: SetCommentProperty): Promise<unknown> =>
        issueCommentProperties.setCommentProperty(client, parameters),
      deleteCommentProperty: (parameters: DeleteCommentProperty): Promise<void> =>
        issueCommentProperties.deleteCommentProperty(client, parameters),
    },
    issueCustomFieldContexts: {
      getContextsForField: (parameters: GetContextsForField): Promise<PageCustomFieldContext> =>
        issueCustomFieldContexts.getContextsForField(client, parameters),
      createCustomFieldContext: (parameters: CreateCustomFieldContext): Promise<unknown> =>
        issueCustomFieldContexts.createCustomFieldContext(client, parameters),
      getIssueTypeMappingsForContexts: (
        parameters: GetIssueTypeMappingsForContexts,
      ): Promise<PageIssueTypeToContextMapping> =>
        issueCustomFieldContexts.getIssueTypeMappingsForContexts(client, parameters),
      getCustomFieldContextsForProjectsAndIssueTypes: (
        parameters: GetCustomFieldContextsForProjectsAndIssueTypes,
      ): Promise<PageContextForProjectAndIssueType> =>
        issueCustomFieldContexts.getCustomFieldContextsForProjectsAndIssueTypes(client, parameters),
      getProjectContextMapping: (parameters: GetProjectContextMapping): Promise<PageCustomFieldContextProjectMapping> =>
        issueCustomFieldContexts.getProjectContextMapping(client, parameters),
      updateCustomFieldContext: (parameters: UpdateCustomFieldContext): Promise<void> =>
        issueCustomFieldContexts.updateCustomFieldContext(client, parameters),
      deleteCustomFieldContext: (parameters: DeleteCustomFieldContext): Promise<void> =>
        issueCustomFieldContexts.deleteCustomFieldContext(client, parameters),
      addIssueTypesToContext: (parameters: AddIssueTypesToContext): Promise<void> =>
        issueCustomFieldContexts.addIssueTypesToContext(client, parameters),
      removeIssueTypesFromContext: (parameters: RemoveIssueTypesFromContext): Promise<void> =>
        issueCustomFieldContexts.removeIssueTypesFromContext(client, parameters),
      assignProjectsToCustomFieldContext: (parameters: AssignProjectsToCustomFieldContext): Promise<void> =>
        issueCustomFieldContexts.assignProjectsToCustomFieldContext(client, parameters),
      removeCustomFieldContextFromProjects: (parameters: RemoveCustomFieldContextFromProjects): Promise<void> =>
        issueCustomFieldContexts.removeCustomFieldContextFromProjects(client, parameters),
    },
    issueCustomFieldOptions: {
      getCustomFieldOption: (parameters: GetCustomFieldOption): Promise<CustomFieldOption> =>
        issueCustomFieldOptions.getCustomFieldOption(client, parameters),
      getOptionsForContext: (parameters: GetOptionsForContext): Promise<PageCustomFieldContextOption> =>
        issueCustomFieldOptions.getOptionsForContext(client, parameters),
      createCustomFieldOption: (parameters: CreateCustomFieldOption): Promise<CustomFieldCreatedContextOptionsList> =>
        issueCustomFieldOptions.createCustomFieldOption(client, parameters),
      updateCustomFieldOption: (parameters: UpdateCustomFieldOption): Promise<CustomFieldUpdatedContextOptionsList> =>
        issueCustomFieldOptions.updateCustomFieldOption(client, parameters),
      reorderCustomFieldOptions: (parameters: ReorderCustomFieldOptions): Promise<void> =>
        issueCustomFieldOptions.reorderCustomFieldOptions(client, parameters),
      deleteCustomFieldOption: (parameters: DeleteCustomFieldOption): Promise<void> =>
        issueCustomFieldOptions.deleteCustomFieldOption(client, parameters),
      replaceCustomFieldOption: (parameters: ReplaceCustomFieldOption): Promise<unknown> =>
        issueCustomFieldOptions.replaceCustomFieldOption(client, parameters),
    },
    issueRedaction: {
      redact: (parameters: Redact): Promise<string> => issueRedaction.redact(client, parameters),
      getRedactionStatus: (parameters: GetRedactionStatus): Promise<RedactionJobStatusResponse> =>
        issueRedaction.getRedactionStatus(client, parameters),
    },
    issueSecurityLevel: {
      getIssueSecurityLevelMembers: (parameters: GetIssueSecurityLevelMembers): Promise<PageIssueSecurityLevelMember> =>
        issueSecurityLevel.getIssueSecurityLevelMembers(client, parameters),
      getIssueSecurityLevel: (parameters: GetIssueSecurityLevel): Promise<SecurityLevel> =>
        issueSecurityLevel.getIssueSecurityLevel(client, parameters),
    },
    issueSecuritySchemes: {
      getIssueSecuritySchemes: (): Promise<SecuritySchemes> => issueSecuritySchemes.getIssueSecuritySchemes(client),
      getIssueSecurityScheme: (parameters: GetIssueSecurityScheme): Promise<SecurityScheme> =>
        issueSecuritySchemes.getIssueSecurityScheme(client, parameters),
    },
    issueTypeProperties: {
      getIssueTypePropertyKeys: (parameters: GetIssueTypePropertyKeys): Promise<PropertyKeys> =>
        issueTypeProperties.getIssueTypePropertyKeys(client, parameters),
      getIssueTypeProperty: (parameters: GetIssueTypeProperty): Promise<EntityProperty> =>
        issueTypeProperties.getIssueTypeProperty(client, parameters),
      setIssueTypeProperty: (parameters: SetIssueTypeProperty): Promise<unknown> =>
        issueTypeProperties.setIssueTypeProperty(client, parameters),
      deleteIssueTypeProperty: (parameters: DeleteIssueTypeProperty): Promise<void> =>
        issueTypeProperties.deleteIssueTypeProperty(client, parameters),
    },
    issueWorklogProperties: {
      getWorklogPropertyKeys: (parameters: GetWorklogPropertyKeys): Promise<PropertyKeys> =>
        issueWorklogProperties.getWorklogPropertyKeys(client, parameters),
      getWorklogProperty: (parameters: GetWorklogProperty): Promise<EntityProperty> =>
        issueWorklogProperties.getWorklogProperty(client, parameters),
      setWorklogProperty: (parameters: SetWorklogProperty): Promise<unknown> =>
        issueWorklogProperties.setWorklogProperty(client, parameters),
      deleteWorklogProperty: (parameters: DeleteWorklogProperty): Promise<void> =>
        issueWorklogProperties.deleteWorklogProperty(client, parameters),
    },
    jiraExpressions: {
      analyseExpression: (parameters: AnalyseExpression): Promise<JiraExpressionsAnalysis> =>
        jiraExpressions.analyseExpression(client, parameters),
      evaluateJSISJiraExpression: (parameters: EvaluateJSISJiraExpression): Promise<JExpEvaluateJiraExpressionResult> =>
        jiraExpressions.evaluateJSISJiraExpression(client, parameters),
    },
    projectAvatars: {
      updateProjectAvatar: (parameters: UpdateProjectAvatar): Promise<void> =>
        projectAvatars.updateProjectAvatar(client, parameters),
      deleteProjectAvatar: (parameters: DeleteProjectAvatar): Promise<void> =>
        projectAvatars.deleteProjectAvatar(client, parameters),
      createProjectAvatar: (parameters: CreateProjectAvatar): Promise<Avatar> =>
        projectAvatars.createProjectAvatar(client, parameters),
      getAllProjectAvatars: (parameters: GetAllProjectAvatars): Promise<ProjectAvatars> =>
        projectAvatars.getAllProjectAvatars(client, parameters),
    },
    projectPermissionSchemes: {
      getProjectIssueSecurityScheme: (parameters: GetProjectIssueSecurityScheme): Promise<SecurityScheme> =>
        projectPermissionSchemes.getProjectIssueSecurityScheme(client, parameters),
      getAssignedPermissionScheme: (parameters: GetAssignedPermissionScheme): Promise<PermissionScheme> =>
        projectPermissionSchemes.getAssignedPermissionScheme(client, parameters),
      assignPermissionScheme: (parameters: AssignPermissionScheme): Promise<PermissionScheme> =>
        projectPermissionSchemes.assignPermissionScheme(client, parameters),
      getSecurityLevelsForProject: (parameters: GetSecurityLevelsForProject): Promise<ProjectIssueSecurityLevels> =>
        projectPermissionSchemes.getSecurityLevelsForProject(client, parameters),
    },
    workflowSchemeDrafts: {
      createWorkflowSchemeDraftFromParent: (parameters: CreateWorkflowSchemeDraftFromParent): Promise<WorkflowScheme> =>
        workflowSchemeDrafts.createWorkflowSchemeDraftFromParent(client, parameters),
      getWorkflowSchemeDraft: (parameters: GetWorkflowSchemeDraft): Promise<WorkflowScheme> =>
        workflowSchemeDrafts.getWorkflowSchemeDraft(client, parameters),
      updateWorkflowSchemeDraft: (parameters: UpdateWorkflowSchemeDraft): Promise<WorkflowScheme> =>
        workflowSchemeDrafts.updateWorkflowSchemeDraft(client, parameters),
      deleteWorkflowSchemeDraft: (parameters: DeleteWorkflowSchemeDraft): Promise<void> =>
        workflowSchemeDrafts.deleteWorkflowSchemeDraft(client, parameters),
      getDraftDefaultWorkflow: (parameters: GetDraftDefaultWorkflow): Promise<DefaultWorkflow> =>
        workflowSchemeDrafts.getDraftDefaultWorkflow(client, parameters),
      updateDraftDefaultWorkflow: (parameters: UpdateDraftDefaultWorkflow): Promise<WorkflowScheme> =>
        workflowSchemeDrafts.updateDraftDefaultWorkflow(client, parameters),
      deleteDraftDefaultWorkflow: (parameters: DeleteDraftDefaultWorkflow): Promise<WorkflowScheme> =>
        workflowSchemeDrafts.deleteDraftDefaultWorkflow(client, parameters),
      getWorkflowSchemeDraftIssueType: (
        parameters: GetWorkflowSchemeDraftIssueType,
      ): Promise<IssueTypeWorkflowMapping> => workflowSchemeDrafts.getWorkflowSchemeDraftIssueType(client, parameters),
      setWorkflowSchemeDraftIssueType: (parameters: SetWorkflowSchemeDraftIssueType): Promise<WorkflowScheme> =>
        workflowSchemeDrafts.setWorkflowSchemeDraftIssueType(client, parameters),
      deleteWorkflowSchemeDraftIssueType: (parameters: DeleteWorkflowSchemeDraftIssueType): Promise<WorkflowScheme> =>
        workflowSchemeDrafts.deleteWorkflowSchemeDraftIssueType(client, parameters),
      publishDraftWorkflowScheme: (parameters: PublishDraftWorkflowScheme): Promise<unknown> =>
        workflowSchemeDrafts.publishDraftWorkflowScheme(client, parameters),
      getDraftWorkflow: (parameters: GetDraftWorkflow): Promise<IssueTypesWorkflowMapping> =>
        workflowSchemeDrafts.getDraftWorkflow(client, parameters),
      updateDraftWorkflowMapping: (parameters: UpdateDraftWorkflowMapping): Promise<WorkflowScheme> =>
        workflowSchemeDrafts.updateDraftWorkflowMapping(client, parameters),
      deleteDraftWorkflowMapping: (parameters: DeleteDraftWorkflowMapping): Promise<unknown> =>
        workflowSchemeDrafts.deleteDraftWorkflowMapping(client, parameters),
    },
    workflowTransitionRules: {
      getWorkflowTransitionRuleConfigurations: (
        parameters: GetWorkflowTransitionRuleConfigurations,
      ): Promise<PageWorkflowTransitionRules> =>
        workflowTransitionRules.getWorkflowTransitionRuleConfigurations(client, parameters),
      updateWorkflowTransitionRuleConfigurations: (
        parameters: UpdateWorkflowTransitionRuleConfigurations,
      ): Promise<WorkflowTransitionRulesUpdateErrors> =>
        workflowTransitionRules.updateWorkflowTransitionRuleConfigurations(client, parameters),
      deleteWorkflowTransitionRuleConfigurations: (
        parameters: DeleteWorkflowTransitionRuleConfigurations,
      ): Promise<WorkflowTransitionRulesUpdateErrors> =>
        workflowTransitionRules.deleteWorkflowTransitionRuleConfigurations(client, parameters),
    },
    appMigration: {
      updateIssueFields: (parameters: UpdateIssueFields): Promise<unknown> =>
        appMigration.updateIssueFields(client, parameters),
      updateEntityPropertiesValue: (parameters: UpdateEntityPropertiesValue): Promise<unknown> =>
        appMigration.updateEntityPropertiesValue(client, parameters),
      workflowRuleSearch: (parameters: WorkflowRuleSearch): Promise<WorkflowRulesSearchDetails> =>
        appMigration.workflowRuleSearch(client, parameters),
    },
    appProperties: {
      getAddonProperties: (parameters: GetAddonProperties): Promise<PropertyKeys> =>
        appProperties.getAddonProperties(client, parameters),
      getAddonProperty: (parameters: GetAddonProperty): Promise<EntityProperty> =>
        appProperties.getAddonProperty(client, parameters),
      putAddonProperty: (parameters: PutAddonProperty): Promise<OperationMessage> =>
        appProperties.putAddonProperty(client, parameters),
      deleteAddonProperty: (parameters: DeleteAddonProperty): Promise<void> =>
        appProperties.deleteAddonProperty(client, parameters),
    },
    dynamicModules: {
      getModules: (): Promise<ConnectModules> => dynamicModules.getModules(client),
      registerModules: (parameters: RegisterModules): Promise<unknown> =>
        dynamicModules.registerModules(client, parameters),
      removeModules: (parameters: RemoveModules): Promise<void> => dynamicModules.removeModules(client, parameters),
    },
    issueCustomFieldConfigurationApps: {
      getCustomFieldConfiguration: (parameters: GetCustomFieldConfiguration): Promise<PageContextualConfiguration> =>
        issueCustomFieldConfigurationApps.getCustomFieldConfiguration(client, parameters),
      updateCustomFieldConfiguration: (parameters: UpdateCustomFieldConfiguration): Promise<unknown> =>
        issueCustomFieldConfigurationApps.updateCustomFieldConfiguration(client, parameters),
    },
    issueCustomFieldOptionsApps: {
      getAllIssueFieldOptions: (parameters: GetAllIssueFieldOptions): Promise<PageIssueFieldOption> =>
        issueCustomFieldOptionsApps.getAllIssueFieldOptions(client, parameters),
      createIssueFieldOption: (parameters: CreateIssueFieldOption): Promise<IssueFieldOption> =>
        issueCustomFieldOptionsApps.createIssueFieldOption(client, parameters),
      getSelectableIssueFieldOptions: (parameters: GetSelectableIssueFieldOptions): Promise<PageIssueFieldOption> =>
        issueCustomFieldOptionsApps.getSelectableIssueFieldOptions(client, parameters),
      getVisibleIssueFieldOptions: (parameters: GetVisibleIssueFieldOptions): Promise<PageIssueFieldOption> =>
        issueCustomFieldOptionsApps.getVisibleIssueFieldOptions(client, parameters),
      getIssueFieldOption: (parameters: GetIssueFieldOption): Promise<IssueFieldOption> =>
        issueCustomFieldOptionsApps.getIssueFieldOption(client, parameters),
      updateIssueFieldOption: (parameters: UpdateIssueFieldOption): Promise<IssueFieldOption> =>
        issueCustomFieldOptionsApps.updateIssueFieldOption(client, parameters),
      deleteIssueFieldOption: (parameters: DeleteIssueFieldOption): Promise<void> =>
        issueCustomFieldOptionsApps.deleteIssueFieldOption(client, parameters),
      replaceIssueFieldOption: (parameters: ReplaceIssueFieldOption): Promise<unknown> =>
        issueCustomFieldOptionsApps.replaceIssueFieldOption(client, parameters),
    },
    issueCustomFieldValuesApps: {
      updateMultipleCustomFieldValues: (parameters: UpdateMultipleCustomFieldValues): Promise<void> =>
        issueCustomFieldValuesApps.updateMultipleCustomFieldValues(client, parameters),
      updateCustomFieldValue: (parameters: UpdateCustomFieldValue): Promise<void> =>
        issueCustomFieldValuesApps.updateCustomFieldValue(client, parameters),
    },
    issuePanels: {
      bulkPinUnpinProjectsAsync: (parameters: BulkPinUnpinProjectsAsync): Promise<ForgePanelProjectPinAsyncResponse> =>
        issuePanels.bulkPinUnpinProjectsAsync(client, parameters),
    },
    migrationOfConnectModulesToForge: {
      fetchMigrationTask: (parameters: FetchMigrationTask): Promise<TaskProgress> =>
        migrationOfConnectModulesToForge.fetchMigrationTask(client, parameters),
      submitTask: (parameters: SubmitTask): Promise<unknown> =>
        migrationOfConnectModulesToForge.submitTask(client, parameters),
    },
    projectTemplates: {
      createProjectWithCustomTemplate: (parameters: CreateProjectWithCustomTemplate): Promise<unknown> =>
        projectTemplates.createProjectWithCustomTemplate(client, parameters),
    },
    uiModificationsApps: {
      getUiModifications: (parameters?: GetUiModifications): Promise<PageUiModificationDetails> =>
        uiModificationsApps.getUiModifications(client, parameters),
      createUiModification: (parameters: CreateUiModification): Promise<UiModificationIdentifiers> =>
        uiModificationsApps.createUiModification(client, parameters),
      updateUiModification: (parameters: UpdateUiModification): Promise<void> =>
        uiModificationsApps.updateUiModification(client, parameters),
      deleteUiModification: (parameters: DeleteUiModification): Promise<void> =>
        uiModificationsApps.deleteUiModification(client, parameters),
    },
  };
}

export type CloudClient = ReturnType<typeof createCloudClient>;
