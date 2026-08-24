import { type ClientConfig, type Client, type RequestOptions, createClient, type Buffer } from '#/core';
import * as announcementBanner from './api/announcementBanner';
import * as issueCustomFieldValuesApps from './api/issueCustomFieldValuesApps';
import * as issueCustomFieldConfigurationApps from './api/issueCustomFieldConfigurationApps';
import * as jiraSettings from './api/jiraSettings';
import * as applicationRoles from './api/applicationRoles';
import * as issueAttachments from './api/issueAttachments';
import * as auditRecords from './api/auditRecords';
import * as avatars from './api/avatars';
import * as issueBulkOperations from './api/issueBulkOperations';
import * as issues from './api/issues';
import * as issueComments from './api/issueComments';
import * as issueCommentProperties from './api/issueCommentProperties';
import * as projectComponents from './api/projectComponents';
import * as timeTracking from './api/timeTracking';
import * as issueCustomFieldOptions from './api/issueCustomFieldOptions';
import * as dashboards from './api/dashboards';
import * as appDataPolicies from './api/appDataPolicies';
import * as jiraExpressions from './api/jiraExpressions';
import * as issueFields from './api/issueFields';
import * as issueCustomFieldAssociations from './api/issueCustomFieldAssociations';
import * as issueCustomFieldContexts from './api/issueCustomFieldContexts';
import * as screens from './api/screens';
import * as issueCustomFieldOptionsApps from './api/issueCustomFieldOptionsApps';
import * as filters from './api/filters';
import * as filterSharing from './api/filterSharing';
import * as issuePanels from './api/issuePanels';
import * as groups from './api/groups';
import * as groupAndUserPicker from './api/groupAndUserPicker';
import * as issueSearch from './api/issueSearch';
import * as issueProperties from './api/issueProperties';
import * as issueWatchers from './api/issueWatchers';
import * as issueRemoteLinks from './api/issueRemoteLinks';
import * as issueVotes from './api/issueVotes';
import * as issueWorklogs from './api/issueWorklogs';
import * as issueWorklogProperties from './api/issueWorklogProperties';
import * as issueLinks from './api/issueLinks';
import * as issueLinkTypes from './api/issueLinkTypes';
import * as issueSecuritySchemes from './api/issueSecuritySchemes';
import * as issueSecurityLevel from './api/issueSecurityLevel';
import * as issueTypes from './api/issueTypes';
import * as issueTypeProperties from './api/issueTypeProperties';
import * as issueTypeSchemes from './api/issueTypeSchemes';
import * as issueTypeScreenSchemes from './api/issueTypeScreenSchemes';
import * as jql from './api/jql';
import * as jqlFunctionsApps from './api/jqlFunctionsApps';
import * as labels from './api/labels';
import * as permissions from './api/permissions';
import * as myself from './api/myself';
import * as issueNotificationSchemes from './api/issueNotificationSchemes';
import * as permissionSchemes from './api/permissionSchemes';
import * as issuePriorities from './api/issuePriorities';
import * as projects from './api/projects';
import * as projectTemplates from './api/projectTemplates';
import * as projectTypes from './api/projectTypes';
import * as projectAvatars from './api/projectAvatars';
import * as projectFeatures from './api/projectFeatures';
import * as projectProperties from './api/projectProperties';
import * as projectRoles from './api/projectRoles';
import * as projectRoleActors from './api/projectRoleActors';
import * as projectVersions from './api/projectVersions';
import * as projectEmail from './api/projectEmail';
import * as projectPermissionSchemes from './api/projectPermissionSchemes';
import * as projectCategories from './api/projectCategories';
import * as projectKeyAndNameValidation from './api/projectKeyAndNameValidation';
import * as issueRedaction from './api/issueRedaction';
import * as issueResolutions from './api/issueResolutions';
import * as screenTabs from './api/screenTabs';
import * as screenTabFields from './api/screenTabFields';
import * as screenSchemes from './api/screenSchemes';
import * as serverInfo from './api/serverInfo';
import * as issueNavigatorSettings from './api/issueNavigatorSettings';
import * as workflowStatuses from './api/workflowStatuses';
import * as workflowStatusCategories from './api/workflowStatusCategories';
import * as status from './api/status';
import * as tasks from './api/tasks';
import * as uiModificationsApps from './api/uiModificationsApps';
import * as users from './api/users';
import * as userSearch from './api/userSearch';
import * as userProperties from './api/userProperties';
import * as webhooks from './api/webhooks';
import * as workflows from './api/workflows';
import * as workflowTransitionRules from './api/workflowTransitionRules';
import * as workflowSchemes from './api/workflowSchemes';
import * as workflowSchemeProjectAssociations from './api/workflowSchemeProjectAssociations';
import * as workflowSchemeDrafts from './api/workflowSchemeDrafts';
import * as appProperties from './api/appProperties';
import * as dynamicModules from './api/dynamicModules';
import * as appMigration from './api/appMigration';
import * as migrationOfConnectModulesToForge from './api/migrationOfConnectModulesToForge';
import * as api from './api/api';
import type {
  SetBanner,
  UpdateMultipleCustomFieldValues,
  UpdateCustomFieldValue,
  GetCustomFieldConfiguration,
  UpdateCustomFieldConfiguration,
  GetApplicationProperty,
  SetApplicationProperty,
  GetApplicationRole,
  GetAttachmentContent,
  GetAttachmentThumbnail,
  GetAttachment,
  RemoveAttachment,
  AddAttachment,
  GetAuditRecords,
  GetAllSystemAvatars,
  GetAvatars,
  StoreAvatar,
  DeleteAvatar,
  GetAvatarImageByType,
  GetAvatarImageByID,
  GetAvatarImageByOwner,
  SubmitBulkDelete,
  GetBulkEditableFields,
  SubmitBulkEdit,
  SubmitBulkMove,
  GetAvailableTransitions,
  SubmitBulkTransition,
  SubmitBulkUnwatch,
  SubmitBulkWatch,
  GetBulkOperationProgress,
  GetBulkChangelogs,
  CreateIssue,
  CreateIssues,
  BulkFetchIssues,
  GetCreateIssueMetaIssueTypes,
  GetCreateIssueMetaIssueTypeId,
  GetIssue,
  EditIssue,
  DeleteIssue,
  AssignIssue,
  GetChangeLogs,
  GetChangeLogsByIds,
  GetEditIssueMeta,
  Notify,
  GetTransitions,
  DoTransition,
  GetCommentsByIds,
  GetComments,
  AddComment,
  GetComment,
  UpdateComment,
  DeleteComment,
  GetCommentPropertyKeys,
  GetCommentProperty,
  SetCommentProperty,
  DeleteCommentProperty,
  FindComponentsForProjects,
  CreateComponent,
  GetComponent,
  UpdateComponent,
  DeleteComponent,
  GetComponentRelatedIssues,
  GetProjectComponentsPaginated,
  GetProjectComponents,
  SelectTimeTrackingImplementation,
  SetSharedTimeTrackingConfiguration,
  GetCustomFieldOption,
  GetOptionsForContext,
  CreateCustomFieldOption,
  UpdateCustomFieldOption,
  ReorderCustomFieldOptions,
  DeleteCustomFieldOption,
  ReplaceCustomFieldOption,
  GetAllDashboards,
  GetDashboardsPaginated,
  GetDashboardItemPropertyKeys,
  GetDashboardItemProperty,
  SetDashboardItemProperty,
  DeleteDashboardItemProperty,
  GetDashboard,
  GetPolicies,
  AnalyseExpression,
  EvaluateJSISJiraExpression,
  CreateCustomField,
  GetFieldsPaginated,
  GetTrashedFieldsPaginated,
  UpdateCustomField,
  DeleteCustomField,
  RestoreCustomField,
  TrashCustomField,
  CreateAssociations,
  RemoveAssociations,
  GetContextsForField,
  CreateCustomFieldContext,
  GetContextDefaultValues,
  GetIssueTypeMappingsForContexts,
  GetCustomFieldContextsForProjectsAndIssueTypes,
  GetProjectContextMapping,
  UpdateCustomFieldContext,
  DeleteCustomFieldContext,
  AddIssueTypesToContext,
  RemoveIssueTypesFromContext,
  AssignProjectsToCustomFieldContext,
  RemoveCustomFieldContextFromProjects,
  GetScreensForField,
  GetScreens,
  AddFieldToDefaultScreen,
  GetAvailableScreenFields,
  GetAllIssueFieldOptions,
  CreateIssueFieldOption,
  GetSelectableIssueFieldOptions,
  GetVisibleIssueFieldOptions,
  GetIssueFieldOption,
  UpdateIssueFieldOption,
  DeleteIssueFieldOption,
  ReplaceIssueFieldOption,
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
  BulkPinUnpinProjectsAsync,
  CreateGroup,
  RemoveGroup,
  GetUsersFromGroup,
  AddUserToGroup,
  RemoveUserFromGroup,
  FindGroups,
  FindUsersAndGroups,
  GetIssuePickerResource,
  MatchIssues,
  CountIssues,
  SearchAndReconsileIssuesUsingJql,
  SearchAndReconsileIssuesUsingJqlPost,
  BulkSetIssuesPropertiesList,
  BulkSetIssuePropertiesByIssue,
  BulkSetIssueProperty,
  BulkDeleteIssueProperty,
  GetIssuePropertyKeys,
  GetIssueProperty,
  SetIssueProperty,
  DeleteIssueProperty,
  GetIsWatchingIssueBulk,
  GetIssueWatchers,
  AddWatcher,
  RemoveWatcher,
  GetRemoteIssueLinks,
  CreateOrUpdateRemoteIssueLink,
  DeleteRemoteIssueLinkByGlobalId,
  GetRemoteIssueLinkById,
  UpdateRemoteIssueLink,
  DeleteRemoteIssueLinkById,
  GetVotes,
  AddVote,
  RemoveVote,
  GetIssueWorklog,
  AddWorklog,
  GetWorklog,
  UpdateWorklog,
  DeleteWorklog,
  GetIdsOfWorklogsDeletedSince,
  GetWorklogsForIds,
  GetIdsOfWorklogsModifiedSince,
  GetWorklogPropertyKeys,
  GetWorklogProperty,
  SetWorklogProperty,
  DeleteWorklogProperty,
  LinkIssues,
  GetIssueLink,
  DeleteIssueLink,
  CreateIssueLinkType,
  GetIssueLinkType,
  UpdateIssueLinkType,
  DeleteIssueLinkType,
  GetIssueSecurityScheme,
  GetIssueSecurityLevelMembers,
  GetIssueSecurityLevel,
  CreateIssueType,
  GetIssueType,
  UpdateIssueType,
  DeleteIssueType,
  GetAlternativeIssueTypes,
  CreateIssueTypeAvatar,
  GetIssueTypePropertyKeys,
  GetIssueTypeProperty,
  SetIssueTypeProperty,
  DeleteIssueTypeProperty,
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
  GetAutoCompletePost,
  GetFieldAutoCompleteForQueryString,
  ParseJqlQueries,
  MigrateQueries,
  GetPrecomputations,
  UpdatePrecomputations,
  GetPrecomputationsByID,
  GetAllLabels,
  GetMyPermissions,
  GetBulkPermissions,
  GetPermittedProjects,
  GetPreference,
  SetPreference,
  RemovePreference,
  GetCurrentUser,
  GetNotificationSchemes,
  GetNotificationSchemeToProjectMappings,
  GetNotificationScheme,
  AddNotifications,
  RemoveNotificationFromNotificationScheme,
  GetAllPermissionSchemes,
  CreatePermissionScheme,
  GetPermissionScheme,
  UpdatePermissionScheme,
  DeletePermissionScheme,
  GetPermissionSchemeGrants,
  CreatePermissionGrant,
  GetPermissionSchemeGrant,
  DeletePermissionSchemeEntity,
  CreatePriority,
  SetDefaultPriority,
  MovePriorities,
  SearchPriorities,
  GetPriority,
  UpdatePriority,
  DeletePriority,
  CreateProject,
  SearchProjects,
  GetProject,
  UpdateProject,
  DeleteProject,
  ArchiveProject,
  GetAllStatuses,
  GetHierarchy,
  GetNotificationSchemeForProject,
  CreateProjectWithCustomTemplate,
  GetProjectTypeByKey,
  GetAccessibleProjectTypeByKey,
  UpdateProjectAvatar,
  DeleteProjectAvatar,
  CreateProjectAvatar,
  GetAllProjectAvatars,
  GetFeaturesForProject,
  ToggleFeatureForProject,
  GetProjectPropertyKeys,
  GetProjectProperty,
  SetProjectProperty,
  DeleteProjectProperty,
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
  GetProjectIssueSecurityScheme,
  GetAssignedPermissionScheme,
  AssignPermissionScheme,
  GetSecurityLevelsForProject,
  CreateProjectCategory,
  GetProjectCategoryById,
  UpdateProjectCategory,
  RemoveProjectCategory,
  ValidateProjectKey,
  GetValidProjectKey,
  GetValidProjectName,
  Redact,
  GetRedactionStatus,
  GetResolution,
  GetAllScreenTabs,
  AddScreenTab,
  RenameScreenTab,
  DeleteScreenTab,
  MoveScreenTab,
  GetAllScreenTabFields,
  AddScreenTabField,
  RemoveScreenTabField,
  MoveScreenTabField,
  GetScreenSchemes,
  CreateScreenScheme,
  UpdateScreenScheme,
  DeleteScreenScheme,
  SetIssueNavigatorDefaultColumns,
  GetStatus,
  GetStatusCategory,
  GetStatusesById,
  CreateStatuses,
  UpdateStatuses,
  DeleteStatusesById,
  GetStatusesByName,
  Search,
  GetProjectIssueTypeUsagesForStatus,
  GetProjectUsagesForStatus,
  GetWorkflowUsagesForStatus,
  GetTask,
  GetUiModifications,
  CreateUiModification,
  UpdateUiModification,
  DeleteUiModification,
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
  GetUserPropertyKeys,
  GetUserProperty,
  SetUserProperty,
  DeleteUserProperty,
  GetDynamicWebhooksForApp,
  RegisterDynamicWebhooks,
  DeleteWebhookById,
  RefreshWebhooks,
  ReadWorkflowFromHistory,
  ListWorkflowHistory,
  DeleteInactiveWorkflow,
  GetWorkflowProjectIssueTypeUsages,
  GetProjectUsagesForWorkflow,
  GetWorkflowSchemeUsagesForWorkflow,
  ReadWorkflows,
  WorkflowCapabilities,
  CreateWorkflows,
  ValidateCreateWorkflows,
  ReadWorkflowPreviews,
  SearchWorkflows,
  UpdateWorkflows,
  ValidateUpdateWorkflows,
  GetWorkflowTransitionRuleConfigurations,
  UpdateWorkflowTransitionRuleConfigurations,
  DeleteWorkflowTransitionRuleConfigurations,
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
  GetAddonProperties,
  GetAddonProperty,
  PutAddonProperty,
  DeleteAddonProperty,
  GetForgeAppProperty,
  PutForgeAppProperty,
  DeleteForgeAppProperty,
  RegisterModules,
  RemoveModules,
  UpdateIssueFields,
  UpdateEntityPropertiesValue,
  WorkflowRuleSearch,
  FetchMigrationTask,
  SubmitTask,
  GetWorklogsByIssueIdAndWorklogId,
} from './parameters';
import type {
  AnnouncementBannerConfiguration,
  Page,
  ContextualConfiguration,
  ApplicationProperty,
  Configuration,
  ApplicationRole,
  AttachmentSettings,
  AttachmentMetadata,
  Attachment,
  AuditRecords,
  SystemAvatars,
  Avatars,
  Avatar,
  SubmittedBulkOperation,
  BulkEditGetFields,
  BulkTransitionGetAvailableTransitions,
  BulkOperationProgress,
  BulkChangelogResponse,
  CreatedIssue,
  CreatedIssues,
  BulkIssueResults,
  PageOfCreateMetaIssueTypes,
  PageOfCreateMetaIssueTypeWithField,
  Issue,
  Changelog,
  PageOfChangelogs,
  IssueUpdateMetadata,
  Transitions,
  Comment,
  PageOfComments,
  PropertyKeys,
  EntityProperty,
  Component,
  ProjectComponent,
  ComponentIssuesCount,
  ComponentWithIssueCount,
  TimeTrackingProvider,
  TimeTrackingConfiguration,
  CustomFieldOption,
  CustomFieldContextOption,
  CustomFieldCreatedContextOptionsList,
  CustomFieldUpdatedContextOptionsList,
  TaskProgressRemoveOptionFromIssuesResult,
  PageOfDashboards,
  Dashboard,
  WorkspaceDataPolicy,
  ProjectDataPolicies,
  JiraExpressionsAnalysis,
  JExpEvaluateJiraExpressionResult,
  FieldDetails,
  Field,
  TaskProgressObject,
  CustomFieldContext,
  CreateCustomFieldContext as CreateCustomFieldContextModel,
  ContextDefaultValues,
  IssueTypeToContextMapping,
  ContextForProjectAndIssueType,
  CustomFieldContextProjectMapping,
  ScreenWithTab,
  Screen,
  ScreenableField,
  IssueFieldOption,
  Filter,
  FilterDetails,
  ColumnItem,
  DefaultShareScope,
  SharePermission,
  ForgePanelProjectPinAsyncResponse,
  Group,
  UserDetails,
  FoundGroups,
  FoundUsersAndGroups,
  IssuePickerSuggestions,
  IssueMatches,
  JQLCountResults,
  SearchAndReconcileResults,
  BulkIssueIsWatching,
  Watchers,
  GetRemoteIssueLinks as GetRemoteIssueLinksModel,
  RemoteIssueLinkIdentifies,
  RemoteIssueLink,
  Votes,
  PageOfWorklogs,
  Worklog,
  ChangedWorklogs,
  IssueLink,
  IssueLinkTypes,
  IssueLinkType,
  SecuritySchemes,
  SecurityScheme,
  IssueSecurityLevelMember,
  SecurityLevel,
  IssueTypeDetails,
  IssueTypeScheme,
  IssueTypeSchemeID,
  IssueTypeSchemeMapping,
  IssueTypeSchemeProjects,
  IssueTypeScreenScheme,
  IssueTypeScreenSchemeId,
  IssueTypeScreenSchemeItem,
  IssueTypeScreenSchemesProjects,
  ProjectDetails,
  JQLReferenceData,
  AutoCompleteSuggestions,
  ParsedJqlQueries,
  ConvertedJQLQueries,
  JqlFunctionPrecomputation,
  JqlFunctionPrecomputationGetByIdResponse,
  PageString,
  Permissions,
  BulkPermissionGrants,
  PermittedProjects,
  Locale,
  DashboardUser,
  NotificationScheme,
  NotificationSchemeAndProjectMapping,
  PermissionSchemes,
  PermissionScheme,
  PermissionGrants,
  PermissionGrant,
  PriorityId,
  Priority,
  ProjectIdentifiers,
  Project,
  IssueTypeWithStatus,
  ProjectIssueTypeHierarchy,
  ProjectType,
  ProjectAvatars,
  ContainerForProjectFeatures,
  GetProjectRoles as GetProjectRolesModel,
  ProjectRole,
  ProjectRoleDetails,
  Version,
  VersionIssueCounts,
  VersionRelatedWork,
  VersionUnresolvedIssuesCount,
  ProjectEmailAddress,
  ProjectIssueSecurityLevels,
  ProjectCategory,
  UpdatedProjectCategory,
  ErrorCollection,
  RedactionJobStatusResponse,
  Resolution,
  ScreenableTab,
  ScreenScheme,
  ScreenSchemeId,
  ServerInformation,
  StatusDetails,
  StatusCategory,
  JiraStatus,
  PageOfStatuses,
  StatusProjectIssueTypeUsageDTO,
  StatusProjectUsageDTO,
  StatusWorkflowUsageDTO,
  UiModificationDetails,
  UiModificationIdentifiers,
  UnrestrictedUserEmail,
  GroupName,
  FoundUsers,
  UserKey,
  Webhook,
  ContainerForRegisteredWebhooks,
  WebhooksExpirationDate,
  WorkflowHistoryReadResponseDTO,
  WorkflowHistoryListResponseDTO,
  WorkflowProjectIssueTypeUsageDTO,
  WorkflowProjectUsageDTO,
  WorkflowSchemeUsageDTO,
  WorkflowReadResponse,
  WorkflowCapabilities as WorkflowCapabilitiesModel,
  WorkflowCreateResponse,
  WorkflowValidationErrorList,
  DefaultWorkflowEditorResponse,
  WorkflowPreviewResponse,
  WorkflowSearchResponse,
  WorkflowUpdateResponse,
  WorkflowTransitionRules,
  WorkflowTransitionRulesUpdateErrors,
  WorkflowScheme,
  WorkflowSchemeReadResponse,
  WorkflowSchemeUpdateRequiredMappingsResponse,
  DefaultWorkflow,
  IssueTypeWorkflowMapping,
  IssueTypesWorkflowMapping,
  WorkflowSchemeProjectUsageDTO,
  ContainerOfWorkflowSchemeAssociations,
  OperationMessage,
  GetForgeAppPropertyKeys,
  GetForgeAppProperty as GetForgeAppPropertyModel,
  ConnectModules,
  WorkflowRulesSearchDetails,
  TaskProgress,
  BulkWorklogKeyResponse,
} from './models';

export function createCloudClient(clientConfig: ClientConfig | Client) {
  const client = createClient(clientConfig);

  return {
    announcementBanner: {
      getBanner: (options?: RequestOptions): Promise<AnnouncementBannerConfiguration> =>
        announcementBanner.getBanner(client, options),
      setBanner: (parameters: SetBanner, options?: RequestOptions): Promise<void> =>
        announcementBanner.setBanner(client, parameters, options),
    },
    issueCustomFieldValuesApps: {
      updateMultipleCustomFieldValues: (
        parameters: UpdateMultipleCustomFieldValues,
        options?: RequestOptions,
      ): Promise<void> => issueCustomFieldValuesApps.updateMultipleCustomFieldValues(client, parameters, options),
      updateCustomFieldValue: (parameters: UpdateCustomFieldValue, options?: RequestOptions): Promise<void> =>
        issueCustomFieldValuesApps.updateCustomFieldValue(client, parameters, options),
    },
    issueCustomFieldConfigurationApps: {
      getCustomFieldConfiguration: (
        parameters: GetCustomFieldConfiguration,
        options?: RequestOptions,
      ): Promise<Page<ContextualConfiguration>> =>
        issueCustomFieldConfigurationApps.getCustomFieldConfiguration(client, parameters, options),
      updateCustomFieldConfiguration: (
        parameters: UpdateCustomFieldConfiguration,
        options?: RequestOptions,
      ): Promise<void> => issueCustomFieldConfigurationApps.updateCustomFieldConfiguration(client, parameters, options),
    },
    jiraSettings: {
      getApplicationProperty: (
        parameters?: GetApplicationProperty,
        options?: RequestOptions,
      ): Promise<ApplicationProperty[]> => jiraSettings.getApplicationProperty(client, parameters, options),
      getAdvancedSettings: (options?: RequestOptions): Promise<ApplicationProperty[]> =>
        jiraSettings.getAdvancedSettings(client, options),
      setApplicationProperty: (
        parameters: SetApplicationProperty,
        options?: RequestOptions,
      ): Promise<ApplicationProperty> => jiraSettings.setApplicationProperty(client, parameters, options),
      getConfiguration: (options?: RequestOptions): Promise<Configuration> =>
        jiraSettings.getConfiguration(client, options),
    },
    applicationRoles: {
      getAllApplicationRoles: (options?: RequestOptions): Promise<ApplicationRole[]> =>
        applicationRoles.getAllApplicationRoles(client, options),
      getApplicationRole: (parameters: GetApplicationRole, options?: RequestOptions): Promise<ApplicationRole> =>
        applicationRoles.getApplicationRole(client, parameters, options),
    },
    issueAttachments: {
      getAttachmentContent: (parameters: GetAttachmentContent, options?: RequestOptions): Promise<Buffer> =>
        issueAttachments.getAttachmentContent(client, parameters, options),
      getAttachmentMeta: (options?: RequestOptions): Promise<AttachmentSettings> =>
        issueAttachments.getAttachmentMeta(client, options),
      getAttachmentThumbnail: (parameters: GetAttachmentThumbnail, options?: RequestOptions): Promise<Buffer> =>
        issueAttachments.getAttachmentThumbnail(client, parameters, options),
      getAttachment: (parameters: GetAttachment, options?: RequestOptions): Promise<AttachmentMetadata> =>
        issueAttachments.getAttachment(client, parameters, options),
      removeAttachment: (parameters: RemoveAttachment, options?: RequestOptions): Promise<void> =>
        issueAttachments.removeAttachment(client, parameters, options),
      addAttachment: (parameters: AddAttachment, options?: RequestOptions): Promise<Attachment[]> =>
        issueAttachments.addAttachment(client, parameters, options),
    },
    auditRecords: {
      getAuditRecords: (parameters?: GetAuditRecords, options?: RequestOptions): Promise<AuditRecords> =>
        auditRecords.getAuditRecords(client, parameters, options),
    },
    avatars: {
      getAllSystemAvatars: (parameters: GetAllSystemAvatars, options?: RequestOptions): Promise<SystemAvatars> =>
        avatars.getAllSystemAvatars(client, parameters, options),
      getAvatars: (parameters: GetAvatars, options?: RequestOptions): Promise<Avatars> =>
        avatars.getAvatars(client, parameters, options),
      storeAvatar: (parameters: StoreAvatar, options?: RequestOptions): Promise<Avatar> =>
        avatars.storeAvatar(client, parameters, options),
      deleteAvatar: (parameters: DeleteAvatar, options?: RequestOptions): Promise<void> =>
        avatars.deleteAvatar(client, parameters, options),
      getAvatarImageByType: (parameters: GetAvatarImageByType, options?: RequestOptions): Promise<Blob> =>
        avatars.getAvatarImageByType(client, parameters, options),
      getAvatarImageByID: (parameters: GetAvatarImageByID, options?: RequestOptions): Promise<Blob> =>
        avatars.getAvatarImageByID(client, parameters, options),
      getAvatarImageByOwner: (parameters: GetAvatarImageByOwner, options?: RequestOptions): Promise<Blob> =>
        avatars.getAvatarImageByOwner(client, parameters, options),
    },
    issueBulkOperations: {
      submitBulkDelete: (parameters: SubmitBulkDelete, options?: RequestOptions): Promise<SubmittedBulkOperation> =>
        issueBulkOperations.submitBulkDelete(client, parameters, options),
      getBulkEditableFields: (
        parameters: GetBulkEditableFields,
        options?: RequestOptions,
      ): Promise<BulkEditGetFields> => issueBulkOperations.getBulkEditableFields(client, parameters, options),
      submitBulkEdit: (parameters: SubmitBulkEdit, options?: RequestOptions): Promise<SubmittedBulkOperation> =>
        issueBulkOperations.submitBulkEdit(client, parameters, options),
      submitBulkMove: (parameters: SubmitBulkMove, options?: RequestOptions): Promise<SubmittedBulkOperation> =>
        issueBulkOperations.submitBulkMove(client, parameters, options),
      getAvailableTransitions: (
        parameters: GetAvailableTransitions,
        options?: RequestOptions,
      ): Promise<BulkTransitionGetAvailableTransitions> =>
        issueBulkOperations.getAvailableTransitions(client, parameters, options),
      submitBulkTransition: (
        parameters: SubmitBulkTransition,
        options?: RequestOptions,
      ): Promise<SubmittedBulkOperation> => issueBulkOperations.submitBulkTransition(client, parameters, options),
      submitBulkUnwatch: (parameters: SubmitBulkUnwatch, options?: RequestOptions): Promise<SubmittedBulkOperation> =>
        issueBulkOperations.submitBulkUnwatch(client, parameters, options),
      submitBulkWatch: (parameters: SubmitBulkWatch, options?: RequestOptions): Promise<SubmittedBulkOperation> =>
        issueBulkOperations.submitBulkWatch(client, parameters, options),
      getBulkOperationProgress: (
        parameters: GetBulkOperationProgress,
        options?: RequestOptions,
      ): Promise<BulkOperationProgress> => issueBulkOperations.getBulkOperationProgress(client, parameters, options),
    },
    issues: {
      getBulkChangelogs: (parameters: GetBulkChangelogs, options?: RequestOptions): Promise<BulkChangelogResponse> =>
        issues.getBulkChangelogs(client, parameters, options),
      createIssue: (parameters: CreateIssue, options?: RequestOptions): Promise<CreatedIssue> =>
        issues.createIssue(client, parameters, options),
      createIssues: (parameters: CreateIssues, options?: RequestOptions): Promise<CreatedIssues> =>
        issues.createIssues(client, parameters, options),
      bulkFetchIssues: (parameters: BulkFetchIssues, options?: RequestOptions): Promise<BulkIssueResults> =>
        issues.bulkFetchIssues(client, parameters, options),
      getCreateIssueMetaIssueTypes: (
        parameters: GetCreateIssueMetaIssueTypes,
        options?: RequestOptions,
      ): Promise<PageOfCreateMetaIssueTypes> => issues.getCreateIssueMetaIssueTypes(client, parameters, options),
      getCreateIssueMetaIssueTypeId: (
        parameters: GetCreateIssueMetaIssueTypeId,
        options?: RequestOptions,
      ): Promise<PageOfCreateMetaIssueTypeWithField> =>
        issues.getCreateIssueMetaIssueTypeId(client, parameters, options),
      getIssue: (parameters: GetIssue, options?: RequestOptions): Promise<Issue> =>
        issues.getIssue(client, parameters, options),
      editIssue: (parameters: EditIssue, options?: RequestOptions): Promise<void> =>
        issues.editIssue(client, parameters, options),
      deleteIssue: (parameters: DeleteIssue, options?: RequestOptions): Promise<void> =>
        issues.deleteIssue(client, parameters, options),
      assignIssue: (parameters: AssignIssue, options?: RequestOptions): Promise<void> =>
        issues.assignIssue(client, parameters, options),
      getChangeLogs: (parameters: GetChangeLogs, options?: RequestOptions): Promise<Page<Changelog>> =>
        issues.getChangeLogs(client, parameters, options),
      getChangeLogsByIds: (parameters: GetChangeLogsByIds, options?: RequestOptions): Promise<PageOfChangelogs> =>
        issues.getChangeLogsByIds(client, parameters, options),
      getEditIssueMeta: (parameters: GetEditIssueMeta, options?: RequestOptions): Promise<IssueUpdateMetadata> =>
        issues.getEditIssueMeta(client, parameters, options),
      notify: (parameters: Notify, options?: RequestOptions): Promise<void> =>
        issues.notify(client, parameters, options),
      getTransitions: (parameters: GetTransitions, options?: RequestOptions): Promise<Transitions> =>
        issues.getTransitions(client, parameters, options),
      doTransition: (parameters: DoTransition, options?: RequestOptions): Promise<void> =>
        issues.doTransition(client, parameters, options),
    },
    issueComments: {
      getCommentsByIds: (parameters: GetCommentsByIds, options?: RequestOptions): Promise<Page<Comment>> =>
        issueComments.getCommentsByIds(client, parameters, options),
      getComments: (parameters: GetComments, options?: RequestOptions): Promise<PageOfComments> =>
        issueComments.getComments(client, parameters, options),
      addComment: (parameters: AddComment, options?: RequestOptions): Promise<Comment> =>
        issueComments.addComment(client, parameters, options),
      getComment: (parameters: GetComment, options?: RequestOptions): Promise<Comment> =>
        issueComments.getComment(client, parameters, options),
      updateComment: (parameters: UpdateComment, options?: RequestOptions): Promise<Comment> =>
        issueComments.updateComment(client, parameters, options),
      deleteComment: (parameters: DeleteComment, options?: RequestOptions): Promise<void> =>
        issueComments.deleteComment(client, parameters, options),
    },
    issueCommentProperties: {
      getCommentPropertyKeys: (parameters: GetCommentPropertyKeys, options?: RequestOptions): Promise<PropertyKeys> =>
        issueCommentProperties.getCommentPropertyKeys(client, parameters, options),
      getCommentProperty: (parameters: GetCommentProperty, options?: RequestOptions): Promise<EntityProperty> =>
        issueCommentProperties.getCommentProperty(client, parameters, options),
      setCommentProperty: (parameters: SetCommentProperty, options?: RequestOptions): Promise<void> =>
        issueCommentProperties.setCommentProperty(client, parameters, options),
      deleteCommentProperty: (parameters: DeleteCommentProperty, options?: RequestOptions): Promise<void> =>
        issueCommentProperties.deleteCommentProperty(client, parameters, options),
    },
    projectComponents: {
      findComponentsForProjects: (
        parameters?: FindComponentsForProjects,
        options?: RequestOptions,
      ): Promise<Page<Component>> => projectComponents.findComponentsForProjects(client, parameters, options),
      createComponent: (parameters: CreateComponent, options?: RequestOptions): Promise<ProjectComponent> =>
        projectComponents.createComponent(client, parameters, options),
      getComponent: (parameters: GetComponent, options?: RequestOptions): Promise<ProjectComponent> =>
        projectComponents.getComponent(client, parameters, options),
      updateComponent: (parameters: UpdateComponent, options?: RequestOptions): Promise<ProjectComponent> =>
        projectComponents.updateComponent(client, parameters, options),
      deleteComponent: (parameters: DeleteComponent, options?: RequestOptions): Promise<void> =>
        projectComponents.deleteComponent(client, parameters, options),
      getComponentRelatedIssues: (
        parameters: GetComponentRelatedIssues,
        options?: RequestOptions,
      ): Promise<ComponentIssuesCount> => projectComponents.getComponentRelatedIssues(client, parameters, options),
      getProjectComponentsPaginated: (
        parameters: GetProjectComponentsPaginated,
        options?: RequestOptions,
      ): Promise<Page<ComponentWithIssueCount>> =>
        projectComponents.getProjectComponentsPaginated(client, parameters, options),
      getProjectComponents: (parameters: GetProjectComponents, options?: RequestOptions): Promise<ProjectComponent[]> =>
        projectComponents.getProjectComponents(client, parameters, options),
    },
    timeTracking: {
      getSelectedTimeTrackingImplementation: (options?: RequestOptions): Promise<void> =>
        timeTracking.getSelectedTimeTrackingImplementation(client, options),
      selectTimeTrackingImplementation: (
        parameters: SelectTimeTrackingImplementation,
        options?: RequestOptions,
      ): Promise<void> => timeTracking.selectTimeTrackingImplementation(client, parameters, options),
      getAvailableTimeTrackingImplementations: (options?: RequestOptions): Promise<TimeTrackingProvider[]> =>
        timeTracking.getAvailableTimeTrackingImplementations(client, options),
      getSharedTimeTrackingConfiguration: (options?: RequestOptions): Promise<TimeTrackingConfiguration> =>
        timeTracking.getSharedTimeTrackingConfiguration(client, options),
      setSharedTimeTrackingConfiguration: (
        parameters: SetSharedTimeTrackingConfiguration,
        options?: RequestOptions,
      ): Promise<TimeTrackingConfiguration> =>
        timeTracking.setSharedTimeTrackingConfiguration(client, parameters, options),
    },
    issueCustomFieldOptions: {
      getCustomFieldOption: (parameters: GetCustomFieldOption, options?: RequestOptions): Promise<CustomFieldOption> =>
        issueCustomFieldOptions.getCustomFieldOption(client, parameters, options),
      getOptionsForContext: (
        parameters: GetOptionsForContext,
        options?: RequestOptions,
      ): Promise<Page<CustomFieldContextOption>> =>
        issueCustomFieldOptions.getOptionsForContext(client, parameters, options),
      createCustomFieldOption: (
        parameters: CreateCustomFieldOption,
        options?: RequestOptions,
      ): Promise<CustomFieldCreatedContextOptionsList> =>
        issueCustomFieldOptions.createCustomFieldOption(client, parameters, options),
      updateCustomFieldOption: (
        parameters: UpdateCustomFieldOption,
        options?: RequestOptions,
      ): Promise<CustomFieldUpdatedContextOptionsList> =>
        issueCustomFieldOptions.updateCustomFieldOption(client, parameters, options),
      reorderCustomFieldOptions: (parameters: ReorderCustomFieldOptions, options?: RequestOptions): Promise<void> =>
        issueCustomFieldOptions.reorderCustomFieldOptions(client, parameters, options),
      deleteCustomFieldOption: (parameters: DeleteCustomFieldOption, options?: RequestOptions): Promise<void> =>
        issueCustomFieldOptions.deleteCustomFieldOption(client, parameters, options),
      replaceCustomFieldOption: (
        parameters: ReplaceCustomFieldOption,
        options?: RequestOptions,
      ): Promise<TaskProgressRemoveOptionFromIssuesResult> =>
        issueCustomFieldOptions.replaceCustomFieldOption(client, parameters, options),
    },
    dashboards: {
      getAllDashboards: (parameters?: GetAllDashboards, options?: RequestOptions): Promise<PageOfDashboards> =>
        dashboards.getAllDashboards(client, parameters, options),
      getDashboardsPaginated: (
        parameters?: GetDashboardsPaginated,
        options?: RequestOptions,
      ): Promise<Page<Dashboard>> => dashboards.getDashboardsPaginated(client, parameters, options),
      getDashboardItemPropertyKeys: (
        parameters: GetDashboardItemPropertyKeys,
        options?: RequestOptions,
      ): Promise<PropertyKeys> => dashboards.getDashboardItemPropertyKeys(client, parameters, options),
      getDashboardItemProperty: (
        parameters: GetDashboardItemProperty,
        options?: RequestOptions,
      ): Promise<EntityProperty> => dashboards.getDashboardItemProperty(client, parameters, options),
      setDashboardItemProperty: (parameters: SetDashboardItemProperty, options?: RequestOptions): Promise<void> =>
        dashboards.setDashboardItemProperty(client, parameters, options),
      deleteDashboardItemProperty: (parameters: DeleteDashboardItemProperty, options?: RequestOptions): Promise<void> =>
        dashboards.deleteDashboardItemProperty(client, parameters, options),
      getDashboard: (parameters: GetDashboard, options?: RequestOptions): Promise<Dashboard> =>
        dashboards.getDashboard(client, parameters, options),
    },
    appDataPolicies: {
      getPolicy: (options?: RequestOptions): Promise<WorkspaceDataPolicy> => appDataPolicies.getPolicy(client, options),
      getPolicies: (parameters?: GetPolicies, options?: RequestOptions): Promise<ProjectDataPolicies> =>
        appDataPolicies.getPolicies(client, parameters, options),
    },
    jiraExpressions: {
      analyseExpression: (parameters: AnalyseExpression, options?: RequestOptions): Promise<JiraExpressionsAnalysis> =>
        jiraExpressions.analyseExpression(client, parameters, options),
      evaluateJSISJiraExpression: (
        parameters: EvaluateJSISJiraExpression,
        options?: RequestOptions,
      ): Promise<JExpEvaluateJiraExpressionResult> =>
        jiraExpressions.evaluateJSISJiraExpression(client, parameters, options),
    },
    issueFields: {
      getFields: (options?: RequestOptions): Promise<FieldDetails[]> => issueFields.getFields(client, options),
      createCustomField: (parameters: CreateCustomField, options?: RequestOptions): Promise<FieldDetails> =>
        issueFields.createCustomField(client, parameters, options),
      getFieldsPaginated: (parameters?: GetFieldsPaginated, options?: RequestOptions): Promise<Page<Field>> =>
        issueFields.getFieldsPaginated(client, parameters, options),
      getTrashedFieldsPaginated: (
        parameters?: GetTrashedFieldsPaginated,
        options?: RequestOptions,
      ): Promise<Page<Field>> => issueFields.getTrashedFieldsPaginated(client, parameters, options),
      updateCustomField: (parameters: UpdateCustomField, options?: RequestOptions): Promise<void> =>
        issueFields.updateCustomField(client, parameters, options),
      deleteCustomField: (parameters: DeleteCustomField, options?: RequestOptions): Promise<TaskProgressObject> =>
        issueFields.deleteCustomField(client, parameters, options),
      restoreCustomField: (parameters: RestoreCustomField, options?: RequestOptions): Promise<void> =>
        issueFields.restoreCustomField(client, parameters, options),
      trashCustomField: (parameters: TrashCustomField, options?: RequestOptions): Promise<void> =>
        issueFields.trashCustomField(client, parameters, options),
    },
    issueCustomFieldAssociations: {
      createAssociations: (parameters: CreateAssociations, options?: RequestOptions): Promise<void> =>
        issueCustomFieldAssociations.createAssociations(client, parameters, options),
      removeAssociations: (parameters: RemoveAssociations, options?: RequestOptions): Promise<void> =>
        issueCustomFieldAssociations.removeAssociations(client, parameters, options),
    },
    issueCustomFieldContexts: {
      getContextsForField: (
        parameters: GetContextsForField,
        options?: RequestOptions,
      ): Promise<Page<CustomFieldContext>> => issueCustomFieldContexts.getContextsForField(client, parameters, options),
      createCustomFieldContext: (
        parameters: CreateCustomFieldContext,
        options?: RequestOptions,
      ): Promise<CreateCustomFieldContextModel> =>
        issueCustomFieldContexts.createCustomFieldContext(client, parameters, options),
      getContextDefaultValues: (
        parameters: GetContextDefaultValues,
        options?: RequestOptions,
      ): Promise<Page<ContextDefaultValues>> =>
        issueCustomFieldContexts.getContextDefaultValues(client, parameters, options),
      getIssueTypeMappingsForContexts: (
        parameters: GetIssueTypeMappingsForContexts,
        options?: RequestOptions,
      ): Promise<Page<IssueTypeToContextMapping>> =>
        issueCustomFieldContexts.getIssueTypeMappingsForContexts(client, parameters, options),
      getCustomFieldContextsForProjectsAndIssueTypes: (
        parameters: GetCustomFieldContextsForProjectsAndIssueTypes,
        options?: RequestOptions,
      ): Promise<Page<ContextForProjectAndIssueType>> =>
        issueCustomFieldContexts.getCustomFieldContextsForProjectsAndIssueTypes(client, parameters, options),
      getProjectContextMapping: (
        parameters: GetProjectContextMapping,
        options?: RequestOptions,
      ): Promise<Page<CustomFieldContextProjectMapping>> =>
        issueCustomFieldContexts.getProjectContextMapping(client, parameters, options),
      updateCustomFieldContext: (parameters: UpdateCustomFieldContext, options?: RequestOptions): Promise<void> =>
        issueCustomFieldContexts.updateCustomFieldContext(client, parameters, options),
      deleteCustomFieldContext: (parameters: DeleteCustomFieldContext, options?: RequestOptions): Promise<void> =>
        issueCustomFieldContexts.deleteCustomFieldContext(client, parameters, options),
      addIssueTypesToContext: (parameters: AddIssueTypesToContext, options?: RequestOptions): Promise<void> =>
        issueCustomFieldContexts.addIssueTypesToContext(client, parameters, options),
      removeIssueTypesFromContext: (parameters: RemoveIssueTypesFromContext, options?: RequestOptions): Promise<void> =>
        issueCustomFieldContexts.removeIssueTypesFromContext(client, parameters, options),
      assignProjectsToCustomFieldContext: (
        parameters: AssignProjectsToCustomFieldContext,
        options?: RequestOptions,
      ): Promise<void> => issueCustomFieldContexts.assignProjectsToCustomFieldContext(client, parameters, options),
      removeCustomFieldContextFromProjects: (
        parameters: RemoveCustomFieldContextFromProjects,
        options?: RequestOptions,
      ): Promise<void> => issueCustomFieldContexts.removeCustomFieldContextFromProjects(client, parameters, options),
    },
    screens: {
      getScreensForField: (parameters: GetScreensForField, options?: RequestOptions): Promise<Page<ScreenWithTab>> =>
        screens.getScreensForField(client, parameters, options),
      getScreens: (parameters?: GetScreens, options?: RequestOptions): Promise<Page<Screen>> =>
        screens.getScreens(client, parameters, options),
      addFieldToDefaultScreen: (parameters: AddFieldToDefaultScreen, options?: RequestOptions): Promise<void> =>
        screens.addFieldToDefaultScreen(client, parameters, options),
      getAvailableScreenFields: (
        parameters: GetAvailableScreenFields,
        options?: RequestOptions,
      ): Promise<ScreenableField[]> => screens.getAvailableScreenFields(client, parameters, options),
    },
    issueCustomFieldOptionsApps: {
      getAllIssueFieldOptions: (
        parameters: GetAllIssueFieldOptions,
        options?: RequestOptions,
      ): Promise<Page<IssueFieldOption>> =>
        issueCustomFieldOptionsApps.getAllIssueFieldOptions(client, parameters, options),
      createIssueFieldOption: (
        parameters: CreateIssueFieldOption,
        options?: RequestOptions,
      ): Promise<IssueFieldOption> => issueCustomFieldOptionsApps.createIssueFieldOption(client, parameters, options),
      getSelectableIssueFieldOptions: (
        parameters: GetSelectableIssueFieldOptions,
        options?: RequestOptions,
      ): Promise<Page<IssueFieldOption>> =>
        issueCustomFieldOptionsApps.getSelectableIssueFieldOptions(client, parameters, options),
      getVisibleIssueFieldOptions: (
        parameters: GetVisibleIssueFieldOptions,
        options?: RequestOptions,
      ): Promise<Page<IssueFieldOption>> =>
        issueCustomFieldOptionsApps.getVisibleIssueFieldOptions(client, parameters, options),
      getIssueFieldOption: (parameters: GetIssueFieldOption, options?: RequestOptions): Promise<IssueFieldOption> =>
        issueCustomFieldOptionsApps.getIssueFieldOption(client, parameters, options),
      updateIssueFieldOption: (
        parameters: UpdateIssueFieldOption,
        options?: RequestOptions,
      ): Promise<IssueFieldOption> => issueCustomFieldOptionsApps.updateIssueFieldOption(client, parameters, options),
      deleteIssueFieldOption: (parameters: DeleteIssueFieldOption, options?: RequestOptions): Promise<void> =>
        issueCustomFieldOptionsApps.deleteIssueFieldOption(client, parameters, options),
      replaceIssueFieldOption: (
        parameters: ReplaceIssueFieldOption,
        options?: RequestOptions,
      ): Promise<TaskProgressRemoveOptionFromIssuesResult> =>
        issueCustomFieldOptionsApps.replaceIssueFieldOption(client, parameters, options),
    },
    filters: {
      createFilter: (parameters: CreateFilter, options?: RequestOptions): Promise<Filter> =>
        filters.createFilter(client, parameters, options),
      getFavouriteFilters: (parameters?: GetFavouriteFilters, options?: RequestOptions): Promise<Filter[]> =>
        filters.getFavouriteFilters(client, parameters, options),
      getMyFilters: (parameters?: GetMyFilters, options?: RequestOptions): Promise<Filter[]> =>
        filters.getMyFilters(client, parameters, options),
      getFiltersPaginated: (parameters?: GetFiltersPaginated, options?: RequestOptions): Promise<Page<FilterDetails>> =>
        filters.getFiltersPaginated(client, parameters, options),
      getFilter: (parameters: GetFilter, options?: RequestOptions): Promise<Filter> =>
        filters.getFilter(client, parameters, options),
      updateFilter: (parameters: UpdateFilter, options?: RequestOptions): Promise<Filter> =>
        filters.updateFilter(client, parameters, options),
      deleteFilter: (parameters: DeleteFilter, options?: RequestOptions): Promise<void> =>
        filters.deleteFilter(client, parameters, options),
      getColumns: (parameters: GetColumns, options?: RequestOptions): Promise<ColumnItem[]> =>
        filters.getColumns(client, parameters, options),
      setColumns: (parameters: SetColumns, options?: RequestOptions): Promise<void> =>
        filters.setColumns(client, parameters, options),
      resetColumns: (parameters: ResetColumns, options?: RequestOptions): Promise<void> =>
        filters.resetColumns(client, parameters, options),
      setFavouriteForFilter: (parameters: SetFavouriteForFilter, options?: RequestOptions): Promise<Filter> =>
        filters.setFavouriteForFilter(client, parameters, options),
      deleteFavouriteForFilter: (parameters: DeleteFavouriteForFilter, options?: RequestOptions): Promise<Filter> =>
        filters.deleteFavouriteForFilter(client, parameters, options),
    },
    filterSharing: {
      getDefaultShareScope: (options?: RequestOptions): Promise<DefaultShareScope> =>
        filterSharing.getDefaultShareScope(client, options),
      setDefaultShareScope: (parameters: SetDefaultShareScope, options?: RequestOptions): Promise<DefaultShareScope> =>
        filterSharing.setDefaultShareScope(client, parameters, options),
      getSharePermissions: (parameters: GetSharePermissions, options?: RequestOptions): Promise<SharePermission[]> =>
        filterSharing.getSharePermissions(client, parameters, options),
      addSharePermission: (parameters: AddSharePermission, options?: RequestOptions): Promise<SharePermission[]> =>
        filterSharing.addSharePermission(client, parameters, options),
      getSharePermission: (parameters: GetSharePermission, options?: RequestOptions): Promise<SharePermission> =>
        filterSharing.getSharePermission(client, parameters, options),
      deleteSharePermission: (parameters: DeleteSharePermission, options?: RequestOptions): Promise<void> =>
        filterSharing.deleteSharePermission(client, parameters, options),
    },
    issuePanels: {
      bulkPinUnpinProjectsAsync: (
        parameters: BulkPinUnpinProjectsAsync,
        options?: RequestOptions,
      ): Promise<ForgePanelProjectPinAsyncResponse> =>
        issuePanels.bulkPinUnpinProjectsAsync(client, parameters, options),
    },
    groups: {
      createGroup: (parameters: CreateGroup, options?: RequestOptions): Promise<Group> =>
        groups.createGroup(client, parameters, options),
      removeGroup: (parameters: RemoveGroup, options?: RequestOptions): Promise<void> =>
        groups.removeGroup(client, parameters, options),
      getUsersFromGroup: (parameters?: GetUsersFromGroup, options?: RequestOptions): Promise<Page<UserDetails>> =>
        groups.getUsersFromGroup(client, parameters, options),
      addUserToGroup: (parameters: AddUserToGroup, options?: RequestOptions): Promise<Group> =>
        groups.addUserToGroup(client, parameters, options),
      removeUserFromGroup: (parameters: RemoveUserFromGroup, options?: RequestOptions): Promise<void> =>
        groups.removeUserFromGroup(client, parameters, options),
      findGroups: (parameters?: FindGroups, options?: RequestOptions): Promise<FoundGroups> =>
        groups.findGroups(client, parameters, options),
    },
    groupAndUserPicker: {
      findUsersAndGroups: (parameters: FindUsersAndGroups, options?: RequestOptions): Promise<FoundUsersAndGroups> =>
        groupAndUserPicker.findUsersAndGroups(client, parameters, options),
    },
    issueSearch: {
      getIssuePickerResource: (
        parameters?: GetIssuePickerResource,
        options?: RequestOptions,
      ): Promise<IssuePickerSuggestions> => issueSearch.getIssuePickerResource(client, parameters, options),
      matchIssues: (parameters: MatchIssues, options?: RequestOptions): Promise<IssueMatches> =>
        issueSearch.matchIssues(client, parameters, options),
      countIssues: (parameters: CountIssues, options?: RequestOptions): Promise<JQLCountResults> =>
        issueSearch.countIssues(client, parameters, options),
      searchAndReconsileIssuesUsingJql: (
        parameters?: SearchAndReconsileIssuesUsingJql,
        options?: RequestOptions,
      ): Promise<SearchAndReconcileResults> =>
        issueSearch.searchAndReconsileIssuesUsingJql(client, parameters, options),
      searchAndReconsileIssuesUsingJqlPost: (
        parameters: SearchAndReconsileIssuesUsingJqlPost,
        options?: RequestOptions,
      ): Promise<SearchAndReconcileResults> =>
        issueSearch.searchAndReconsileIssuesUsingJqlPost(client, parameters, options),
    },
    issueProperties: {
      bulkSetIssuesPropertiesList: (parameters: BulkSetIssuesPropertiesList, options?: RequestOptions): Promise<void> =>
        issueProperties.bulkSetIssuesPropertiesList(client, parameters, options),
      bulkSetIssuePropertiesByIssue: (
        parameters: BulkSetIssuePropertiesByIssue,
        options?: RequestOptions,
      ): Promise<void> => issueProperties.bulkSetIssuePropertiesByIssue(client, parameters, options),
      bulkSetIssueProperty: (parameters: BulkSetIssueProperty, options?: RequestOptions): Promise<void> =>
        issueProperties.bulkSetIssueProperty(client, parameters, options),
      bulkDeleteIssueProperty: (parameters: BulkDeleteIssueProperty, options?: RequestOptions): Promise<void> =>
        issueProperties.bulkDeleteIssueProperty(client, parameters, options),
      getIssuePropertyKeys: (parameters: GetIssuePropertyKeys, options?: RequestOptions): Promise<PropertyKeys> =>
        issueProperties.getIssuePropertyKeys(client, parameters, options),
      getIssueProperty: (parameters: GetIssueProperty, options?: RequestOptions): Promise<EntityProperty> =>
        issueProperties.getIssueProperty(client, parameters, options),
      setIssueProperty: (parameters: SetIssueProperty, options?: RequestOptions): Promise<void> =>
        issueProperties.setIssueProperty(client, parameters, options),
      deleteIssueProperty: (parameters: DeleteIssueProperty, options?: RequestOptions): Promise<void> =>
        issueProperties.deleteIssueProperty(client, parameters, options),
    },
    issueWatchers: {
      getIsWatchingIssueBulk: (
        parameters: GetIsWatchingIssueBulk,
        options?: RequestOptions,
      ): Promise<BulkIssueIsWatching> => issueWatchers.getIsWatchingIssueBulk(client, parameters, options),
      getIssueWatchers: (parameters: GetIssueWatchers, options?: RequestOptions): Promise<Watchers> =>
        issueWatchers.getIssueWatchers(client, parameters, options),
      addWatcher: (parameters: AddWatcher, options?: RequestOptions): Promise<void> =>
        issueWatchers.addWatcher(client, parameters, options),
      removeWatcher: (parameters: RemoveWatcher, options?: RequestOptions): Promise<void> =>
        issueWatchers.removeWatcher(client, parameters, options),
    },
    issueRemoteLinks: {
      getRemoteIssueLinks: (
        parameters: GetRemoteIssueLinks,
        options?: RequestOptions,
      ): Promise<GetRemoteIssueLinksModel> => issueRemoteLinks.getRemoteIssueLinks(client, parameters, options),
      createOrUpdateRemoteIssueLink: (
        parameters: CreateOrUpdateRemoteIssueLink,
        options?: RequestOptions,
      ): Promise<RemoteIssueLinkIdentifies> =>
        issueRemoteLinks.createOrUpdateRemoteIssueLink(client, parameters, options),
      deleteRemoteIssueLinkByGlobalId: (
        parameters: DeleteRemoteIssueLinkByGlobalId,
        options?: RequestOptions,
      ): Promise<void> => issueRemoteLinks.deleteRemoteIssueLinkByGlobalId(client, parameters, options),
      getRemoteIssueLinkById: (
        parameters: GetRemoteIssueLinkById,
        options?: RequestOptions,
      ): Promise<RemoteIssueLink> => issueRemoteLinks.getRemoteIssueLinkById(client, parameters, options),
      updateRemoteIssueLink: (parameters: UpdateRemoteIssueLink, options?: RequestOptions): Promise<void> =>
        issueRemoteLinks.updateRemoteIssueLink(client, parameters, options),
      deleteRemoteIssueLinkById: (parameters: DeleteRemoteIssueLinkById, options?: RequestOptions): Promise<void> =>
        issueRemoteLinks.deleteRemoteIssueLinkById(client, parameters, options),
    },
    issueVotes: {
      getVotes: (parameters: GetVotes, options?: RequestOptions): Promise<Votes> =>
        issueVotes.getVotes(client, parameters, options),
      addVote: (parameters: AddVote, options?: RequestOptions): Promise<void> =>
        issueVotes.addVote(client, parameters, options),
      removeVote: (parameters: RemoveVote, options?: RequestOptions): Promise<void> =>
        issueVotes.removeVote(client, parameters, options),
    },
    issueWorklogs: {
      getIssueWorklog: (parameters: GetIssueWorklog, options?: RequestOptions): Promise<PageOfWorklogs> =>
        issueWorklogs.getIssueWorklog(client, parameters, options),
      addWorklog: (parameters: AddWorklog, options?: RequestOptions): Promise<Worklog> =>
        issueWorklogs.addWorklog(client, parameters, options),
      getWorklog: (parameters: GetWorklog, options?: RequestOptions): Promise<Worklog> =>
        issueWorklogs.getWorklog(client, parameters, options),
      updateWorklog: (parameters: UpdateWorklog, options?: RequestOptions): Promise<Worklog> =>
        issueWorklogs.updateWorklog(client, parameters, options),
      deleteWorklog: (parameters: DeleteWorklog, options?: RequestOptions): Promise<void> =>
        issueWorklogs.deleteWorklog(client, parameters, options),
      getIdsOfWorklogsDeletedSince: (
        parameters?: GetIdsOfWorklogsDeletedSince,
        options?: RequestOptions,
      ): Promise<ChangedWorklogs> => issueWorklogs.getIdsOfWorklogsDeletedSince(client, parameters, options),
      getWorklogsForIds: (parameters: GetWorklogsForIds, options?: RequestOptions): Promise<Worklog[]> =>
        issueWorklogs.getWorklogsForIds(client, parameters, options),
      getIdsOfWorklogsModifiedSince: (
        parameters?: GetIdsOfWorklogsModifiedSince,
        options?: RequestOptions,
      ): Promise<ChangedWorklogs> => issueWorklogs.getIdsOfWorklogsModifiedSince(client, parameters, options),
    },
    issueWorklogProperties: {
      getWorklogPropertyKeys: (parameters: GetWorklogPropertyKeys, options?: RequestOptions): Promise<PropertyKeys> =>
        issueWorklogProperties.getWorklogPropertyKeys(client, parameters, options),
      getWorklogProperty: (parameters: GetWorklogProperty, options?: RequestOptions): Promise<EntityProperty> =>
        issueWorklogProperties.getWorklogProperty(client, parameters, options),
      setWorklogProperty: (parameters: SetWorklogProperty, options?: RequestOptions): Promise<void> =>
        issueWorklogProperties.setWorklogProperty(client, parameters, options),
      deleteWorklogProperty: (parameters: DeleteWorklogProperty, options?: RequestOptions): Promise<void> =>
        issueWorklogProperties.deleteWorklogProperty(client, parameters, options),
    },
    issueLinks: {
      linkIssues: (parameters: LinkIssues, options?: RequestOptions): Promise<void> =>
        issueLinks.linkIssues(client, parameters, options),
      getIssueLink: (parameters: GetIssueLink, options?: RequestOptions): Promise<IssueLink> =>
        issueLinks.getIssueLink(client, parameters, options),
      deleteIssueLink: (parameters: DeleteIssueLink, options?: RequestOptions): Promise<void> =>
        issueLinks.deleteIssueLink(client, parameters, options),
    },
    issueLinkTypes: {
      getIssueLinkTypes: (options?: RequestOptions): Promise<IssueLinkTypes> =>
        issueLinkTypes.getIssueLinkTypes(client, options),
      createIssueLinkType: (parameters: CreateIssueLinkType, options?: RequestOptions): Promise<IssueLinkType> =>
        issueLinkTypes.createIssueLinkType(client, parameters, options),
      getIssueLinkType: (parameters: GetIssueLinkType, options?: RequestOptions): Promise<IssueLinkType> =>
        issueLinkTypes.getIssueLinkType(client, parameters, options),
      updateIssueLinkType: (parameters: UpdateIssueLinkType, options?: RequestOptions): Promise<IssueLinkType> =>
        issueLinkTypes.updateIssueLinkType(client, parameters, options),
      deleteIssueLinkType: (parameters: DeleteIssueLinkType, options?: RequestOptions): Promise<void> =>
        issueLinkTypes.deleteIssueLinkType(client, parameters, options),
    },
    issueSecuritySchemes: {
      getIssueSecuritySchemes: (options?: RequestOptions): Promise<SecuritySchemes> =>
        issueSecuritySchemes.getIssueSecuritySchemes(client, options),
      getIssueSecurityScheme: (parameters: GetIssueSecurityScheme, options?: RequestOptions): Promise<SecurityScheme> =>
        issueSecuritySchemes.getIssueSecurityScheme(client, parameters, options),
    },
    issueSecurityLevel: {
      getIssueSecurityLevelMembers: (
        parameters: GetIssueSecurityLevelMembers,
        options?: RequestOptions,
      ): Promise<Page<IssueSecurityLevelMember>> =>
        issueSecurityLevel.getIssueSecurityLevelMembers(client, parameters, options),
      getIssueSecurityLevel: (parameters: GetIssueSecurityLevel, options?: RequestOptions): Promise<SecurityLevel> =>
        issueSecurityLevel.getIssueSecurityLevel(client, parameters, options),
    },
    issueTypes: {
      getIssueAllTypes: (options?: RequestOptions): Promise<IssueTypeDetails[]> =>
        issueTypes.getIssueAllTypes(client, options),
      createIssueType: (parameters: CreateIssueType, options?: RequestOptions): Promise<IssueTypeDetails> =>
        issueTypes.createIssueType(client, parameters, options),
      getIssueType: (parameters: GetIssueType, options?: RequestOptions): Promise<IssueTypeDetails> =>
        issueTypes.getIssueType(client, parameters, options),
      updateIssueType: (parameters: UpdateIssueType, options?: RequestOptions): Promise<IssueTypeDetails> =>
        issueTypes.updateIssueType(client, parameters, options),
      deleteIssueType: (parameters: DeleteIssueType, options?: RequestOptions): Promise<void> =>
        issueTypes.deleteIssueType(client, parameters, options),
      getAlternativeIssueTypes: (
        parameters: GetAlternativeIssueTypes,
        options?: RequestOptions,
      ): Promise<IssueTypeDetails[]> => issueTypes.getAlternativeIssueTypes(client, parameters, options),
      createIssueTypeAvatar: (parameters: CreateIssueTypeAvatar, options?: RequestOptions): Promise<Avatar> =>
        issueTypes.createIssueTypeAvatar(client, parameters, options),
    },
    issueTypeProperties: {
      getIssueTypePropertyKeys: (
        parameters: GetIssueTypePropertyKeys,
        options?: RequestOptions,
      ): Promise<PropertyKeys> => issueTypeProperties.getIssueTypePropertyKeys(client, parameters, options),
      getIssueTypeProperty: (parameters: GetIssueTypeProperty, options?: RequestOptions): Promise<EntityProperty> =>
        issueTypeProperties.getIssueTypeProperty(client, parameters, options),
      setIssueTypeProperty: (parameters: SetIssueTypeProperty, options?: RequestOptions): Promise<void> =>
        issueTypeProperties.setIssueTypeProperty(client, parameters, options),
      deleteIssueTypeProperty: (parameters: DeleteIssueTypeProperty, options?: RequestOptions): Promise<void> =>
        issueTypeProperties.deleteIssueTypeProperty(client, parameters, options),
    },
    issueTypeSchemes: {
      getAllIssueTypeSchemes: (
        parameters?: GetAllIssueTypeSchemes,
        options?: RequestOptions,
      ): Promise<Page<IssueTypeScheme>> => issueTypeSchemes.getAllIssueTypeSchemes(client, parameters, options),
      createIssueTypeScheme: (
        parameters: CreateIssueTypeScheme,
        options?: RequestOptions,
      ): Promise<IssueTypeSchemeID> => issueTypeSchemes.createIssueTypeScheme(client, parameters, options),
      getIssueTypeSchemesMapping: (
        parameters?: GetIssueTypeSchemesMapping,
        options?: RequestOptions,
      ): Promise<Page<IssueTypeSchemeMapping>> =>
        issueTypeSchemes.getIssueTypeSchemesMapping(client, parameters, options),
      getIssueTypeSchemeForProjects: (
        parameters: GetIssueTypeSchemeForProjects,
        options?: RequestOptions,
      ): Promise<Page<IssueTypeSchemeProjects>> =>
        issueTypeSchemes.getIssueTypeSchemeForProjects(client, parameters, options),
      assignIssueTypeSchemeToProject: (
        parameters: AssignIssueTypeSchemeToProject,
        options?: RequestOptions,
      ): Promise<void> => issueTypeSchemes.assignIssueTypeSchemeToProject(client, parameters, options),
      updateIssueTypeScheme: (parameters: UpdateIssueTypeScheme, options?: RequestOptions): Promise<void> =>
        issueTypeSchemes.updateIssueTypeScheme(client, parameters, options),
      deleteIssueTypeScheme: (parameters: DeleteIssueTypeScheme, options?: RequestOptions): Promise<void> =>
        issueTypeSchemes.deleteIssueTypeScheme(client, parameters, options),
      addIssueTypesToIssueTypeScheme: (
        parameters: AddIssueTypesToIssueTypeScheme,
        options?: RequestOptions,
      ): Promise<void> => issueTypeSchemes.addIssueTypesToIssueTypeScheme(client, parameters, options),
      reorderIssueTypesInIssueTypeScheme: (
        parameters: ReorderIssueTypesInIssueTypeScheme,
        options?: RequestOptions,
      ): Promise<void> => issueTypeSchemes.reorderIssueTypesInIssueTypeScheme(client, parameters, options),
      removeIssueTypeFromIssueTypeScheme: (
        parameters: RemoveIssueTypeFromIssueTypeScheme,
        options?: RequestOptions,
      ): Promise<void> => issueTypeSchemes.removeIssueTypeFromIssueTypeScheme(client, parameters, options),
    },
    issueTypeScreenSchemes: {
      getIssueTypeScreenSchemes: (
        parameters?: GetIssueTypeScreenSchemes,
        options?: RequestOptions,
      ): Promise<Page<IssueTypeScreenScheme>> =>
        issueTypeScreenSchemes.getIssueTypeScreenSchemes(client, parameters, options),
      createIssueTypeScreenScheme: (
        parameters: CreateIssueTypeScreenScheme,
        options?: RequestOptions,
      ): Promise<IssueTypeScreenSchemeId> =>
        issueTypeScreenSchemes.createIssueTypeScreenScheme(client, parameters, options),
      getIssueTypeScreenSchemeMappings: (
        parameters?: GetIssueTypeScreenSchemeMappings,
        options?: RequestOptions,
      ): Promise<Page<IssueTypeScreenSchemeItem>> =>
        issueTypeScreenSchemes.getIssueTypeScreenSchemeMappings(client, parameters, options),
      getIssueTypeScreenSchemeProjectAssociations: (
        parameters: GetIssueTypeScreenSchemeProjectAssociations,
        options?: RequestOptions,
      ): Promise<Page<IssueTypeScreenSchemesProjects>> =>
        issueTypeScreenSchemes.getIssueTypeScreenSchemeProjectAssociations(client, parameters, options),
      assignIssueTypeScreenSchemeToProject: (
        parameters: AssignIssueTypeScreenSchemeToProject,
        options?: RequestOptions,
      ): Promise<void> => issueTypeScreenSchemes.assignIssueTypeScreenSchemeToProject(client, parameters, options),
      updateIssueTypeScreenScheme: (parameters: UpdateIssueTypeScreenScheme, options?: RequestOptions): Promise<void> =>
        issueTypeScreenSchemes.updateIssueTypeScreenScheme(client, parameters, options),
      deleteIssueTypeScreenScheme: (parameters: DeleteIssueTypeScreenScheme, options?: RequestOptions): Promise<void> =>
        issueTypeScreenSchemes.deleteIssueTypeScreenScheme(client, parameters, options),
      appendMappingsForIssueTypeScreenScheme: (
        parameters: AppendMappingsForIssueTypeScreenScheme,
        options?: RequestOptions,
      ): Promise<void> => issueTypeScreenSchemes.appendMappingsForIssueTypeScreenScheme(client, parameters, options),
      updateDefaultScreenScheme: (parameters: UpdateDefaultScreenScheme, options?: RequestOptions): Promise<void> =>
        issueTypeScreenSchemes.updateDefaultScreenScheme(client, parameters, options),
      removeMappingsFromIssueTypeScreenScheme: (
        parameters: RemoveMappingsFromIssueTypeScreenScheme,
        options?: RequestOptions,
      ): Promise<void> => issueTypeScreenSchemes.removeMappingsFromIssueTypeScreenScheme(client, parameters, options),
      getProjectsForIssueTypeScreenScheme: (
        parameters: GetProjectsForIssueTypeScreenScheme,
        options?: RequestOptions,
      ): Promise<Page<ProjectDetails>> =>
        issueTypeScreenSchemes.getProjectsForIssueTypeScreenScheme(client, parameters, options),
    },
    jql: {
      getAutoComplete: (options?: RequestOptions): Promise<JQLReferenceData> => jql.getAutoComplete(client, options),
      getAutoCompletePost: (parameters: GetAutoCompletePost, options?: RequestOptions): Promise<JQLReferenceData> =>
        jql.getAutoCompletePost(client, parameters, options),
      getFieldAutoCompleteForQueryString: (
        parameters?: GetFieldAutoCompleteForQueryString,
        options?: RequestOptions,
      ): Promise<AutoCompleteSuggestions> => jql.getFieldAutoCompleteForQueryString(client, parameters, options),
      parseJqlQueries: (parameters: ParseJqlQueries, options?: RequestOptions): Promise<ParsedJqlQueries> =>
        jql.parseJqlQueries(client, parameters, options),
      migrateQueries: (parameters: MigrateQueries, options?: RequestOptions): Promise<ConvertedJQLQueries> =>
        jql.migrateQueries(client, parameters, options),
    },
    jqlFunctionsApps: {
      getPrecomputations: (
        parameters?: GetPrecomputations,
        options?: RequestOptions,
      ): Promise<Page<JqlFunctionPrecomputation>> => jqlFunctionsApps.getPrecomputations(client, parameters, options),
      updatePrecomputations: (parameters: UpdatePrecomputations, options?: RequestOptions): Promise<void> =>
        jqlFunctionsApps.updatePrecomputations(client, parameters, options),
      getPrecomputationsByID: (
        parameters: GetPrecomputationsByID,
        options?: RequestOptions,
      ): Promise<JqlFunctionPrecomputationGetByIdResponse> =>
        jqlFunctionsApps.getPrecomputationsByID(client, parameters, options),
    },
    labels: {
      getAllLabels: (parameters?: GetAllLabels, options?: RequestOptions): Promise<PageString> =>
        labels.getAllLabels(client, parameters, options),
    },
    permissions: {
      getMyPermissions: (parameters?: GetMyPermissions, options?: RequestOptions): Promise<Permissions> =>
        permissions.getMyPermissions(client, parameters, options),
      getAllPermissions: (options?: RequestOptions): Promise<Permissions> =>
        permissions.getAllPermissions(client, options),
      getBulkPermissions: (parameters: GetBulkPermissions, options?: RequestOptions): Promise<BulkPermissionGrants> =>
        permissions.getBulkPermissions(client, parameters, options),
      getPermittedProjects: (parameters: GetPermittedProjects, options?: RequestOptions): Promise<PermittedProjects> =>
        permissions.getPermittedProjects(client, parameters, options),
    },
    myself: {
      getPreference: (parameters: GetPreference, options?: RequestOptions): Promise<string> =>
        myself.getPreference(client, parameters, options),
      setPreference: (parameters: SetPreference, options?: RequestOptions): Promise<void> =>
        myself.setPreference(client, parameters, options),
      removePreference: (parameters: RemovePreference, options?: RequestOptions): Promise<void> =>
        myself.removePreference(client, parameters, options),
      getLocale: (options?: RequestOptions): Promise<Locale> => myself.getLocale(client, options),
      getCurrentUser: (parameters?: GetCurrentUser, options?: RequestOptions): Promise<DashboardUser> =>
        myself.getCurrentUser(client, parameters, options),
    },
    issueNotificationSchemes: {
      getNotificationSchemes: (
        parameters?: GetNotificationSchemes,
        options?: RequestOptions,
      ): Promise<Page<NotificationScheme>> =>
        issueNotificationSchemes.getNotificationSchemes(client, parameters, options),
      getNotificationSchemeToProjectMappings: (
        parameters?: GetNotificationSchemeToProjectMappings,
        options?: RequestOptions,
      ): Promise<Page<NotificationSchemeAndProjectMapping>> =>
        issueNotificationSchemes.getNotificationSchemeToProjectMappings(client, parameters, options),
      getNotificationScheme: (
        parameters: GetNotificationScheme,
        options?: RequestOptions,
      ): Promise<NotificationScheme> => issueNotificationSchemes.getNotificationScheme(client, parameters, options),
      addNotifications: (parameters: AddNotifications, options?: RequestOptions): Promise<void> =>
        issueNotificationSchemes.addNotifications(client, parameters, options),
      removeNotificationFromNotificationScheme: (
        parameters: RemoveNotificationFromNotificationScheme,
        options?: RequestOptions,
      ): Promise<void> =>
        issueNotificationSchemes.removeNotificationFromNotificationScheme(client, parameters, options),
    },
    permissionSchemes: {
      getAllPermissionSchemes: (
        parameters?: GetAllPermissionSchemes,
        options?: RequestOptions,
      ): Promise<PermissionSchemes> => permissionSchemes.getAllPermissionSchemes(client, parameters, options),
      createPermissionScheme: (
        parameters: CreatePermissionScheme,
        options?: RequestOptions,
      ): Promise<PermissionScheme> => permissionSchemes.createPermissionScheme(client, parameters, options),
      getPermissionScheme: (parameters: GetPermissionScheme, options?: RequestOptions): Promise<PermissionScheme> =>
        permissionSchemes.getPermissionScheme(client, parameters, options),
      updatePermissionScheme: (
        parameters: UpdatePermissionScheme,
        options?: RequestOptions,
      ): Promise<PermissionScheme> => permissionSchemes.updatePermissionScheme(client, parameters, options),
      deletePermissionScheme: (parameters: DeletePermissionScheme, options?: RequestOptions): Promise<void> =>
        permissionSchemes.deletePermissionScheme(client, parameters, options),
      getPermissionSchemeGrants: (
        parameters: GetPermissionSchemeGrants,
        options?: RequestOptions,
      ): Promise<PermissionGrants> => permissionSchemes.getPermissionSchemeGrants(client, parameters, options),
      createPermissionGrant: (parameters: CreatePermissionGrant, options?: RequestOptions): Promise<PermissionGrant> =>
        permissionSchemes.createPermissionGrant(client, parameters, options),
      getPermissionSchemeGrant: (
        parameters: GetPermissionSchemeGrant,
        options?: RequestOptions,
      ): Promise<PermissionGrant> => permissionSchemes.getPermissionSchemeGrant(client, parameters, options),
      deletePermissionSchemeEntity: (
        parameters: DeletePermissionSchemeEntity,
        options?: RequestOptions,
      ): Promise<void> => permissionSchemes.deletePermissionSchemeEntity(client, parameters, options),
    },
    issuePriorities: {
      createPriority: (parameters: CreatePriority, options?: RequestOptions): Promise<PriorityId> =>
        issuePriorities.createPriority(client, parameters, options),
      setDefaultPriority: (parameters: SetDefaultPriority, options?: RequestOptions): Promise<void> =>
        issuePriorities.setDefaultPriority(client, parameters, options),
      movePriorities: (parameters: MovePriorities, options?: RequestOptions): Promise<void> =>
        issuePriorities.movePriorities(client, parameters, options),
      searchPriorities: (parameters?: SearchPriorities, options?: RequestOptions): Promise<Page<Priority>> =>
        issuePriorities.searchPriorities(client, parameters, options),
      getPriority: (parameters: GetPriority, options?: RequestOptions): Promise<Priority> =>
        issuePriorities.getPriority(client, parameters, options),
      updatePriority: (parameters: UpdatePriority, options?: RequestOptions): Promise<void> =>
        issuePriorities.updatePriority(client, parameters, options),
      deletePriority: (parameters: DeletePriority, options?: RequestOptions): Promise<TaskProgressObject> =>
        issuePriorities.deletePriority(client, parameters, options),
    },
    projects: {
      createProject: (parameters: CreateProject, options?: RequestOptions): Promise<ProjectIdentifiers> =>
        projects.createProject(client, parameters, options),
      searchProjects: (parameters?: SearchProjects, options?: RequestOptions): Promise<Page<Project>> =>
        projects.searchProjects(client, parameters, options),
      getProject: (parameters: GetProject, options?: RequestOptions): Promise<Project> =>
        projects.getProject(client, parameters, options),
      updateProject: (parameters: UpdateProject, options?: RequestOptions): Promise<Project> =>
        projects.updateProject(client, parameters, options),
      deleteProject: (parameters: DeleteProject, options?: RequestOptions): Promise<void> =>
        projects.deleteProject(client, parameters, options),
      archiveProject: (parameters: ArchiveProject, options?: RequestOptions): Promise<void> =>
        projects.archiveProject(client, parameters, options),
      getAllStatuses: (parameters: GetAllStatuses, options?: RequestOptions): Promise<IssueTypeWithStatus[]> =>
        projects.getAllStatuses(client, parameters, options),
      getHierarchy: (parameters: GetHierarchy, options?: RequestOptions): Promise<ProjectIssueTypeHierarchy> =>
        projects.getHierarchy(client, parameters, options),
      getNotificationSchemeForProject: (
        parameters: GetNotificationSchemeForProject,
        options?: RequestOptions,
      ): Promise<NotificationScheme> => projects.getNotificationSchemeForProject(client, parameters, options),
    },
    projectTemplates: {
      createProjectWithCustomTemplate: (
        parameters: CreateProjectWithCustomTemplate,
        options?: RequestOptions,
      ): Promise<void> => projectTemplates.createProjectWithCustomTemplate(client, parameters, options),
    },
    projectTypes: {
      getAllProjectTypes: (options?: RequestOptions): Promise<ProjectType[]> =>
        projectTypes.getAllProjectTypes(client, options),
      getAllAccessibleProjectTypes: (options?: RequestOptions): Promise<ProjectType[]> =>
        projectTypes.getAllAccessibleProjectTypes(client, options),
      getProjectTypeByKey: (parameters: GetProjectTypeByKey, options?: RequestOptions): Promise<ProjectType> =>
        projectTypes.getProjectTypeByKey(client, parameters, options),
      getAccessibleProjectTypeByKey: (
        parameters: GetAccessibleProjectTypeByKey,
        options?: RequestOptions,
      ): Promise<ProjectType> => projectTypes.getAccessibleProjectTypeByKey(client, parameters, options),
    },
    projectAvatars: {
      updateProjectAvatar: (parameters: UpdateProjectAvatar, options?: RequestOptions): Promise<void> =>
        projectAvatars.updateProjectAvatar(client, parameters, options),
      deleteProjectAvatar: (parameters: DeleteProjectAvatar, options?: RequestOptions): Promise<void> =>
        projectAvatars.deleteProjectAvatar(client, parameters, options),
      createProjectAvatar: (parameters: CreateProjectAvatar, options?: RequestOptions): Promise<Avatar> =>
        projectAvatars.createProjectAvatar(client, parameters, options),
      getAllProjectAvatars: (parameters: GetAllProjectAvatars, options?: RequestOptions): Promise<ProjectAvatars> =>
        projectAvatars.getAllProjectAvatars(client, parameters, options),
    },
    projectFeatures: {
      getFeaturesForProject: (
        parameters: GetFeaturesForProject,
        options?: RequestOptions,
      ): Promise<ContainerForProjectFeatures> => projectFeatures.getFeaturesForProject(client, parameters, options),
      toggleFeatureForProject: (
        parameters: ToggleFeatureForProject,
        options?: RequestOptions,
      ): Promise<ContainerForProjectFeatures> => projectFeatures.toggleFeatureForProject(client, parameters, options),
    },
    projectProperties: {
      getProjectPropertyKeys: (parameters: GetProjectPropertyKeys, options?: RequestOptions): Promise<PropertyKeys> =>
        projectProperties.getProjectPropertyKeys(client, parameters, options),
      getProjectProperty: (parameters: GetProjectProperty, options?: RequestOptions): Promise<EntityProperty> =>
        projectProperties.getProjectProperty(client, parameters, options),
      setProjectProperty: (parameters: SetProjectProperty, options?: RequestOptions): Promise<void> =>
        projectProperties.setProjectProperty(client, parameters, options),
      deleteProjectProperty: (parameters: DeleteProjectProperty, options?: RequestOptions): Promise<void> =>
        projectProperties.deleteProjectProperty(client, parameters, options),
    },
    projectRoles: {
      getProjectRoles: (parameters: GetProjectRoles, options?: RequestOptions): Promise<GetProjectRolesModel> =>
        projectRoles.getProjectRoles(client, parameters, options),
      getProjectRole: (parameters: GetProjectRole, options?: RequestOptions): Promise<ProjectRole> =>
        projectRoles.getProjectRole(client, parameters, options),
      getProjectRoleDetails: (
        parameters: GetProjectRoleDetails,
        options?: RequestOptions,
      ): Promise<ProjectRoleDetails[]> => projectRoles.getProjectRoleDetails(client, parameters, options),
      getAllProjectRoles: (options?: RequestOptions): Promise<ProjectRole[]> =>
        projectRoles.getAllProjectRoles(client, options),
      createProjectRole: (parameters: CreateProjectRole, options?: RequestOptions): Promise<ProjectRole> =>
        projectRoles.createProjectRole(client, parameters, options),
      getProjectRoleById: (parameters: GetProjectRoleById, options?: RequestOptions): Promise<ProjectRole> =>
        projectRoles.getProjectRoleById(client, parameters, options),
      partialUpdateProjectRole: (
        parameters: PartialUpdateProjectRole,
        options?: RequestOptions,
      ): Promise<ProjectRole> => projectRoles.partialUpdateProjectRole(client, parameters, options),
      fullyUpdateProjectRole: (parameters: FullyUpdateProjectRole, options?: RequestOptions): Promise<ProjectRole> =>
        projectRoles.fullyUpdateProjectRole(client, parameters, options),
      deleteProjectRole: (parameters: DeleteProjectRole, options?: RequestOptions): Promise<void> =>
        projectRoles.deleteProjectRole(client, parameters, options),
    },
    projectRoleActors: {
      addActorUsers: (parameters: AddActorUsers, options?: RequestOptions): Promise<ProjectRole> =>
        projectRoleActors.addActorUsers(client, parameters, options),
      setActors: (parameters: SetActors, options?: RequestOptions): Promise<ProjectRole> =>
        projectRoleActors.setActors(client, parameters, options),
      deleteActor: (parameters: DeleteActor, options?: RequestOptions): Promise<void> =>
        projectRoleActors.deleteActor(client, parameters, options),
      getProjectRoleActorsForRole: (
        parameters: GetProjectRoleActorsForRole,
        options?: RequestOptions,
      ): Promise<ProjectRole> => projectRoleActors.getProjectRoleActorsForRole(client, parameters, options),
      addProjectRoleActorsToRole: (
        parameters: AddProjectRoleActorsToRole,
        options?: RequestOptions,
      ): Promise<ProjectRole> => projectRoleActors.addProjectRoleActorsToRole(client, parameters, options),
      deleteProjectRoleActorsFromRole: (
        parameters: DeleteProjectRoleActorsFromRole,
        options?: RequestOptions,
      ): Promise<ProjectRole> => projectRoleActors.deleteProjectRoleActorsFromRole(client, parameters, options),
    },
    projectVersions: {
      getProjectVersionsPaginated: (
        parameters: GetProjectVersionsPaginated,
        options?: RequestOptions,
      ): Promise<Page<Version>> => projectVersions.getProjectVersionsPaginated(client, parameters, options),
      getProjectVersions: (parameters: GetProjectVersions, options?: RequestOptions): Promise<Version[]> =>
        projectVersions.getProjectVersions(client, parameters, options),
      createVersion: (parameters: CreateVersion, options?: RequestOptions): Promise<Version> =>
        projectVersions.createVersion(client, parameters, options),
      getVersion: (parameters: GetVersion, options?: RequestOptions): Promise<Version> =>
        projectVersions.getVersion(client, parameters, options),
      updateVersion: (parameters: UpdateVersion, options?: RequestOptions): Promise<Version> =>
        projectVersions.updateVersion(client, parameters, options),
      mergeVersions: (parameters: MergeVersions, options?: RequestOptions): Promise<void> =>
        projectVersions.mergeVersions(client, parameters, options),
      moveVersion: (parameters: MoveVersion, options?: RequestOptions): Promise<Version> =>
        projectVersions.moveVersion(client, parameters, options),
      getVersionRelatedIssues: (
        parameters: GetVersionRelatedIssues,
        options?: RequestOptions,
      ): Promise<VersionIssueCounts> => projectVersions.getVersionRelatedIssues(client, parameters, options),
      getRelatedWork: (parameters: GetRelatedWork, options?: RequestOptions): Promise<VersionRelatedWork[]> =>
        projectVersions.getRelatedWork(client, parameters, options),
      createRelatedWork: (parameters: CreateRelatedWork, options?: RequestOptions): Promise<VersionRelatedWork> =>
        projectVersions.createRelatedWork(client, parameters, options),
      updateRelatedWork: (parameters: UpdateRelatedWork, options?: RequestOptions): Promise<VersionRelatedWork> =>
        projectVersions.updateRelatedWork(client, parameters, options),
      deleteAndReplaceVersion: (parameters: DeleteAndReplaceVersion, options?: RequestOptions): Promise<void> =>
        projectVersions.deleteAndReplaceVersion(client, parameters, options),
      getVersionUnresolvedIssues: (
        parameters: GetVersionUnresolvedIssues,
        options?: RequestOptions,
      ): Promise<VersionUnresolvedIssuesCount> =>
        projectVersions.getVersionUnresolvedIssues(client, parameters, options),
      deleteRelatedWork: (parameters: DeleteRelatedWork, options?: RequestOptions): Promise<void> =>
        projectVersions.deleteRelatedWork(client, parameters, options),
    },
    projectEmail: {
      getProjectEmail: (parameters: GetProjectEmail, options?: RequestOptions): Promise<ProjectEmailAddress> =>
        projectEmail.getProjectEmail(client, parameters, options),
      updateProjectEmail: (parameters: UpdateProjectEmail, options?: RequestOptions): Promise<void> =>
        projectEmail.updateProjectEmail(client, parameters, options),
    },
    projectPermissionSchemes: {
      getProjectIssueSecurityScheme: (
        parameters: GetProjectIssueSecurityScheme,
        options?: RequestOptions,
      ): Promise<SecurityScheme> => projectPermissionSchemes.getProjectIssueSecurityScheme(client, parameters, options),
      getAssignedPermissionScheme: (
        parameters: GetAssignedPermissionScheme,
        options?: RequestOptions,
      ): Promise<PermissionScheme> => projectPermissionSchemes.getAssignedPermissionScheme(client, parameters, options),
      assignPermissionScheme: (
        parameters: AssignPermissionScheme,
        options?: RequestOptions,
      ): Promise<PermissionScheme> => projectPermissionSchemes.assignPermissionScheme(client, parameters, options),
      getSecurityLevelsForProject: (
        parameters: GetSecurityLevelsForProject,
        options?: RequestOptions,
      ): Promise<ProjectIssueSecurityLevels> =>
        projectPermissionSchemes.getSecurityLevelsForProject(client, parameters, options),
    },
    projectCategories: {
      getAllProjectCategories: (options?: RequestOptions): Promise<ProjectCategory[]> =>
        projectCategories.getAllProjectCategories(client, options),
      createProjectCategory: (parameters: CreateProjectCategory, options?: RequestOptions): Promise<ProjectCategory> =>
        projectCategories.createProjectCategory(client, parameters, options),
      getProjectCategoryById: (
        parameters: GetProjectCategoryById,
        options?: RequestOptions,
      ): Promise<ProjectCategory> => projectCategories.getProjectCategoryById(client, parameters, options),
      updateProjectCategory: (
        parameters: UpdateProjectCategory,
        options?: RequestOptions,
      ): Promise<UpdatedProjectCategory> => projectCategories.updateProjectCategory(client, parameters, options),
      removeProjectCategory: (parameters: RemoveProjectCategory, options?: RequestOptions): Promise<void> =>
        projectCategories.removeProjectCategory(client, parameters, options),
    },
    projectKeyAndNameValidation: {
      validateProjectKey: (parameters?: ValidateProjectKey, options?: RequestOptions): Promise<ErrorCollection> =>
        projectKeyAndNameValidation.validateProjectKey(client, parameters, options),
      getValidProjectKey: (parameters?: GetValidProjectKey, options?: RequestOptions): Promise<string> =>
        projectKeyAndNameValidation.getValidProjectKey(client, parameters, options),
      getValidProjectName: (parameters: GetValidProjectName, options?: RequestOptions): Promise<string> =>
        projectKeyAndNameValidation.getValidProjectName(client, parameters, options),
    },
    issueRedaction: {
      redact: (parameters: Redact, options?: RequestOptions): Promise<string> =>
        issueRedaction.redact(client, parameters, options),
      getRedactionStatus: (
        parameters: GetRedactionStatus,
        options?: RequestOptions,
      ): Promise<RedactionJobStatusResponse> => issueRedaction.getRedactionStatus(client, parameters, options),
    },
    issueResolutions: {
      getResolution: (parameters: GetResolution, options?: RequestOptions): Promise<Resolution> =>
        issueResolutions.getResolution(client, parameters, options),
    },
    screenTabs: {
      getAllScreenTabs: (parameters: GetAllScreenTabs, options?: RequestOptions): Promise<ScreenableTab[]> =>
        screenTabs.getAllScreenTabs(client, parameters, options),
      addScreenTab: (parameters: AddScreenTab, options?: RequestOptions): Promise<ScreenableTab> =>
        screenTabs.addScreenTab(client, parameters, options),
      renameScreenTab: (parameters: RenameScreenTab, options?: RequestOptions): Promise<ScreenableTab> =>
        screenTabs.renameScreenTab(client, parameters, options),
      deleteScreenTab: (parameters: DeleteScreenTab, options?: RequestOptions): Promise<void> =>
        screenTabs.deleteScreenTab(client, parameters, options),
      moveScreenTab: (parameters: MoveScreenTab, options?: RequestOptions): Promise<void> =>
        screenTabs.moveScreenTab(client, parameters, options),
    },
    screenTabFields: {
      getAllScreenTabFields: (
        parameters: GetAllScreenTabFields,
        options?: RequestOptions,
      ): Promise<ScreenableField[]> => screenTabFields.getAllScreenTabFields(client, parameters, options),
      addScreenTabField: (parameters: AddScreenTabField, options?: RequestOptions): Promise<ScreenableField> =>
        screenTabFields.addScreenTabField(client, parameters, options),
      removeScreenTabField: (parameters: RemoveScreenTabField, options?: RequestOptions): Promise<void> =>
        screenTabFields.removeScreenTabField(client, parameters, options),
      moveScreenTabField: (parameters: MoveScreenTabField, options?: RequestOptions): Promise<void> =>
        screenTabFields.moveScreenTabField(client, parameters, options),
    },
    screenSchemes: {
      getScreenSchemes: (parameters?: GetScreenSchemes, options?: RequestOptions): Promise<Page<ScreenScheme>> =>
        screenSchemes.getScreenSchemes(client, parameters, options),
      createScreenScheme: (parameters: CreateScreenScheme, options?: RequestOptions): Promise<ScreenSchemeId> =>
        screenSchemes.createScreenScheme(client, parameters, options),
      updateScreenScheme: (parameters: UpdateScreenScheme, options?: RequestOptions): Promise<void> =>
        screenSchemes.updateScreenScheme(client, parameters, options),
      deleteScreenScheme: (parameters: DeleteScreenScheme, options?: RequestOptions): Promise<void> =>
        screenSchemes.deleteScreenScheme(client, parameters, options),
    },
    serverInfo: {
      getServerInfo: (options?: RequestOptions): Promise<ServerInformation> =>
        serverInfo.getServerInfo(client, options),
    },
    issueNavigatorSettings: {
      getIssueNavigatorDefaultColumns: (options?: RequestOptions): Promise<ColumnItem[]> =>
        issueNavigatorSettings.getIssueNavigatorDefaultColumns(client, options),
      setIssueNavigatorDefaultColumns: (
        parameters: SetIssueNavigatorDefaultColumns,
        options?: RequestOptions,
      ): Promise<void> => issueNavigatorSettings.setIssueNavigatorDefaultColumns(client, parameters, options),
    },
    workflowStatuses: {
      getStatuses: (options?: RequestOptions): Promise<StatusDetails[]> =>
        workflowStatuses.getStatuses(client, options),
      getStatus: (parameters: GetStatus, options?: RequestOptions): Promise<StatusDetails> =>
        workflowStatuses.getStatus(client, parameters, options),
    },
    workflowStatusCategories: {
      getStatusCategories: (options?: RequestOptions): Promise<StatusCategory[]> =>
        workflowStatusCategories.getStatusCategories(client, options),
      getStatusCategory: (parameters: GetStatusCategory, options?: RequestOptions): Promise<StatusCategory> =>
        workflowStatusCategories.getStatusCategory(client, parameters, options),
    },
    status: {
      getStatusesById: (parameters: GetStatusesById, options?: RequestOptions): Promise<JiraStatus[]> =>
        status.getStatusesById(client, parameters, options),
      createStatuses: (parameters: CreateStatuses, options?: RequestOptions): Promise<JiraStatus[]> =>
        status.createStatuses(client, parameters, options),
      updateStatuses: (parameters: UpdateStatuses, options?: RequestOptions): Promise<void> =>
        status.updateStatuses(client, parameters, options),
      deleteStatusesById: (parameters: DeleteStatusesById, options?: RequestOptions): Promise<void> =>
        status.deleteStatusesById(client, parameters, options),
      getStatusesByName: (parameters: GetStatusesByName, options?: RequestOptions): Promise<JiraStatus[]> =>
        status.getStatusesByName(client, parameters, options),
      search: (parameters?: Search, options?: RequestOptions): Promise<PageOfStatuses> =>
        status.search(client, parameters, options),
      getProjectIssueTypeUsagesForStatus: (
        parameters: GetProjectIssueTypeUsagesForStatus,
        options?: RequestOptions,
      ): Promise<StatusProjectIssueTypeUsageDTO> =>
        status.getProjectIssueTypeUsagesForStatus(client, parameters, options),
      getProjectUsagesForStatus: (
        parameters: GetProjectUsagesForStatus,
        options?: RequestOptions,
      ): Promise<StatusProjectUsageDTO> => status.getProjectUsagesForStatus(client, parameters, options),
      getWorkflowUsagesForStatus: (
        parameters: GetWorkflowUsagesForStatus,
        options?: RequestOptions,
      ): Promise<StatusWorkflowUsageDTO> => status.getWorkflowUsagesForStatus(client, parameters, options),
    },
    tasks: {
      getTask: (parameters: GetTask, options?: RequestOptions): Promise<TaskProgressObject> =>
        tasks.getTask(client, parameters, options),
    },
    uiModificationsApps: {
      getUiModifications: (
        parameters?: GetUiModifications,
        options?: RequestOptions,
      ): Promise<Page<UiModificationDetails>> => uiModificationsApps.getUiModifications(client, parameters, options),
      createUiModification: (
        parameters: CreateUiModification,
        options?: RequestOptions,
      ): Promise<UiModificationIdentifiers> => uiModificationsApps.createUiModification(client, parameters, options),
      updateUiModification: (parameters: UpdateUiModification, options?: RequestOptions): Promise<void> =>
        uiModificationsApps.updateUiModification(client, parameters, options),
      deleteUiModification: (parameters: DeleteUiModification, options?: RequestOptions): Promise<void> =>
        uiModificationsApps.deleteUiModification(client, parameters, options),
    },
    users: {
      getUser: (parameters?: GetUser, options?: RequestOptions): Promise<DashboardUser> =>
        users.getUser(client, parameters, options),
      createUser: (parameters: CreateUser, options?: RequestOptions): Promise<DashboardUser> =>
        users.createUser(client, parameters, options),
      removeUser: (parameters: RemoveUser, options?: RequestOptions): Promise<void> =>
        users.removeUser(client, parameters, options),
      getUserDefaultColumns: (parameters?: GetUserDefaultColumns, options?: RequestOptions): Promise<ColumnItem[]> =>
        users.getUserDefaultColumns(client, parameters, options),
      setUserColumns: (parameters: SetUserColumns, options?: RequestOptions): Promise<void> =>
        users.setUserColumns(client, parameters, options),
      resetUserColumns: (parameters: ResetUserColumns, options?: RequestOptions): Promise<void> =>
        users.resetUserColumns(client, parameters, options),
      getUserEmail: (parameters: GetUserEmail, options?: RequestOptions): Promise<UnrestrictedUserEmail> =>
        users.getUserEmail(client, parameters, options),
      getUserEmailBulk: (parameters: GetUserEmailBulk, options?: RequestOptions): Promise<UnrestrictedUserEmail> =>
        users.getUserEmailBulk(client, parameters, options),
      getUserGroups: (parameters: GetUserGroups, options?: RequestOptions): Promise<GroupName[]> =>
        users.getUserGroups(client, parameters, options),
      getAllUsersDefault: (parameters?: GetAllUsersDefault, options?: RequestOptions): Promise<DashboardUser[]> =>
        users.getAllUsersDefault(client, parameters, options),
      getAllUsers: (parameters?: GetAllUsers, options?: RequestOptions): Promise<DashboardUser[]> =>
        users.getAllUsers(client, parameters, options),
    },
    userSearch: {
      findBulkAssignableUsers: (
        parameters: FindBulkAssignableUsers,
        options?: RequestOptions,
      ): Promise<DashboardUser[]> => userSearch.findBulkAssignableUsers(client, parameters, options),
      findAssignableUsers: (parameters?: FindAssignableUsers, options?: RequestOptions): Promise<DashboardUser[]> =>
        userSearch.findAssignableUsers(client, parameters, options),
      findUsersWithAllPermissions: (
        parameters: FindUsersWithAllPermissions,
        options?: RequestOptions,
      ): Promise<DashboardUser[]> => userSearch.findUsersWithAllPermissions(client, parameters, options),
      findUsersForPicker: (parameters: FindUsersForPicker, options?: RequestOptions): Promise<FoundUsers> =>
        userSearch.findUsersForPicker(client, parameters, options),
      findUsers: (parameters?: FindUsers, options?: RequestOptions): Promise<DashboardUser[]> =>
        userSearch.findUsers(client, parameters, options),
      findUsersByQuery: (parameters: FindUsersByQuery, options?: RequestOptions): Promise<Page<DashboardUser>> =>
        userSearch.findUsersByQuery(client, parameters, options),
      findUserKeysByQuery: (parameters: FindUserKeysByQuery, options?: RequestOptions): Promise<Page<UserKey>> =>
        userSearch.findUserKeysByQuery(client, parameters, options),
      findUsersWithBrowsePermission: (
        parameters?: FindUsersWithBrowsePermission,
        options?: RequestOptions,
      ): Promise<DashboardUser[]> => userSearch.findUsersWithBrowsePermission(client, parameters, options),
    },
    userProperties: {
      getUserPropertyKeys: (parameters?: GetUserPropertyKeys, options?: RequestOptions): Promise<PropertyKeys> =>
        userProperties.getUserPropertyKeys(client, parameters, options),
      getUserProperty: (parameters: GetUserProperty, options?: RequestOptions): Promise<EntityProperty> =>
        userProperties.getUserProperty(client, parameters, options),
      setUserProperty: (parameters: SetUserProperty, options?: RequestOptions): Promise<void> =>
        userProperties.setUserProperty(client, parameters, options),
      deleteUserProperty: (parameters: DeleteUserProperty, options?: RequestOptions): Promise<void> =>
        userProperties.deleteUserProperty(client, parameters, options),
    },
    webhooks: {
      getDynamicWebhooksForApp: (
        parameters?: GetDynamicWebhooksForApp,
        options?: RequestOptions,
      ): Promise<Page<Webhook>> => webhooks.getDynamicWebhooksForApp(client, parameters, options),
      registerDynamicWebhooks: (
        parameters: RegisterDynamicWebhooks,
        options?: RequestOptions,
      ): Promise<ContainerForRegisteredWebhooks> => webhooks.registerDynamicWebhooks(client, parameters, options),
      deleteWebhookById: (parameters: DeleteWebhookById, options?: RequestOptions): Promise<void> =>
        webhooks.deleteWebhookById(client, parameters, options),
      refreshWebhooks: (parameters: RefreshWebhooks, options?: RequestOptions): Promise<WebhooksExpirationDate> =>
        webhooks.refreshWebhooks(client, parameters, options),
    },
    workflows: {
      readWorkflowFromHistory: (
        parameters: ReadWorkflowFromHistory,
        options?: RequestOptions,
      ): Promise<WorkflowHistoryReadResponseDTO> => workflows.readWorkflowFromHistory(client, parameters, options),
      listWorkflowHistory: (
        parameters: ListWorkflowHistory,
        options?: RequestOptions,
      ): Promise<WorkflowHistoryListResponseDTO> => workflows.listWorkflowHistory(client, parameters, options),
      deleteInactiveWorkflow: (parameters: DeleteInactiveWorkflow, options?: RequestOptions): Promise<void> =>
        workflows.deleteInactiveWorkflow(client, parameters, options),
      getWorkflowProjectIssueTypeUsages: (
        parameters: GetWorkflowProjectIssueTypeUsages,
        options?: RequestOptions,
      ): Promise<WorkflowProjectIssueTypeUsageDTO> =>
        workflows.getWorkflowProjectIssueTypeUsages(client, parameters, options),
      getProjectUsagesForWorkflow: (
        parameters: GetProjectUsagesForWorkflow,
        options?: RequestOptions,
      ): Promise<WorkflowProjectUsageDTO> => workflows.getProjectUsagesForWorkflow(client, parameters, options),
      getWorkflowSchemeUsagesForWorkflow: (
        parameters: GetWorkflowSchemeUsagesForWorkflow,
        options?: RequestOptions,
      ): Promise<WorkflowSchemeUsageDTO> => workflows.getWorkflowSchemeUsagesForWorkflow(client, parameters, options),
      readWorkflows: (parameters: ReadWorkflows, options?: RequestOptions): Promise<WorkflowReadResponse> =>
        workflows.readWorkflows(client, parameters, options),
      workflowCapabilities: (
        parameters?: WorkflowCapabilities,
        options?: RequestOptions,
      ): Promise<WorkflowCapabilitiesModel> => workflows.workflowCapabilities(client, parameters, options),
      createWorkflows: (parameters: CreateWorkflows, options?: RequestOptions): Promise<WorkflowCreateResponse> =>
        workflows.createWorkflows(client, parameters, options),
      validateCreateWorkflows: (
        parameters: ValidateCreateWorkflows,
        options?: RequestOptions,
      ): Promise<WorkflowValidationErrorList> => workflows.validateCreateWorkflows(client, parameters, options),
      getDefaultEditor: (options?: RequestOptions): Promise<DefaultWorkflowEditorResponse> =>
        workflows.getDefaultEditor(client, options),
      readWorkflowPreviews: (
        parameters: ReadWorkflowPreviews,
        options?: RequestOptions,
      ): Promise<WorkflowPreviewResponse> => workflows.readWorkflowPreviews(client, parameters, options),
      searchWorkflows: (parameters?: SearchWorkflows, options?: RequestOptions): Promise<WorkflowSearchResponse> =>
        workflows.searchWorkflows(client, parameters, options),
      updateWorkflows: (parameters: UpdateWorkflows, options?: RequestOptions): Promise<WorkflowUpdateResponse> =>
        workflows.updateWorkflows(client, parameters, options),
      validateUpdateWorkflows: (
        parameters: ValidateUpdateWorkflows,
        options?: RequestOptions,
      ): Promise<WorkflowValidationErrorList> => workflows.validateUpdateWorkflows(client, parameters, options),
    },
    workflowTransitionRules: {
      getWorkflowTransitionRuleConfigurations: (
        parameters: GetWorkflowTransitionRuleConfigurations,
        options?: RequestOptions,
      ): Promise<Page<WorkflowTransitionRules>> =>
        workflowTransitionRules.getWorkflowTransitionRuleConfigurations(client, parameters, options),
      updateWorkflowTransitionRuleConfigurations: (
        parameters: UpdateWorkflowTransitionRuleConfigurations,
        options?: RequestOptions,
      ): Promise<WorkflowTransitionRulesUpdateErrors> =>
        workflowTransitionRules.updateWorkflowTransitionRuleConfigurations(client, parameters, options),
      deleteWorkflowTransitionRuleConfigurations: (
        parameters: DeleteWorkflowTransitionRuleConfigurations,
        options?: RequestOptions,
      ): Promise<WorkflowTransitionRulesUpdateErrors> =>
        workflowTransitionRules.deleteWorkflowTransitionRuleConfigurations(client, parameters, options),
    },
    workflowSchemes: {
      getAllWorkflowSchemes: (
        parameters?: GetAllWorkflowSchemes,
        options?: RequestOptions,
      ): Promise<Page<WorkflowScheme>> => workflowSchemes.getAllWorkflowSchemes(client, parameters, options),
      createWorkflowScheme: (parameters: CreateWorkflowScheme, options?: RequestOptions): Promise<WorkflowScheme> =>
        workflowSchemes.createWorkflowScheme(client, parameters, options),
      readWorkflowSchemes: (
        parameters: ReadWorkflowSchemes,
        options?: RequestOptions,
      ): Promise<WorkflowSchemeReadResponse[]> => workflowSchemes.readWorkflowSchemes(client, parameters, options),
      updateSchemes: (parameters: UpdateSchemes, options?: RequestOptions): Promise<TaskProgressObject> =>
        workflowSchemes.updateSchemes(client, parameters, options),
      getRequiredWorkflowSchemeMappings: (
        parameters: GetRequiredWorkflowSchemeMappings,
        options?: RequestOptions,
      ): Promise<WorkflowSchemeUpdateRequiredMappingsResponse> =>
        workflowSchemes.getRequiredWorkflowSchemeMappings(client, parameters, options),
      getWorkflowScheme: (parameters: GetWorkflowScheme, options?: RequestOptions): Promise<WorkflowScheme> =>
        workflowSchemes.getWorkflowScheme(client, parameters, options),
      updateWorkflowScheme: (parameters: UpdateWorkflowScheme, options?: RequestOptions): Promise<WorkflowScheme> =>
        workflowSchemes.updateWorkflowScheme(client, parameters, options),
      deleteWorkflowScheme: (parameters: DeleteWorkflowScheme, options?: RequestOptions): Promise<void> =>
        workflowSchemes.deleteWorkflowScheme(client, parameters, options),
      getDefaultWorkflow: (parameters: GetDefaultWorkflow, options?: RequestOptions): Promise<DefaultWorkflow> =>
        workflowSchemes.getDefaultWorkflow(client, parameters, options),
      updateDefaultWorkflow: (parameters: UpdateDefaultWorkflow, options?: RequestOptions): Promise<WorkflowScheme> =>
        workflowSchemes.updateDefaultWorkflow(client, parameters, options),
      deleteDefaultWorkflow: (parameters: DeleteDefaultWorkflow, options?: RequestOptions): Promise<WorkflowScheme> =>
        workflowSchemes.deleteDefaultWorkflow(client, parameters, options),
      getWorkflowSchemeIssueType: (
        parameters: GetWorkflowSchemeIssueType,
        options?: RequestOptions,
      ): Promise<IssueTypeWorkflowMapping> => workflowSchemes.getWorkflowSchemeIssueType(client, parameters, options),
      setWorkflowSchemeIssueType: (
        parameters: SetWorkflowSchemeIssueType,
        options?: RequestOptions,
      ): Promise<WorkflowScheme> => workflowSchemes.setWorkflowSchemeIssueType(client, parameters, options),
      deleteWorkflowSchemeIssueType: (
        parameters: DeleteWorkflowSchemeIssueType,
        options?: RequestOptions,
      ): Promise<WorkflowScheme> => workflowSchemes.deleteWorkflowSchemeIssueType(client, parameters, options),
      getWorkflow: (parameters: GetWorkflow, options?: RequestOptions): Promise<IssueTypesWorkflowMapping> =>
        workflowSchemes.getWorkflow(client, parameters, options),
      updateWorkflowMapping: (parameters: UpdateWorkflowMapping, options?: RequestOptions): Promise<WorkflowScheme> =>
        workflowSchemes.updateWorkflowMapping(client, parameters, options),
      deleteWorkflowMapping: (parameters: DeleteWorkflowMapping, options?: RequestOptions): Promise<void> =>
        workflowSchemes.deleteWorkflowMapping(client, parameters, options),
      getProjectUsagesForWorkflowScheme: (
        parameters: GetProjectUsagesForWorkflowScheme,
        options?: RequestOptions,
      ): Promise<WorkflowSchemeProjectUsageDTO> =>
        workflowSchemes.getProjectUsagesForWorkflowScheme(client, parameters, options),
    },
    workflowSchemeProjectAssociations: {
      getWorkflowSchemeProjectAssociations: (
        parameters: GetWorkflowSchemeProjectAssociations,
        options?: RequestOptions,
      ): Promise<ContainerOfWorkflowSchemeAssociations> =>
        workflowSchemeProjectAssociations.getWorkflowSchemeProjectAssociations(client, parameters, options),
      assignSchemeToProject: (parameters: AssignSchemeToProject, options?: RequestOptions): Promise<void> =>
        workflowSchemeProjectAssociations.assignSchemeToProject(client, parameters, options),
    },
    workflowSchemeDrafts: {
      createWorkflowSchemeDraftFromParent: (
        parameters: CreateWorkflowSchemeDraftFromParent,
        options?: RequestOptions,
      ): Promise<WorkflowScheme> =>
        workflowSchemeDrafts.createWorkflowSchemeDraftFromParent(client, parameters, options),
      getWorkflowSchemeDraft: (parameters: GetWorkflowSchemeDraft, options?: RequestOptions): Promise<WorkflowScheme> =>
        workflowSchemeDrafts.getWorkflowSchemeDraft(client, parameters, options),
      updateWorkflowSchemeDraft: (
        parameters: UpdateWorkflowSchemeDraft,
        options?: RequestOptions,
      ): Promise<WorkflowScheme> => workflowSchemeDrafts.updateWorkflowSchemeDraft(client, parameters, options),
      deleteWorkflowSchemeDraft: (parameters: DeleteWorkflowSchemeDraft, options?: RequestOptions): Promise<void> =>
        workflowSchemeDrafts.deleteWorkflowSchemeDraft(client, parameters, options),
      getDraftDefaultWorkflow: (
        parameters: GetDraftDefaultWorkflow,
        options?: RequestOptions,
      ): Promise<DefaultWorkflow> => workflowSchemeDrafts.getDraftDefaultWorkflow(client, parameters, options),
      updateDraftDefaultWorkflow: (
        parameters: UpdateDraftDefaultWorkflow,
        options?: RequestOptions,
      ): Promise<WorkflowScheme> => workflowSchemeDrafts.updateDraftDefaultWorkflow(client, parameters, options),
      deleteDraftDefaultWorkflow: (
        parameters: DeleteDraftDefaultWorkflow,
        options?: RequestOptions,
      ): Promise<WorkflowScheme> => workflowSchemeDrafts.deleteDraftDefaultWorkflow(client, parameters, options),
      getWorkflowSchemeDraftIssueType: (
        parameters: GetWorkflowSchemeDraftIssueType,
        options?: RequestOptions,
      ): Promise<IssueTypeWorkflowMapping> =>
        workflowSchemeDrafts.getWorkflowSchemeDraftIssueType(client, parameters, options),
      setWorkflowSchemeDraftIssueType: (
        parameters: SetWorkflowSchemeDraftIssueType,
        options?: RequestOptions,
      ): Promise<WorkflowScheme> => workflowSchemeDrafts.setWorkflowSchemeDraftIssueType(client, parameters, options),
      deleteWorkflowSchemeDraftIssueType: (
        parameters: DeleteWorkflowSchemeDraftIssueType,
        options?: RequestOptions,
      ): Promise<WorkflowScheme> =>
        workflowSchemeDrafts.deleteWorkflowSchemeDraftIssueType(client, parameters, options),
      publishDraftWorkflowScheme: (parameters: PublishDraftWorkflowScheme, options?: RequestOptions): Promise<void> =>
        workflowSchemeDrafts.publishDraftWorkflowScheme(client, parameters, options),
      getDraftWorkflow: (parameters: GetDraftWorkflow, options?: RequestOptions): Promise<IssueTypesWorkflowMapping> =>
        workflowSchemeDrafts.getDraftWorkflow(client, parameters, options),
      updateDraftWorkflowMapping: (
        parameters: UpdateDraftWorkflowMapping,
        options?: RequestOptions,
      ): Promise<WorkflowScheme> => workflowSchemeDrafts.updateDraftWorkflowMapping(client, parameters, options),
      deleteDraftWorkflowMapping: (parameters: DeleteDraftWorkflowMapping, options?: RequestOptions): Promise<void> =>
        workflowSchemeDrafts.deleteDraftWorkflowMapping(client, parameters, options),
    },
    appProperties: {
      getAddonProperties: (parameters: GetAddonProperties, options?: RequestOptions): Promise<PropertyKeys> =>
        appProperties.getAddonProperties(client, parameters, options),
      getAddonProperty: (parameters: GetAddonProperty, options?: RequestOptions): Promise<EntityProperty> =>
        appProperties.getAddonProperty(client, parameters, options),
      putAddonProperty: (parameters: PutAddonProperty, options?: RequestOptions): Promise<OperationMessage> =>
        appProperties.putAddonProperty(client, parameters, options),
      deleteAddonProperty: (parameters: DeleteAddonProperty, options?: RequestOptions): Promise<void> =>
        appProperties.deleteAddonProperty(client, parameters, options),
      getForgeAppPropertyKeys: (options?: RequestOptions): Promise<GetForgeAppPropertyKeys> =>
        appProperties.getForgeAppPropertyKeys(client, options),
      getForgeAppProperty: (
        parameters: GetForgeAppProperty,
        options?: RequestOptions,
      ): Promise<GetForgeAppPropertyModel> => appProperties.getForgeAppProperty(client, parameters, options),
      putForgeAppProperty: (parameters: PutForgeAppProperty, options?: RequestOptions): Promise<OperationMessage> =>
        appProperties.putForgeAppProperty(client, parameters, options),
      deleteForgeAppProperty: (parameters: DeleteForgeAppProperty, options?: RequestOptions): Promise<void> =>
        appProperties.deleteForgeAppProperty(client, parameters, options),
    },
    dynamicModules: {
      getModules: (options?: RequestOptions): Promise<ConnectModules> => dynamicModules.getModules(client, options),
      registerModules: (parameters: RegisterModules, options?: RequestOptions): Promise<void> =>
        dynamicModules.registerModules(client, parameters, options),
      removeModules: (parameters: RemoveModules, options?: RequestOptions): Promise<void> =>
        dynamicModules.removeModules(client, parameters, options),
    },
    appMigration: {
      updateIssueFields: (parameters: UpdateIssueFields, options?: RequestOptions): Promise<void> =>
        appMigration.updateIssueFields(client, parameters, options),
      updateEntityPropertiesValue: (parameters: UpdateEntityPropertiesValue, options?: RequestOptions): Promise<void> =>
        appMigration.updateEntityPropertiesValue(client, parameters, options),
      workflowRuleSearch: (
        parameters: WorkflowRuleSearch,
        options?: RequestOptions,
      ): Promise<WorkflowRulesSearchDetails> => appMigration.workflowRuleSearch(client, parameters, options),
    },
    migrationOfConnectModulesToForge: {
      fetchMigrationTask: (parameters: FetchMigrationTask, options?: RequestOptions): Promise<TaskProgress> =>
        migrationOfConnectModulesToForge.fetchMigrationTask(client, parameters, options),
      submitTask: (parameters: SubmitTask, options?: RequestOptions): Promise<void> =>
        migrationOfConnectModulesToForge.submitTask(client, parameters, options),
    },
    api: {
      getWorklogsByIssueIdAndWorklogId: (
        parameters: GetWorklogsByIssueIdAndWorklogId,
        options?: RequestOptions,
      ): Promise<BulkWorklogKeyResponse> => api.getWorklogsByIssueIdAndWorklogId(client, parameters, options),
    },
  };
}

export type CloudClient = ReturnType<typeof createCloudClient>;
