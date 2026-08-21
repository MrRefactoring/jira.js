import { type ClientConfig, type Client, createClient, type Buffer } from '#/core';
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
      moveIssuesToBacklog: (parameters: MoveIssuesToBacklog): Promise<void> =>
        backlog.moveIssuesToBacklog(client, parameters),
    },
    board: {
      getAllBoards: (parameters?: GetAllBoards): Promise<Page<Board>> => board.getAllBoards(client, parameters),
      createBoard: (parameters: CreateBoard): Promise<Board> => board.createBoard(client, parameters),
      getBoard: (parameters: GetBoard): Promise<Board> => board.getBoard(client, parameters),
      deleteBoard: (parameters: DeleteBoard): Promise<void> => board.deleteBoard(client, parameters),
      getIssuesForBacklog: (parameters: GetIssuesForBacklog): Promise<SearchResults> =>
        board.getIssuesForBacklog(client, parameters),
      getBoardConfiguration: (parameters: GetBoardConfiguration): Promise<BoardConfig> =>
        board.getBoardConfiguration(client, parameters),
      getEpics: (parameters: GetEpics): Promise<Page<Epic>> => board.getEpics(client, parameters),
      getIssuesWithoutEpicForBoard: (parameters: GetIssuesWithoutEpicForBoard): Promise<SearchResults> =>
        board.getIssuesWithoutEpicForBoard(client, parameters),
      getIssuesForBoardEpic: (parameters: GetIssuesForBoardEpic): Promise<SearchResults> =>
        board.getIssuesForBoardEpic(client, parameters),
      getIssuesForBoard: (parameters: GetIssuesForBoard): Promise<SearchResults> =>
        board.getIssuesForBoard(client, parameters),
      getProjects: (parameters: GetProjects): Promise<Page<ProjectJson>> => board.getProjects(client, parameters),
      getBoardPropertyKeys: (parameters: GetBoardPropertyKeys): Promise<EntityPropertiesKeys> =>
        board.getBoardPropertyKeys(client, parameters),
      getBoardProperty: (parameters: GetBoardProperty): Promise<EntityProperty> =>
        board.getBoardProperty(client, parameters),
      setBoardProperty: (parameters: SetBoardProperty): Promise<EntityPropertiesKeys> =>
        board.setBoardProperty(client, parameters),
      deleteBoardProperty: (parameters: DeleteBoardProperty): Promise<void> =>
        board.deleteBoardProperty(client, parameters),
      getRefinedVelocity: (parameters: GetRefinedVelocity): Promise<BooleanSetting> =>
        board.getRefinedVelocity(client, parameters),
      setRefinedVelocity: (parameters: SetRefinedVelocity): Promise<void> =>
        board.setRefinedVelocity(client, parameters),
      getAllSprints: (parameters: GetAllSprints): Promise<Page<Sprint>> => board.getAllSprints(client, parameters),
      getIssuesForBoardSprint: (parameters: GetIssuesForBoardSprint): Promise<SearchResults> =>
        board.getIssuesForBoardSprint(client, parameters),
      getAllVersions: (parameters: GetAllVersions): Promise<Page<AgileVersion>> =>
        board.getAllVersions(client, parameters),
    },
    epic: {
      getIssuesWithoutEpic: (parameters?: GetIssuesWithoutEpic): Promise<SearchResults> =>
        epic.getIssuesWithoutEpic(client, parameters),
      removeIssuesFromEpic: (parameters: RemoveIssuesFromEpic): Promise<void> =>
        epic.removeIssuesFromEpic(client, parameters),
      getEpic: (parameters: GetEpic): Promise<Epic> => epic.getEpic(client, parameters),
      partiallyUpdateEpic: (parameters: PartiallyUpdateEpic): Promise<Epic> =>
        epic.partiallyUpdateEpic(client, parameters),
      getIssuesForEpic: (parameters: GetIssuesForEpic): Promise<SearchResults> =>
        epic.getIssuesForEpic(client, parameters),
      moveIssuesToEpic: (parameters: MoveIssuesToEpic): Promise<void> => epic.moveIssuesToEpic(client, parameters),
      rankEpics: (parameters: RankEpics): Promise<void> => epic.rankEpics(client, parameters),
    },
    issues: {
      rankIssues: (parameters: RankIssues): Promise<void> => issues.rankIssues(client, parameters),
      getAgileIssue: (parameters: GetAgileIssue): Promise<Issue> => issues.getAgileIssue(client, parameters),
      getIssueEstimationForBoard: (parameters: GetIssueEstimationForBoard): Promise<FieldValue> =>
        issues.getIssueEstimationForBoard(client, parameters),
      estimateIssueForBoard: (parameters: EstimateIssueForBoard): Promise<FieldValue> =>
        issues.estimateIssueForBoard(client, parameters),
      createIssue: (parameters: CreateIssue): Promise<IssueCreateResponse> => issues.createIssue(client, parameters),
      archiveIssues: (parameters: ArchiveIssues): Promise<unknown> => issues.archiveIssues(client, parameters),
      createIssues: (parameters: CreateIssues): Promise<IssuesCreateResponse> =>
        issues.createIssues(client, parameters),
      getCreateIssueMetaProjectIssueTypes: (
        parameters: GetCreateIssueMetaProjectIssueTypes,
      ): Promise<CreateMetaIssueType> => issues.getCreateIssueMetaProjectIssueTypes(client, parameters),
      getCreateIssueMetaFields: (parameters: GetCreateIssueMetaFields): Promise<FieldMeta> =>
        issues.getCreateIssueMetaFields(client, parameters),
      getIssuePickerResource: (parameters?: GetIssuePickerResource): Promise<IssuePickerResult> =>
        issues.getIssuePickerResource(client, parameters),
      createReciprocalRemoteIssueLink: (
        parameters: CreateReciprocalRemoteIssueLink,
      ): Promise<RemoteReciprocalIssueLinkCreateResponse> => issues.createReciprocalRemoteIssueLink(client, parameters),
      getIssue: (parameters: GetIssue): Promise<Issue> => issues.getIssue(client, parameters),
      editIssue: (parameters: EditIssue): Promise<void> => issues.editIssue(client, parameters),
      deleteIssue: (parameters: DeleteIssue): Promise<void> => issues.deleteIssue(client, parameters),
      archiveIssue: (parameters: ArchiveIssue): Promise<void> => issues.archiveIssue(client, parameters),
      assign: (parameters: Assign): Promise<void> => issues.assign(client, parameters),
      addAttachment: (parameters: AddAttachment): Promise<AttachmentJson[]> => issues.addAttachment(client, parameters),
      getComments: (parameters: GetComments): Promise<CommentsWithPaginationJson> =>
        issues.getComments(client, parameters),
      addComment: (parameters: AddComment): Promise<CommentJson> => issues.addComment(client, parameters),
      getComment: (parameters: GetComment): Promise<CommentJson> => issues.getComment(client, parameters),
      updateComment: (parameters: UpdateComment): Promise<CommentJson> => issues.updateComment(client, parameters),
      deleteComment: (parameters: DeleteComment): Promise<void> => issues.deleteComment(client, parameters),
      setPinComment: (parameters: SetPinComment): Promise<void> => issues.setPinComment(client, parameters),
      getEditIssueMeta: (parameters: GetEditIssueMeta): Promise<EditMeta> =>
        issues.getEditIssueMeta(client, parameters),
      notify: (parameters: Notify): Promise<void> => issues.notify(client, parameters),
      getPinnedComments: (parameters: GetPinnedComments): Promise<PinnedCommentJson[]> =>
        issues.getPinnedComments(client, parameters),
      getIssuePropertyKeys: (parameters: GetIssuePropertyKeys): Promise<EntityPropertiesKeys> =>
        issues.getIssuePropertyKeys(client, parameters),
      getIssueProperty: (parameters: GetIssueProperty): Promise<EntityProperty> =>
        issues.getIssueProperty(client, parameters),
      setIssueProperty: (parameters: SetIssueProperty): Promise<void> => issues.setIssueProperty(client, parameters),
      deleteIssueProperty: (parameters: DeleteIssueProperty): Promise<void> =>
        issues.deleteIssueProperty(client, parameters),
      getRemoteIssueLinks: (parameters: GetRemoteIssueLinks): Promise<RemoteIssueLink[]> =>
        issues.getRemoteIssueLinks(client, parameters),
      createOrUpdateRemoteIssueLink: (parameters: CreateOrUpdateRemoteIssueLink): Promise<RemoteIssueLink> =>
        issues.createOrUpdateRemoteIssueLink(client, parameters),
      deleteRemoteIssueLinkByGlobalId: (parameters: DeleteRemoteIssueLinkByGlobalId): Promise<void> =>
        issues.deleteRemoteIssueLinkByGlobalId(client, parameters),
      getRemoteIssueLinkById: (parameters: GetRemoteIssueLinkById): Promise<RemoteIssueLink> =>
        issues.getRemoteIssueLinkById(client, parameters),
      updateRemoteIssueLink: (parameters: UpdateRemoteIssueLink): Promise<void> =>
        issues.updateRemoteIssueLink(client, parameters),
      deleteRemoteIssueLinkById: (parameters: DeleteRemoteIssueLinkById): Promise<void> =>
        issues.deleteRemoteIssueLinkById(client, parameters),
      restoreIssue: (parameters: RestoreIssue): Promise<void> => issues.restoreIssue(client, parameters),
      getSubTasks: (parameters: GetSubTasks): Promise<IssueRefJson[]> => issues.getSubTasks(client, parameters),
      canMoveSubTask: (parameters: CanMoveSubTask): Promise<unknown> => issues.canMoveSubTask(client, parameters),
      moveSubTasks: (parameters: MoveSubTasks): Promise<void> => issues.moveSubTasks(client, parameters),
      getTransitions: (parameters: GetTransitions): Promise<TransitionsMeta> =>
        issues.getTransitions(client, parameters),
      doTransition: (parameters: DoTransition): Promise<void> => issues.doTransition(client, parameters),
      getVotes: (parameters: GetVotes): Promise<Vote> => issues.getVotes(client, parameters),
      addVote: (parameters: AddVote): Promise<void> => issues.addVote(client, parameters),
      removeVote: (parameters: RemoveVote): Promise<void> => issues.removeVote(client, parameters),
      getIssueWatchers: (parameters: GetIssueWatchers): Promise<Watchers> =>
        issues.getIssueWatchers(client, parameters),
      addWatcher: (parameters: AddWatcher): Promise<void> => issues.addWatcher(client, parameters),
      removeWatcher: (parameters: RemoveWatcher): Promise<void> => issues.removeWatcher(client, parameters),
      getIssueWorklog: (parameters: GetIssueWorklog): Promise<WorklogWithPagination> =>
        issues.getIssueWorklog(client, parameters),
      addWorklog: (parameters: AddWorklog): Promise<Worklog> => issues.addWorklog(client, parameters),
      getWorklog: (parameters: GetWorklog): Promise<Worklog> => issues.getWorklog(client, parameters),
      updateWorklog: (parameters: UpdateWorklog): Promise<Worklog> => issues.updateWorklog(client, parameters),
      deleteWorklog: (parameters: DeleteWorklog): Promise<void> => issues.deleteWorklog(client, parameters),
    },
    sprint: {
      createSprint: (parameters: CreateSprint): Promise<Sprint> => sprint.createSprint(client, parameters),
      unmapSprints: (parameters: UnmapSprints): Promise<void> => sprint.unmapSprints(client, parameters),
      unmapAllSprints: (): Promise<void> => sprint.unmapAllSprints(client),
      getSprint: (parameters: GetSprint): Promise<Sprint> => sprint.getSprint(client, parameters),
      partiallyUpdateSprint: (parameters: PartiallyUpdateSprint): Promise<Sprint> =>
        sprint.partiallyUpdateSprint(client, parameters),
      updateSprint: (parameters: UpdateSprint): Promise<Sprint> => sprint.updateSprint(client, parameters),
      deleteSprint: (parameters: DeleteSprint): Promise<void> => sprint.deleteSprint(client, parameters),
      getIssuesForSprint: (parameters: GetIssuesForSprint): Promise<SearchResults> =>
        sprint.getIssuesForSprint(client, parameters),
      moveIssuesToSprint: (parameters: MoveIssuesToSprint): Promise<void> =>
        sprint.moveIssuesToSprint(client, parameters),
      getSprintPropertyKeys: (parameters: GetSprintPropertyKeys): Promise<EntityPropertiesKeys> =>
        sprint.getSprintPropertyKeys(client, parameters),
      getSprintProperty: (parameters: GetSprintProperty): Promise<EntityProperty> =>
        sprint.getSprintProperty(client, parameters),
      setSprintProperty: (parameters: SetSprintProperty): Promise<void> => sprint.setSprintProperty(client, parameters),
      deleteSprintProperty: (parameters: DeleteSprintProperty): Promise<void> =>
        sprint.deleteSprintProperty(client, parameters),
      swapSprint: (parameters: SwapSprint): Promise<void> => sprint.swapSprint(client, parameters),
    },
    applicationProperties: {
      getApplicationProperties: (parameters?: GetApplicationProperties): Promise<ApplicationProperty[]> =>
        applicationProperties.getApplicationProperties(client, parameters),
      getAdvancedSettings: (): Promise<ApplicationProperty[]> => applicationProperties.getAdvancedSettings(client),
      setPropertyViaRestfulTable: (parameters: SetPropertyViaRestfulTable): Promise<ApplicationProperty> =>
        applicationProperties.setPropertyViaRestfulTable(client, parameters),
    },
    applicationRoles: {
      getAll: (): Promise<ApplicationRole[]> => applicationRoles.getAll(client),
      putBulk: (parameters: PutBulk): Promise<ApplicationRole> => applicationRoles.putBulk(client, parameters),
      getApplicationRole: (parameters: GetApplicationRole): Promise<ApplicationRole> =>
        applicationRoles.getApplicationRole(client, parameters),
      updateApplicationRole: (parameters: UpdateApplicationRole): Promise<ApplicationRole> =>
        applicationRoles.updateApplicationRole(client, parameters),
    },
    issueAttachments: {
      getAttachmentMeta: (): Promise<AttachmentMeta> => issueAttachments.getAttachmentMeta(client),
      getAttachment: (parameters: GetAttachment): Promise<Attachment> =>
        issueAttachments.getAttachment(client, parameters),
      removeAttachment: (parameters: RemoveAttachment): Promise<void> =>
        issueAttachments.removeAttachment(client, parameters),
      expandForHumans: (parameters: ExpandForHumans): Promise<HumanReadableArchive> =>
        issueAttachments.expandForHumans(client, parameters),
      expandForMachines: (parameters: ExpandForMachines): Promise<AttachmentArchiveImpl> =>
        issueAttachments.expandForMachines(client, parameters),
    },
    avatars: {
      getAllSystemAvatars: (parameters: GetAllSystemAvatars): Promise<Avatar> =>
        avatars.getAllSystemAvatars(client, parameters),
      getAvatars: (parameters: GetAvatars): Promise<GetAvatarsModel> => avatars.getAvatars(client, parameters),
      createAvatarFromTemporary: (parameters: CreateAvatarFromTemporary): Promise<Avatar> =>
        avatars.createAvatarFromTemporary(client, parameters),
      deleteAvatar: (parameters: DeleteAvatar): Promise<void> => avatars.deleteAvatar(client, parameters),
      storeTemporaryAvatarUsingMultiPart: (parameters: StoreTemporaryAvatarUsingMultiPart): Promise<AvatarCropping> =>
        avatars.storeTemporaryAvatarUsingMultiPart(client, parameters),
    },
    cluster: {
      deleteNode: (parameters: DeleteNode): Promise<void> => cluster.deleteNode(client, parameters),
      changeNodeStateToOffline: (parameters: ChangeNodeStateToOffline): Promise<void> =>
        cluster.changeNodeStateToOffline(client, parameters),
      getAllNodes: (): Promise<Node[]> => cluster.getAllNodes(client),
      approveUpgrade: (): Promise<void> => cluster.approveUpgrade(client),
      cancelUpgrade: (): Promise<void> => cluster.cancelUpgrade(client),
      acknowledgeErrors: (): Promise<void> => cluster.acknowledgeErrors(client),
      setReadyToUpgrade: (): Promise<void> => cluster.setReadyToUpgrade(client),
      getState: (): Promise<ClusterState> => cluster.getState(client),
    },
    issueComments: {
      getCommentPropertyKeys: (parameters: GetCommentPropertyKeys): Promise<EntityPropertiesKeys> =>
        issueComments.getCommentPropertyKeys(client, parameters),
      getCommentProperty: (parameters: GetCommentProperty): Promise<EntityProperty> =>
        issueComments.getCommentProperty(client, parameters),
      setCommentProperty: (parameters: SetCommentProperty): Promise<void> =>
        issueComments.setCommentProperty(client, parameters),
      deleteCommentProperty: (parameters: DeleteCommentProperty): Promise<void> =>
        issueComments.deleteCommentProperty(client, parameters),
    },
    projectComponents: {
      createComponent: (parameters: CreateComponent): Promise<Component> =>
        projectComponents.createComponent(client, parameters),
      getPaginatedComponents: (parameters?: GetPaginatedComponents): Promise<PagedResults> =>
        projectComponents.getPaginatedComponents(client, parameters),
      getComponent: (parameters: GetComponent): Promise<Component> =>
        projectComponents.getComponent(client, parameters),
      updateComponent: (parameters: UpdateComponent): Promise<Component> =>
        projectComponents.updateComponent(client, parameters),
      deleteComponent: (parameters: DeleteComponent): Promise<void> =>
        projectComponents.deleteComponent(client, parameters),
      getComponentRelatedIssues: (parameters: GetComponentRelatedIssues): Promise<ComponentIssueCounts> =>
        projectComponents.getComponentRelatedIssues(client, parameters),
    },
    configuration: {
      getConfiguration: (): Promise<Configuration> => configuration.getConfiguration(client),
    },
    issueCustomFieldOptions: {
      getCustomFieldOption: (parameters: GetCustomFieldOption): Promise<CustomFieldOption> =>
        issueCustomFieldOptions.getCustomFieldOption(client, parameters),
    },
    issueFields: {
      getCustomFields: (parameters?: GetCustomFields): Promise<CustomField> =>
        issueFields.getCustomFields(client, parameters),
      bulkDeleteCustomFields: (parameters: BulkDeleteCustomFields): Promise<BulkDeleteResponse> =>
        issueFields.bulkDeleteCustomFields(client, parameters),
      getCustomFieldOptions: (parameters: GetCustomFieldOptions): Promise<CustomFieldOptions> =>
        issueFields.getCustomFieldOptions(client, parameters),
      getFields: (): Promise<Field[]> => issueFields.getFields(client),
      createCustomField: (parameters: CreateCustomField): Promise<Field> =>
        issueFields.createCustomField(client, parameters),
    },
    dashboards: {
      list: (parameters?: List): Promise<Dashboards> => dashboards.list(client, parameters),
      getDashboardItemPropertyKeys: (parameters: GetDashboardItemPropertyKeys): Promise<EntityPropertiesKeys> =>
        dashboards.getDashboardItemPropertyKeys(client, parameters),
      getDashboardItemProperty: (parameters: GetDashboardItemProperty): Promise<EntityProperty> =>
        dashboards.getDashboardItemProperty(client, parameters),
      setDashboardItemProperty: (parameters: SetDashboardItemProperty): Promise<void> =>
        dashboards.setDashboardItemProperty(client, parameters),
      deleteDashboardItemProperty: (parameters: DeleteDashboardItemProperty): Promise<void> =>
        dashboards.deleteDashboardItemProperty(client, parameters),
      getDashboard: (parameters: GetDashboard): Promise<Dashboard> => dashboards.getDashboard(client, parameters),
    },
    emailTemplates: {
      downloadEmailTemplates: (): Promise<Buffer> => emailTemplates.downloadEmailTemplates(client),
      uploadEmailTemplates: (parameters: UploadEmailTemplates): Promise<void> =>
        emailTemplates.uploadEmailTemplates(client, parameters),
      applyEmailTemplates: (): Promise<void> => emailTemplates.applyEmailTemplates(client),
      revertEmailTemplatesToDefault: (): Promise<void> => emailTemplates.revertEmailTemplatesToDefault(client),
      getEmailTypes: (): Promise<EmailTemplateTypes> => emailTemplates.getEmailTypes(client),
    },
    filters: {
      createFilter: (parameters: CreateFilter): Promise<Filter> => filters.createFilter(client, parameters),
      getDefaultShareScope: (): Promise<DefaultShareScope> => filters.getDefaultShareScope(client),
      setDefaultShareScope: (parameters: SetDefaultShareScope): Promise<DefaultShareScope> =>
        filters.setDefaultShareScope(client, parameters),
      getFavouriteFilters: (parameters?: GetFavouriteFilters): Promise<Filter[]> =>
        filters.getFavouriteFilters(client, parameters),
      getFilter: (parameters: GetFilter): Promise<Filter> => filters.getFilter(client, parameters),
      editFilter: (parameters: EditFilter): Promise<Filter> => filters.editFilter(client, parameters),
      deleteFilter: (parameters: DeleteFilter): Promise<void> => filters.deleteFilter(client, parameters),
      getFilterColumns: (parameters: GetFilterColumns): Promise<ColumnLayout[]> =>
        filters.getFilterColumns(client, parameters),
      setColumns: (parameters: SetColumns): Promise<void> => filters.setColumns(client, parameters),
      resetColumns: (parameters: ResetColumns): Promise<void> => filters.resetColumns(client, parameters),
      getSharePermissions: (parameters: GetSharePermissions): Promise<FilterPermission[]> =>
        filters.getSharePermissions(client, parameters),
      addSharePermission: (parameters: AddSharePermission): Promise<FilterPermission[]> =>
        filters.addSharePermission(client, parameters),
      getSharePermission: (parameters: GetSharePermission): Promise<FilterPermission> =>
        filters.getSharePermission(client, parameters),
      deleteSharePermission: (parameters: DeleteSharePermission): Promise<void> =>
        filters.deleteSharePermission(client, parameters),
    },
    groups: {
      createGroup: (parameters: CreateGroup): Promise<Group> => groups.createGroup(client, parameters),
      removeGroup: (parameters: RemoveGroup): Promise<void> => groups.removeGroup(client, parameters),
      getUsersFromGroup: (parameters: GetUsersFromGroup): Promise<GetUsersFromGroupModel> =>
        groups.getUsersFromGroup(client, parameters),
      addUserToGroup: (parameters: AddUserToGroup): Promise<Group> => groups.addUserToGroup(client, parameters),
      removeUserFromGroup: (parameters: RemoveUserFromGroup): Promise<void> =>
        groups.removeUserFromGroup(client, parameters),
      findGroups: (parameters?: FindGroups): Promise<GroupSuggestions> => groups.findGroups(client, parameters),
    },
    groupAndUserPicker: {
      findUsersAndGroups: (parameters?: FindUsersAndGroups): Promise<UsersAndGroups> =>
        groupAndUserPicker.findUsersAndGroups(client, parameters),
    },
    indexing: {
      listIndexSnapshot: (): Promise<IndexSnapshot[]> => indexing.listIndexSnapshot(client),
      createIndexSnapshot: (): Promise<IndexSnapshotPromise> => indexing.createIndexSnapshot(client),
      isIndexSnapshotRunning: (): Promise<IndexSnapshotStatus> => indexing.isIndexSnapshotRunning(client),
      getIndexSummary: (): Promise<IndexSummary> => indexing.getIndexSummary(client),
      getReindexInfo: (parameters?: GetReindexInfo): Promise<ReindexModel> =>
        indexing.getReindexInfo(client, parameters),
      reindex: (parameters: Reindex): Promise<ReindexModel> => indexing.reindex(client, parameters),
      reindexIssues: (parameters: ReindexIssues): Promise<ReindexModel> => indexing.reindexIssues(client, parameters),
      getReindexProgress: (parameters?: GetReindexProgress): Promise<ReindexModel> =>
        indexing.getReindexProgress(client, parameters),
      processRequests: (): Promise<unknown> => indexing.processRequests(client),
      getProgressBulk: (parameters?: GetProgressBulk): Promise<ReindexRequest[]> =>
        indexing.getProgressBulk(client, parameters),
      getReindexRequestProgress: (parameters: GetReindexRequestProgress): Promise<ReindexRequest> =>
        indexing.getReindexRequestProgress(client, parameters),
    },
    issueLinks: {
      linkIssues: (parameters: LinkIssues): Promise<void> => issueLinks.linkIssues(client, parameters),
      getIssueLink: (parameters: GetIssueLink): Promise<IssueLink> => issueLinks.getIssueLink(client, parameters),
      deleteIssueLink: (parameters: DeleteIssueLink): Promise<void> => issueLinks.deleteIssueLink(client, parameters),
    },
    issueLinkTypes: {
      getIssueLinkTypes: (): Promise<IssueLinkTypes> => issueLinkTypes.getIssueLinkTypes(client),
      createIssueLinkType: (parameters: CreateIssueLinkType): Promise<IssueLinkTypeJson> =>
        issueLinkTypes.createIssueLinkType(client, parameters),
      resetOrder: (parameters: ResetOrder): Promise<IssueLinkTypes> => issueLinkTypes.resetOrder(client, parameters),
      getIssueLinkType: (parameters: GetIssueLinkType): Promise<IssueLinkTypeJson> =>
        issueLinkTypes.getIssueLinkType(client, parameters),
      updateIssueLinkType: (parameters: UpdateIssueLinkType): Promise<IssueLinkTypeJson> =>
        issueLinkTypes.updateIssueLinkType(client, parameters),
      deleteIssueLinkType: (parameters: DeleteIssueLinkType): Promise<void> =>
        issueLinkTypes.deleteIssueLinkType(client, parameters),
      moveIssueLinkType: (parameters: MoveIssueLinkType): Promise<IssueLinkTypeJson> =>
        issueLinkTypes.moveIssueLinkType(client, parameters),
    },
    issueSecuritySchemes: {
      getIssueSecuritySchemes: (): Promise<SecuritySchemesJson> => issueSecuritySchemes.getIssueSecuritySchemes(client),
      getIssueSecurityScheme: (parameters: GetIssueSecurityScheme): Promise<SecuritySchemeJson> =>
        issueSecuritySchemes.getIssueSecurityScheme(client, parameters),
    },
    issueTypes: {
      getIssueAllTypes: (): Promise<IssueTypeJson[]> => issueTypes.getIssueAllTypes(client),
      createIssueType: (parameters: CreateIssueType): Promise<IssueTypeJson> =>
        issueTypes.createIssueType(client, parameters),
      getPaginatedIssueTypes: (parameters?: GetPaginatedIssueTypes): Promise<IssueTypeJson> =>
        issueTypes.getPaginatedIssueTypes(client, parameters),
      getIssueType: (parameters: GetIssueType): Promise<IssueTypeJson> => issueTypes.getIssueType(client, parameters),
      updateIssueType: (parameters: UpdateIssueType): Promise<IssueTypeJson> =>
        issueTypes.updateIssueType(client, parameters),
      deleteIssueType: (parameters: DeleteIssueType): Promise<void> => issueTypes.deleteIssueType(client, parameters),
      getAlternativeIssueTypes: (parameters: GetAlternativeIssueTypes): Promise<IssueTypeJson[]> =>
        issueTypes.getAlternativeIssueTypes(client, parameters),
      createIssueTypeAvatarFromTemporary: (parameters: CreateIssueTypeAvatarFromTemporary): Promise<Avatar> =>
        issueTypes.createIssueTypeAvatarFromTemporary(client, parameters),
      storeTemporaryIssueTypeAvatarUsingMultiPart: (
        parameters: StoreTemporaryIssueTypeAvatarUsingMultiPart,
      ): Promise<unknown> => issueTypes.storeTemporaryIssueTypeAvatarUsingMultiPart(client, parameters),
      getIssueTypePropertyKeys: (parameters: GetIssueTypePropertyKeys): Promise<EntityPropertiesKeys> =>
        issueTypes.getIssueTypePropertyKeys(client, parameters),
      getIssueTypeProperty: (parameters: GetIssueTypeProperty): Promise<EntityProperty> =>
        issueTypes.getIssueTypeProperty(client, parameters),
      setIssueTypeProperty: (parameters: SetIssueTypeProperty): Promise<void> =>
        issueTypes.setIssueTypeProperty(client, parameters),
      deleteIssueTypeProperty: (parameters: DeleteIssueTypeProperty): Promise<void> =>
        issueTypes.deleteIssueTypeProperty(client, parameters),
    },
    issueTypeSchemes: {
      getAllIssueTypeSchemes: (): Promise<IssueTypeSchemeList> => issueTypeSchemes.getAllIssueTypeSchemes(client),
      createIssueTypeScheme: (parameters: CreateIssueTypeScheme): Promise<IssueTypeScheme> =>
        issueTypeSchemes.createIssueTypeScheme(client, parameters),
      getIssueTypeScheme: (parameters: GetIssueTypeScheme): Promise<IssueTypeScheme> =>
        issueTypeSchemes.getIssueTypeScheme(client, parameters),
      updateIssueTypeScheme: (parameters: UpdateIssueTypeScheme): Promise<IssueTypeScheme> =>
        issueTypeSchemes.updateIssueTypeScheme(client, parameters),
      deleteIssueTypeScheme: (parameters: DeleteIssueTypeScheme): Promise<void> =>
        issueTypeSchemes.deleteIssueTypeScheme(client, parameters),
      getAssociatedProjects: (parameters: GetAssociatedProjects): Promise<Project[]> =>
        issueTypeSchemes.getAssociatedProjects(client, parameters),
      addProjectAssociationsToScheme: (parameters: AddProjectAssociationsToScheme): Promise<void> =>
        issueTypeSchemes.addProjectAssociationsToScheme(client, parameters),
      setProjectAssociationsForScheme: (parameters: SetProjectAssociationsForScheme): Promise<void> =>
        issueTypeSchemes.setProjectAssociationsForScheme(client, parameters),
      removeAllProjectAssociations: (parameters: RemoveAllProjectAssociations): Promise<void> =>
        issueTypeSchemes.removeAllProjectAssociations(client, parameters),
      removeProjectAssociation: (parameters: RemoveProjectAssociation): Promise<void> =>
        issueTypeSchemes.removeProjectAssociation(client, parameters),
    },
    jql: {
      getAutoComplete: (): Promise<AutoCompleteResponse> => jql.getAutoComplete(client),
      getFieldAutoCompleteForQueryString: (
        parameters?: GetFieldAutoCompleteForQueryString,
      ): Promise<AutoCompleteResultWrapper> => jql.getFieldAutoCompleteForQueryString(client, parameters),
    },
    licenseValidator: {
      validate: (parameters: Validate): Promise<LicenseValidationResults> =>
        licenseValidator.validate(client, parameters),
    },
    monitoring: {
      isAppMonitoringEnabled: (): Promise<AppMonitoringRestEntity> => monitoring.isAppMonitoringEnabled(client),
      setAppMonitoringEnabled: (parameters: SetAppMonitoringEnabled): Promise<void> =>
        monitoring.setAppMonitoringEnabled(client, parameters),
      isIpdMonitoringEnabled: (): Promise<IpdMonitoringRestEntity> => monitoring.isIpdMonitoringEnabled(client),
      setIpdMonitoringEnabled: (parameters: SetIpdMonitoringEnabled): Promise<void> =>
        monitoring.setIpdMonitoringEnabled(client, parameters),
      areMetricsExposed: (): Promise<unknown> => monitoring.areMetricsExposed(client),
      getAvailableMetrics: (): Promise<unknown> => monitoring.getAvailableMetrics(client),
      start: (): Promise<void> => monitoring.start(client),
      stop: (): Promise<void> => monitoring.stop(client),
    },
    permissions: {
      getPermissions: (parameters?: GetPermissions): Promise<PermissionsJson> =>
        permissions.getPermissions(client, parameters),
      getAllPermissions: (): Promise<PermissionsJson> => permissions.getAllPermissions(client),
    },
    myPreferences: {
      getPreference: (parameters?: GetPreference): Promise<string> => myPreferences.getPreference(client, parameters),
      setPreference: (parameters: SetPreference): Promise<void> => myPreferences.setPreference(client, parameters),
      removePreference: (parameters: RemovePreference): Promise<void> =>
        myPreferences.removePreference(client, parameters),
    },
    myself: {
      getCurrentUser: (): Promise<User> => myself.getCurrentUser(client),
      updateCurrentUser: (parameters: UpdateCurrentUser): Promise<UserWrite> =>
        myself.updateCurrentUser(client, parameters),
      changeMyPassword: (parameters: ChangeMyPassword): Promise<void> => myself.changeMyPassword(client, parameters),
    },
    issueNotificationSchemes: {
      getNotificationSchemes: (parameters?: GetNotificationSchemes): Promise<PagedResults> =>
        issueNotificationSchemes.getNotificationSchemes(client, parameters),
      getNotificationScheme: (parameters: GetNotificationScheme): Promise<NotificationScheme> =>
        issueNotificationSchemes.getNotificationScheme(client, parameters),
    },
    password: {
      getPasswordPolicy: (parameters?: GetPasswordPolicy): Promise<unknown> =>
        password.getPasswordPolicy(client, parameters),
      policyCheckCreateUser: (parameters: PolicyCheckCreateUser): Promise<unknown> =>
        password.policyCheckCreateUser(client, parameters),
      policyCheckUpdateUser: (parameters: PolicyCheckUpdateUser): Promise<unknown> =>
        password.policyCheckUpdateUser(client, parameters),
    },
    permissionSchemes: {
      getPermissionSchemes: (parameters?: GetPermissionSchemes): Promise<PermissionSchemes> =>
        permissionSchemes.getPermissionSchemes(client, parameters),
      createPermissionScheme: (parameters: CreatePermissionScheme): Promise<PermissionScheme> =>
        permissionSchemes.createPermissionScheme(client, parameters),
      getSchemeAttribute: (parameters: GetSchemeAttribute): Promise<PermissionSchemeAttribute> =>
        permissionSchemes.getSchemeAttribute(client, parameters),
      setSchemeAttribute: (parameters: SetSchemeAttribute): Promise<void> =>
        permissionSchemes.setSchemeAttribute(client, parameters),
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
    issuePriorities: {
      getPriorities: (): Promise<PriorityJson[]> => issuePriorities.getPriorities(client),
      getPrioritiesPaginated: (parameters?: GetPrioritiesPaginated): Promise<PriorityJson> =>
        issuePriorities.getPrioritiesPaginated(client, parameters),
      getPriority: (parameters: GetPriority): Promise<PriorityJson> => issuePriorities.getPriority(client, parameters),
    },
    prioritySchemes: {
      getPrioritySchemes: (parameters?: GetPrioritySchemes): Promise<PrioritySchemeList> =>
        prioritySchemes.getPrioritySchemes(client, parameters),
      createPriorityScheme: (parameters: CreatePriorityScheme): Promise<PriorityScheme> =>
        prioritySchemes.createPriorityScheme(client, parameters),
      getPriorityScheme: (parameters: GetPriorityScheme): Promise<PriorityScheme> =>
        prioritySchemes.getPriorityScheme(client, parameters),
      updatePriorityScheme: (parameters: UpdatePriorityScheme): Promise<PriorityScheme> =>
        prioritySchemes.updatePriorityScheme(client, parameters),
      deletePriorityScheme: (parameters: DeletePriorityScheme): Promise<void> =>
        prioritySchemes.deletePriorityScheme(client, parameters),
    },
    projects: {
      getAllProjects: (parameters?: GetAllProjects): Promise<Project[]> => projects.getAllProjects(client, parameters),
      createProject: (parameters: CreateProject): Promise<ProjectIdentity> =>
        projects.createProject(client, parameters),
      getAllProjectTypes: (): Promise<ProjectType[]> => projects.getAllProjectTypes(client),
      getProjectTypeByKey: (parameters: GetProjectTypeByKey): Promise<ProjectType> =>
        projects.getProjectTypeByKey(client, parameters),
      getAccessibleProjectTypeByKey: (parameters: GetAccessibleProjectTypeByKey): Promise<ProjectType> =>
        projects.getAccessibleProjectTypeByKey(client, parameters),
      getProject: (parameters: GetProject): Promise<Project> => projects.getProject(client, parameters),
      updateProject: (parameters: UpdateProject): Promise<Project> => projects.updateProject(client, parameters),
      deleteProject: (parameters: DeleteProject): Promise<void> => projects.deleteProject(client, parameters),
      archiveProject: (parameters: ArchiveProject): Promise<void> => projects.archiveProject(client, parameters),
      createProjectAvatarFromTemporary: (parameters: CreateProjectAvatarFromTemporary): Promise<Avatar> =>
        projects.createProjectAvatarFromTemporary(client, parameters),
      updateProjectAvatar: (parameters: UpdateProjectAvatar): Promise<void> =>
        projects.updateProjectAvatar(client, parameters),
      storeTemporaryProjectAvatarUsingMultiPart: (
        parameters: StoreTemporaryProjectAvatarUsingMultiPart,
      ): Promise<unknown> => projects.storeTemporaryProjectAvatarUsingMultiPart(client, parameters),
      deleteProjectAvatar: (parameters: DeleteProjectAvatar): Promise<void> =>
        projects.deleteProjectAvatar(client, parameters),
      getAllProjectAvatars: (parameters: GetAllProjectAvatars): Promise<GetAllProjectAvatarsModel> =>
        projects.getAllProjectAvatars(client, parameters),
      getProjectComponents: (parameters: GetProjectComponents): Promise<Component[]> =>
        projects.getProjectComponents(client, parameters),
      getProjectPropertyKeys: (parameters: GetProjectPropertyKeys): Promise<EntityPropertiesKeys> =>
        projects.getProjectPropertyKeys(client, parameters),
      getProjectProperty: (parameters: GetProjectProperty): Promise<EntityProperty> =>
        projects.getProjectProperty(client, parameters),
      setProjectProperty: (parameters: SetProjectProperty): Promise<void> =>
        projects.setProjectProperty(client, parameters),
      deleteProjectProperty: (parameters: DeleteProjectProperty): Promise<void> =>
        projects.deleteProjectProperty(client, parameters),
      restoreProject: (parameters: RestoreProject): Promise<void> => projects.restoreProject(client, parameters),
      getProjectRoles: (parameters: GetProjectRoles): Promise<GetProjectRolesModel> =>
        projects.getProjectRoles(client, parameters),
      getProjectRole: (parameters: GetProjectRole): Promise<ProjectRole> => projects.getProjectRole(client, parameters),
      addActorUsers: (parameters: AddActorUsers): Promise<ProjectRole> => projects.addActorUsers(client, parameters),
      setActors: (parameters: SetActors): Promise<ProjectRole> => projects.setActors(client, parameters),
      deleteActor: (parameters: DeleteActor): Promise<void> => projects.deleteActor(client, parameters),
      getAllStatuses: (parameters: GetAllStatuses): Promise<IssueTypeWithStatusJson[]> =>
        projects.getAllStatuses(client, parameters),
      updateProjectType: (parameters: UpdateProjectType): Promise<Project> =>
        projects.updateProjectType(client, parameters),
      getProjectVersionsPaginated: (parameters: GetProjectVersionsPaginated): Promise<PagedResults> =>
        projects.getProjectVersionsPaginated(client, parameters),
      getProjectVersions: (parameters: GetProjectVersions): Promise<Version[]> =>
        projects.getProjectVersions(client, parameters),
      getProjectIssueSecurityScheme: (parameters: GetProjectIssueSecurityScheme): Promise<SecuritySchemeJson> =>
        projects.getProjectIssueSecurityScheme(client, parameters),
      getProjectNotificationScheme: (parameters: GetProjectNotificationScheme): Promise<NotificationScheme> =>
        projects.getProjectNotificationScheme(client, parameters),
      getAssignedPermissionScheme: (parameters: GetAssignedPermissionScheme): Promise<PermissionScheme> =>
        projects.getAssignedPermissionScheme(client, parameters),
      assignPermissionScheme: (parameters: AssignPermissionScheme): Promise<PermissionScheme> =>
        projects.assignPermissionScheme(client, parameters),
      getAssignedPriorityScheme: (parameters: GetAssignedPriorityScheme): Promise<PriorityScheme> =>
        projects.getAssignedPriorityScheme(client, parameters),
      assignPriorityScheme: (parameters: AssignPriorityScheme): Promise<PriorityScheme> =>
        projects.assignPriorityScheme(client, parameters),
      unassignPriorityScheme: (parameters: UnassignPriorityScheme): Promise<PriorityScheme> =>
        projects.unassignPriorityScheme(client, parameters),
      getSecurityLevelsForProject: (parameters: GetSecurityLevelsForProject): Promise<SecurityListLevelJson> =>
        projects.getSecurityLevelsForProject(client, parameters),
      getWorkflowSchemeForProject: (parameters: GetWorkflowSchemeForProject): Promise<WorkflowScheme> =>
        projects.getWorkflowSchemeForProject(client, parameters),
      searchForProjects: (parameters?: SearchForProjects): Promise<ProjectPickerResultWrapper> =>
        projects.searchForProjects(client, parameters),
    },
    projectCategories: {
      getAllProjectCategories: (): Promise<ProjectCategoryJson[]> => projectCategories.getAllProjectCategories(client),
      createProjectCategory: (parameters: CreateProjectCategory): Promise<ProjectCategoryJson> =>
        projectCategories.createProjectCategory(client, parameters),
      getProjectCategoryById: (parameters: GetProjectCategoryById): Promise<ProjectCategoryJson> =>
        projectCategories.getProjectCategoryById(client, parameters),
      updateProjectCategory: (parameters: UpdateProjectCategory): Promise<ProjectCategoryJson> =>
        projectCategories.updateProjectCategory(client, parameters),
      removeProjectCategory: (parameters: RemoveProjectCategory): Promise<void> =>
        projectCategories.removeProjectCategory(client, parameters),
    },
    projectKeyAndNameValidation: {
      validateProjectKey: (parameters?: ValidateProjectKey): Promise<ErrorCollection> =>
        projectKeyAndNameValidation.validateProjectKey(client, parameters),
    },
    readOnlyMode: {
      getReadOnlyMode: (): Promise<ReadOnlyModeStatus> => readOnlyMode.getReadOnlyMode(client),
      updateReadOnlyMode: (parameters: UpdateReadOnlyMode): Promise<void> =>
        readOnlyMode.updateReadOnlyMode(client, parameters),
    },
    issueResolutions: {
      getResolutions: (): Promise<ResolutionJson[]> => issueResolutions.getResolutions(client),
      getPaginatedResolutions: (parameters?: GetPaginatedResolutions): Promise<Resolution> =>
        issueResolutions.getPaginatedResolutions(client, parameters),
      getResolution: (parameters: GetResolution): Promise<ResolutionJson> =>
        issueResolutions.getResolution(client, parameters),
    },
    projectRoles: {
      getAllProjectRoles: (): Promise<ProjectRole[]> => projectRoles.getAllProjectRoles(client),
      createProjectRole: (parameters: CreateProjectRole): Promise<ProjectRole> =>
        projectRoles.createProjectRole(client, parameters),
      getProjectRolesById: (parameters: GetProjectRolesById): Promise<ProjectRole> =>
        projectRoles.getProjectRolesById(client, parameters),
      partialUpdateProjectRole: (parameters: PartialUpdateProjectRole): Promise<ProjectRole> =>
        projectRoles.partialUpdateProjectRole(client, parameters),
      fullyUpdateProjectRole: (parameters: FullyUpdateProjectRole): Promise<ProjectRole> =>
        projectRoles.fullyUpdateProjectRole(client, parameters),
      deleteProjectRole: (parameters: DeleteProjectRole): Promise<void> =>
        projectRoles.deleteProjectRole(client, parameters),
      getProjectRoleActorsForRole: (parameters: GetProjectRoleActorsForRole): Promise<ProjectRoleActors> =>
        projectRoles.getProjectRoleActorsForRole(client, parameters),
      addProjectRoleActorsToRole: (parameters: AddProjectRoleActorsToRole): Promise<ProjectRoleActors> =>
        projectRoles.addProjectRoleActorsToRole(client, parameters),
      deleteProjectRoleActorsFromRole: (parameters: DeleteProjectRoleActorsFromRole): Promise<ProjectRoleActors> =>
        projectRoles.deleteProjectRoleActorsFromRole(client, parameters),
    },
    screens: {
      getAllScreens: (parameters?: GetAllScreens): Promise<Screen[]> => screens.getAllScreens(client, parameters),
      addFieldToDefaultScreen: (parameters: AddFieldToDefaultScreen): Promise<void> =>
        screens.addFieldToDefaultScreen(client, parameters),
      getFieldsToAdd: (parameters: GetFieldsToAdd): Promise<ScreenableField[]> =>
        screens.getFieldsToAdd(client, parameters),
      getAllTabs: (parameters: GetAllTabs): Promise<ScreenableTab[]> => screens.getAllTabs(client, parameters),
      addTab: (parameters: AddTab): Promise<ScreenableTab> => screens.addTab(client, parameters),
      renameTab: (parameters: RenameTab): Promise<ScreenableTab> => screens.renameTab(client, parameters),
      deleteTab: (parameters: DeleteTab): Promise<void> => screens.deleteTab(client, parameters),
      getAllFields: (parameters: GetAllFields): Promise<ScreenableField[]> => screens.getAllFields(client, parameters),
      addField: (parameters: AddField): Promise<ScreenableField> => screens.addField(client, parameters),
      removeField: (parameters: RemoveField): Promise<void> => screens.removeField(client, parameters),
      moveField: (parameters: MoveField): Promise<void> => screens.moveField(client, parameters),
      updateShowWhenEmptyIndicator: (parameters: UpdateShowWhenEmptyIndicator): Promise<void> =>
        screens.updateShowWhenEmptyIndicator(client, parameters),
      moveTab: (parameters: MoveTab): Promise<void> => screens.moveTab(client, parameters),
    },
    issueSearch: {
      search: (parameters?: Search): Promise<SearchResults> => issueSearch.search(client, parameters),
      searchUsingSearchRequest: (parameters: SearchUsingSearchRequest): Promise<SearchResults> =>
        issueSearch.searchUsingSearchRequest(client, parameters),
      getError: (): Promise<void> => issueSearch.getError(client),
    },
    searchLimits: {
      getMaxAggregationBuckets: (): Promise<unknown> => searchLimits.getMaxAggregationBuckets(client),
      getMaxResultWindow: (): Promise<unknown> => searchLimits.getMaxResultWindow(client),
    },
    issueSecurityLevel: {
      getIssuesecuritylevel: (parameters: GetIssuesecuritylevel): Promise<SecurityLevelJson> =>
        issueSecurityLevel.getIssuesecuritylevel(client, parameters),
    },
    serverInfo: {
      getServerInfo: (): Promise<ServerInfo> => serverInfo.getServerInfo(client),
    },
    jiraSettings: {
      setBaseURL: (parameters: SetBaseURL): Promise<void> => jiraSettings.setBaseURL(client, parameters),
      getIssueNavigatorDefaultColumns: (): Promise<ColumnOptions[]> =>
        jiraSettings.getIssueNavigatorDefaultColumns(client),
      setIssueNavigatorDefaultColumnsForm: (parameters: SetIssueNavigatorDefaultColumnsForm): Promise<void> =>
        jiraSettings.setIssueNavigatorDefaultColumnsForm(client, parameters),
    },
    workflowStatuses: {
      getStatuses: (): Promise<StatusJson[]> => workflowStatuses.getStatuses(client),
      getPaginatedStatuses: (parameters?: GetPaginatedStatuses): Promise<StatusJson> =>
        workflowStatuses.getPaginatedStatuses(client, parameters),
      getStatus: (parameters: GetStatus): Promise<StatusJson> => workflowStatuses.getStatus(client, parameters),
    },
    workflowStatusCategories: {
      getStatusCategories: (parameters?: GetStatusCategories): Promise<StatusCategoryJson[]> =>
        workflowStatusCategories.getStatusCategories(client, parameters),
      getStatusCategory: (parameters: GetStatusCategory): Promise<StatusCategoryJson> =>
        workflowStatusCategories.getStatusCategory(client, parameters),
    },
    terminology: {
      getAllTerminologyEntries: (): Promise<TerminologyResponse[]> => terminology.getAllTerminologyEntries(client),
      setTerminologyEntries: (parameters: SetTerminologyEntries): Promise<unknown> =>
        terminology.setTerminologyEntries(client, parameters),
      getTerminologyEntry: (parameters: GetTerminologyEntry): Promise<TerminologyResponse> =>
        terminology.getTerminologyEntry(client, parameters),
    },
    upgrade: {
      getUpgradeResult: (): Promise<UpgradeResult> => upgrade.getUpgradeResult(client),
      runUpgradesNow: (): Promise<void> => upgrade.runUpgradesNow(client),
    },
    users: {
      getUser: (parameters?: GetUser): Promise<User> => users.getUser(client, parameters),
      createUser: (parameters: CreateUser): Promise<UserWrite> => users.createUser(client, parameters),
      updateUser: (parameters: UpdateUser): Promise<UserWrite> => users.updateUser(client, parameters),
      removeUser: (parameters: RemoveUser): Promise<void> => users.removeUser(client, parameters),
      getA11yPersonalSettings: (): Promise<A11yPersonalSetting[]> => users.getA11yPersonalSettings(client),
      validateUserAnonymization: (parameters?: ValidateUserAnonymization): Promise<UserAnonymizationValidation> =>
        users.validateUserAnonymization(client, parameters),
      scheduleUserAnonymization: (parameters: ScheduleUserAnonymization): Promise<void> =>
        users.scheduleUserAnonymization(client, parameters),
      getUserAnonymizationProgress: (parameters?: GetUserAnonymizationProgress): Promise<void> =>
        users.getUserAnonymizationProgress(client, parameters),
      validateUserAnonymizationRerun: (
        parameters?: ValidateUserAnonymizationRerun,
      ): Promise<UserAnonymizationValidation> => users.validateUserAnonymizationRerun(client, parameters),
      scheduleUserAnonymizationRerun: (parameters: ScheduleUserAnonymizationRerun): Promise<void> =>
        users.scheduleUserAnonymizationRerun(client, parameters),
      unlockAnonymization: (): Promise<void> => users.unlockAnonymization(client),
      addUserToApplication: (parameters: AddUserToApplication): Promise<void> =>
        users.addUserToApplication(client, parameters),
      removeUserFromApplication: (parameters: RemoveUserFromApplication): Promise<void> =>
        users.removeUserFromApplication(client, parameters),
      findBulkAssignableUsers: (parameters?: FindBulkAssignableUsers): Promise<User> =>
        users.findBulkAssignableUsers(client, parameters),
      findAssignableUsers: (parameters?: FindAssignableUsers): Promise<User> =>
        users.findAssignableUsers(client, parameters),
      createUserAvatarFromTemporary: (parameters: CreateUserAvatarFromTemporary): Promise<Avatar> =>
        users.createUserAvatarFromTemporary(client, parameters),
      updateUserAvatar: (parameters: UpdateUserAvatar): Promise<Avatar> => users.updateUserAvatar(client, parameters),
      storeTemporaryUserAvatarUsingMultiPart: (parameters: StoreTemporaryUserAvatarUsingMultiPart): Promise<unknown> =>
        users.storeTemporaryUserAvatarUsingMultiPart(client, parameters),
      deleteUserAvatar: (parameters: DeleteUserAvatar): Promise<void> => users.deleteUserAvatar(client, parameters),
      getAllUserAvatars: (parameters?: GetAllUserAvatars): Promise<GetAllUserAvatarsModel> =>
        users.getAllUserAvatars(client, parameters),
      defaultColumns: (parameters?: DefaultColumns): Promise<ColumnOptions[]> =>
        users.defaultColumns(client, parameters),
      setColumnsUrlEncoded: (parameters: SetColumnsUrlEncoded): Promise<void> =>
        users.setColumnsUrlEncoded(client, parameters),
      resetUserColumns: (parameters: ResetUserColumns): Promise<void> => users.resetUserColumns(client, parameters),
      getDuplicatedUsersCount: (parameters?: GetDuplicatedUsersCount): Promise<User> =>
        users.getDuplicatedUsersCount(client, parameters),
      getDuplicatedUsersMapping: (parameters?: GetDuplicatedUsersMapping): Promise<Avatar> =>
        users.getDuplicatedUsersMapping(client, parameters),
      getUserList: (parameters?: GetUserList): Promise<StreamPage> => users.getUserList(client, parameters),
      changeUserPassword: (parameters: ChangeUserPassword): Promise<void> =>
        users.changeUserPassword(client, parameters),
      findUsersForPicker: (parameters?: FindUsersForPicker): Promise<UserPickerResults> =>
        users.findUsersForPicker(client, parameters),
      getUserPropertyKeys: (parameters?: GetUserPropertyKeys): Promise<EntityPropertiesKeys> =>
        users.getUserPropertyKeys(client, parameters),
      getUserProperty: (parameters: GetUserProperty): Promise<EntityProperty> =>
        users.getUserProperty(client, parameters),
      setUserProperty: (parameters: SetUserProperty): Promise<void> => users.setUserProperty(client, parameters),
      deleteUserProperty: (parameters: DeleteUserProperty): Promise<void> =>
        users.deleteUserProperty(client, parameters),
      findUsers: (parameters?: FindUsers): Promise<User> => users.findUsers(client, parameters),
      deleteSession: (parameters: DeleteSession): Promise<void> => users.deleteSession(client, parameters),
      findUsersWithBrowsePermission: (parameters?: FindUsersWithBrowsePermission): Promise<User> =>
        users.findUsersWithBrowsePermission(client, parameters),
    },
    projectVersions: {
      getPaginatedVersions: (parameters?: GetPaginatedVersions): Promise<Version> =>
        projectVersions.getPaginatedVersions(client, parameters),
      createVersion: (parameters: CreateVersion): Promise<Version> => projectVersions.createVersion(client, parameters),
      getRemoteVersionLinks: (parameters?: GetRemoteVersionLinks): Promise<RemoteEntityLinksJson> =>
        projectVersions.getRemoteVersionLinks(client, parameters),
      getVersion: (parameters: GetVersion): Promise<Version> => projectVersions.getVersion(client, parameters),
      updateVersion: (parameters: UpdateVersion): Promise<void> => projectVersions.updateVersion(client, parameters),
      merge: (parameters: Merge): Promise<void> => projectVersions.merge(client, parameters),
      moveVersion: (parameters: MoveVersion): Promise<Version> => projectVersions.moveVersion(client, parameters),
      getVersionRelatedIssues: (parameters: GetVersionRelatedIssues): Promise<VersionIssueCounts> =>
        projectVersions.getVersionRelatedIssues(client, parameters),
      deleteVersionAndSwap: (parameters: DeleteVersionAndSwap): Promise<void> =>
        projectVersions.deleteVersionAndSwap(client, parameters),
      getVersionUnresolvedIssues: (parameters: GetVersionUnresolvedIssues): Promise<VersionUnresolvedIssueCounts> =>
        projectVersions.getVersionUnresolvedIssues(client, parameters),
      getRemoteVersionLinksByVersionId: (
        parameters: GetRemoteVersionLinksByVersionId,
      ): Promise<RemoteEntityLinksJson> => projectVersions.getRemoteVersionLinksByVersionId(client, parameters),
      createOrUpdateRemoteVersionLink: (parameters: CreateOrUpdateRemoteVersionLink): Promise<void> =>
        projectVersions.createOrUpdateRemoteVersionLink(client, parameters),
      deleteRemoteVersionLinksByVersionId: (parameters: DeleteRemoteVersionLinksByVersionId): Promise<void> =>
        projectVersions.deleteRemoteVersionLinksByVersionId(client, parameters),
      getRemoteVersionLink: (parameters: GetRemoteVersionLink): Promise<RemoteEntityLinkJson> =>
        projectVersions.getRemoteVersionLink(client, parameters),
      createOrUpdateRemoteVersionLinkByGlobalId: (
        parameters: CreateOrUpdateRemoteVersionLinkByGlobalId,
      ): Promise<void> => projectVersions.createOrUpdateRemoteVersionLinkByGlobalId(client, parameters),
      deleteRemoteVersionLink: (parameters: DeleteRemoteVersionLink): Promise<void> =>
        projectVersions.deleteRemoteVersionLink(client, parameters),
    },
    workflows: {
      getAllWorkflows: (parameters?: GetAllWorkflows): Promise<Workflow[]> =>
        workflows.getAllWorkflows(client, parameters),
    },
    workflowSchemes: {
      createScheme: (parameters: CreateScheme): Promise<WorkflowScheme> =>
        workflowSchemes.createScheme(client, parameters),
      getById: (parameters: GetById): Promise<WorkflowScheme> => workflowSchemes.getById(client, parameters),
      updateWorkflowScheme: (parameters: UpdateWorkflowScheme): Promise<WorkflowScheme> =>
        workflowSchemes.updateWorkflowScheme(client, parameters),
      deleteScheme: (parameters: DeleteScheme): Promise<void> => workflowSchemes.deleteScheme(client, parameters),
      createDraftForParent: (parameters: CreateDraftForParent): Promise<WorkflowScheme> =>
        workflowSchemes.createDraftForParent(client, parameters),
      getDefault: (parameters: GetDefault): Promise<WorkflowScheme> => workflowSchemes.getDefault(client, parameters),
      updateDefault: (parameters: UpdateDefault): Promise<WorkflowScheme> =>
        workflowSchemes.updateDefault(client, parameters),
      deleteDefault: (parameters: DeleteDefault): Promise<WorkflowScheme> =>
        workflowSchemes.deleteDefault(client, parameters),
      getDraftById: (parameters: GetDraftById): Promise<WorkflowScheme> =>
        workflowSchemes.getDraftById(client, parameters),
      updateDraft: (parameters: UpdateDraft): Promise<WorkflowScheme> =>
        workflowSchemes.updateDraft(client, parameters),
      deleteDraftById: (parameters: DeleteDraftById): Promise<void> =>
        workflowSchemes.deleteDraftById(client, parameters),
      getDraftDefault: (parameters: GetDraftDefault): Promise<WorkflowScheme> =>
        workflowSchemes.getDraftDefault(client, parameters),
      updateDraftDefault: (parameters: UpdateDraftDefault): Promise<WorkflowScheme> =>
        workflowSchemes.updateDraftDefault(client, parameters),
      deleteDraftDefault: (parameters: DeleteDraftDefault): Promise<WorkflowScheme> =>
        workflowSchemes.deleteDraftDefault(client, parameters),
      getDraftIssueType: (parameters: GetDraftIssueType): Promise<IssueTypeMapping> =>
        workflowSchemes.getDraftIssueType(client, parameters),
      setDraftIssueType: (parameters: SetDraftIssueType): Promise<WorkflowScheme> =>
        workflowSchemes.setDraftIssueType(client, parameters),
      deleteDraftIssueType: (parameters: DeleteDraftIssueType): Promise<WorkflowScheme> =>
        workflowSchemes.deleteDraftIssueType(client, parameters),
      getDraftWorkflow: (parameters: GetDraftWorkflow): Promise<WorkflowScheme> =>
        workflowSchemes.getDraftWorkflow(client, parameters),
      updateDraftWorkflowMapping: (parameters: UpdateDraftWorkflowMapping): Promise<WorkflowScheme> =>
        workflowSchemes.updateDraftWorkflowMapping(client, parameters),
      deleteDraftWorkflowMapping: (parameters: DeleteDraftWorkflowMapping): Promise<WorkflowScheme> =>
        workflowSchemes.deleteDraftWorkflowMapping(client, parameters),
      getWorkflowSchemeIssueType: (parameters: GetWorkflowSchemeIssueType): Promise<IssueTypeMapping> =>
        workflowSchemes.getWorkflowSchemeIssueType(client, parameters),
      setIssueType: (parameters: SetIssueType): Promise<WorkflowScheme> =>
        workflowSchemes.setIssueType(client, parameters),
      deleteWorkflowSchemeIssueType: (parameters: DeleteWorkflowSchemeIssueType): Promise<WorkflowScheme> =>
        workflowSchemes.deleteWorkflowSchemeIssueType(client, parameters),
      getWorkflow: (parameters: GetWorkflow): Promise<GetWorkflowModel> =>
        workflowSchemes.getWorkflow(client, parameters),
      updateWorkflowMapping: (parameters: UpdateWorkflowMapping): Promise<WorkflowScheme> =>
        workflowSchemes.updateWorkflowMapping(client, parameters),
      deleteWorkflowMapping: (parameters: DeleteWorkflowMapping): Promise<WorkflowScheme> =>
        workflowSchemes.deleteWorkflowMapping(client, parameters),
    },
    issueWorklogs: {
      getIdsOfWorklogsDeletedSince: (parameters?: GetIdsOfWorklogsDeletedSince): Promise<WorklogChangedSince> =>
        issueWorklogs.getIdsOfWorklogsDeletedSince(client, parameters),
      getWorklogsForIds: (parameters: GetWorklogsForIds): Promise<Worklog[]> =>
        issueWorklogs.getWorklogsForIds(client, parameters),
      getIdsOfWorklogsModifiedSince: (parameters?: GetIdsOfWorklogsModifiedSince): Promise<WorklogChangedSince> =>
        issueWorklogs.getIdsOfWorklogsModifiedSince(client, parameters),
    },
    session: {
      currentUser: (): Promise<CurrentUser> => session.currentUser(client),
      login: (parameters: Login): Promise<AuthSuccess> => session.login(client, parameters),
      logout: (): Promise<void> => session.logout(client),
    },
    websudo: {
      release: (parameters: Release): Promise<void> => websudo.release(client, parameters),
    },
    webhooks: {
      getWebhooks: (parameters?: GetWebhooks): Promise<Webhook[]> => webhooks.getWebhooks(client, parameters),
      createWebhook: (parameters: CreateWebhook): Promise<Webhook> => webhooks.createWebhook(client, parameters),
      getWebhook: (parameters: GetWebhook): Promise<Webhook> => webhooks.getWebhook(client, parameters),
      updateWebhook: (parameters: UpdateWebhook): Promise<Webhook> => webhooks.updateWebhook(client, parameters),
      deleteWebhook: (parameters: DeleteWebhook): Promise<void> => webhooks.deleteWebhook(client, parameters),
      getWebhookStatistics: (parameters: GetWebhookStatistics): Promise<WebhookStatistics> =>
        webhooks.getWebhookStatistics(client, parameters),
      getWebhookStatisticsSummary: (
        parameters: GetWebhookStatisticsSummary,
      ): Promise<GetWebhookStatisticsSummaryModel> => webhooks.getWebhookStatisticsSummary(client, parameters),
      getWebhookTransitions: (parameters: GetWebhookTransitions): Promise<unknown> =>
        webhooks.getWebhookTransitions(client, parameters),
      getLatestWebhookInvocation: (parameters: GetLatestWebhookInvocation): Promise<unknown> =>
        webhooks.getLatestWebhookInvocation(client, parameters),
    },
  };
}

export type ServerClient = ReturnType<typeof createServerClient>;
