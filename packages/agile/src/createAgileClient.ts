import { type ClientConfig, createClient } from '@jira.js/base';
import * as backlog from '#/api/backlog';
import * as board from '#/api/board';
import * as epic from '#/api/epic';
import * as issue from '#/api/issue';
import * as sprint from '#/api/sprint';
import * as developmentInformation from '#/api/developmentInformation';
import * as featureFlags from '#/api/featureFlags';
import * as deployments from '#/api/deployments';
import * as builds from '#/api/builds';
import * as remoteLinks from '#/api/remoteLinks';
import * as securityInformation from '#/api/securityInformation';
import * as operations from '#/api/operations';
import * as devopsComponents from '#/api/devopsComponents';
import {
  type MoveIssuesToBacklog,
  type MoveIssuesToBacklogForBoard,
  type GetAllBoards,
  type CreateBoard,
  type GetBoardByFilterId,
  type GetBoard,
  type DeleteBoard,
  type GetIssuesForBacklog,
  type GetConfiguration,
  type GetEpics,
  type GetIssuesWithoutEpicForBoard,
  type GetBoardIssuesForEpic,
  type GetFeaturesForBoard,
  type ToggleFeatures,
  type GetIssuesForBoard,
  type MoveIssuesToBoard,
  type GetProjects,
  type GetProjectsFull,
  type GetBoardPropertyKeys,
  type GetBoardProperty,
  type SetBoardProperty,
  type DeleteBoardProperty,
  type GetAllQuickFilters,
  type GetQuickFilter,
  type GetReportsForBoard,
  type GetAllSprints,
  type GetBoardIssuesForSprint,
  type GetAllVersions,
  type GetIssuesWithoutEpic,
  type RemoveIssuesFromEpic,
  type GetEpic,
  type PartiallyUpdateEpic,
  type GetIssuesForEpic,
  type MoveIssuesToEpic,
  type RankEpics,
  type RankIssues,
  type GetIssue,
  type GetIssueEstimationForBoard,
  type EstimateIssueForBoard,
  type CreateSprint,
  type GetSprint,
  type PartiallyUpdateSprint,
  type UpdateSprint,
  type DeleteSprint,
  type GetIssuesForSprint,
  type MoveIssuesToSprintAndRank,
  type GetPropertiesKeys,
  type GetProperty,
  type SetProperty,
  type DeleteProperty,
  type SwapSprint,
  type StoreDevelopmentInformation,
  type GetRepository,
  type DeleteRepository,
  type DeleteByProperties,
  type ExistsByProperties,
  type DeleteEntity,
  type SubmitFeatureFlags,
  type DeleteFeatureFlagsByProperty,
  type GetFeatureFlagById,
  type DeleteFeatureFlagById,
  type SubmitDeployments,
  type DeleteDeploymentsByProperty,
  type GetDeploymentByKey,
  type DeleteDeploymentByKey,
  type GetDeploymentGatingStatusByKey,
  type SubmitBuilds,
  type DeleteBuildsByProperty,
  type GetBuildByKey,
  type DeleteBuildByKey,
  type SubmitRemoteLinks,
  type DeleteRemoteLinksByProperty,
  type GetRemoteLinkById,
  type DeleteRemoteLinkById,
  type SubmitWorkspaces,
  type DeleteLinkedWorkspaces,
  type GetLinkedWorkspaceById,
  type SubmitVulnerabilities,
  type DeleteVulnerabilitiesByProperty,
  type GetVulnerabilityById,
  type DeleteVulnerabilityById,
  type SubmitOperationsWorkspaces,
  type DeleteWorkspaces,
  type GetWorkspaces,
  type SubmitEntity,
  type DeleteEntityByProperty,
  type GetIncidentById,
  type DeleteIncidentById,
  type GetReviewById,
  type DeleteReviewById,
  type SubmitComponents,
  type DeleteComponentsByProperty,
  type GetComponentById,
  type DeleteComponentById,
} from '#/parameters';
import {
  type GetAllBoards as GetAllBoardsModel,
  type CreateBoard as CreateBoardModel,
  type GetBoardByFilterId as GetBoardByFilterIdModel,
  type GetBoard as GetBoardModel,
  type SearchResults,
  type GetConfiguration as GetConfigurationModel,
  type GetEpics as GetEpicsModel,
  type GetFeaturesForBoard as GetFeaturesForBoardModel,
  type ToggleFeatures as ToggleFeaturesModel,
  type GetProjects as GetProjectsModel,
  type GetProjectsFull as GetProjectsFullModel,
  type PropertyKeys,
  type EntityProperty,
  type GetAllQuickFilters as GetAllQuickFiltersModel,
  type GetQuickFilter as GetQuickFilterModel,
  type GetReportsForBoard as GetReportsForBoardModel,
  type GetAllSprints as GetAllSprintsModel,
  type GetAllVersions as GetAllVersionsModel,
  type Epic,
  type Issue,
  type GetIssueEstimationForBoard as GetIssueEstimationForBoardModel,
  type EstimateIssueForBoard as EstimateIssueForBoardModel,
  type Sprint,
  type StoreDevelopmentInformation as StoreDevelopmentInformationModel,
  type GetRepository as GetRepositoryModel,
  type ExistsByProperties as ExistsByPropertiesModel,
  type SubmitFeatureFlags as SubmitFeatureFlagsModel,
  type GetFeatureFlagById as GetFeatureFlagByIdModel,
  type SubmitDeployments as SubmitDeploymentsModel,
  type GetDeploymentByKey as GetDeploymentByKeyModel,
  type GetDeploymentGatingStatusByKey as GetDeploymentGatingStatusByKeyModel,
  type SubmitBuilds as SubmitBuildsModel,
  type GetBuildByKey as GetBuildByKeyModel,
  type SubmitRemoteLinks as SubmitRemoteLinksModel,
  type GetRemoteLinkById as GetRemoteLinkByIdModel,
  type GetLinkedWorkspaces,
  type GetLinkedWorkspaceById as GetLinkedWorkspaceByIdModel,
  type SubmitVulnerabilities as SubmitVulnerabilitiesModel,
  type GetVulnerabilityById as GetVulnerabilityByIdModel,
  type SubmitOperationsWorkspaces as SubmitOperationsWorkspacesModel,
  type GetWorkspaces as GetWorkspacesModel,
  type SubmitEntity as SubmitEntityModel,
  type GetIncidentById as GetIncidentByIdModel,
  type GetReviewById as GetReviewByIdModel,
  type SubmitComponents as SubmitComponentsModel,
  type GetComponentById as GetComponentByIdModel,
} from '#/models';

/**
 * Creates a Jira Agile REST API client.
 *
 * @stable
 *
 * @example
 * ```typescript
 * import { createAgileClient } from '@jira.js/agile';
 *
 * const agile = createAgileClient({
 *   host: 'https://your-domain.atlassian.net',
 *   auth: { type: 'basic', email: 'you@example.com', apiToken: 'TOKEN' },
 * });
 *
 * const boards = await agile.board.getAllBoards({ type: 'scrum' });
 * ```
 */
export function createAgileClient(clientConfig: ClientConfig) {
  const client = createClient(clientConfig);

  return {
    backlog: {
      moveIssuesToBacklog: (parameters: MoveIssuesToBacklog): Promise<void> =>
        backlog.moveIssuesToBacklog(client, parameters),
      moveIssuesToBacklogForBoard: (parameters: MoveIssuesToBacklogForBoard): Promise<void> =>
        backlog.moveIssuesToBacklogForBoard(client, parameters),
    },
    board: {
      getAllBoards: (parameters?: GetAllBoards): Promise<GetAllBoardsModel> => board.getAllBoards(client, parameters),
      createBoard: (parameters: CreateBoard): Promise<CreateBoardModel> => board.createBoard(client, parameters),
      getBoardByFilterId: (parameters: GetBoardByFilterId): Promise<GetBoardByFilterIdModel> =>
        board.getBoardByFilterId(client, parameters),
      getBoard: (parameters: GetBoard): Promise<GetBoardModel> => board.getBoard(client, parameters),
      deleteBoard: (parameters: DeleteBoard): Promise<void> => board.deleteBoard(client, parameters),
      getIssuesForBacklog: (parameters: GetIssuesForBacklog): Promise<SearchResults> =>
        board.getIssuesForBacklog(client, parameters),
      getConfiguration: (parameters: GetConfiguration): Promise<GetConfigurationModel> =>
        board.getConfiguration(client, parameters),
      getEpics: (parameters: GetEpics): Promise<GetEpicsModel> => board.getEpics(client, parameters),
      getIssuesWithoutEpicForBoard: (parameters: GetIssuesWithoutEpicForBoard): Promise<SearchResults> =>
        board.getIssuesWithoutEpicForBoard(client, parameters),
      getBoardIssuesForEpic: (parameters: GetBoardIssuesForEpic): Promise<SearchResults> =>
        board.getBoardIssuesForEpic(client, parameters),
      getFeaturesForBoard: (parameters: GetFeaturesForBoard): Promise<GetFeaturesForBoardModel> =>
        board.getFeaturesForBoard(client, parameters),
      toggleFeatures: (parameters: ToggleFeatures): Promise<ToggleFeaturesModel> =>
        board.toggleFeatures(client, parameters),
      getIssuesForBoard: (parameters: GetIssuesForBoard): Promise<SearchResults> =>
        board.getIssuesForBoard(client, parameters),
      moveIssuesToBoard: (parameters: MoveIssuesToBoard): Promise<void> => board.moveIssuesToBoard(client, parameters),
      getProjects: (parameters: GetProjects): Promise<GetProjectsModel> => board.getProjects(client, parameters),
      getProjectsFull: (parameters: GetProjectsFull): Promise<GetProjectsFullModel> =>
        board.getProjectsFull(client, parameters),
      getBoardPropertyKeys: (parameters: GetBoardPropertyKeys): Promise<PropertyKeys> =>
        board.getBoardPropertyKeys(client, parameters),
      getBoardProperty: (parameters: GetBoardProperty): Promise<EntityProperty> =>
        board.getBoardProperty(client, parameters),
      setBoardProperty: (parameters: SetBoardProperty): Promise<void> => board.setBoardProperty(client, parameters),
      deleteBoardProperty: (parameters: DeleteBoardProperty): Promise<void> =>
        board.deleteBoardProperty(client, parameters),
      getAllQuickFilters: (parameters: GetAllQuickFilters): Promise<GetAllQuickFiltersModel> =>
        board.getAllQuickFilters(client, parameters),
      getQuickFilter: (parameters: GetQuickFilter): Promise<GetQuickFilterModel> =>
        board.getQuickFilter(client, parameters),
      getReportsForBoard: (parameters: GetReportsForBoard): Promise<GetReportsForBoardModel> =>
        board.getReportsForBoard(client, parameters),
      getAllSprints: (parameters: GetAllSprints): Promise<GetAllSprintsModel> =>
        board.getAllSprints(client, parameters),
      getBoardIssuesForSprint: (parameters: GetBoardIssuesForSprint): Promise<SearchResults> =>
        board.getBoardIssuesForSprint(client, parameters),
      getAllVersions: (parameters: GetAllVersions): Promise<GetAllVersionsModel> =>
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
    issue: {
      rankIssues: (parameters: RankIssues): Promise<void> => issue.rankIssues(client, parameters),
      getIssue: (parameters: GetIssue): Promise<Issue> => issue.getIssue(client, parameters),
      getIssueEstimationForBoard: (parameters: GetIssueEstimationForBoard): Promise<GetIssueEstimationForBoardModel> =>
        issue.getIssueEstimationForBoard(client, parameters),
      estimateIssueForBoard: (parameters: EstimateIssueForBoard): Promise<EstimateIssueForBoardModel> =>
        issue.estimateIssueForBoard(client, parameters),
    },
    sprint: {
      createSprint: (parameters: CreateSprint): Promise<Sprint> => sprint.createSprint(client, parameters),
      getSprint: (parameters: GetSprint): Promise<Sprint> => sprint.getSprint(client, parameters),
      partiallyUpdateSprint: (parameters: PartiallyUpdateSprint): Promise<Sprint> =>
        sprint.partiallyUpdateSprint(client, parameters),
      updateSprint: (parameters: UpdateSprint): Promise<Sprint> => sprint.updateSprint(client, parameters),
      deleteSprint: (parameters: DeleteSprint): Promise<void> => sprint.deleteSprint(client, parameters),
      getIssuesForSprint: (parameters: GetIssuesForSprint): Promise<SearchResults> =>
        sprint.getIssuesForSprint(client, parameters),
      moveIssuesToSprintAndRank: (parameters: MoveIssuesToSprintAndRank): Promise<void> =>
        sprint.moveIssuesToSprintAndRank(client, parameters),
      getPropertiesKeys: (parameters: GetPropertiesKeys): Promise<PropertyKeys> =>
        sprint.getPropertiesKeys(client, parameters),
      getProperty: (parameters: GetProperty): Promise<EntityProperty> => sprint.getProperty(client, parameters),
      setProperty: (parameters: SetProperty): Promise<void> => sprint.setProperty(client, parameters),
      deleteProperty: (parameters: DeleteProperty): Promise<void> => sprint.deleteProperty(client, parameters),
      swapSprint: (parameters: SwapSprint): Promise<void> => sprint.swapSprint(client, parameters),
    },
    developmentInformation: {
      storeDevelopmentInformation: (
        parameters: StoreDevelopmentInformation,
      ): Promise<StoreDevelopmentInformationModel> =>
        developmentInformation.storeDevelopmentInformation(client, parameters),
      getRepository: (parameters: GetRepository): Promise<GetRepositoryModel> =>
        developmentInformation.getRepository(client, parameters),
      deleteRepository: (parameters: DeleteRepository): Promise<unknown> =>
        developmentInformation.deleteRepository(client, parameters),
      deleteByProperties: (parameters: DeleteByProperties): Promise<unknown> =>
        developmentInformation.deleteByProperties(client, parameters),
      existsByProperties: (parameters?: ExistsByProperties): Promise<ExistsByPropertiesModel> =>
        developmentInformation.existsByProperties(client, parameters),
      deleteEntity: (parameters: DeleteEntity): Promise<unknown> =>
        developmentInformation.deleteEntity(client, parameters),
    },
    featureFlags: {
      submitFeatureFlags: (parameters: SubmitFeatureFlags): Promise<SubmitFeatureFlagsModel> =>
        featureFlags.submitFeatureFlags(client, parameters),
      deleteFeatureFlagsByProperty: (parameters: DeleteFeatureFlagsByProperty): Promise<unknown> =>
        featureFlags.deleteFeatureFlagsByProperty(client, parameters),
      getFeatureFlagById: (parameters: GetFeatureFlagById): Promise<GetFeatureFlagByIdModel> =>
        featureFlags.getFeatureFlagById(client, parameters),
      deleteFeatureFlagById: (parameters: DeleteFeatureFlagById): Promise<unknown> =>
        featureFlags.deleteFeatureFlagById(client, parameters),
    },
    deployments: {
      submitDeployments: (parameters: SubmitDeployments): Promise<SubmitDeploymentsModel> =>
        deployments.submitDeployments(client, parameters),
      deleteDeploymentsByProperty: (parameters: DeleteDeploymentsByProperty): Promise<unknown> =>
        deployments.deleteDeploymentsByProperty(client, parameters),
      getDeploymentByKey: (parameters: GetDeploymentByKey): Promise<GetDeploymentByKeyModel> =>
        deployments.getDeploymentByKey(client, parameters),
      deleteDeploymentByKey: (parameters: DeleteDeploymentByKey): Promise<unknown> =>
        deployments.deleteDeploymentByKey(client, parameters),
      getDeploymentGatingStatusByKey: (
        parameters: GetDeploymentGatingStatusByKey,
      ): Promise<GetDeploymentGatingStatusByKeyModel> => deployments.getDeploymentGatingStatusByKey(client, parameters),
    },
    builds: {
      submitBuilds: (parameters: SubmitBuilds): Promise<SubmitBuildsModel> => builds.submitBuilds(client, parameters),
      deleteBuildsByProperty: (parameters: DeleteBuildsByProperty): Promise<unknown> =>
        builds.deleteBuildsByProperty(client, parameters),
      getBuildByKey: (parameters: GetBuildByKey): Promise<GetBuildByKeyModel> =>
        builds.getBuildByKey(client, parameters),
      deleteBuildByKey: (parameters: DeleteBuildByKey): Promise<unknown> => builds.deleteBuildByKey(client, parameters),
    },
    remoteLinks: {
      submitRemoteLinks: (parameters: SubmitRemoteLinks): Promise<SubmitRemoteLinksModel> =>
        remoteLinks.submitRemoteLinks(client, parameters),
      deleteRemoteLinksByProperty: (parameters: DeleteRemoteLinksByProperty): Promise<unknown> =>
        remoteLinks.deleteRemoteLinksByProperty(client, parameters),
      getRemoteLinkById: (parameters: GetRemoteLinkById): Promise<GetRemoteLinkByIdModel> =>
        remoteLinks.getRemoteLinkById(client, parameters),
      deleteRemoteLinkById: (parameters: DeleteRemoteLinkById): Promise<unknown> =>
        remoteLinks.deleteRemoteLinkById(client, parameters),
    },
    securityInformation: {
      submitWorkspaces: (parameters: SubmitWorkspaces): Promise<unknown> =>
        securityInformation.submitWorkspaces(client, parameters),
      deleteLinkedWorkspaces: (parameters: DeleteLinkedWorkspaces): Promise<unknown> =>
        securityInformation.deleteLinkedWorkspaces(client, parameters),
      getLinkedWorkspaces: (): Promise<GetLinkedWorkspaces> =>
        securityInformation.getLinkedWorkspaces(client),
      getLinkedWorkspaceById: (parameters: GetLinkedWorkspaceById): Promise<GetLinkedWorkspaceByIdModel> =>
        securityInformation.getLinkedWorkspaceById(client, parameters),
      submitVulnerabilities: (parameters: SubmitVulnerabilities): Promise<SubmitVulnerabilitiesModel> =>
        securityInformation.submitVulnerabilities(client, parameters),
      deleteVulnerabilitiesByProperty: (parameters: DeleteVulnerabilitiesByProperty): Promise<unknown> =>
        securityInformation.deleteVulnerabilitiesByProperty(client, parameters),
      getVulnerabilityById: (parameters: GetVulnerabilityById): Promise<GetVulnerabilityByIdModel> =>
        securityInformation.getVulnerabilityById(client, parameters),
      deleteVulnerabilityById: (parameters: DeleteVulnerabilityById): Promise<unknown> =>
        securityInformation.deleteVulnerabilityById(client, parameters),
    },
    operations: {
      submitOperationsWorkspaces: (parameters: SubmitOperationsWorkspaces): Promise<SubmitOperationsWorkspacesModel> =>
        operations.submitOperationsWorkspaces(client, parameters),
      deleteWorkspaces: (parameters: DeleteWorkspaces): Promise<unknown> =>
        operations.deleteWorkspaces(client, parameters),
      getWorkspaces: (parameters?: GetWorkspaces): Promise<GetWorkspacesModel> =>
        operations.getWorkspaces(client, parameters),
      submitEntity: (parameters: SubmitEntity): Promise<SubmitEntityModel> =>
        operations.submitEntity(client, parameters),
      deleteEntityByProperty: (parameters: DeleteEntityByProperty): Promise<unknown> =>
        operations.deleteEntityByProperty(client, parameters),
      getIncidentById: (parameters: GetIncidentById): Promise<GetIncidentByIdModel> =>
        operations.getIncidentById(client, parameters),
      deleteIncidentById: (parameters: DeleteIncidentById): Promise<unknown> =>
        operations.deleteIncidentById(client, parameters),
      getReviewById: (parameters: GetReviewById): Promise<GetReviewByIdModel> =>
        operations.getReviewById(client, parameters),
      deleteReviewById: (parameters: DeleteReviewById): Promise<unknown> =>
        operations.deleteReviewById(client, parameters),
    },
    devopsComponents: {
      submitComponents: (parameters: SubmitComponents): Promise<SubmitComponentsModel> =>
        devopsComponents.submitComponents(client, parameters),
      deleteComponentsByProperty: (parameters: DeleteComponentsByProperty): Promise<unknown> =>
        devopsComponents.deleteComponentsByProperty(client, parameters),
      getComponentById: (parameters: GetComponentById): Promise<GetComponentByIdModel> =>
        devopsComponents.getComponentById(client, parameters),
      deleteComponentById: (parameters: DeleteComponentById): Promise<unknown> =>
        devopsComponents.deleteComponentById(client, parameters),
    },
  };
}

export type AgileClient = ReturnType<typeof createAgileClient>;
