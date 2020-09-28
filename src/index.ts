/* eslint-disable lines-between-class-members */

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Callback } from './callback';
import { Config } from './config';
import { getAuthentication, removeEmptyValues } from './helpers';
import {
  ApplicationRoles,
  AppProperties,
  AuditRecords,
  Avatars,
  Backlog,
  Board,
  Builds,
  Dashboards,
  Deployments,
  DevelopmentInformation,
  DynamicModules,
  Epic,
  FeatureFlags,
  Filters,
  FilterSharing,
  GroupAndUserPicker,
  Groups,
  Issue,
  IssueAttachments,
  IssueCommentProperties,
  IssueComments,
  IssueCustomFieldOptions,
  IssueCustomFieldOptionsApps,
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
  Jql,
  Labels,
  Myself,
  Permissions,
  PermissionSchemes,
  ProjectAvatars,
  ProjectCategories,
  ProjectComponents,
  ProjectEmail,
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
  Sprint,
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
} from './api';

export * as Models from './models';

export * from './callback';
export * from './config';
export * from './sender';

export class Client {
  public applicationRoles: ApplicationRoles;
  public appProperties: AppProperties;
  public auditRecords: AuditRecords;
  public avatars: Avatars;
  public backlog: Backlog;
  public board: Board;
  public builds: Builds;
  public dashboards: Dashboards;
  public deployments: Deployments;
  public developmentInformation: DevelopmentInformation;
  public dynamicModules: DynamicModules;
  public epic: Epic;
  public featureFlags: FeatureFlags;
  public filters: Filters;
  public filterSharing: FilterSharing;
  public groupAndUserPicker: GroupAndUserPicker;
  public groups: Groups;
  public issue: Issue;
  /** @deprecated Use <b>issueAttachments</b>. Will be removed in next major version */
  public issueAttachment: IssueAttachments;
  public issueAttachments: IssueAttachments;
  public issueCommentProperties: IssueCommentProperties;
  public issueComments: IssueComments;
  public issueCustomFieldOptions: IssueCustomFieldOptions;
  public issueCustomFieldOptionsApps: IssueCustomFieldOptionsApps;
  public issueFieldConfigurations: IssueFieldConfigurations;
  public issueFields: IssueFields;
  public issueLinks: IssueLinks;
  public issueLinkTypes: IssueLinkTypes;
  public issueNavigatorSettings: IssueNavigatorSettings;
  public issueNotificationSchemes: IssueNotificationSchemes;
  public issuePriorities: IssuePriorities;
  public issueProperties: IssueProperties;
  public issueRemoteLinks: IssueRemoteLinks;
  public issueResolutions: IssueResolutions;
  public issues: Issues;
  public issueSearch: IssueSearch;
  public issueSecurityLevel: IssueSecurityLevel;
  public issueSecuritySchemes: IssueSecuritySchemes;
  public issueTypeProperties: IssueTypeProperties;
  public issueTypeSchemes: IssueTypeSchemes;
  public issueTypeScreenSchemes: IssueTypeScreenSchemes;
  public issueTypes: IssueTypes;
  public issueVotes: IssueVotes;
  public issueWatchers: IssueWatchers;
  public issueWorklogProperties: IssueWorklogProperties;
  public issueWorklogs: IssueWorklogs;
  public jiraExpressions: JiraExpressions;
  public jiraSettings: JiraSettings;
  public jql: Jql;
  public labels: Labels;
  public myself: Myself;
  public permissions: Permissions;
  /** @deprecated Use <b>permissionSchemes</b>. Will be removed in next major version */
  public permissionsSchemes: PermissionSchemes;
  public permissionSchemes: PermissionSchemes;
  public projectAvatars: ProjectAvatars;
  public projectCategories: ProjectCategories;
  public projectComponents: ProjectComponents;
  public projectEmail: ProjectEmail;
  public projectKeyAndNameValidation: ProjectKeyAndNameValidation;
  public projectPermissionSchemes: ProjectPermissionSchemes;
  public projectProperties: ProjectProperties;
  public projectRoleActors: ProjectRoleActors;
  public projectRoles: ProjectRoles;
  public projects: Projects;
  public projectTypes: ProjectTypes;
  public projectVersions: ProjectVersions;
  public screens: Screens;
  public screenSchemes: ScreenSchemes;
  public screenTabFields: ScreenTabFields;
  public screenTabs: ScreenTabs;
  public sprint: Sprint;
  public tasks: Tasks;
  public timeTracking: TimeTracking;
  public userProperties: UserProperties;
  public users: Users;
  public userSearch: UserSearch;
  public webhooks: Webhooks;
  public workflows: Workflows;
  public workflowSchemeDrafts: WorkflowSchemeDrafts;
  public workflowSchemeProjectAssociations: WorkflowSchemeProjectAssociations;
  public workflowSchemes: WorkflowSchemes;
  public workflowStatusCategories: WorkflowStatusCategories;
  public workflowStatuses: WorkflowStatuses;
  public workflowTransitionProperties: WorkflowTransitionProperties;
  public workflowTransitionRules: WorkflowTransitionRules;

  private requestInstance: AxiosInstance;

  constructor(private readonly config: Config) {
    const headers = {
      ...config.baseRequestConfig?.headers,
      'x-atlassian-force-account-id': config.strictGDPR,
    };

    removeEmptyValues(headers);

    this.requestInstance = axios.create({
      timeout: config.timeout,
      ...config.baseRequestConfig,
      baseURL: config.host,
      headers,
    });

    this.applicationRoles = new ApplicationRoles(this);
    this.appProperties = new AppProperties(this);
    this.auditRecords = new AuditRecords(this);
    this.avatars = new Avatars(this);
    this.backlog = new Backlog(this);
    this.board = new Board(this);
    this.builds = new Builds(this);
    this.dashboards = new Dashboards(this);
    this.deployments = new Deployments(this);
    this.developmentInformation = new DevelopmentInformation(this);
    this.dynamicModules = new DynamicModules(this);
    this.epic = new Epic(this);
    this.featureFlags = new FeatureFlags(this);
    this.filters = new Filters(this);
    this.filterSharing = new FilterSharing(this);
    this.groupAndUserPicker = new GroupAndUserPicker(this);
    this.groups = new Groups(this);
    this.issue = new Issue(this);
    this.issueAttachments = new IssueAttachments(this);
    /** @deprecated Use issueAttachments. Will be removed in next major version */
    this.issueAttachment = new IssueAttachments(this);
    this.issueCommentProperties = new IssueCommentProperties(this);
    this.issueComments = new IssueComments(this);
    this.issueCustomFieldOptions = new IssueCustomFieldOptions(this);
    this.issueCustomFieldOptionsApps = new IssueCustomFieldOptionsApps(this);
    this.issueFieldConfigurations = new IssueFieldConfigurations(this);
    this.issueFields = new IssueFields(this);
    this.issueLinks = new IssueLinks(this);
    this.issueLinkTypes = new IssueLinkTypes(this);
    this.issueNavigatorSettings = new IssueNavigatorSettings(this);
    this.issueNotificationSchemes = new IssueNotificationSchemes(this);
    this.issuePriorities = new IssuePriorities(this);
    this.issueProperties = new IssueProperties(this);
    this.issueRemoteLinks = new IssueRemoteLinks(this);
    this.issueResolutions = new IssueResolutions(this);
    this.issues = new Issues(this);
    this.issueSearch = new IssueSearch(this);
    this.issueSecurityLevel = new IssueSecurityLevel(this);
    this.issueSecuritySchemes = new IssueSecuritySchemes(this);
    this.issueTypeProperties = new IssueTypeProperties(this);
    this.issueTypeSchemes = new IssueTypeSchemes(this);
    this.issueTypeScreenSchemes = new IssueTypeScreenSchemes(this);
    this.issueTypes = new IssueTypes(this);
    this.issueVotes = new IssueVotes(this);
    this.issueWatchers = new IssueWatchers(this);
    this.issueWorklogProperties = new IssueWorklogProperties(this);
    this.issueWorklogs = new IssueWorklogs(this);
    this.jiraExpressions = new JiraExpressions(this);
    this.jiraSettings = new JiraSettings(this);
    this.jql = new Jql(this);
    this.labels = new Labels(this);
    this.myself = new Myself(this);
    this.permissions = new Permissions(this);
    this.permissionSchemes = new PermissionSchemes(this);
    /** @deprecated Use permissionSchemes. Will be removed in next major version */
    this.permissionsSchemes = new PermissionSchemes(this);
    this.projectAvatars = new ProjectAvatars(this);
    this.projectCategories = new ProjectCategories(this);
    this.projectComponents = new ProjectComponents(this);
    this.projectEmail = new ProjectEmail(this);
    this.projectKeyAndNameValidation = new ProjectKeyAndNameValidation(this);
    this.projectPermissionSchemes = new ProjectPermissionSchemes(this);
    this.projectProperties = new ProjectProperties(this);
    this.projectRoleActors = new ProjectRoleActors(this);
    this.projectRoles = new ProjectRoles(this);
    this.projects = new Projects(this);
    this.projectTypes = new ProjectTypes(this);
    this.projectVersions = new ProjectVersions(this);
    this.screens = new Screens(this);
    this.screenSchemes = new ScreenSchemes(this);
    this.screenTabFields = new ScreenTabFields(this);
    this.screenTabs = new ScreenTabs(this);
    this.sprint = new Sprint(this);
    this.tasks = new Tasks(this);
    this.timeTracking = new TimeTracking(this);
    this.userProperties = new UserProperties(this);
    this.users = new Users(this);
    this.userSearch = new UserSearch(this);
    this.webhooks = new Webhooks(this);
    this.workflows = new Workflows(this);
    this.workflowSchemeDrafts = new WorkflowSchemeDrafts(this);
    this.workflowSchemeProjectAssociations = new WorkflowSchemeProjectAssociations(this);
    this.workflowSchemes = new WorkflowSchemes(this);
    this.workflowStatusCategories = new WorkflowStatusCategories(this);
    this.workflowStatuses = new WorkflowStatuses(this);
    this.workflowTransitionProperties = new WorkflowTransitionProperties(this);
    this.workflowTransitionRules = new WorkflowTransitionRules(this);
  }

  public async sendRequest(request: AxiosRequestConfig, callback?: Callback): Promise<any> {
    try {
      request.headers = {
        Authorization: getAuthentication(this.config, request),
        ...request.headers,
      };

      removeEmptyValues(request.headers);

      const response = await this.requestInstance.request(request);

      const callbackResponseHandler = callback && ((data: any): void => callback(null, data));
      const defaultResponseHandler = (data: any): any => data;

      const responseHandler = callbackResponseHandler ?? defaultResponseHandler;

      this.config.middlewares?.onResponse?.(response.data);

      return responseHandler(response.data);
    } catch (e) {
      const callbackErrorHandler = callback && ((error: Error) => callback(error));
      const defaultErrorHandler = (error: Error) => { throw error; };

      const errorHandler = callbackErrorHandler ?? defaultErrorHandler;

      this.config.middlewares?.onError?.(e);

      return errorHandler(e);
    }
  }
}
