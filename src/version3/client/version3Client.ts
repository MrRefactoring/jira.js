import { BaseClient } from '../../clients';
import {
  ApplicationRoles,
  AppProperties,
  AuditRecords,
  Avatars,
  Dashboards,
  DynamicModules,
  Filters,
  FilterSharing,
  GroupAndUserPicker,
  Groups,
  InstanceInformation,
  IssueAttachments,
  IssueCommentProperties,
  IssueComments,
  IssueCustomFieldConfigurationApps,
  IssueCustomFieldContexts,
  IssueCustomFieldOptions,
  IssueCustomFieldOptionsApps,
  IssueCustomFieldValuesApps,
  IssueFieldConfigurations,
  IssueFields,
  IssueLinks,
  IssueLinkTypes,
  IssueNavigatorSettings,
  IssueNotificationSchemes,
  IssuePriorities,
  IssueProperties,
  IssueRemoteLinks,
  IssueResolutions,
  Issues,
  IssueSearch,
  IssueSecurityLevel,
  IssueSecuritySchemes,
  IssueTypeProperties,
  IssueTypes,
  IssueTypeSchemes,
  IssueTypeScreenSchemes,
  IssueVotes,
  IssueWatchers,
  IssueWorklogProperties,
  IssueWorklogs,
  JiraExpressions,
  JiraSettings,
  JQL,
  Labels,
  Myself,
  Permissions,
  PermissionSchemes,
  ProjectAvatars,
  ProjectCategories,
  ProjectComponents,
  ProjectEmail,
  ProjectFeatures,
  ProjectKeyAndNameValidation,
  ProjectPermissionSchemes,
  ProjectProperties,
  ProjectRoleActors,
  ProjectRoles,
  Projects,
  ProjectTypes,
  ProjectVersions,
  Screens,
  ScreenSchemes,
  ScreenTabFields,
  ScreenTabs,
  ServerInfo,
  Tasks,
  TimeTracking,
  UserProperties,
  Users,
  UserSearch,
  Webhooks,
  Workflows,
  WorkflowSchemeDrafts,
  WorkflowSchemeProjectAssociations,
  WorkflowSchemes,
  WorkflowStatusCategories,
  WorkflowStatuses,
  WorkflowTransitionProperties,
  WorkflowTransitionRules,
} from '..';

export class Version3Client extends BaseClient {
  applicationRoles = new ApplicationRoles(this);
  appProperties = new AppProperties(this);
  auditRecords = new AuditRecords(this);
  avatars = new Avatars(this);
  dashboards = new Dashboards(this);
  dynamicModules = new DynamicModules(this);
  filters = new Filters(this);
  filterSharing = new FilterSharing(this);
  groupAndUserPicker = new GroupAndUserPicker(this);
  groups = new Groups(this);
  instanceInformation = new InstanceInformation(this);
  issueAttachments = new IssueAttachments(this);
  issueCommentProperties = new IssueCommentProperties(this);
  issueComments = new IssueComments(this);
  issueCustomFieldConfigurationApps = new IssueCustomFieldConfigurationApps(this);
  issueCustomFieldContexts = new IssueCustomFieldContexts(this);
  issueCustomFieldOptions = new IssueCustomFieldOptions(this);
  issueCustomFieldOptionsApps = new IssueCustomFieldOptionsApps(this);
  issueCustomFieldValuesApps = new IssueCustomFieldValuesApps(this);
  issueFieldConfigurations = new IssueFieldConfigurations(this);
  issueFields = new IssueFields(this);
  issueLinks = new IssueLinks(this);
  issueLinkTypes = new IssueLinkTypes(this);
  issueNavigatorSettings = new IssueNavigatorSettings(this);
  issueNotificationSchemes = new IssueNotificationSchemes(this);
  issuePriorities = new IssuePriorities(this);
  issueProperties = new IssueProperties(this);
  issueRemoteLinks = new IssueRemoteLinks(this);
  issueResolutions = new IssueResolutions(this);
  issues = new Issues(this);
  issueSearch = new IssueSearch(this);
  issueSecurityLevel = new IssueSecurityLevel(this);
  issueSecuritySchemes = new IssueSecuritySchemes(this);
  issueTypeProperties = new IssueTypeProperties(this);
  issueTypes = new IssueTypes(this);
  issueTypeSchemes = new IssueTypeSchemes(this);
  issueTypeScreenSchemes = new IssueTypeScreenSchemes(this);
  issueVotes = new IssueVotes(this);
  issueWatchers = new IssueWatchers(this);
  issueWorklogProperties = new IssueWorklogProperties(this);
  issueWorklogs = new IssueWorklogs(this);
  jiraExpressions = new JiraExpressions(this);
  jiraSettings = new JiraSettings(this);
  jql = new JQL(this);
  labels = new Labels(this);
  myself = new Myself(this);
  permissions = new Permissions(this);
  permissionSchemes = new PermissionSchemes(this);
  projectAvatars = new ProjectAvatars(this);
  projectCategories = new ProjectCategories(this);
  projectComponents = new ProjectComponents(this);
  projectEmail = new ProjectEmail(this);
  projectFeatures = new ProjectFeatures(this);
  projectKeyAndNameValidation = new ProjectKeyAndNameValidation(this);
  projectPermissionSchemes = new ProjectPermissionSchemes(this);
  projectProperties = new ProjectProperties(this);
  projectRoleActors = new ProjectRoleActors(this);
  projectRoles = new ProjectRoles(this);
  projects = new Projects(this);
  projectTypes = new ProjectTypes(this);
  projectVersions = new ProjectVersions(this);
  screens = new Screens(this);
  screenSchemes = new ScreenSchemes(this);
  screenTabFields = new ScreenTabFields(this);
  screenTabs = new ScreenTabs(this);
  serverInfo = new ServerInfo(this);
  tasks = new Tasks(this);
  timeTracking = new TimeTracking(this);
  userProperties = new UserProperties(this);
  users = new Users(this);
  userSearch = new UserSearch(this);
  webhooks = new Webhooks(this);
  workflows = new Workflows(this);
  workflowSchemeDrafts = new WorkflowSchemeDrafts(this);
  workflowSchemeProjectAssociations = new WorkflowSchemeProjectAssociations(this);
  workflowSchemes = new WorkflowSchemes(this);
  workflowStatusCategories = new WorkflowStatusCategories(this);
  workflowStatuses = new WorkflowStatuses(this);
  workflowTransitionProperties = new WorkflowTransitionProperties(this);
  workflowTransitionRules = new WorkflowTransitionRules(this);
}
