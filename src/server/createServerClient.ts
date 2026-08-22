import { type ClientConfig, type Client, type RequestOptions, createClient, type Buffer } from '#/core';
import * as backlog from './api/backlog';
import * as board from './api/board';
import * as epic from './api/epic';
import * as issues from './api/issues';
import * as sprint from './api/sprint';
import * as applicationProperties from './api/applicationProperties';
import * as applicationRoles from './api/applicationRoles';
import * as issueAttachments from './api/issueAttachments';
import * as avatars from './api/avatars';
import * as cluster from './api/cluster';
import * as issueComments from './api/issueComments';
import * as projectComponents from './api/projectComponents';
import * as configuration from './api/configuration';
import * as issueCustomFieldOptions from './api/issueCustomFieldOptions';
import * as issueFields from './api/issueFields';
import * as dashboards from './api/dashboards';
import * as emailTemplates from './api/emailTemplates';
import * as filters from './api/filters';
import * as groups from './api/groups';
import * as groupAndUserPicker from './api/groupAndUserPicker';
import * as indexing from './api/indexing';
import * as issueLinks from './api/issueLinks';
import * as issueLinkTypes from './api/issueLinkTypes';
import * as issueSecuritySchemes from './api/issueSecuritySchemes';
import * as issueTypes from './api/issueTypes';
import * as issueTypeSchemes from './api/issueTypeSchemes';
import * as jql from './api/jql';
import * as licenseValidator from './api/licenseValidator';
import * as monitoring from './api/monitoring';
import * as permissions from './api/permissions';
import * as myPreferences from './api/myPreferences';
import * as myself from './api/myself';
import * as issueNotificationSchemes from './api/issueNotificationSchemes';
import * as password from './api/password';
import * as permissionSchemes from './api/permissionSchemes';
import * as issuePriorities from './api/issuePriorities';
import * as prioritySchemes from './api/prioritySchemes';
import * as projects from './api/projects';
import * as projectCategories from './api/projectCategories';
import * as projectKeyAndNameValidation from './api/projectKeyAndNameValidation';
import * as readOnlyMode from './api/readOnlyMode';
import * as issueResolutions from './api/issueResolutions';
import * as projectRoles from './api/projectRoles';
import * as screens from './api/screens';
import * as issueSearch from './api/issueSearch';
import * as searchLimits from './api/searchLimits';
import * as issueSecurityLevel from './api/issueSecurityLevel';
import * as serverInfo from './api/serverInfo';
import * as jiraSettings from './api/jiraSettings';
import * as workflowStatuses from './api/workflowStatuses';
import * as workflowStatusCategories from './api/workflowStatusCategories';
import * as terminology from './api/terminology';
import * as upgrade from './api/upgrade';
import * as users from './api/users';
import * as projectVersions from './api/projectVersions';
import * as workflows from './api/workflows';
import * as workflowSchemes from './api/workflowSchemes';
import * as issueWorklogs from './api/issueWorklogs';
import * as session from './api/session';
import * as websudo from './api/websudo';
import * as webhooks from './api/webhooks';
import type {
  MoveIssuesToBacklog,
  GetAllBoards,
  CreateBoard,
  GetBoard,
  DeleteBoard,
  GetIssuesForBacklog,
  GetBoardConfiguration,
  GetEpics,
  GetIssuesWithoutEpicForBoard,
  GetIssuesForBoardEpic,
  GetIssuesForBoard,
  GetProjects,
  GetBoardPropertyKeys,
  GetBoardProperty,
  SetBoardProperty,
  DeleteBoardProperty,
  GetRefinedVelocity,
  SetRefinedVelocity,
  GetAllSprints,
  GetIssuesForBoardSprint,
  GetAllVersions,
  GetIssuesWithoutEpic,
  RemoveIssuesFromEpic,
  GetEpic,
  PartiallyUpdateEpic,
  GetIssuesForEpic,
  MoveIssuesToEpic,
  RankEpics,
  RankIssues,
  GetAgileIssue,
  GetIssueEstimationForBoard,
  EstimateIssueForBoard,
  CreateIssue,
  ArchiveIssues,
  CreateIssues,
  GetCreateIssueMetaProjectIssueTypes,
  GetCreateIssueMetaFields,
  GetIssuePickerResource,
  CreateReciprocalRemoteIssueLink,
  GetIssue,
  EditIssue,
  DeleteIssue,
  ArchiveIssue,
  Assign,
  AddAttachment,
  GetComments,
  AddComment,
  GetComment,
  UpdateComment,
  DeleteComment,
  SetPinComment,
  GetEditIssueMeta,
  Notify,
  GetPinnedComments,
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
  RestoreIssue,
  GetSubTasks,
  CanMoveSubTask,
  MoveSubTasks,
  GetTransitions,
  DoTransition,
  GetVotes,
  AddVote,
  RemoveVote,
  GetIssueWatchers,
  AddWatcher,
  RemoveWatcher,
  GetIssueWorklog,
  AddWorklog,
  GetWorklog,
  UpdateWorklog,
  DeleteWorklog,
  CreateSprint,
  UnmapSprints,
  GetSprint,
  PartiallyUpdateSprint,
  UpdateSprint,
  DeleteSprint,
  GetIssuesForSprint,
  MoveIssuesToSprint,
  GetSprintPropertyKeys,
  GetSprintProperty,
  SetSprintProperty,
  DeleteSprintProperty,
  SwapSprint,
  GetApplicationProperties,
  SetPropertyViaRestfulTable,
  PutBulk,
  GetApplicationRole,
  UpdateApplicationRole,
  GetAttachment,
  RemoveAttachment,
  ExpandForHumans,
  ExpandForMachines,
  GetAllSystemAvatars,
  GetAvatars,
  CreateAvatarFromTemporary,
  DeleteAvatar,
  StoreTemporaryAvatarUsingMultiPart,
  DeleteNode,
  ChangeNodeStateToOffline,
  GetCommentPropertyKeys,
  GetCommentProperty,
  SetCommentProperty,
  DeleteCommentProperty,
  CreateComponent,
  GetPaginatedComponents,
  GetComponent,
  UpdateComponent,
  DeleteComponent,
  GetComponentRelatedIssues,
  GetCustomFieldOption,
  GetCustomFields,
  BulkDeleteCustomFields,
  GetCustomFieldOptions,
  CreateCustomField,
  List,
  GetDashboardItemPropertyKeys,
  GetDashboardItemProperty,
  SetDashboardItemProperty,
  DeleteDashboardItemProperty,
  GetDashboard,
  UploadEmailTemplates,
  CreateFilter,
  SetDefaultShareScope,
  GetFavouriteFilters,
  GetFilter,
  EditFilter,
  DeleteFilter,
  GetFilterColumns,
  SetColumns,
  ResetColumns,
  GetSharePermissions,
  AddSharePermission,
  GetSharePermission,
  DeleteSharePermission,
  CreateGroup,
  RemoveGroup,
  GetUsersFromGroup,
  AddUserToGroup,
  RemoveUserFromGroup,
  FindGroups,
  FindUsersAndGroups,
  GetReindexInfo,
  Reindex,
  ReindexIssues,
  GetReindexProgress,
  GetProgressBulk,
  GetReindexRequestProgress,
  LinkIssues,
  GetIssueLink,
  DeleteIssueLink,
  CreateIssueLinkType,
  ResetOrder,
  GetIssueLinkType,
  UpdateIssueLinkType,
  DeleteIssueLinkType,
  MoveIssueLinkType,
  GetIssueSecurityScheme,
  CreateIssueType,
  GetPaginatedIssueTypes,
  GetIssueType,
  UpdateIssueType,
  DeleteIssueType,
  GetAlternativeIssueTypes,
  CreateIssueTypeAvatarFromTemporary,
  StoreTemporaryIssueTypeAvatarUsingMultiPart,
  GetIssueTypePropertyKeys,
  GetIssueTypeProperty,
  SetIssueTypeProperty,
  DeleteIssueTypeProperty,
  CreateIssueTypeScheme,
  GetIssueTypeScheme,
  UpdateIssueTypeScheme,
  DeleteIssueTypeScheme,
  GetAssociatedProjects,
  AddProjectAssociationsToScheme,
  SetProjectAssociationsForScheme,
  RemoveAllProjectAssociations,
  RemoveProjectAssociation,
  GetFieldAutoCompleteForQueryString,
  Validate,
  SetAppMonitoringEnabled,
  SetIpdMonitoringEnabled,
  GetPermissions,
  GetPreference,
  SetPreference,
  RemovePreference,
  UpdateCurrentUser,
  ChangeMyPassword,
  GetNotificationSchemes,
  GetNotificationScheme,
  GetPasswordPolicy,
  PolicyCheckCreateUser,
  PolicyCheckUpdateUser,
  GetPermissionSchemes,
  CreatePermissionScheme,
  GetSchemeAttribute,
  SetSchemeAttribute,
  GetPermissionScheme,
  UpdatePermissionScheme,
  DeletePermissionScheme,
  GetPermissionSchemeGrants,
  CreatePermissionGrant,
  GetPermissionSchemeGrant,
  DeletePermissionSchemeEntity,
  GetPrioritiesPaginated,
  GetPriority,
  GetPrioritySchemes,
  CreatePriorityScheme,
  GetPriorityScheme,
  UpdatePriorityScheme,
  DeletePriorityScheme,
  GetAllProjects,
  CreateProject,
  GetProjectTypeByKey,
  GetAccessibleProjectTypeByKey,
  GetProject,
  UpdateProject,
  DeleteProject,
  ArchiveProject,
  CreateProjectAvatarFromTemporary,
  UpdateProjectAvatar,
  StoreTemporaryProjectAvatarUsingMultiPart,
  DeleteProjectAvatar,
  GetAllProjectAvatars,
  GetProjectComponents,
  GetProjectPropertyKeys,
  GetProjectProperty,
  SetProjectProperty,
  DeleteProjectProperty,
  RestoreProject,
  GetProjectRoles,
  GetProjectRole,
  AddActorUsers,
  SetActors,
  DeleteActor,
  GetAllStatuses,
  UpdateProjectType,
  GetProjectVersionsPaginated,
  GetProjectVersions,
  GetProjectIssueSecurityScheme,
  GetProjectNotificationScheme,
  GetAssignedPermissionScheme,
  AssignPermissionScheme,
  GetAssignedPriorityScheme,
  AssignPriorityScheme,
  UnassignPriorityScheme,
  GetSecurityLevelsForProject,
  GetWorkflowSchemeForProject,
  SearchForProjects,
  CreateProjectCategory,
  GetProjectCategoryById,
  UpdateProjectCategory,
  RemoveProjectCategory,
  ValidateProjectKey,
  UpdateReadOnlyMode,
  GetPaginatedResolutions,
  GetResolution,
  CreateProjectRole,
  GetProjectRolesById,
  PartialUpdateProjectRole,
  FullyUpdateProjectRole,
  DeleteProjectRole,
  GetProjectRoleActorsForRole,
  AddProjectRoleActorsToRole,
  DeleteProjectRoleActorsFromRole,
  GetAllScreens,
  AddFieldToDefaultScreen,
  GetFieldsToAdd,
  GetAllTabs,
  AddTab,
  RenameTab,
  DeleteTab,
  GetAllFields,
  AddField,
  RemoveField,
  MoveField,
  UpdateShowWhenEmptyIndicator,
  MoveTab,
  Search,
  SearchUsingSearchRequest,
  GetIssuesecuritylevel,
  SetBaseURL,
  SetIssueNavigatorDefaultColumnsForm,
  GetPaginatedStatuses,
  GetStatus,
  GetStatusCategories,
  GetStatusCategory,
  SetTerminologyEntries,
  GetTerminologyEntry,
  GetUser,
  CreateUser,
  UpdateUser,
  RemoveUser,
  ValidateUserAnonymization,
  ScheduleUserAnonymization,
  GetUserAnonymizationProgress,
  ValidateUserAnonymizationRerun,
  ScheduleUserAnonymizationRerun,
  AddUserToApplication,
  RemoveUserFromApplication,
  FindBulkAssignableUsers,
  FindAssignableUsers,
  CreateUserAvatarFromTemporary,
  UpdateUserAvatar,
  StoreTemporaryUserAvatarUsingMultiPart,
  DeleteUserAvatar,
  GetAllUserAvatars,
  DefaultColumns,
  SetColumnsUrlEncoded,
  ResetUserColumns,
  GetDuplicatedUsersCount,
  GetDuplicatedUsersMapping,
  GetUserList,
  ChangeUserPassword,
  FindUsersForPicker,
  GetUserPropertyKeys,
  GetUserProperty,
  SetUserProperty,
  DeleteUserProperty,
  FindUsers,
  DeleteSession,
  FindUsersWithBrowsePermission,
  GetPaginatedVersions,
  CreateVersion,
  GetRemoteVersionLinks,
  GetVersion,
  UpdateVersion,
  Merge,
  MoveVersion,
  GetVersionRelatedIssues,
  DeleteVersionAndSwap,
  GetVersionUnresolvedIssues,
  GetRemoteVersionLinksByVersionId,
  CreateOrUpdateRemoteVersionLink,
  DeleteRemoteVersionLinksByVersionId,
  GetRemoteVersionLink,
  CreateOrUpdateRemoteVersionLinkByGlobalId,
  DeleteRemoteVersionLink,
  GetAllWorkflows,
  CreateScheme,
  GetById,
  UpdateWorkflowScheme,
  DeleteScheme,
  CreateDraftForParent,
  GetDefault,
  UpdateDefault,
  DeleteDefault,
  GetDraftById,
  UpdateDraft,
  DeleteDraftById,
  GetDraftDefault,
  UpdateDraftDefault,
  DeleteDraftDefault,
  GetDraftIssueType,
  SetDraftIssueType,
  DeleteDraftIssueType,
  GetDraftWorkflow,
  UpdateDraftWorkflowMapping,
  DeleteDraftWorkflowMapping,
  GetWorkflowSchemeIssueType,
  SetIssueType,
  DeleteWorkflowSchemeIssueType,
  GetWorkflow,
  UpdateWorkflowMapping,
  DeleteWorkflowMapping,
  GetIdsOfWorklogsDeletedSince,
  GetWorklogsForIds,
  GetIdsOfWorklogsModifiedSince,
  Login,
  Release,
  GetWebhooks,
  CreateWebhook,
  GetWebhook,
  UpdateWebhook,
  DeleteWebhook,
  GetWebhookStatistics,
  GetWebhookStatisticsSummary,
  GetWebhookTransitions,
  GetLatestWebhookInvocation,
} from './parameters';
import type {
  Page,
  Board,
  SearchResults,
  BoardConfig,
  Epic,
  ProjectJson,
  EntityPropertiesKeys,
  EntityProperty,
  BooleanSetting,
  Sprint,
  AgileVersion,
  Issue,
  FieldValue,
  IssueCreateResponse,
  IssuesCreateResponse,
  CreateMetaIssueType,
  FieldMeta,
  IssuePickerResult,
  RemoteReciprocalIssueLinkCreateResponse,
  AttachmentJson,
  CommentsWithPaginationJson,
  CommentJson,
  EditMeta,
  PinnedCommentJson,
  RemoteIssueLink,
  IssueRefJson,
  TransitionsMeta,
  Vote,
  Watchers,
  WorklogWithPagination,
  Worklog,
  ApplicationProperty,
  ApplicationRole,
  AttachmentMeta,
  Attachment,
  HumanReadableArchive,
  AttachmentArchiveImpl,
  Avatar,
  GetAvatars as GetAvatarsModel,
  AvatarCropping,
  Node,
  ClusterState,
  Component,
  PagedResults,
  ComponentIssueCounts,
  Configuration,
  CustomFieldOption,
  CustomField,
  BulkDeleteResponse,
  CustomFieldOptions,
  Field,
  Dashboards,
  Dashboard,
  EmailTemplateTypes,
  Filter,
  DefaultShareScope,
  ColumnLayout,
  FilterPermission,
  Group,
  GetUsersFromGroup as GetUsersFromGroupModel,
  GroupSuggestions,
  UsersAndGroups,
  IndexSnapshot,
  IndexSnapshotPromise,
  IndexSnapshotStatus,
  IndexSummary,
  Reindex as ReindexModel,
  ReindexRequest,
  IssueLink,
  IssueLinkTypes,
  IssueLinkTypeJson,
  SecuritySchemesJson,
  SecuritySchemeJson,
  IssueTypeJson,
  IssueTypeSchemeList,
  IssueTypeScheme,
  Project,
  AutoCompleteResponse,
  AutoCompleteResultWrapper,
  LicenseValidationResults,
  AppMonitoringRestEntity,
  IpdMonitoringRestEntity,
  PermissionsJson,
  User,
  UserWrite,
  NotificationScheme,
  PermissionSchemes,
  PermissionScheme,
  PermissionSchemeAttribute,
  PermissionGrants,
  PermissionGrant,
  PriorityJson,
  PrioritySchemeList,
  PriorityScheme,
  ProjectIdentity,
  ProjectType,
  GetAllProjectAvatars as GetAllProjectAvatarsModel,
  GetProjectRoles as GetProjectRolesModel,
  ProjectRole,
  IssueTypeWithStatusJson,
  Version,
  SecurityListLevelJson,
  WorkflowScheme,
  ProjectPickerResultWrapper,
  ProjectCategoryJson,
  ErrorCollection,
  ReadOnlyModeStatus,
  ResolutionJson,
  Resolution,
  ProjectRoleActors,
  Screen,
  ScreenableField,
  ScreenableTab,
  SecurityLevelJson,
  ServerInfo,
  ColumnOptions,
  StatusJson,
  StatusCategoryJson,
  TerminologyResponse,
  UpgradeResult,
  A11yPersonalSetting,
  UserAnonymizationValidation,
  GetAllUserAvatars as GetAllUserAvatarsModel,
  StreamPage,
  UserPickerResults,
  RemoteEntityLinksJson,
  VersionIssueCounts,
  VersionUnresolvedIssueCounts,
  RemoteEntityLinkJson,
  Workflow,
  IssueTypeMapping,
  GetWorkflow as GetWorkflowModel,
  WorklogChangedSince,
  CurrentUser,
  AuthSuccess,
  Webhook,
  WebhookStatistics,
  GetWebhookStatisticsSummary as GetWebhookStatisticsSummaryModel,
} from './models';

export function createServerClient(clientConfig: ClientConfig | Client) {
  const client = createClient(clientConfig);

  return {
    backlog: {
      moveIssuesToBacklog: (parameters: MoveIssuesToBacklog, options?: RequestOptions): Promise<void> =>
        backlog.moveIssuesToBacklog(client, parameters, options),
    },
    board: {
      getAllBoards: (parameters?: GetAllBoards, options?: RequestOptions): Promise<Page<Board>> =>
        board.getAllBoards(client, parameters, options),
      createBoard: (parameters: CreateBoard, options?: RequestOptions): Promise<Board> =>
        board.createBoard(client, parameters, options),
      getBoard: (parameters: GetBoard, options?: RequestOptions): Promise<Board> =>
        board.getBoard(client, parameters, options),
      deleteBoard: (parameters: DeleteBoard, options?: RequestOptions): Promise<void> =>
        board.deleteBoard(client, parameters, options),
      getIssuesForBacklog: (parameters: GetIssuesForBacklog, options?: RequestOptions): Promise<SearchResults> =>
        board.getIssuesForBacklog(client, parameters, options),
      getBoardConfiguration: (parameters: GetBoardConfiguration, options?: RequestOptions): Promise<BoardConfig> =>
        board.getBoardConfiguration(client, parameters, options),
      getEpics: (parameters: GetEpics, options?: RequestOptions): Promise<Page<Epic>> =>
        board.getEpics(client, parameters, options),
      getIssuesWithoutEpicForBoard: (
        parameters: GetIssuesWithoutEpicForBoard,
        options?: RequestOptions,
      ): Promise<SearchResults> => board.getIssuesWithoutEpicForBoard(client, parameters, options),
      getIssuesForBoardEpic: (parameters: GetIssuesForBoardEpic, options?: RequestOptions): Promise<SearchResults> =>
        board.getIssuesForBoardEpic(client, parameters, options),
      getIssuesForBoard: (parameters: GetIssuesForBoard, options?: RequestOptions): Promise<SearchResults> =>
        board.getIssuesForBoard(client, parameters, options),
      getProjects: (parameters: GetProjects, options?: RequestOptions): Promise<Page<ProjectJson>> =>
        board.getProjects(client, parameters, options),
      getBoardPropertyKeys: (
        parameters: GetBoardPropertyKeys,
        options?: RequestOptions,
      ): Promise<EntityPropertiesKeys> => board.getBoardPropertyKeys(client, parameters, options),
      getBoardProperty: (parameters: GetBoardProperty, options?: RequestOptions): Promise<EntityProperty> =>
        board.getBoardProperty(client, parameters, options),
      setBoardProperty: (parameters: SetBoardProperty, options?: RequestOptions): Promise<EntityPropertiesKeys> =>
        board.setBoardProperty(client, parameters, options),
      deleteBoardProperty: (parameters: DeleteBoardProperty, options?: RequestOptions): Promise<void> =>
        board.deleteBoardProperty(client, parameters, options),
      getRefinedVelocity: (parameters: GetRefinedVelocity, options?: RequestOptions): Promise<BooleanSetting> =>
        board.getRefinedVelocity(client, parameters, options),
      setRefinedVelocity: (parameters: SetRefinedVelocity, options?: RequestOptions): Promise<void> =>
        board.setRefinedVelocity(client, parameters, options),
      getAllSprints: (parameters: GetAllSprints, options?: RequestOptions): Promise<Page<Sprint>> =>
        board.getAllSprints(client, parameters, options),
      getIssuesForBoardSprint: (
        parameters: GetIssuesForBoardSprint,
        options?: RequestOptions,
      ): Promise<SearchResults> => board.getIssuesForBoardSprint(client, parameters, options),
      getAllVersions: (parameters: GetAllVersions, options?: RequestOptions): Promise<Page<AgileVersion>> =>
        board.getAllVersions(client, parameters, options),
    },
    epic: {
      getIssuesWithoutEpic: (parameters?: GetIssuesWithoutEpic, options?: RequestOptions): Promise<SearchResults> =>
        epic.getIssuesWithoutEpic(client, parameters, options),
      removeIssuesFromEpic: (parameters: RemoveIssuesFromEpic, options?: RequestOptions): Promise<void> =>
        epic.removeIssuesFromEpic(client, parameters, options),
      getEpic: (parameters: GetEpic, options?: RequestOptions): Promise<Epic> =>
        epic.getEpic(client, parameters, options),
      partiallyUpdateEpic: (parameters: PartiallyUpdateEpic, options?: RequestOptions): Promise<Epic> =>
        epic.partiallyUpdateEpic(client, parameters, options),
      getIssuesForEpic: (parameters: GetIssuesForEpic, options?: RequestOptions): Promise<SearchResults> =>
        epic.getIssuesForEpic(client, parameters, options),
      moveIssuesToEpic: (parameters: MoveIssuesToEpic, options?: RequestOptions): Promise<void> =>
        epic.moveIssuesToEpic(client, parameters, options),
      rankEpics: (parameters: RankEpics, options?: RequestOptions): Promise<void> =>
        epic.rankEpics(client, parameters, options),
    },
    issues: {
      rankIssues: (parameters: RankIssues, options?: RequestOptions): Promise<void> =>
        issues.rankIssues(client, parameters, options),
      getAgileIssue: (parameters: GetAgileIssue, options?: RequestOptions): Promise<Issue> =>
        issues.getAgileIssue(client, parameters, options),
      getIssueEstimationForBoard: (
        parameters: GetIssueEstimationForBoard,
        options?: RequestOptions,
      ): Promise<FieldValue> => issues.getIssueEstimationForBoard(client, parameters, options),
      estimateIssueForBoard: (parameters: EstimateIssueForBoard, options?: RequestOptions): Promise<FieldValue> =>
        issues.estimateIssueForBoard(client, parameters, options),
      createIssue: (parameters: CreateIssue, options?: RequestOptions): Promise<IssueCreateResponse> =>
        issues.createIssue(client, parameters, options),
      archiveIssues: (parameters: ArchiveIssues, options?: RequestOptions): Promise<unknown> =>
        issues.archiveIssues(client, parameters, options),
      createIssues: (parameters: CreateIssues, options?: RequestOptions): Promise<IssuesCreateResponse> =>
        issues.createIssues(client, parameters, options),
      getCreateIssueMetaProjectIssueTypes: (
        parameters: GetCreateIssueMetaProjectIssueTypes,
        options?: RequestOptions,
      ): Promise<CreateMetaIssueType> => issues.getCreateIssueMetaProjectIssueTypes(client, parameters, options),
      getCreateIssueMetaFields: (parameters: GetCreateIssueMetaFields, options?: RequestOptions): Promise<FieldMeta> =>
        issues.getCreateIssueMetaFields(client, parameters, options),
      getIssuePickerResource: (
        parameters?: GetIssuePickerResource,
        options?: RequestOptions,
      ): Promise<IssuePickerResult> => issues.getIssuePickerResource(client, parameters, options),
      createReciprocalRemoteIssueLink: (
        parameters: CreateReciprocalRemoteIssueLink,
        options?: RequestOptions,
      ): Promise<RemoteReciprocalIssueLinkCreateResponse> =>
        issues.createReciprocalRemoteIssueLink(client, parameters, options),
      getIssue: (parameters: GetIssue, options?: RequestOptions): Promise<Issue> =>
        issues.getIssue(client, parameters, options),
      editIssue: (parameters: EditIssue, options?: RequestOptions): Promise<void> =>
        issues.editIssue(client, parameters, options),
      deleteIssue: (parameters: DeleteIssue, options?: RequestOptions): Promise<void> =>
        issues.deleteIssue(client, parameters, options),
      archiveIssue: (parameters: ArchiveIssue, options?: RequestOptions): Promise<void> =>
        issues.archiveIssue(client, parameters, options),
      assign: (parameters: Assign, options?: RequestOptions): Promise<void> =>
        issues.assign(client, parameters, options),
      addAttachment: (parameters: AddAttachment, options?: RequestOptions): Promise<AttachmentJson[]> =>
        issues.addAttachment(client, parameters, options),
      getComments: (parameters: GetComments, options?: RequestOptions): Promise<CommentsWithPaginationJson> =>
        issues.getComments(client, parameters, options),
      addComment: (parameters: AddComment, options?: RequestOptions): Promise<CommentJson> =>
        issues.addComment(client, parameters, options),
      getComment: (parameters: GetComment, options?: RequestOptions): Promise<CommentJson> =>
        issues.getComment(client, parameters, options),
      updateComment: (parameters: UpdateComment, options?: RequestOptions): Promise<CommentJson> =>
        issues.updateComment(client, parameters, options),
      deleteComment: (parameters: DeleteComment, options?: RequestOptions): Promise<void> =>
        issues.deleteComment(client, parameters, options),
      setPinComment: (parameters: SetPinComment, options?: RequestOptions): Promise<void> =>
        issues.setPinComment(client, parameters, options),
      getEditIssueMeta: (parameters: GetEditIssueMeta, options?: RequestOptions): Promise<EditMeta> =>
        issues.getEditIssueMeta(client, parameters, options),
      notify: (parameters: Notify, options?: RequestOptions): Promise<void> =>
        issues.notify(client, parameters, options),
      getPinnedComments: (parameters: GetPinnedComments, options?: RequestOptions): Promise<PinnedCommentJson[]> =>
        issues.getPinnedComments(client, parameters, options),
      getIssuePropertyKeys: (
        parameters: GetIssuePropertyKeys,
        options?: RequestOptions,
      ): Promise<EntityPropertiesKeys> => issues.getIssuePropertyKeys(client, parameters, options),
      getIssueProperty: (parameters: GetIssueProperty, options?: RequestOptions): Promise<EntityProperty> =>
        issues.getIssueProperty(client, parameters, options),
      setIssueProperty: (parameters: SetIssueProperty, options?: RequestOptions): Promise<void> =>
        issues.setIssueProperty(client, parameters, options),
      deleteIssueProperty: (parameters: DeleteIssueProperty, options?: RequestOptions): Promise<void> =>
        issues.deleteIssueProperty(client, parameters, options),
      getRemoteIssueLinks: (parameters: GetRemoteIssueLinks, options?: RequestOptions): Promise<RemoteIssueLink[]> =>
        issues.getRemoteIssueLinks(client, parameters, options),
      createOrUpdateRemoteIssueLink: (
        parameters: CreateOrUpdateRemoteIssueLink,
        options?: RequestOptions,
      ): Promise<RemoteIssueLink> => issues.createOrUpdateRemoteIssueLink(client, parameters, options),
      deleteRemoteIssueLinkByGlobalId: (
        parameters: DeleteRemoteIssueLinkByGlobalId,
        options?: RequestOptions,
      ): Promise<void> => issues.deleteRemoteIssueLinkByGlobalId(client, parameters, options),
      getRemoteIssueLinkById: (
        parameters: GetRemoteIssueLinkById,
        options?: RequestOptions,
      ): Promise<RemoteIssueLink> => issues.getRemoteIssueLinkById(client, parameters, options),
      updateRemoteIssueLink: (parameters: UpdateRemoteIssueLink, options?: RequestOptions): Promise<void> =>
        issues.updateRemoteIssueLink(client, parameters, options),
      deleteRemoteIssueLinkById: (parameters: DeleteRemoteIssueLinkById, options?: RequestOptions): Promise<void> =>
        issues.deleteRemoteIssueLinkById(client, parameters, options),
      restoreIssue: (parameters: RestoreIssue, options?: RequestOptions): Promise<void> =>
        issues.restoreIssue(client, parameters, options),
      getSubTasks: (parameters: GetSubTasks, options?: RequestOptions): Promise<IssueRefJson[]> =>
        issues.getSubTasks(client, parameters, options),
      canMoveSubTask: (parameters: CanMoveSubTask, options?: RequestOptions): Promise<unknown> =>
        issues.canMoveSubTask(client, parameters, options),
      moveSubTasks: (parameters: MoveSubTasks, options?: RequestOptions): Promise<void> =>
        issues.moveSubTasks(client, parameters, options),
      getTransitions: (parameters: GetTransitions, options?: RequestOptions): Promise<TransitionsMeta> =>
        issues.getTransitions(client, parameters, options),
      doTransition: (parameters: DoTransition, options?: RequestOptions): Promise<void> =>
        issues.doTransition(client, parameters, options),
      getVotes: (parameters: GetVotes, options?: RequestOptions): Promise<Vote> =>
        issues.getVotes(client, parameters, options),
      addVote: (parameters: AddVote, options?: RequestOptions): Promise<void> =>
        issues.addVote(client, parameters, options),
      removeVote: (parameters: RemoveVote, options?: RequestOptions): Promise<void> =>
        issues.removeVote(client, parameters, options),
      getIssueWatchers: (parameters: GetIssueWatchers, options?: RequestOptions): Promise<Watchers> =>
        issues.getIssueWatchers(client, parameters, options),
      addWatcher: (parameters: AddWatcher, options?: RequestOptions): Promise<void> =>
        issues.addWatcher(client, parameters, options),
      removeWatcher: (parameters: RemoveWatcher, options?: RequestOptions): Promise<void> =>
        issues.removeWatcher(client, parameters, options),
      getIssueWorklog: (parameters: GetIssueWorklog, options?: RequestOptions): Promise<WorklogWithPagination> =>
        issues.getIssueWorklog(client, parameters, options),
      addWorklog: (parameters: AddWorklog, options?: RequestOptions): Promise<Worklog> =>
        issues.addWorklog(client, parameters, options),
      getWorklog: (parameters: GetWorklog, options?: RequestOptions): Promise<Worklog> =>
        issues.getWorklog(client, parameters, options),
      updateWorklog: (parameters: UpdateWorklog, options?: RequestOptions): Promise<Worklog> =>
        issues.updateWorklog(client, parameters, options),
      deleteWorklog: (parameters: DeleteWorklog, options?: RequestOptions): Promise<void> =>
        issues.deleteWorklog(client, parameters, options),
    },
    sprint: {
      createSprint: (parameters: CreateSprint, options?: RequestOptions): Promise<Sprint> =>
        sprint.createSprint(client, parameters, options),
      unmapSprints: (parameters: UnmapSprints, options?: RequestOptions): Promise<void> =>
        sprint.unmapSprints(client, parameters, options),
      unmapAllSprints: (options?: RequestOptions): Promise<void> => sprint.unmapAllSprints(client, options),
      getSprint: (parameters: GetSprint, options?: RequestOptions): Promise<Sprint> =>
        sprint.getSprint(client, parameters, options),
      partiallyUpdateSprint: (parameters: PartiallyUpdateSprint, options?: RequestOptions): Promise<Sprint> =>
        sprint.partiallyUpdateSprint(client, parameters, options),
      updateSprint: (parameters: UpdateSprint, options?: RequestOptions): Promise<Sprint> =>
        sprint.updateSprint(client, parameters, options),
      deleteSprint: (parameters: DeleteSprint, options?: RequestOptions): Promise<void> =>
        sprint.deleteSprint(client, parameters, options),
      getIssuesForSprint: (parameters: GetIssuesForSprint, options?: RequestOptions): Promise<SearchResults> =>
        sprint.getIssuesForSprint(client, parameters, options),
      moveIssuesToSprint: (parameters: MoveIssuesToSprint, options?: RequestOptions): Promise<void> =>
        sprint.moveIssuesToSprint(client, parameters, options),
      getSprintPropertyKeys: (
        parameters: GetSprintPropertyKeys,
        options?: RequestOptions,
      ): Promise<EntityPropertiesKeys> => sprint.getSprintPropertyKeys(client, parameters, options),
      getSprintProperty: (parameters: GetSprintProperty, options?: RequestOptions): Promise<EntityProperty> =>
        sprint.getSprintProperty(client, parameters, options),
      setSprintProperty: (parameters: SetSprintProperty, options?: RequestOptions): Promise<void> =>
        sprint.setSprintProperty(client, parameters, options),
      deleteSprintProperty: (parameters: DeleteSprintProperty, options?: RequestOptions): Promise<void> =>
        sprint.deleteSprintProperty(client, parameters, options),
      swapSprint: (parameters: SwapSprint, options?: RequestOptions): Promise<void> =>
        sprint.swapSprint(client, parameters, options),
    },
    applicationProperties: {
      getApplicationProperties: (
        parameters?: GetApplicationProperties,
        options?: RequestOptions,
      ): Promise<ApplicationProperty[]> => applicationProperties.getApplicationProperties(client, parameters, options),
      getAdvancedSettings: (options?: RequestOptions): Promise<ApplicationProperty[]> =>
        applicationProperties.getAdvancedSettings(client, options),
      setPropertyViaRestfulTable: (
        parameters: SetPropertyViaRestfulTable,
        options?: RequestOptions,
      ): Promise<ApplicationProperty> => applicationProperties.setPropertyViaRestfulTable(client, parameters, options),
    },
    applicationRoles: {
      getAll: (options?: RequestOptions): Promise<ApplicationRole[]> => applicationRoles.getAll(client, options),
      putBulk: (parameters: PutBulk, options?: RequestOptions): Promise<ApplicationRole> =>
        applicationRoles.putBulk(client, parameters, options),
      getApplicationRole: (parameters: GetApplicationRole, options?: RequestOptions): Promise<ApplicationRole> =>
        applicationRoles.getApplicationRole(client, parameters, options),
      updateApplicationRole: (parameters: UpdateApplicationRole, options?: RequestOptions): Promise<ApplicationRole> =>
        applicationRoles.updateApplicationRole(client, parameters, options),
    },
    issueAttachments: {
      getAttachmentMeta: (options?: RequestOptions): Promise<AttachmentMeta> =>
        issueAttachments.getAttachmentMeta(client, options),
      getAttachment: (parameters: GetAttachment, options?: RequestOptions): Promise<Attachment> =>
        issueAttachments.getAttachment(client, parameters, options),
      removeAttachment: (parameters: RemoveAttachment, options?: RequestOptions): Promise<void> =>
        issueAttachments.removeAttachment(client, parameters, options),
      expandForHumans: (parameters: ExpandForHumans, options?: RequestOptions): Promise<HumanReadableArchive> =>
        issueAttachments.expandForHumans(client, parameters, options),
      expandForMachines: (parameters: ExpandForMachines, options?: RequestOptions): Promise<AttachmentArchiveImpl> =>
        issueAttachments.expandForMachines(client, parameters, options),
    },
    avatars: {
      getAllSystemAvatars: (parameters: GetAllSystemAvatars, options?: RequestOptions): Promise<Avatar> =>
        avatars.getAllSystemAvatars(client, parameters, options),
      getAvatars: (parameters: GetAvatars, options?: RequestOptions): Promise<GetAvatarsModel> =>
        avatars.getAvatars(client, parameters, options),
      createAvatarFromTemporary: (parameters: CreateAvatarFromTemporary, options?: RequestOptions): Promise<Avatar> =>
        avatars.createAvatarFromTemporary(client, parameters, options),
      deleteAvatar: (parameters: DeleteAvatar, options?: RequestOptions): Promise<void> =>
        avatars.deleteAvatar(client, parameters, options),
      storeTemporaryAvatarUsingMultiPart: (
        parameters: StoreTemporaryAvatarUsingMultiPart,
        options?: RequestOptions,
      ): Promise<AvatarCropping> => avatars.storeTemporaryAvatarUsingMultiPart(client, parameters, options),
    },
    cluster: {
      deleteNode: (parameters: DeleteNode, options?: RequestOptions): Promise<void> =>
        cluster.deleteNode(client, parameters, options),
      changeNodeStateToOffline: (parameters: ChangeNodeStateToOffline, options?: RequestOptions): Promise<void> =>
        cluster.changeNodeStateToOffline(client, parameters, options),
      getAllNodes: (options?: RequestOptions): Promise<Node[]> => cluster.getAllNodes(client, options),
      approveUpgrade: (options?: RequestOptions): Promise<void> => cluster.approveUpgrade(client, options),
      cancelUpgrade: (options?: RequestOptions): Promise<void> => cluster.cancelUpgrade(client, options),
      acknowledgeErrors: (options?: RequestOptions): Promise<void> => cluster.acknowledgeErrors(client, options),
      setReadyToUpgrade: (options?: RequestOptions): Promise<void> => cluster.setReadyToUpgrade(client, options),
      getState: (options?: RequestOptions): Promise<ClusterState> => cluster.getState(client, options),
    },
    issueComments: {
      getCommentPropertyKeys: (
        parameters: GetCommentPropertyKeys,
        options?: RequestOptions,
      ): Promise<EntityPropertiesKeys> => issueComments.getCommentPropertyKeys(client, parameters, options),
      getCommentProperty: (parameters: GetCommentProperty, options?: RequestOptions): Promise<EntityProperty> =>
        issueComments.getCommentProperty(client, parameters, options),
      setCommentProperty: (parameters: SetCommentProperty, options?: RequestOptions): Promise<void> =>
        issueComments.setCommentProperty(client, parameters, options),
      deleteCommentProperty: (parameters: DeleteCommentProperty, options?: RequestOptions): Promise<void> =>
        issueComments.deleteCommentProperty(client, parameters, options),
    },
    projectComponents: {
      createComponent: (parameters: CreateComponent, options?: RequestOptions): Promise<Component> =>
        projectComponents.createComponent(client, parameters, options),
      getPaginatedComponents: (parameters?: GetPaginatedComponents, options?: RequestOptions): Promise<PagedResults> =>
        projectComponents.getPaginatedComponents(client, parameters, options),
      getComponent: (parameters: GetComponent, options?: RequestOptions): Promise<Component> =>
        projectComponents.getComponent(client, parameters, options),
      updateComponent: (parameters: UpdateComponent, options?: RequestOptions): Promise<Component> =>
        projectComponents.updateComponent(client, parameters, options),
      deleteComponent: (parameters: DeleteComponent, options?: RequestOptions): Promise<void> =>
        projectComponents.deleteComponent(client, parameters, options),
      getComponentRelatedIssues: (
        parameters: GetComponentRelatedIssues,
        options?: RequestOptions,
      ): Promise<ComponentIssueCounts> => projectComponents.getComponentRelatedIssues(client, parameters, options),
    },
    configuration: {
      getConfiguration: (options?: RequestOptions): Promise<Configuration> =>
        configuration.getConfiguration(client, options),
    },
    issueCustomFieldOptions: {
      getCustomFieldOption: (parameters: GetCustomFieldOption, options?: RequestOptions): Promise<CustomFieldOption> =>
        issueCustomFieldOptions.getCustomFieldOption(client, parameters, options),
    },
    issueFields: {
      getCustomFields: (parameters?: GetCustomFields, options?: RequestOptions): Promise<CustomField> =>
        issueFields.getCustomFields(client, parameters, options),
      bulkDeleteCustomFields: (
        parameters: BulkDeleteCustomFields,
        options?: RequestOptions,
      ): Promise<BulkDeleteResponse> => issueFields.bulkDeleteCustomFields(client, parameters, options),
      getCustomFieldOptions: (
        parameters: GetCustomFieldOptions,
        options?: RequestOptions,
      ): Promise<CustomFieldOptions> => issueFields.getCustomFieldOptions(client, parameters, options),
      getFields: (options?: RequestOptions): Promise<Field[]> => issueFields.getFields(client, options),
      createCustomField: (parameters: CreateCustomField, options?: RequestOptions): Promise<Field> =>
        issueFields.createCustomField(client, parameters, options),
    },
    dashboards: {
      list: (parameters?: List, options?: RequestOptions): Promise<Dashboards> =>
        dashboards.list(client, parameters, options),
      getDashboardItemPropertyKeys: (
        parameters: GetDashboardItemPropertyKeys,
        options?: RequestOptions,
      ): Promise<EntityPropertiesKeys> => dashboards.getDashboardItemPropertyKeys(client, parameters, options),
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
    emailTemplates: {
      downloadEmailTemplates: (options?: RequestOptions): Promise<Buffer> =>
        emailTemplates.downloadEmailTemplates(client, options),
      uploadEmailTemplates: (parameters: UploadEmailTemplates, options?: RequestOptions): Promise<void> =>
        emailTemplates.uploadEmailTemplates(client, parameters, options),
      applyEmailTemplates: (options?: RequestOptions): Promise<void> =>
        emailTemplates.applyEmailTemplates(client, options),
      revertEmailTemplatesToDefault: (options?: RequestOptions): Promise<void> =>
        emailTemplates.revertEmailTemplatesToDefault(client, options),
      getEmailTypes: (options?: RequestOptions): Promise<EmailTemplateTypes> =>
        emailTemplates.getEmailTypes(client, options),
    },
    filters: {
      createFilter: (parameters: CreateFilter, options?: RequestOptions): Promise<Filter> =>
        filters.createFilter(client, parameters, options),
      getDefaultShareScope: (options?: RequestOptions): Promise<DefaultShareScope> =>
        filters.getDefaultShareScope(client, options),
      setDefaultShareScope: (parameters: SetDefaultShareScope, options?: RequestOptions): Promise<DefaultShareScope> =>
        filters.setDefaultShareScope(client, parameters, options),
      getFavouriteFilters: (parameters?: GetFavouriteFilters, options?: RequestOptions): Promise<Filter[]> =>
        filters.getFavouriteFilters(client, parameters, options),
      getFilter: (parameters: GetFilter, options?: RequestOptions): Promise<Filter> =>
        filters.getFilter(client, parameters, options),
      editFilter: (parameters: EditFilter, options?: RequestOptions): Promise<Filter> =>
        filters.editFilter(client, parameters, options),
      deleteFilter: (parameters: DeleteFilter, options?: RequestOptions): Promise<void> =>
        filters.deleteFilter(client, parameters, options),
      getFilterColumns: (parameters: GetFilterColumns, options?: RequestOptions): Promise<ColumnLayout[]> =>
        filters.getFilterColumns(client, parameters, options),
      setColumns: (parameters: SetColumns, options?: RequestOptions): Promise<void> =>
        filters.setColumns(client, parameters, options),
      resetColumns: (parameters: ResetColumns, options?: RequestOptions): Promise<void> =>
        filters.resetColumns(client, parameters, options),
      getSharePermissions: (parameters: GetSharePermissions, options?: RequestOptions): Promise<FilterPermission[]> =>
        filters.getSharePermissions(client, parameters, options),
      addSharePermission: (parameters: AddSharePermission, options?: RequestOptions): Promise<FilterPermission[]> =>
        filters.addSharePermission(client, parameters, options),
      getSharePermission: (parameters: GetSharePermission, options?: RequestOptions): Promise<FilterPermission> =>
        filters.getSharePermission(client, parameters, options),
      deleteSharePermission: (parameters: DeleteSharePermission, options?: RequestOptions): Promise<void> =>
        filters.deleteSharePermission(client, parameters, options),
    },
    groups: {
      createGroup: (parameters: CreateGroup, options?: RequestOptions): Promise<Group> =>
        groups.createGroup(client, parameters, options),
      removeGroup: (parameters: RemoveGroup, options?: RequestOptions): Promise<void> =>
        groups.removeGroup(client, parameters, options),
      getUsersFromGroup: (parameters: GetUsersFromGroup, options?: RequestOptions): Promise<GetUsersFromGroupModel> =>
        groups.getUsersFromGroup(client, parameters, options),
      addUserToGroup: (parameters: AddUserToGroup, options?: RequestOptions): Promise<Group> =>
        groups.addUserToGroup(client, parameters, options),
      removeUserFromGroup: (parameters: RemoveUserFromGroup, options?: RequestOptions): Promise<void> =>
        groups.removeUserFromGroup(client, parameters, options),
      findGroups: (parameters?: FindGroups, options?: RequestOptions): Promise<GroupSuggestions> =>
        groups.findGroups(client, parameters, options),
    },
    groupAndUserPicker: {
      findUsersAndGroups: (parameters?: FindUsersAndGroups, options?: RequestOptions): Promise<UsersAndGroups> =>
        groupAndUserPicker.findUsersAndGroups(client, parameters, options),
    },
    indexing: {
      listIndexSnapshot: (options?: RequestOptions): Promise<IndexSnapshot[]> =>
        indexing.listIndexSnapshot(client, options),
      createIndexSnapshot: (options?: RequestOptions): Promise<IndexSnapshotPromise> =>
        indexing.createIndexSnapshot(client, options),
      isIndexSnapshotRunning: (options?: RequestOptions): Promise<IndexSnapshotStatus> =>
        indexing.isIndexSnapshotRunning(client, options),
      getIndexSummary: (options?: RequestOptions): Promise<IndexSummary> => indexing.getIndexSummary(client, options),
      getReindexInfo: (parameters?: GetReindexInfo, options?: RequestOptions): Promise<ReindexModel> =>
        indexing.getReindexInfo(client, parameters, options),
      reindex: (parameters: Reindex, options?: RequestOptions): Promise<ReindexModel> =>
        indexing.reindex(client, parameters, options),
      reindexIssues: (parameters: ReindexIssues, options?: RequestOptions): Promise<ReindexModel> =>
        indexing.reindexIssues(client, parameters, options),
      getReindexProgress: (parameters?: GetReindexProgress, options?: RequestOptions): Promise<ReindexModel> =>
        indexing.getReindexProgress(client, parameters, options),
      processRequests: (options?: RequestOptions): Promise<unknown> => indexing.processRequests(client, options),
      getProgressBulk: (parameters?: GetProgressBulk, options?: RequestOptions): Promise<ReindexRequest[]> =>
        indexing.getProgressBulk(client, parameters, options),
      getReindexRequestProgress: (
        parameters: GetReindexRequestProgress,
        options?: RequestOptions,
      ): Promise<ReindexRequest> => indexing.getReindexRequestProgress(client, parameters, options),
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
      createIssueLinkType: (parameters: CreateIssueLinkType, options?: RequestOptions): Promise<IssueLinkTypeJson> =>
        issueLinkTypes.createIssueLinkType(client, parameters, options),
      resetOrder: (parameters: ResetOrder, options?: RequestOptions): Promise<IssueLinkTypes> =>
        issueLinkTypes.resetOrder(client, parameters, options),
      getIssueLinkType: (parameters: GetIssueLinkType, options?: RequestOptions): Promise<IssueLinkTypeJson> =>
        issueLinkTypes.getIssueLinkType(client, parameters, options),
      updateIssueLinkType: (parameters: UpdateIssueLinkType, options?: RequestOptions): Promise<IssueLinkTypeJson> =>
        issueLinkTypes.updateIssueLinkType(client, parameters, options),
      deleteIssueLinkType: (parameters: DeleteIssueLinkType, options?: RequestOptions): Promise<void> =>
        issueLinkTypes.deleteIssueLinkType(client, parameters, options),
      moveIssueLinkType: (parameters: MoveIssueLinkType, options?: RequestOptions): Promise<IssueLinkTypeJson> =>
        issueLinkTypes.moveIssueLinkType(client, parameters, options),
    },
    issueSecuritySchemes: {
      getIssueSecuritySchemes: (options?: RequestOptions): Promise<SecuritySchemesJson> =>
        issueSecuritySchemes.getIssueSecuritySchemes(client, options),
      getIssueSecurityScheme: (
        parameters: GetIssueSecurityScheme,
        options?: RequestOptions,
      ): Promise<SecuritySchemeJson> => issueSecuritySchemes.getIssueSecurityScheme(client, parameters, options),
    },
    issueTypes: {
      getIssueAllTypes: (options?: RequestOptions): Promise<IssueTypeJson[]> =>
        issueTypes.getIssueAllTypes(client, options),
      createIssueType: (parameters: CreateIssueType, options?: RequestOptions): Promise<IssueTypeJson> =>
        issueTypes.createIssueType(client, parameters, options),
      getPaginatedIssueTypes: (parameters?: GetPaginatedIssueTypes, options?: RequestOptions): Promise<IssueTypeJson> =>
        issueTypes.getPaginatedIssueTypes(client, parameters, options),
      getIssueType: (parameters: GetIssueType, options?: RequestOptions): Promise<IssueTypeJson> =>
        issueTypes.getIssueType(client, parameters, options),
      updateIssueType: (parameters: UpdateIssueType, options?: RequestOptions): Promise<IssueTypeJson> =>
        issueTypes.updateIssueType(client, parameters, options),
      deleteIssueType: (parameters: DeleteIssueType, options?: RequestOptions): Promise<void> =>
        issueTypes.deleteIssueType(client, parameters, options),
      getAlternativeIssueTypes: (
        parameters: GetAlternativeIssueTypes,
        options?: RequestOptions,
      ): Promise<IssueTypeJson[]> => issueTypes.getAlternativeIssueTypes(client, parameters, options),
      createIssueTypeAvatarFromTemporary: (
        parameters: CreateIssueTypeAvatarFromTemporary,
        options?: RequestOptions,
      ): Promise<Avatar> => issueTypes.createIssueTypeAvatarFromTemporary(client, parameters, options),
      storeTemporaryIssueTypeAvatarUsingMultiPart: (
        parameters: StoreTemporaryIssueTypeAvatarUsingMultiPart,
        options?: RequestOptions,
      ): Promise<unknown> => issueTypes.storeTemporaryIssueTypeAvatarUsingMultiPart(client, parameters, options),
      getIssueTypePropertyKeys: (
        parameters: GetIssueTypePropertyKeys,
        options?: RequestOptions,
      ): Promise<EntityPropertiesKeys> => issueTypes.getIssueTypePropertyKeys(client, parameters, options),
      getIssueTypeProperty: (parameters: GetIssueTypeProperty, options?: RequestOptions): Promise<EntityProperty> =>
        issueTypes.getIssueTypeProperty(client, parameters, options),
      setIssueTypeProperty: (parameters: SetIssueTypeProperty, options?: RequestOptions): Promise<void> =>
        issueTypes.setIssueTypeProperty(client, parameters, options),
      deleteIssueTypeProperty: (parameters: DeleteIssueTypeProperty, options?: RequestOptions): Promise<void> =>
        issueTypes.deleteIssueTypeProperty(client, parameters, options),
    },
    issueTypeSchemes: {
      getAllIssueTypeSchemes: (options?: RequestOptions): Promise<IssueTypeSchemeList> =>
        issueTypeSchemes.getAllIssueTypeSchemes(client, options),
      createIssueTypeScheme: (parameters: CreateIssueTypeScheme, options?: RequestOptions): Promise<IssueTypeScheme> =>
        issueTypeSchemes.createIssueTypeScheme(client, parameters, options),
      getIssueTypeScheme: (parameters: GetIssueTypeScheme, options?: RequestOptions): Promise<IssueTypeScheme> =>
        issueTypeSchemes.getIssueTypeScheme(client, parameters, options),
      updateIssueTypeScheme: (parameters: UpdateIssueTypeScheme, options?: RequestOptions): Promise<IssueTypeScheme> =>
        issueTypeSchemes.updateIssueTypeScheme(client, parameters, options),
      deleteIssueTypeScheme: (parameters: DeleteIssueTypeScheme, options?: RequestOptions): Promise<void> =>
        issueTypeSchemes.deleteIssueTypeScheme(client, parameters, options),
      getAssociatedProjects: (parameters: GetAssociatedProjects, options?: RequestOptions): Promise<Project[]> =>
        issueTypeSchemes.getAssociatedProjects(client, parameters, options),
      addProjectAssociationsToScheme: (
        parameters: AddProjectAssociationsToScheme,
        options?: RequestOptions,
      ): Promise<void> => issueTypeSchemes.addProjectAssociationsToScheme(client, parameters, options),
      setProjectAssociationsForScheme: (
        parameters: SetProjectAssociationsForScheme,
        options?: RequestOptions,
      ): Promise<void> => issueTypeSchemes.setProjectAssociationsForScheme(client, parameters, options),
      removeAllProjectAssociations: (
        parameters: RemoveAllProjectAssociations,
        options?: RequestOptions,
      ): Promise<void> => issueTypeSchemes.removeAllProjectAssociations(client, parameters, options),
      removeProjectAssociation: (parameters: RemoveProjectAssociation, options?: RequestOptions): Promise<void> =>
        issueTypeSchemes.removeProjectAssociation(client, parameters, options),
    },
    jql: {
      getAutoComplete: (options?: RequestOptions): Promise<AutoCompleteResponse> =>
        jql.getAutoComplete(client, options),
      getFieldAutoCompleteForQueryString: (
        parameters?: GetFieldAutoCompleteForQueryString,
        options?: RequestOptions,
      ): Promise<AutoCompleteResultWrapper> => jql.getFieldAutoCompleteForQueryString(client, parameters, options),
    },
    licenseValidator: {
      validate: (parameters: Validate, options?: RequestOptions): Promise<LicenseValidationResults> =>
        licenseValidator.validate(client, parameters, options),
    },
    monitoring: {
      isAppMonitoringEnabled: (options?: RequestOptions): Promise<AppMonitoringRestEntity> =>
        monitoring.isAppMonitoringEnabled(client, options),
      setAppMonitoringEnabled: (parameters: SetAppMonitoringEnabled, options?: RequestOptions): Promise<void> =>
        monitoring.setAppMonitoringEnabled(client, parameters, options),
      isIpdMonitoringEnabled: (options?: RequestOptions): Promise<IpdMonitoringRestEntity> =>
        monitoring.isIpdMonitoringEnabled(client, options),
      setIpdMonitoringEnabled: (parameters: SetIpdMonitoringEnabled, options?: RequestOptions): Promise<void> =>
        monitoring.setIpdMonitoringEnabled(client, parameters, options),
      areMetricsExposed: (options?: RequestOptions): Promise<unknown> => monitoring.areMetricsExposed(client, options),
      getAvailableMetrics: (options?: RequestOptions): Promise<unknown> =>
        monitoring.getAvailableMetrics(client, options),
      start: (options?: RequestOptions): Promise<void> => monitoring.start(client, options),
      stop: (options?: RequestOptions): Promise<void> => monitoring.stop(client, options),
    },
    permissions: {
      getPermissions: (parameters?: GetPermissions, options?: RequestOptions): Promise<PermissionsJson> =>
        permissions.getPermissions(client, parameters, options),
      getAllPermissions: (options?: RequestOptions): Promise<PermissionsJson> =>
        permissions.getAllPermissions(client, options),
    },
    myPreferences: {
      getPreference: (parameters?: GetPreference, options?: RequestOptions): Promise<string> =>
        myPreferences.getPreference(client, parameters, options),
      setPreference: (parameters: SetPreference, options?: RequestOptions): Promise<void> =>
        myPreferences.setPreference(client, parameters, options),
      removePreference: (parameters: RemovePreference, options?: RequestOptions): Promise<void> =>
        myPreferences.removePreference(client, parameters, options),
    },
    myself: {
      getCurrentUser: (options?: RequestOptions): Promise<User> => myself.getCurrentUser(client, options),
      updateCurrentUser: (parameters: UpdateCurrentUser, options?: RequestOptions): Promise<UserWrite> =>
        myself.updateCurrentUser(client, parameters, options),
      changeMyPassword: (parameters: ChangeMyPassword, options?: RequestOptions): Promise<void> =>
        myself.changeMyPassword(client, parameters, options),
    },
    issueNotificationSchemes: {
      getNotificationSchemes: (parameters?: GetNotificationSchemes, options?: RequestOptions): Promise<PagedResults> =>
        issueNotificationSchemes.getNotificationSchemes(client, parameters, options),
      getNotificationScheme: (
        parameters: GetNotificationScheme,
        options?: RequestOptions,
      ): Promise<NotificationScheme> => issueNotificationSchemes.getNotificationScheme(client, parameters, options),
    },
    password: {
      getPasswordPolicy: (parameters?: GetPasswordPolicy, options?: RequestOptions): Promise<unknown> =>
        password.getPasswordPolicy(client, parameters, options),
      policyCheckCreateUser: (parameters: PolicyCheckCreateUser, options?: RequestOptions): Promise<unknown> =>
        password.policyCheckCreateUser(client, parameters, options),
      policyCheckUpdateUser: (parameters: PolicyCheckUpdateUser, options?: RequestOptions): Promise<unknown> =>
        password.policyCheckUpdateUser(client, parameters, options),
    },
    permissionSchemes: {
      getPermissionSchemes: (parameters?: GetPermissionSchemes, options?: RequestOptions): Promise<PermissionSchemes> =>
        permissionSchemes.getPermissionSchemes(client, parameters, options),
      createPermissionScheme: (
        parameters: CreatePermissionScheme,
        options?: RequestOptions,
      ): Promise<PermissionScheme> => permissionSchemes.createPermissionScheme(client, parameters, options),
      getSchemeAttribute: (
        parameters: GetSchemeAttribute,
        options?: RequestOptions,
      ): Promise<PermissionSchemeAttribute> => permissionSchemes.getSchemeAttribute(client, parameters, options),
      setSchemeAttribute: (parameters: SetSchemeAttribute, options?: RequestOptions): Promise<void> =>
        permissionSchemes.setSchemeAttribute(client, parameters, options),
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
      getPriorities: (options?: RequestOptions): Promise<PriorityJson[]> =>
        issuePriorities.getPriorities(client, options),
      getPrioritiesPaginated: (parameters?: GetPrioritiesPaginated, options?: RequestOptions): Promise<PriorityJson> =>
        issuePriorities.getPrioritiesPaginated(client, parameters, options),
      getPriority: (parameters: GetPriority, options?: RequestOptions): Promise<PriorityJson> =>
        issuePriorities.getPriority(client, parameters, options),
    },
    prioritySchemes: {
      getPrioritySchemes: (parameters?: GetPrioritySchemes, options?: RequestOptions): Promise<PrioritySchemeList> =>
        prioritySchemes.getPrioritySchemes(client, parameters, options),
      createPriorityScheme: (parameters: CreatePriorityScheme, options?: RequestOptions): Promise<PriorityScheme> =>
        prioritySchemes.createPriorityScheme(client, parameters, options),
      getPriorityScheme: (parameters: GetPriorityScheme, options?: RequestOptions): Promise<PriorityScheme> =>
        prioritySchemes.getPriorityScheme(client, parameters, options),
      updatePriorityScheme: (parameters: UpdatePriorityScheme, options?: RequestOptions): Promise<PriorityScheme> =>
        prioritySchemes.updatePriorityScheme(client, parameters, options),
      deletePriorityScheme: (parameters: DeletePriorityScheme, options?: RequestOptions): Promise<void> =>
        prioritySchemes.deletePriorityScheme(client, parameters, options),
    },
    projects: {
      getAllProjects: (parameters?: GetAllProjects, options?: RequestOptions): Promise<Project[]> =>
        projects.getAllProjects(client, parameters, options),
      createProject: (parameters: CreateProject, options?: RequestOptions): Promise<ProjectIdentity> =>
        projects.createProject(client, parameters, options),
      getAllProjectTypes: (options?: RequestOptions): Promise<ProjectType[]> =>
        projects.getAllProjectTypes(client, options),
      getProjectTypeByKey: (parameters: GetProjectTypeByKey, options?: RequestOptions): Promise<ProjectType> =>
        projects.getProjectTypeByKey(client, parameters, options),
      getAccessibleProjectTypeByKey: (
        parameters: GetAccessibleProjectTypeByKey,
        options?: RequestOptions,
      ): Promise<ProjectType> => projects.getAccessibleProjectTypeByKey(client, parameters, options),
      getProject: (parameters: GetProject, options?: RequestOptions): Promise<Project> =>
        projects.getProject(client, parameters, options),
      updateProject: (parameters: UpdateProject, options?: RequestOptions): Promise<Project> =>
        projects.updateProject(client, parameters, options),
      deleteProject: (parameters: DeleteProject, options?: RequestOptions): Promise<void> =>
        projects.deleteProject(client, parameters, options),
      archiveProject: (parameters: ArchiveProject, options?: RequestOptions): Promise<void> =>
        projects.archiveProject(client, parameters, options),
      createProjectAvatarFromTemporary: (
        parameters: CreateProjectAvatarFromTemporary,
        options?: RequestOptions,
      ): Promise<Avatar> => projects.createProjectAvatarFromTemporary(client, parameters, options),
      updateProjectAvatar: (parameters: UpdateProjectAvatar, options?: RequestOptions): Promise<void> =>
        projects.updateProjectAvatar(client, parameters, options),
      storeTemporaryProjectAvatarUsingMultiPart: (
        parameters: StoreTemporaryProjectAvatarUsingMultiPart,
        options?: RequestOptions,
      ): Promise<unknown> => projects.storeTemporaryProjectAvatarUsingMultiPart(client, parameters, options),
      deleteProjectAvatar: (parameters: DeleteProjectAvatar, options?: RequestOptions): Promise<void> =>
        projects.deleteProjectAvatar(client, parameters, options),
      getAllProjectAvatars: (
        parameters: GetAllProjectAvatars,
        options?: RequestOptions,
      ): Promise<GetAllProjectAvatarsModel> => projects.getAllProjectAvatars(client, parameters, options),
      getProjectComponents: (parameters: GetProjectComponents, options?: RequestOptions): Promise<Component[]> =>
        projects.getProjectComponents(client, parameters, options),
      getProjectPropertyKeys: (
        parameters: GetProjectPropertyKeys,
        options?: RequestOptions,
      ): Promise<EntityPropertiesKeys> => projects.getProjectPropertyKeys(client, parameters, options),
      getProjectProperty: (parameters: GetProjectProperty, options?: RequestOptions): Promise<EntityProperty> =>
        projects.getProjectProperty(client, parameters, options),
      setProjectProperty: (parameters: SetProjectProperty, options?: RequestOptions): Promise<void> =>
        projects.setProjectProperty(client, parameters, options),
      deleteProjectProperty: (parameters: DeleteProjectProperty, options?: RequestOptions): Promise<void> =>
        projects.deleteProjectProperty(client, parameters, options),
      restoreProject: (parameters: RestoreProject, options?: RequestOptions): Promise<void> =>
        projects.restoreProject(client, parameters, options),
      getProjectRoles: (parameters: GetProjectRoles, options?: RequestOptions): Promise<GetProjectRolesModel> =>
        projects.getProjectRoles(client, parameters, options),
      getProjectRole: (parameters: GetProjectRole, options?: RequestOptions): Promise<ProjectRole> =>
        projects.getProjectRole(client, parameters, options),
      addActorUsers: (parameters: AddActorUsers, options?: RequestOptions): Promise<ProjectRole> =>
        projects.addActorUsers(client, parameters, options),
      setActors: (parameters: SetActors, options?: RequestOptions): Promise<ProjectRole> =>
        projects.setActors(client, parameters, options),
      deleteActor: (parameters: DeleteActor, options?: RequestOptions): Promise<void> =>
        projects.deleteActor(client, parameters, options),
      getAllStatuses: (parameters: GetAllStatuses, options?: RequestOptions): Promise<IssueTypeWithStatusJson[]> =>
        projects.getAllStatuses(client, parameters, options),
      updateProjectType: (parameters: UpdateProjectType, options?: RequestOptions): Promise<Project> =>
        projects.updateProjectType(client, parameters, options),
      getProjectVersionsPaginated: (
        parameters: GetProjectVersionsPaginated,
        options?: RequestOptions,
      ): Promise<PagedResults> => projects.getProjectVersionsPaginated(client, parameters, options),
      getProjectVersions: (parameters: GetProjectVersions, options?: RequestOptions): Promise<Version[]> =>
        projects.getProjectVersions(client, parameters, options),
      getProjectIssueSecurityScheme: (
        parameters: GetProjectIssueSecurityScheme,
        options?: RequestOptions,
      ): Promise<SecuritySchemeJson> => projects.getProjectIssueSecurityScheme(client, parameters, options),
      getProjectNotificationScheme: (
        parameters: GetProjectNotificationScheme,
        options?: RequestOptions,
      ): Promise<NotificationScheme> => projects.getProjectNotificationScheme(client, parameters, options),
      getAssignedPermissionScheme: (
        parameters: GetAssignedPermissionScheme,
        options?: RequestOptions,
      ): Promise<PermissionScheme> => projects.getAssignedPermissionScheme(client, parameters, options),
      assignPermissionScheme: (
        parameters: AssignPermissionScheme,
        options?: RequestOptions,
      ): Promise<PermissionScheme> => projects.assignPermissionScheme(client, parameters, options),
      getAssignedPriorityScheme: (
        parameters: GetAssignedPriorityScheme,
        options?: RequestOptions,
      ): Promise<PriorityScheme> => projects.getAssignedPriorityScheme(client, parameters, options),
      assignPriorityScheme: (parameters: AssignPriorityScheme, options?: RequestOptions): Promise<PriorityScheme> =>
        projects.assignPriorityScheme(client, parameters, options),
      unassignPriorityScheme: (parameters: UnassignPriorityScheme, options?: RequestOptions): Promise<PriorityScheme> =>
        projects.unassignPriorityScheme(client, parameters, options),
      getSecurityLevelsForProject: (
        parameters: GetSecurityLevelsForProject,
        options?: RequestOptions,
      ): Promise<SecurityListLevelJson> => projects.getSecurityLevelsForProject(client, parameters, options),
      getWorkflowSchemeForProject: (
        parameters: GetWorkflowSchemeForProject,
        options?: RequestOptions,
      ): Promise<WorkflowScheme> => projects.getWorkflowSchemeForProject(client, parameters, options),
      searchForProjects: (
        parameters?: SearchForProjects,
        options?: RequestOptions,
      ): Promise<ProjectPickerResultWrapper> => projects.searchForProjects(client, parameters, options),
    },
    projectCategories: {
      getAllProjectCategories: (options?: RequestOptions): Promise<ProjectCategoryJson[]> =>
        projectCategories.getAllProjectCategories(client, options),
      createProjectCategory: (
        parameters: CreateProjectCategory,
        options?: RequestOptions,
      ): Promise<ProjectCategoryJson> => projectCategories.createProjectCategory(client, parameters, options),
      getProjectCategoryById: (
        parameters: GetProjectCategoryById,
        options?: RequestOptions,
      ): Promise<ProjectCategoryJson> => projectCategories.getProjectCategoryById(client, parameters, options),
      updateProjectCategory: (
        parameters: UpdateProjectCategory,
        options?: RequestOptions,
      ): Promise<ProjectCategoryJson> => projectCategories.updateProjectCategory(client, parameters, options),
      removeProjectCategory: (parameters: RemoveProjectCategory, options?: RequestOptions): Promise<void> =>
        projectCategories.removeProjectCategory(client, parameters, options),
    },
    projectKeyAndNameValidation: {
      validateProjectKey: (parameters?: ValidateProjectKey, options?: RequestOptions): Promise<ErrorCollection> =>
        projectKeyAndNameValidation.validateProjectKey(client, parameters, options),
    },
    readOnlyMode: {
      getReadOnlyMode: (options?: RequestOptions): Promise<ReadOnlyModeStatus> =>
        readOnlyMode.getReadOnlyMode(client, options),
      updateReadOnlyMode: (parameters: UpdateReadOnlyMode, options?: RequestOptions): Promise<void> =>
        readOnlyMode.updateReadOnlyMode(client, parameters, options),
    },
    issueResolutions: {
      getResolutions: (options?: RequestOptions): Promise<ResolutionJson[]> =>
        issueResolutions.getResolutions(client, options),
      getPaginatedResolutions: (parameters?: GetPaginatedResolutions, options?: RequestOptions): Promise<Resolution> =>
        issueResolutions.getPaginatedResolutions(client, parameters, options),
      getResolution: (parameters: GetResolution, options?: RequestOptions): Promise<ResolutionJson> =>
        issueResolutions.getResolution(client, parameters, options),
    },
    projectRoles: {
      getAllProjectRoles: (options?: RequestOptions): Promise<ProjectRole[]> =>
        projectRoles.getAllProjectRoles(client, options),
      createProjectRole: (parameters: CreateProjectRole, options?: RequestOptions): Promise<ProjectRole> =>
        projectRoles.createProjectRole(client, parameters, options),
      getProjectRolesById: (parameters: GetProjectRolesById, options?: RequestOptions): Promise<ProjectRole> =>
        projectRoles.getProjectRolesById(client, parameters, options),
      partialUpdateProjectRole: (
        parameters: PartialUpdateProjectRole,
        options?: RequestOptions,
      ): Promise<ProjectRole> => projectRoles.partialUpdateProjectRole(client, parameters, options),
      fullyUpdateProjectRole: (parameters: FullyUpdateProjectRole, options?: RequestOptions): Promise<ProjectRole> =>
        projectRoles.fullyUpdateProjectRole(client, parameters, options),
      deleteProjectRole: (parameters: DeleteProjectRole, options?: RequestOptions): Promise<void> =>
        projectRoles.deleteProjectRole(client, parameters, options),
      getProjectRoleActorsForRole: (
        parameters: GetProjectRoleActorsForRole,
        options?: RequestOptions,
      ): Promise<ProjectRoleActors> => projectRoles.getProjectRoleActorsForRole(client, parameters, options),
      addProjectRoleActorsToRole: (
        parameters: AddProjectRoleActorsToRole,
        options?: RequestOptions,
      ): Promise<ProjectRoleActors> => projectRoles.addProjectRoleActorsToRole(client, parameters, options),
      deleteProjectRoleActorsFromRole: (
        parameters: DeleteProjectRoleActorsFromRole,
        options?: RequestOptions,
      ): Promise<ProjectRoleActors> => projectRoles.deleteProjectRoleActorsFromRole(client, parameters, options),
    },
    screens: {
      getAllScreens: (parameters?: GetAllScreens, options?: RequestOptions): Promise<Screen[]> =>
        screens.getAllScreens(client, parameters, options),
      addFieldToDefaultScreen: (parameters: AddFieldToDefaultScreen, options?: RequestOptions): Promise<void> =>
        screens.addFieldToDefaultScreen(client, parameters, options),
      getFieldsToAdd: (parameters: GetFieldsToAdd, options?: RequestOptions): Promise<ScreenableField[]> =>
        screens.getFieldsToAdd(client, parameters, options),
      getAllTabs: (parameters: GetAllTabs, options?: RequestOptions): Promise<ScreenableTab[]> =>
        screens.getAllTabs(client, parameters, options),
      addTab: (parameters: AddTab, options?: RequestOptions): Promise<ScreenableTab> =>
        screens.addTab(client, parameters, options),
      renameTab: (parameters: RenameTab, options?: RequestOptions): Promise<ScreenableTab> =>
        screens.renameTab(client, parameters, options),
      deleteTab: (parameters: DeleteTab, options?: RequestOptions): Promise<void> =>
        screens.deleteTab(client, parameters, options),
      getAllFields: (parameters: GetAllFields, options?: RequestOptions): Promise<ScreenableField[]> =>
        screens.getAllFields(client, parameters, options),
      addField: (parameters: AddField, options?: RequestOptions): Promise<ScreenableField> =>
        screens.addField(client, parameters, options),
      removeField: (parameters: RemoveField, options?: RequestOptions): Promise<void> =>
        screens.removeField(client, parameters, options),
      moveField: (parameters: MoveField, options?: RequestOptions): Promise<void> =>
        screens.moveField(client, parameters, options),
      updateShowWhenEmptyIndicator: (
        parameters: UpdateShowWhenEmptyIndicator,
        options?: RequestOptions,
      ): Promise<void> => screens.updateShowWhenEmptyIndicator(client, parameters, options),
      moveTab: (parameters: MoveTab, options?: RequestOptions): Promise<void> =>
        screens.moveTab(client, parameters, options),
    },
    issueSearch: {
      search: (parameters?: Search, options?: RequestOptions): Promise<SearchResults> =>
        issueSearch.search(client, parameters, options),
      searchUsingSearchRequest: (
        parameters: SearchUsingSearchRequest,
        options?: RequestOptions,
      ): Promise<SearchResults> => issueSearch.searchUsingSearchRequest(client, parameters, options),
      getError: (options?: RequestOptions): Promise<void> => issueSearch.getError(client, options),
    },
    searchLimits: {
      getMaxAggregationBuckets: (options?: RequestOptions): Promise<unknown> =>
        searchLimits.getMaxAggregationBuckets(client, options),
      getMaxResultWindow: (options?: RequestOptions): Promise<unknown> =>
        searchLimits.getMaxResultWindow(client, options),
    },
    issueSecurityLevel: {
      getIssuesecuritylevel: (
        parameters: GetIssuesecuritylevel,
        options?: RequestOptions,
      ): Promise<SecurityLevelJson> => issueSecurityLevel.getIssuesecuritylevel(client, parameters, options),
    },
    serverInfo: {
      getServerInfo: (options?: RequestOptions): Promise<ServerInfo> => serverInfo.getServerInfo(client, options),
    },
    jiraSettings: {
      setBaseURL: (parameters: SetBaseURL, options?: RequestOptions): Promise<void> =>
        jiraSettings.setBaseURL(client, parameters, options),
      getIssueNavigatorDefaultColumns: (options?: RequestOptions): Promise<ColumnOptions[]> =>
        jiraSettings.getIssueNavigatorDefaultColumns(client, options),
      setIssueNavigatorDefaultColumnsForm: (
        parameters: SetIssueNavigatorDefaultColumnsForm,
        options?: RequestOptions,
      ): Promise<void> => jiraSettings.setIssueNavigatorDefaultColumnsForm(client, parameters, options),
    },
    workflowStatuses: {
      getStatuses: (options?: RequestOptions): Promise<StatusJson[]> => workflowStatuses.getStatuses(client, options),
      getPaginatedStatuses: (parameters?: GetPaginatedStatuses, options?: RequestOptions): Promise<StatusJson> =>
        workflowStatuses.getPaginatedStatuses(client, parameters, options),
      getStatus: (parameters: GetStatus, options?: RequestOptions): Promise<StatusJson> =>
        workflowStatuses.getStatus(client, parameters, options),
    },
    workflowStatusCategories: {
      getStatusCategories: (
        parameters?: GetStatusCategories,
        options?: RequestOptions,
      ): Promise<StatusCategoryJson[]> => workflowStatusCategories.getStatusCategories(client, parameters, options),
      getStatusCategory: (parameters: GetStatusCategory, options?: RequestOptions): Promise<StatusCategoryJson> =>
        workflowStatusCategories.getStatusCategory(client, parameters, options),
    },
    terminology: {
      getAllTerminologyEntries: (options?: RequestOptions): Promise<TerminologyResponse[]> =>
        terminology.getAllTerminologyEntries(client, options),
      setTerminologyEntries: (parameters: SetTerminologyEntries, options?: RequestOptions): Promise<unknown> =>
        terminology.setTerminologyEntries(client, parameters, options),
      getTerminologyEntry: (parameters: GetTerminologyEntry, options?: RequestOptions): Promise<TerminologyResponse> =>
        terminology.getTerminologyEntry(client, parameters, options),
    },
    upgrade: {
      getUpgradeResult: (options?: RequestOptions): Promise<UpgradeResult> => upgrade.getUpgradeResult(client, options),
      runUpgradesNow: (options?: RequestOptions): Promise<void> => upgrade.runUpgradesNow(client, options),
    },
    users: {
      getUser: (parameters?: GetUser, options?: RequestOptions): Promise<User> =>
        users.getUser(client, parameters, options),
      createUser: (parameters: CreateUser, options?: RequestOptions): Promise<UserWrite> =>
        users.createUser(client, parameters, options),
      updateUser: (parameters: UpdateUser, options?: RequestOptions): Promise<UserWrite> =>
        users.updateUser(client, parameters, options),
      removeUser: (parameters: RemoveUser, options?: RequestOptions): Promise<void> =>
        users.removeUser(client, parameters, options),
      getA11yPersonalSettings: (options?: RequestOptions): Promise<A11yPersonalSetting[]> =>
        users.getA11yPersonalSettings(client, options),
      validateUserAnonymization: (
        parameters?: ValidateUserAnonymization,
        options?: RequestOptions,
      ): Promise<UserAnonymizationValidation> => users.validateUserAnonymization(client, parameters, options),
      scheduleUserAnonymization: (parameters: ScheduleUserAnonymization, options?: RequestOptions): Promise<void> =>
        users.scheduleUserAnonymization(client, parameters, options),
      getUserAnonymizationProgress: (
        parameters?: GetUserAnonymizationProgress,
        options?: RequestOptions,
      ): Promise<void> => users.getUserAnonymizationProgress(client, parameters, options),
      validateUserAnonymizationRerun: (
        parameters?: ValidateUserAnonymizationRerun,
        options?: RequestOptions,
      ): Promise<UserAnonymizationValidation> => users.validateUserAnonymizationRerun(client, parameters, options),
      scheduleUserAnonymizationRerun: (
        parameters: ScheduleUserAnonymizationRerun,
        options?: RequestOptions,
      ): Promise<void> => users.scheduleUserAnonymizationRerun(client, parameters, options),
      unlockAnonymization: (options?: RequestOptions): Promise<void> => users.unlockAnonymization(client, options),
      addUserToApplication: (parameters: AddUserToApplication, options?: RequestOptions): Promise<void> =>
        users.addUserToApplication(client, parameters, options),
      removeUserFromApplication: (parameters: RemoveUserFromApplication, options?: RequestOptions): Promise<void> =>
        users.removeUserFromApplication(client, parameters, options),
      findBulkAssignableUsers: (parameters?: FindBulkAssignableUsers, options?: RequestOptions): Promise<User> =>
        users.findBulkAssignableUsers(client, parameters, options),
      findAssignableUsers: (parameters?: FindAssignableUsers, options?: RequestOptions): Promise<User> =>
        users.findAssignableUsers(client, parameters, options),
      createUserAvatarFromTemporary: (
        parameters: CreateUserAvatarFromTemporary,
        options?: RequestOptions,
      ): Promise<Avatar> => users.createUserAvatarFromTemporary(client, parameters, options),
      updateUserAvatar: (parameters: UpdateUserAvatar, options?: RequestOptions): Promise<Avatar> =>
        users.updateUserAvatar(client, parameters, options),
      storeTemporaryUserAvatarUsingMultiPart: (
        parameters: StoreTemporaryUserAvatarUsingMultiPart,
        options?: RequestOptions,
      ): Promise<unknown> => users.storeTemporaryUserAvatarUsingMultiPart(client, parameters, options),
      deleteUserAvatar: (parameters: DeleteUserAvatar, options?: RequestOptions): Promise<void> =>
        users.deleteUserAvatar(client, parameters, options),
      getAllUserAvatars: (parameters?: GetAllUserAvatars, options?: RequestOptions): Promise<GetAllUserAvatarsModel> =>
        users.getAllUserAvatars(client, parameters, options),
      defaultColumns: (parameters?: DefaultColumns, options?: RequestOptions): Promise<ColumnOptions[]> =>
        users.defaultColumns(client, parameters, options),
      setColumnsUrlEncoded: (parameters: SetColumnsUrlEncoded, options?: RequestOptions): Promise<void> =>
        users.setColumnsUrlEncoded(client, parameters, options),
      resetUserColumns: (parameters: ResetUserColumns, options?: RequestOptions): Promise<void> =>
        users.resetUserColumns(client, parameters, options),
      getDuplicatedUsersCount: (parameters?: GetDuplicatedUsersCount, options?: RequestOptions): Promise<User> =>
        users.getDuplicatedUsersCount(client, parameters, options),
      getDuplicatedUsersMapping: (parameters?: GetDuplicatedUsersMapping, options?: RequestOptions): Promise<Avatar> =>
        users.getDuplicatedUsersMapping(client, parameters, options),
      getUserList: (parameters?: GetUserList, options?: RequestOptions): Promise<StreamPage> =>
        users.getUserList(client, parameters, options),
      changeUserPassword: (parameters: ChangeUserPassword, options?: RequestOptions): Promise<void> =>
        users.changeUserPassword(client, parameters, options),
      findUsersForPicker: (parameters?: FindUsersForPicker, options?: RequestOptions): Promise<UserPickerResults> =>
        users.findUsersForPicker(client, parameters, options),
      getUserPropertyKeys: (
        parameters?: GetUserPropertyKeys,
        options?: RequestOptions,
      ): Promise<EntityPropertiesKeys> => users.getUserPropertyKeys(client, parameters, options),
      getUserProperty: (parameters: GetUserProperty, options?: RequestOptions): Promise<EntityProperty> =>
        users.getUserProperty(client, parameters, options),
      setUserProperty: (parameters: SetUserProperty, options?: RequestOptions): Promise<void> =>
        users.setUserProperty(client, parameters, options),
      deleteUserProperty: (parameters: DeleteUserProperty, options?: RequestOptions): Promise<void> =>
        users.deleteUserProperty(client, parameters, options),
      findUsers: (parameters?: FindUsers, options?: RequestOptions): Promise<User> =>
        users.findUsers(client, parameters, options),
      deleteSession: (parameters: DeleteSession, options?: RequestOptions): Promise<void> =>
        users.deleteSession(client, parameters, options),
      findUsersWithBrowsePermission: (
        parameters?: FindUsersWithBrowsePermission,
        options?: RequestOptions,
      ): Promise<User> => users.findUsersWithBrowsePermission(client, parameters, options),
    },
    projectVersions: {
      getPaginatedVersions: (parameters?: GetPaginatedVersions, options?: RequestOptions): Promise<Version> =>
        projectVersions.getPaginatedVersions(client, parameters, options),
      createVersion: (parameters: CreateVersion, options?: RequestOptions): Promise<Version> =>
        projectVersions.createVersion(client, parameters, options),
      getRemoteVersionLinks: (
        parameters?: GetRemoteVersionLinks,
        options?: RequestOptions,
      ): Promise<RemoteEntityLinksJson> => projectVersions.getRemoteVersionLinks(client, parameters, options),
      getVersion: (parameters: GetVersion, options?: RequestOptions): Promise<Version> =>
        projectVersions.getVersion(client, parameters, options),
      updateVersion: (parameters: UpdateVersion, options?: RequestOptions): Promise<void> =>
        projectVersions.updateVersion(client, parameters, options),
      merge: (parameters: Merge, options?: RequestOptions): Promise<void> =>
        projectVersions.merge(client, parameters, options),
      moveVersion: (parameters: MoveVersion, options?: RequestOptions): Promise<Version> =>
        projectVersions.moveVersion(client, parameters, options),
      getVersionRelatedIssues: (
        parameters: GetVersionRelatedIssues,
        options?: RequestOptions,
      ): Promise<VersionIssueCounts> => projectVersions.getVersionRelatedIssues(client, parameters, options),
      deleteVersionAndSwap: (parameters: DeleteVersionAndSwap, options?: RequestOptions): Promise<void> =>
        projectVersions.deleteVersionAndSwap(client, parameters, options),
      getVersionUnresolvedIssues: (
        parameters: GetVersionUnresolvedIssues,
        options?: RequestOptions,
      ): Promise<VersionUnresolvedIssueCounts> =>
        projectVersions.getVersionUnresolvedIssues(client, parameters, options),
      getRemoteVersionLinksByVersionId: (
        parameters: GetRemoteVersionLinksByVersionId,
        options?: RequestOptions,
      ): Promise<RemoteEntityLinksJson> =>
        projectVersions.getRemoteVersionLinksByVersionId(client, parameters, options),
      createOrUpdateRemoteVersionLink: (
        parameters: CreateOrUpdateRemoteVersionLink,
        options?: RequestOptions,
      ): Promise<void> => projectVersions.createOrUpdateRemoteVersionLink(client, parameters, options),
      deleteRemoteVersionLinksByVersionId: (
        parameters: DeleteRemoteVersionLinksByVersionId,
        options?: RequestOptions,
      ): Promise<void> => projectVersions.deleteRemoteVersionLinksByVersionId(client, parameters, options),
      getRemoteVersionLink: (
        parameters: GetRemoteVersionLink,
        options?: RequestOptions,
      ): Promise<RemoteEntityLinkJson> => projectVersions.getRemoteVersionLink(client, parameters, options),
      createOrUpdateRemoteVersionLinkByGlobalId: (
        parameters: CreateOrUpdateRemoteVersionLinkByGlobalId,
        options?: RequestOptions,
      ): Promise<void> => projectVersions.createOrUpdateRemoteVersionLinkByGlobalId(client, parameters, options),
      deleteRemoteVersionLink: (parameters: DeleteRemoteVersionLink, options?: RequestOptions): Promise<void> =>
        projectVersions.deleteRemoteVersionLink(client, parameters, options),
    },
    workflows: {
      getAllWorkflows: (parameters?: GetAllWorkflows, options?: RequestOptions): Promise<Workflow[]> =>
        workflows.getAllWorkflows(client, parameters, options),
    },
    workflowSchemes: {
      createScheme: (parameters: CreateScheme, options?: RequestOptions): Promise<WorkflowScheme> =>
        workflowSchemes.createScheme(client, parameters, options),
      getById: (parameters: GetById, options?: RequestOptions): Promise<WorkflowScheme> =>
        workflowSchemes.getById(client, parameters, options),
      updateWorkflowScheme: (parameters: UpdateWorkflowScheme, options?: RequestOptions): Promise<WorkflowScheme> =>
        workflowSchemes.updateWorkflowScheme(client, parameters, options),
      deleteScheme: (parameters: DeleteScheme, options?: RequestOptions): Promise<void> =>
        workflowSchemes.deleteScheme(client, parameters, options),
      createDraftForParent: (parameters: CreateDraftForParent, options?: RequestOptions): Promise<WorkflowScheme> =>
        workflowSchemes.createDraftForParent(client, parameters, options),
      getDefault: (parameters: GetDefault, options?: RequestOptions): Promise<WorkflowScheme> =>
        workflowSchemes.getDefault(client, parameters, options),
      updateDefault: (parameters: UpdateDefault, options?: RequestOptions): Promise<WorkflowScheme> =>
        workflowSchemes.updateDefault(client, parameters, options),
      deleteDefault: (parameters: DeleteDefault, options?: RequestOptions): Promise<WorkflowScheme> =>
        workflowSchemes.deleteDefault(client, parameters, options),
      getDraftById: (parameters: GetDraftById, options?: RequestOptions): Promise<WorkflowScheme> =>
        workflowSchemes.getDraftById(client, parameters, options),
      updateDraft: (parameters: UpdateDraft, options?: RequestOptions): Promise<WorkflowScheme> =>
        workflowSchemes.updateDraft(client, parameters, options),
      deleteDraftById: (parameters: DeleteDraftById, options?: RequestOptions): Promise<void> =>
        workflowSchemes.deleteDraftById(client, parameters, options),
      getDraftDefault: (parameters: GetDraftDefault, options?: RequestOptions): Promise<WorkflowScheme> =>
        workflowSchemes.getDraftDefault(client, parameters, options),
      updateDraftDefault: (parameters: UpdateDraftDefault, options?: RequestOptions): Promise<WorkflowScheme> =>
        workflowSchemes.updateDraftDefault(client, parameters, options),
      deleteDraftDefault: (parameters: DeleteDraftDefault, options?: RequestOptions): Promise<WorkflowScheme> =>
        workflowSchemes.deleteDraftDefault(client, parameters, options),
      getDraftIssueType: (parameters: GetDraftIssueType, options?: RequestOptions): Promise<IssueTypeMapping> =>
        workflowSchemes.getDraftIssueType(client, parameters, options),
      setDraftIssueType: (parameters: SetDraftIssueType, options?: RequestOptions): Promise<WorkflowScheme> =>
        workflowSchemes.setDraftIssueType(client, parameters, options),
      deleteDraftIssueType: (parameters: DeleteDraftIssueType, options?: RequestOptions): Promise<WorkflowScheme> =>
        workflowSchemes.deleteDraftIssueType(client, parameters, options),
      getDraftWorkflow: (parameters: GetDraftWorkflow, options?: RequestOptions): Promise<WorkflowScheme> =>
        workflowSchemes.getDraftWorkflow(client, parameters, options),
      updateDraftWorkflowMapping: (
        parameters: UpdateDraftWorkflowMapping,
        options?: RequestOptions,
      ): Promise<WorkflowScheme> => workflowSchemes.updateDraftWorkflowMapping(client, parameters, options),
      deleteDraftWorkflowMapping: (
        parameters: DeleteDraftWorkflowMapping,
        options?: RequestOptions,
      ): Promise<WorkflowScheme> => workflowSchemes.deleteDraftWorkflowMapping(client, parameters, options),
      getWorkflowSchemeIssueType: (
        parameters: GetWorkflowSchemeIssueType,
        options?: RequestOptions,
      ): Promise<IssueTypeMapping> => workflowSchemes.getWorkflowSchemeIssueType(client, parameters, options),
      setIssueType: (parameters: SetIssueType, options?: RequestOptions): Promise<WorkflowScheme> =>
        workflowSchemes.setIssueType(client, parameters, options),
      deleteWorkflowSchemeIssueType: (
        parameters: DeleteWorkflowSchemeIssueType,
        options?: RequestOptions,
      ): Promise<WorkflowScheme> => workflowSchemes.deleteWorkflowSchemeIssueType(client, parameters, options),
      getWorkflow: (parameters: GetWorkflow, options?: RequestOptions): Promise<GetWorkflowModel> =>
        workflowSchemes.getWorkflow(client, parameters, options),
      updateWorkflowMapping: (parameters: UpdateWorkflowMapping, options?: RequestOptions): Promise<WorkflowScheme> =>
        workflowSchemes.updateWorkflowMapping(client, parameters, options),
      deleteWorkflowMapping: (parameters: DeleteWorkflowMapping, options?: RequestOptions): Promise<WorkflowScheme> =>
        workflowSchemes.deleteWorkflowMapping(client, parameters, options),
    },
    issueWorklogs: {
      getIdsOfWorklogsDeletedSince: (
        parameters?: GetIdsOfWorklogsDeletedSince,
        options?: RequestOptions,
      ): Promise<WorklogChangedSince> => issueWorklogs.getIdsOfWorklogsDeletedSince(client, parameters, options),
      getWorklogsForIds: (parameters: GetWorklogsForIds, options?: RequestOptions): Promise<Worklog[]> =>
        issueWorklogs.getWorklogsForIds(client, parameters, options),
      getIdsOfWorklogsModifiedSince: (
        parameters?: GetIdsOfWorklogsModifiedSince,
        options?: RequestOptions,
      ): Promise<WorklogChangedSince> => issueWorklogs.getIdsOfWorklogsModifiedSince(client, parameters, options),
    },
    session: {
      currentUser: (options?: RequestOptions): Promise<CurrentUser> => session.currentUser(client, options),
      login: (parameters: Login, options?: RequestOptions): Promise<AuthSuccess> =>
        session.login(client, parameters, options),
      logout: (options?: RequestOptions): Promise<void> => session.logout(client, options),
    },
    websudo: {
      release: (parameters: Release, options?: RequestOptions): Promise<void> =>
        websudo.release(client, parameters, options),
    },
    webhooks: {
      getWebhooks: (parameters?: GetWebhooks, options?: RequestOptions): Promise<Webhook[]> =>
        webhooks.getWebhooks(client, parameters, options),
      createWebhook: (parameters: CreateWebhook, options?: RequestOptions): Promise<Webhook> =>
        webhooks.createWebhook(client, parameters, options),
      getWebhook: (parameters: GetWebhook, options?: RequestOptions): Promise<Webhook> =>
        webhooks.getWebhook(client, parameters, options),
      updateWebhook: (parameters: UpdateWebhook, options?: RequestOptions): Promise<Webhook> =>
        webhooks.updateWebhook(client, parameters, options),
      deleteWebhook: (parameters: DeleteWebhook, options?: RequestOptions): Promise<void> =>
        webhooks.deleteWebhook(client, parameters, options),
      getWebhookStatistics: (parameters: GetWebhookStatistics, options?: RequestOptions): Promise<WebhookStatistics> =>
        webhooks.getWebhookStatistics(client, parameters, options),
      getWebhookStatisticsSummary: (
        parameters: GetWebhookStatisticsSummary,
        options?: RequestOptions,
      ): Promise<GetWebhookStatisticsSummaryModel> => webhooks.getWebhookStatisticsSummary(client, parameters, options),
      getWebhookTransitions: (parameters: GetWebhookTransitions, options?: RequestOptions): Promise<unknown> =>
        webhooks.getWebhookTransitions(client, parameters, options),
      getLatestWebhookInvocation: (
        parameters: GetLatestWebhookInvocation,
        options?: RequestOptions,
      ): Promise<unknown> => webhooks.getLatestWebhookInvocation(client, parameters, options),
    },
  };
}

export type ServerClient = ReturnType<typeof createServerClient>;
