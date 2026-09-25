import { type ClientConfig, type Client, type RequestOptions, createClient } from '#/core';
import * as backlog from './api/backlog';
import * as board from './api/board';
import * as epic from './api/epic';
import * as issue from './api/issue';
import * as sprint from './api/sprint';
import * as developmentInformation from './api/developmentInformation';
import * as featureFlags from './api/featureFlags';
import * as deployments from './api/deployments';
import * as builds from './api/builds';
import * as remoteLinks from './api/remoteLinks';
import * as securityInformation from './api/securityInformation';
import * as operations from './api/operations';
import * as devopsComponents from './api/devopsComponents';
import type {
  MoveIssuesToBacklog,
  MoveIssuesToBacklogForBoard,
  GetAllBoards,
  CreateBoard,
  GetBoardByFilterId,
  GetBoard,
  DeleteBoard,
  GetIssuesForBacklog,
  GetApproximateIssueCountForBacklog,
  GetConfiguration,
  GetEpics,
  GetIssuesWithoutEpicForBoard,
  GetBoardIssuesForEpic,
  GetFeaturesForBoard,
  ToggleFeatures,
  MoveIssuesToBoard,
  GetIssuesForBoard,
  GetApproximateIssueCountForBoard,
  GetProjects,
  GetProjectsFull,
  GetBoardPropertyKeys,
  GetBoardProperty,
  SetBoardProperty,
  DeleteBoardProperty,
  GetAllQuickFilters,
  GetQuickFilter,
  GetReportsForBoard,
  GetAllSprints,
  GetBoardIssuesForSprint,
  GetAllVersions,
  RemoveIssuesFromEpic,
  GetIssuesWithoutEpic,
  GetEpic,
  PartiallyUpdateEpic,
  MoveIssuesToEpic,
  GetIssuesForEpic,
  RankEpics,
  RankIssues,
  GetIssue,
  GetIssueEstimationForBoard,
  EstimateIssueForBoard,
  CreateSprint,
  GetSprint,
  PartiallyUpdateSprint,
  UpdateSprint,
  DeleteSprint,
  MoveIssuesToSprintAndRank,
  GetIssuesForSprint,
  GetPropertiesKeys,
  GetProperty,
  SetProperty,
  DeleteProperty,
  SwapSprint,
  StoreDevelopmentInformation,
  GetRepository,
  DeleteRepository,
  DeleteByProperties,
  ExistsByProperties,
  DeleteEntity,
  SubmitFeatureFlags,
  DeleteFeatureFlagsByProperty,
  GetFeatureFlagById,
  DeleteFeatureFlagById,
  SubmitDeployments,
  DeleteDeploymentsByProperty,
  GetDeploymentByKey,
  DeleteDeploymentByKey,
  GetDeploymentGatingStatusByKey,
  SubmitBuilds,
  DeleteBuildsByProperty,
  GetBuildByKey,
  DeleteBuildByKey,
  SubmitRemoteLinks,
  DeleteRemoteLinksByProperty,
  GetRemoteLinkById,
  DeleteRemoteLinkById,
  SubmitWorkspaces,
  DeleteLinkedWorkspaces,
  GetLinkedWorkspaceById,
  SubmitVulnerabilities,
  DeleteVulnerabilitiesByProperty,
  GetVulnerabilityById,
  DeleteVulnerabilityById,
  SubmitOperationsWorkspaces,
  DeleteWorkspaces,
  GetWorkspaces,
  SubmitEntity,
  DeleteEntityByProperty,
  GetIncidentById,
  DeleteIncidentById,
  GetReviewById,
  DeleteReviewById,
  SubmitComponents,
  DeleteComponentsByProperty,
  GetComponentById,
  DeleteComponentById,
} from './parameters';
import type {
  Page,
  Board,
  BoardFilter,
  SoftwareIssueResults,
  IssueCount,
  GetConfiguration as GetConfigurationModel,
  GetEpics as GetEpicsModel,
  GetFeaturesForBoard as GetFeaturesForBoardModel,
  ToggleFeatures as ToggleFeaturesModel,
  GetProjects as GetProjectsModel,
  GetProjectsFull as GetProjectsFullModel,
  PropertyKeys,
  EntityProperty,
  QuickFilter,
  GetReportsForBoard as GetReportsForBoardModel,
  GetAllSprints as GetAllSprintsModel,
  GetAllVersions as GetAllVersionsModel,
  Epic,
  Issue,
  GetIssueEstimationForBoard as GetIssueEstimationForBoardModel,
  EstimateIssueForBoard as EstimateIssueForBoardModel,
  Sprint,
  StoreDevelopmentInformation as StoreDevelopmentInformationModel,
  GetRepository as GetRepositoryModel,
  ExistsByProperties as ExistsByPropertiesModel,
  SubmitFeatureFlags as SubmitFeatureFlagsModel,
  GetFeatureFlagById as GetFeatureFlagByIdModel,
  SubmitDeployments as SubmitDeploymentsModel,
  GetDeploymentByKey as GetDeploymentByKeyModel,
  GetDeploymentGatingStatusByKey as GetDeploymentGatingStatusByKeyModel,
  SubmitBuilds as SubmitBuildsModel,
  GetBuildByKey as GetBuildByKeyModel,
  SubmitRemoteLinks as SubmitRemoteLinksModel,
  GetRemoteLinkById as GetRemoteLinkByIdModel,
  GetLinkedWorkspaces,
  GetLinkedWorkspaceById as GetLinkedWorkspaceByIdModel,
  SubmitVulnerabilities as SubmitVulnerabilitiesModel,
  GetVulnerabilityById as GetVulnerabilityByIdModel,
  SubmitOperationsWorkspaces as SubmitOperationsWorkspacesModel,
  GetWorkspaces as GetWorkspacesModel,
  SubmitEntity as SubmitEntityModel,
  GetIncidentById as GetIncidentByIdModel,
  GetReviewById as GetReviewByIdModel,
  SubmitComponents as SubmitComponentsModel,
  GetComponentById as GetComponentByIdModel,
} from './models';

export function createAgileClient(clientConfig: ClientConfig | Client) {
  const client = createClient(clientConfig);

  return {
    backlog: {
      moveIssuesToBacklog: (parameters: MoveIssuesToBacklog, options?: RequestOptions): Promise<void> =>
        backlog.moveIssuesToBacklog(client, parameters, options),
      moveIssuesToBacklogForBoard: (parameters: MoveIssuesToBacklogForBoard, options?: RequestOptions): Promise<void> =>
        backlog.moveIssuesToBacklogForBoard(client, parameters, options),
    },
    board: {
      getAllBoards: (parameters?: GetAllBoards, options?: RequestOptions): Promise<Page<Board>> =>
        board.getAllBoards(client, parameters, options),
      createBoard: (parameters: CreateBoard, options?: RequestOptions): Promise<Board> =>
        board.createBoard(client, parameters, options),
      getBoardByFilterId: (parameters: GetBoardByFilterId, options?: RequestOptions): Promise<Page<BoardFilter>> =>
        board.getBoardByFilterId(client, parameters, options),
      getBoard: (parameters: GetBoard, options?: RequestOptions): Promise<Board> =>
        board.getBoard(client, parameters, options),
      deleteBoard: (parameters: DeleteBoard, options?: RequestOptions): Promise<void> =>
        board.deleteBoard(client, parameters, options),
      getIssuesForBacklog: (parameters: GetIssuesForBacklog, options?: RequestOptions): Promise<SoftwareIssueResults> =>
        board.getIssuesForBacklog(client, parameters, options),
      getApproximateIssueCountForBacklog: (
        parameters: GetApproximateIssueCountForBacklog,
        options?: RequestOptions,
      ): Promise<IssueCount> => board.getApproximateIssueCountForBacklog(client, parameters, options),
      getConfiguration: (parameters: GetConfiguration, options?: RequestOptions): Promise<GetConfigurationModel> =>
        board.getConfiguration(client, parameters, options),
      getEpics: (parameters: GetEpics, options?: RequestOptions): Promise<GetEpicsModel> =>
        board.getEpics(client, parameters, options),
      getIssuesWithoutEpicForBoard: (
        parameters: GetIssuesWithoutEpicForBoard,
        options?: RequestOptions,
      ): Promise<SoftwareIssueResults> => board.getIssuesWithoutEpicForBoard(client, parameters, options),
      getBoardIssuesForEpic: (
        parameters: GetBoardIssuesForEpic,
        options?: RequestOptions,
      ): Promise<SoftwareIssueResults> => board.getBoardIssuesForEpic(client, parameters, options),
      getFeaturesForBoard: (
        parameters: GetFeaturesForBoard,
        options?: RequestOptions,
      ): Promise<GetFeaturesForBoardModel> => board.getFeaturesForBoard(client, parameters, options),
      toggleFeatures: (parameters: ToggleFeatures, options?: RequestOptions): Promise<ToggleFeaturesModel> =>
        board.toggleFeatures(client, parameters, options),
      moveIssuesToBoard: (parameters: MoveIssuesToBoard, options?: RequestOptions): Promise<void> =>
        board.moveIssuesToBoard(client, parameters, options),
      getIssuesForBoard: (parameters: GetIssuesForBoard, options?: RequestOptions): Promise<SoftwareIssueResults> =>
        board.getIssuesForBoard(client, parameters, options),
      getApproximateIssueCountForBoard: (
        parameters: GetApproximateIssueCountForBoard,
        options?: RequestOptions,
      ): Promise<IssueCount> => board.getApproximateIssueCountForBoard(client, parameters, options),
      getProjects: (parameters: GetProjects, options?: RequestOptions): Promise<GetProjectsModel> =>
        board.getProjects(client, parameters, options),
      getProjectsFull: (parameters: GetProjectsFull, options?: RequestOptions): Promise<GetProjectsFullModel> =>
        board.getProjectsFull(client, parameters, options),
      getBoardPropertyKeys: (parameters: GetBoardPropertyKeys, options?: RequestOptions): Promise<PropertyKeys> =>
        board.getBoardPropertyKeys(client, parameters, options),
      getBoardProperty: (parameters: GetBoardProperty, options?: RequestOptions): Promise<EntityProperty> =>
        board.getBoardProperty(client, parameters, options),
      setBoardProperty: (parameters: SetBoardProperty, options?: RequestOptions): Promise<void> =>
        board.setBoardProperty(client, parameters, options),
      deleteBoardProperty: (parameters: DeleteBoardProperty, options?: RequestOptions): Promise<void> =>
        board.deleteBoardProperty(client, parameters, options),
      getAllQuickFilters: (parameters: GetAllQuickFilters, options?: RequestOptions): Promise<Page<QuickFilter>> =>
        board.getAllQuickFilters(client, parameters, options),
      getQuickFilter: (parameters: GetQuickFilter, options?: RequestOptions): Promise<QuickFilter> =>
        board.getQuickFilter(client, parameters, options),
      getReportsForBoard: (
        parameters: GetReportsForBoard,
        options?: RequestOptions,
      ): Promise<GetReportsForBoardModel> => board.getReportsForBoard(client, parameters, options),
      getAllSprints: (parameters: GetAllSprints, options?: RequestOptions): Promise<GetAllSprintsModel> =>
        board.getAllSprints(client, parameters, options),
      getBoardIssuesForSprint: (
        parameters: GetBoardIssuesForSprint,
        options?: RequestOptions,
      ): Promise<SoftwareIssueResults> => board.getBoardIssuesForSprint(client, parameters, options),
      getAllVersions: (parameters: GetAllVersions, options?: RequestOptions): Promise<GetAllVersionsModel> =>
        board.getAllVersions(client, parameters, options),
    },
    epic: {
      removeIssuesFromEpic: (parameters: RemoveIssuesFromEpic, options?: RequestOptions): Promise<void> =>
        epic.removeIssuesFromEpic(client, parameters, options),
      getIssuesWithoutEpic: (
        parameters?: GetIssuesWithoutEpic,
        options?: RequestOptions,
      ): Promise<SoftwareIssueResults> => epic.getIssuesWithoutEpic(client, parameters, options),
      getEpic: (parameters: GetEpic, options?: RequestOptions): Promise<Epic> =>
        epic.getEpic(client, parameters, options),
      partiallyUpdateEpic: (parameters: PartiallyUpdateEpic, options?: RequestOptions): Promise<Epic> =>
        epic.partiallyUpdateEpic(client, parameters, options),
      moveIssuesToEpic: (parameters: MoveIssuesToEpic, options?: RequestOptions): Promise<void> =>
        epic.moveIssuesToEpic(client, parameters, options),
      getIssuesForEpic: (parameters: GetIssuesForEpic, options?: RequestOptions): Promise<SoftwareIssueResults> =>
        epic.getIssuesForEpic(client, parameters, options),
      rankEpics: (parameters: RankEpics, options?: RequestOptions): Promise<void> =>
        epic.rankEpics(client, parameters, options),
    },
    issue: {
      rankIssues: (parameters: RankIssues, options?: RequestOptions): Promise<void> =>
        issue.rankIssues(client, parameters, options),
      getIssue: (parameters: GetIssue, options?: RequestOptions): Promise<Issue> =>
        issue.getIssue(client, parameters, options),
      getIssueEstimationForBoard: (
        parameters: GetIssueEstimationForBoard,
        options?: RequestOptions,
      ): Promise<GetIssueEstimationForBoardModel> => issue.getIssueEstimationForBoard(client, parameters, options),
      estimateIssueForBoard: (
        parameters: EstimateIssueForBoard,
        options?: RequestOptions,
      ): Promise<EstimateIssueForBoardModel> => issue.estimateIssueForBoard(client, parameters, options),
    },
    sprint: {
      createSprint: (parameters: CreateSprint, options?: RequestOptions): Promise<Sprint> =>
        sprint.createSprint(client, parameters, options),
      getSprint: (parameters: GetSprint, options?: RequestOptions): Promise<Sprint> =>
        sprint.getSprint(client, parameters, options),
      partiallyUpdateSprint: (parameters: PartiallyUpdateSprint, options?: RequestOptions): Promise<Sprint> =>
        sprint.partiallyUpdateSprint(client, parameters, options),
      updateSprint: (parameters: UpdateSprint, options?: RequestOptions): Promise<Sprint> =>
        sprint.updateSprint(client, parameters, options),
      deleteSprint: (parameters: DeleteSprint, options?: RequestOptions): Promise<void> =>
        sprint.deleteSprint(client, parameters, options),
      moveIssuesToSprintAndRank: (parameters: MoveIssuesToSprintAndRank, options?: RequestOptions): Promise<void> =>
        sprint.moveIssuesToSprintAndRank(client, parameters, options),
      getIssuesForSprint: (parameters: GetIssuesForSprint, options?: RequestOptions): Promise<SoftwareIssueResults> =>
        sprint.getIssuesForSprint(client, parameters, options),
      getPropertiesKeys: (parameters: GetPropertiesKeys, options?: RequestOptions): Promise<PropertyKeys> =>
        sprint.getPropertiesKeys(client, parameters, options),
      getProperty: (parameters: GetProperty, options?: RequestOptions): Promise<EntityProperty> =>
        sprint.getProperty(client, parameters, options),
      setProperty: (parameters: SetProperty, options?: RequestOptions): Promise<void> =>
        sprint.setProperty(client, parameters, options),
      deleteProperty: (parameters: DeleteProperty, options?: RequestOptions): Promise<void> =>
        sprint.deleteProperty(client, parameters, options),
      swapSprint: (parameters: SwapSprint, options?: RequestOptions): Promise<void> =>
        sprint.swapSprint(client, parameters, options),
    },
    developmentInformation: {
      storeDevelopmentInformation: (
        parameters: StoreDevelopmentInformation,
        options?: RequestOptions,
      ): Promise<StoreDevelopmentInformationModel> =>
        developmentInformation.storeDevelopmentInformation(client, parameters, options),
      getRepository: (parameters: GetRepository, options?: RequestOptions): Promise<GetRepositoryModel> =>
        developmentInformation.getRepository(client, parameters, options),
      deleteRepository: (parameters: DeleteRepository, options?: RequestOptions): Promise<void> =>
        developmentInformation.deleteRepository(client, parameters, options),
      deleteByProperties: (parameters: DeleteByProperties, options?: RequestOptions): Promise<void> =>
        developmentInformation.deleteByProperties(client, parameters, options),
      existsByProperties: (
        parameters?: ExistsByProperties,
        options?: RequestOptions,
      ): Promise<ExistsByPropertiesModel> => developmentInformation.existsByProperties(client, parameters, options),
      deleteEntity: (parameters: DeleteEntity, options?: RequestOptions): Promise<void> =>
        developmentInformation.deleteEntity(client, parameters, options),
    },
    featureFlags: {
      submitFeatureFlags: (
        parameters: SubmitFeatureFlags,
        options?: RequestOptions,
      ): Promise<SubmitFeatureFlagsModel> => featureFlags.submitFeatureFlags(client, parameters, options),
      deleteFeatureFlagsByProperty: (
        parameters: DeleteFeatureFlagsByProperty,
        options?: RequestOptions,
      ): Promise<void> => featureFlags.deleteFeatureFlagsByProperty(client, parameters, options),
      getFeatureFlagById: (
        parameters: GetFeatureFlagById,
        options?: RequestOptions,
      ): Promise<GetFeatureFlagByIdModel> => featureFlags.getFeatureFlagById(client, parameters, options),
      deleteFeatureFlagById: (parameters: DeleteFeatureFlagById, options?: RequestOptions): Promise<void> =>
        featureFlags.deleteFeatureFlagById(client, parameters, options),
    },
    deployments: {
      submitDeployments: (parameters: SubmitDeployments, options?: RequestOptions): Promise<SubmitDeploymentsModel> =>
        deployments.submitDeployments(client, parameters, options),
      deleteDeploymentsByProperty: (parameters: DeleteDeploymentsByProperty, options?: RequestOptions): Promise<void> =>
        deployments.deleteDeploymentsByProperty(client, parameters, options),
      getDeploymentByKey: (
        parameters: GetDeploymentByKey,
        options?: RequestOptions,
      ): Promise<GetDeploymentByKeyModel> => deployments.getDeploymentByKey(client, parameters, options),
      deleteDeploymentByKey: (parameters: DeleteDeploymentByKey, options?: RequestOptions): Promise<void> =>
        deployments.deleteDeploymentByKey(client, parameters, options),
      getDeploymentGatingStatusByKey: (
        parameters: GetDeploymentGatingStatusByKey,
        options?: RequestOptions,
      ): Promise<GetDeploymentGatingStatusByKeyModel> =>
        deployments.getDeploymentGatingStatusByKey(client, parameters, options),
    },
    builds: {
      submitBuilds: (parameters: SubmitBuilds, options?: RequestOptions): Promise<SubmitBuildsModel> =>
        builds.submitBuilds(client, parameters, options),
      deleteBuildsByProperty: (parameters: DeleteBuildsByProperty, options?: RequestOptions): Promise<void> =>
        builds.deleteBuildsByProperty(client, parameters, options),
      getBuildByKey: (parameters: GetBuildByKey, options?: RequestOptions): Promise<GetBuildByKeyModel> =>
        builds.getBuildByKey(client, parameters, options),
      deleteBuildByKey: (parameters: DeleteBuildByKey, options?: RequestOptions): Promise<void> =>
        builds.deleteBuildByKey(client, parameters, options),
    },
    remoteLinks: {
      submitRemoteLinks: (parameters: SubmitRemoteLinks, options?: RequestOptions): Promise<SubmitRemoteLinksModel> =>
        remoteLinks.submitRemoteLinks(client, parameters, options),
      deleteRemoteLinksByProperty: (parameters: DeleteRemoteLinksByProperty, options?: RequestOptions): Promise<void> =>
        remoteLinks.deleteRemoteLinksByProperty(client, parameters, options),
      getRemoteLinkById: (parameters: GetRemoteLinkById, options?: RequestOptions): Promise<GetRemoteLinkByIdModel> =>
        remoteLinks.getRemoteLinkById(client, parameters, options),
      deleteRemoteLinkById: (parameters: DeleteRemoteLinkById, options?: RequestOptions): Promise<void> =>
        remoteLinks.deleteRemoteLinkById(client, parameters, options),
    },
    securityInformation: {
      submitWorkspaces: (parameters: SubmitWorkspaces, options?: RequestOptions): Promise<void> =>
        securityInformation.submitWorkspaces(client, parameters, options),
      deleteLinkedWorkspaces: (parameters: DeleteLinkedWorkspaces, options?: RequestOptions): Promise<void> =>
        securityInformation.deleteLinkedWorkspaces(client, parameters, options),
      getLinkedWorkspaces: (options?: RequestOptions): Promise<GetLinkedWorkspaces> =>
        securityInformation.getLinkedWorkspaces(client, options),
      getLinkedWorkspaceById: (
        parameters: GetLinkedWorkspaceById,
        options?: RequestOptions,
      ): Promise<GetLinkedWorkspaceByIdModel> =>
        securityInformation.getLinkedWorkspaceById(client, parameters, options),
      submitVulnerabilities: (
        parameters: SubmitVulnerabilities,
        options?: RequestOptions,
      ): Promise<SubmitVulnerabilitiesModel> => securityInformation.submitVulnerabilities(client, parameters, options),
      deleteVulnerabilitiesByProperty: (
        parameters: DeleteVulnerabilitiesByProperty,
        options?: RequestOptions,
      ): Promise<void> => securityInformation.deleteVulnerabilitiesByProperty(client, parameters, options),
      getVulnerabilityById: (
        parameters: GetVulnerabilityById,
        options?: RequestOptions,
      ): Promise<GetVulnerabilityByIdModel> => securityInformation.getVulnerabilityById(client, parameters, options),
      deleteVulnerabilityById: (parameters: DeleteVulnerabilityById, options?: RequestOptions): Promise<void> =>
        securityInformation.deleteVulnerabilityById(client, parameters, options),
    },
    operations: {
      submitOperationsWorkspaces: (
        parameters: SubmitOperationsWorkspaces,
        options?: RequestOptions,
      ): Promise<SubmitOperationsWorkspacesModel> => operations.submitOperationsWorkspaces(client, parameters, options),
      deleteWorkspaces: (parameters: DeleteWorkspaces, options?: RequestOptions): Promise<void> =>
        operations.deleteWorkspaces(client, parameters, options),
      getWorkspaces: (parameters?: GetWorkspaces, options?: RequestOptions): Promise<GetWorkspacesModel> =>
        operations.getWorkspaces(client, parameters, options),
      submitEntity: (parameters: SubmitEntity, options?: RequestOptions): Promise<SubmitEntityModel> =>
        operations.submitEntity(client, parameters, options),
      deleteEntityByProperty: (parameters: DeleteEntityByProperty, options?: RequestOptions): Promise<void> =>
        operations.deleteEntityByProperty(client, parameters, options),
      getIncidentById: (parameters: GetIncidentById, options?: RequestOptions): Promise<GetIncidentByIdModel> =>
        operations.getIncidentById(client, parameters, options),
      deleteIncidentById: (parameters: DeleteIncidentById, options?: RequestOptions): Promise<void> =>
        operations.deleteIncidentById(client, parameters, options),
      getReviewById: (parameters: GetReviewById, options?: RequestOptions): Promise<GetReviewByIdModel> =>
        operations.getReviewById(client, parameters, options),
      deleteReviewById: (parameters: DeleteReviewById, options?: RequestOptions): Promise<void> =>
        operations.deleteReviewById(client, parameters, options),
    },
    devopsComponents: {
      submitComponents: (parameters: SubmitComponents, options?: RequestOptions): Promise<SubmitComponentsModel> =>
        devopsComponents.submitComponents(client, parameters, options),
      deleteComponentsByProperty: (parameters: DeleteComponentsByProperty, options?: RequestOptions): Promise<void> =>
        devopsComponents.deleteComponentsByProperty(client, parameters, options),
      getComponentById: (parameters: GetComponentById, options?: RequestOptions): Promise<GetComponentByIdModel> =>
        devopsComponents.getComponentById(client, parameters, options),
      deleteComponentById: (parameters: DeleteComponentById, options?: RequestOptions): Promise<void> =>
        devopsComponents.deleteComponentById(client, parameters, options),
    },
  };
}

export type AgileClient = ReturnType<typeof createAgileClient>;
