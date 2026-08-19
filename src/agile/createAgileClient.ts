import { type ClientConfig, type Client, createClient } from '#/core';
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
      moveIssuesToBacklog: (parameters: MoveIssuesToBacklog): Promise<void> =>
        backlog.moveIssuesToBacklog(client, parameters),
      moveIssuesToBacklogForBoard: (parameters: MoveIssuesToBacklogForBoard): Promise<void> =>
        backlog.moveIssuesToBacklogForBoard(client, parameters),
    },
    board: {
      getAllBoards: (parameters?: GetAllBoards): Promise<Page<Board>> => board.getAllBoards(client, parameters),
      createBoard: (parameters: CreateBoard): Promise<Board> => board.createBoard(client, parameters),
      getBoardByFilterId: (parameters: GetBoardByFilterId): Promise<Page<BoardFilter>> =>
        board.getBoardByFilterId(client, parameters),
      getBoard: (parameters: GetBoard): Promise<Board> => board.getBoard(client, parameters),
      deleteBoard: (parameters: DeleteBoard): Promise<void> => board.deleteBoard(client, parameters),
      getIssuesForBacklog: (parameters: GetIssuesForBacklog): Promise<SoftwareIssueResults> =>
        board.getIssuesForBacklog(client, parameters),
      getApproximateIssueCountForBacklog: (parameters: GetApproximateIssueCountForBacklog): Promise<IssueCount> =>
        board.getApproximateIssueCountForBacklog(client, parameters),
      getConfiguration: (parameters: GetConfiguration): Promise<GetConfigurationModel> =>
        board.getConfiguration(client, parameters),
      getEpics: (parameters: GetEpics): Promise<GetEpicsModel> => board.getEpics(client, parameters),
      getIssuesWithoutEpicForBoard: (parameters: GetIssuesWithoutEpicForBoard): Promise<SoftwareIssueResults> =>
        board.getIssuesWithoutEpicForBoard(client, parameters),
      getBoardIssuesForEpic: (parameters: GetBoardIssuesForEpic): Promise<SoftwareIssueResults> =>
        board.getBoardIssuesForEpic(client, parameters),
      getFeaturesForBoard: (parameters: GetFeaturesForBoard): Promise<GetFeaturesForBoardModel> =>
        board.getFeaturesForBoard(client, parameters),
      toggleFeatures: (parameters: ToggleFeatures): Promise<ToggleFeaturesModel> =>
        board.toggleFeatures(client, parameters),
      moveIssuesToBoard: (parameters: MoveIssuesToBoard): Promise<void> => board.moveIssuesToBoard(client, parameters),
      getIssuesForBoard: (parameters: GetIssuesForBoard): Promise<SoftwareIssueResults> =>
        board.getIssuesForBoard(client, parameters),
      getApproximateIssueCountForBoard: (parameters: GetApproximateIssueCountForBoard): Promise<IssueCount> =>
        board.getApproximateIssueCountForBoard(client, parameters),
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
      getAllQuickFilters: (parameters: GetAllQuickFilters): Promise<Page<QuickFilter>> =>
        board.getAllQuickFilters(client, parameters),
      getQuickFilter: (parameters: GetQuickFilter): Promise<QuickFilter> => board.getQuickFilter(client, parameters),
      getReportsForBoard: (parameters: GetReportsForBoard): Promise<GetReportsForBoardModel> =>
        board.getReportsForBoard(client, parameters),
      getAllSprints: (parameters: GetAllSprints): Promise<GetAllSprintsModel> =>
        board.getAllSprints(client, parameters),
      getBoardIssuesForSprint: (parameters: GetBoardIssuesForSprint): Promise<SoftwareIssueResults> =>
        board.getBoardIssuesForSprint(client, parameters),
      getAllVersions: (parameters: GetAllVersions): Promise<GetAllVersionsModel> =>
        board.getAllVersions(client, parameters),
    },
    epic: {
      removeIssuesFromEpic: (parameters: RemoveIssuesFromEpic): Promise<void> =>
        epic.removeIssuesFromEpic(client, parameters),
      getIssuesWithoutEpic: (parameters?: GetIssuesWithoutEpic): Promise<SoftwareIssueResults> =>
        epic.getIssuesWithoutEpic(client, parameters),
      getEpic: (parameters: GetEpic): Promise<Epic> => epic.getEpic(client, parameters),
      partiallyUpdateEpic: (parameters: PartiallyUpdateEpic): Promise<Epic> =>
        epic.partiallyUpdateEpic(client, parameters),
      moveIssuesToEpic: (parameters: MoveIssuesToEpic): Promise<void> => epic.moveIssuesToEpic(client, parameters),
      getIssuesForEpic: (parameters: GetIssuesForEpic): Promise<SoftwareIssueResults> =>
        epic.getIssuesForEpic(client, parameters),
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
      moveIssuesToSprintAndRank: (parameters: MoveIssuesToSprintAndRank): Promise<void> =>
        sprint.moveIssuesToSprintAndRank(client, parameters),
      getIssuesForSprint: (parameters: GetIssuesForSprint): Promise<SoftwareIssueResults> =>
        sprint.getIssuesForSprint(client, parameters),
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
      deleteRepository: (parameters: DeleteRepository): Promise<void> =>
        developmentInformation.deleteRepository(client, parameters),
      deleteByProperties: (parameters: DeleteByProperties): Promise<void> =>
        developmentInformation.deleteByProperties(client, parameters),
      existsByProperties: (parameters?: ExistsByProperties): Promise<ExistsByPropertiesModel> =>
        developmentInformation.existsByProperties(client, parameters),
      deleteEntity: (parameters: DeleteEntity): Promise<void> =>
        developmentInformation.deleteEntity(client, parameters),
    },
    featureFlags: {
      submitFeatureFlags: (parameters: SubmitFeatureFlags): Promise<SubmitFeatureFlagsModel> =>
        featureFlags.submitFeatureFlags(client, parameters),
      deleteFeatureFlagsByProperty: (parameters: DeleteFeatureFlagsByProperty): Promise<void> =>
        featureFlags.deleteFeatureFlagsByProperty(client, parameters),
      getFeatureFlagById: (parameters: GetFeatureFlagById): Promise<GetFeatureFlagByIdModel> =>
        featureFlags.getFeatureFlagById(client, parameters),
      deleteFeatureFlagById: (parameters: DeleteFeatureFlagById): Promise<void> =>
        featureFlags.deleteFeatureFlagById(client, parameters),
    },
    deployments: {
      submitDeployments: (parameters: SubmitDeployments): Promise<SubmitDeploymentsModel> =>
        deployments.submitDeployments(client, parameters),
      deleteDeploymentsByProperty: (parameters: DeleteDeploymentsByProperty): Promise<void> =>
        deployments.deleteDeploymentsByProperty(client, parameters),
      getDeploymentByKey: (parameters: GetDeploymentByKey): Promise<GetDeploymentByKeyModel> =>
        deployments.getDeploymentByKey(client, parameters),
      deleteDeploymentByKey: (parameters: DeleteDeploymentByKey): Promise<void> =>
        deployments.deleteDeploymentByKey(client, parameters),
      getDeploymentGatingStatusByKey: (
        parameters: GetDeploymentGatingStatusByKey,
      ): Promise<GetDeploymentGatingStatusByKeyModel> => deployments.getDeploymentGatingStatusByKey(client, parameters),
    },
    builds: {
      submitBuilds: (parameters: SubmitBuilds): Promise<SubmitBuildsModel> => builds.submitBuilds(client, parameters),
      deleteBuildsByProperty: (parameters: DeleteBuildsByProperty): Promise<void> =>
        builds.deleteBuildsByProperty(client, parameters),
      getBuildByKey: (parameters: GetBuildByKey): Promise<GetBuildByKeyModel> =>
        builds.getBuildByKey(client, parameters),
      deleteBuildByKey: (parameters: DeleteBuildByKey): Promise<void> => builds.deleteBuildByKey(client, parameters),
    },
    remoteLinks: {
      submitRemoteLinks: (parameters: SubmitRemoteLinks): Promise<SubmitRemoteLinksModel> =>
        remoteLinks.submitRemoteLinks(client, parameters),
      deleteRemoteLinksByProperty: (parameters: DeleteRemoteLinksByProperty): Promise<void> =>
        remoteLinks.deleteRemoteLinksByProperty(client, parameters),
      getRemoteLinkById: (parameters: GetRemoteLinkById): Promise<GetRemoteLinkByIdModel> =>
        remoteLinks.getRemoteLinkById(client, parameters),
      deleteRemoteLinkById: (parameters: DeleteRemoteLinkById): Promise<void> =>
        remoteLinks.deleteRemoteLinkById(client, parameters),
    },
    securityInformation: {
      submitWorkspaces: (parameters: SubmitWorkspaces): Promise<void> =>
        securityInformation.submitWorkspaces(client, parameters),
      deleteLinkedWorkspaces: (parameters: DeleteLinkedWorkspaces): Promise<void> =>
        securityInformation.deleteLinkedWorkspaces(client, parameters),
      getLinkedWorkspaces: (): Promise<GetLinkedWorkspaces> => securityInformation.getLinkedWorkspaces(client),
      getLinkedWorkspaceById: (parameters: GetLinkedWorkspaceById): Promise<GetLinkedWorkspaceByIdModel> =>
        securityInformation.getLinkedWorkspaceById(client, parameters),
      submitVulnerabilities: (parameters: SubmitVulnerabilities): Promise<SubmitVulnerabilitiesModel> =>
        securityInformation.submitVulnerabilities(client, parameters),
      deleteVulnerabilitiesByProperty: (parameters: DeleteVulnerabilitiesByProperty): Promise<void> =>
        securityInformation.deleteVulnerabilitiesByProperty(client, parameters),
      getVulnerabilityById: (parameters: GetVulnerabilityById): Promise<GetVulnerabilityByIdModel> =>
        securityInformation.getVulnerabilityById(client, parameters),
      deleteVulnerabilityById: (parameters: DeleteVulnerabilityById): Promise<void> =>
        securityInformation.deleteVulnerabilityById(client, parameters),
    },
    operations: {
      submitOperationsWorkspaces: (parameters: SubmitOperationsWorkspaces): Promise<SubmitOperationsWorkspacesModel> =>
        operations.submitOperationsWorkspaces(client, parameters),
      deleteWorkspaces: (parameters: DeleteWorkspaces): Promise<void> =>
        operations.deleteWorkspaces(client, parameters),
      getWorkspaces: (parameters?: GetWorkspaces): Promise<GetWorkspacesModel> =>
        operations.getWorkspaces(client, parameters),
      submitEntity: (parameters: SubmitEntity): Promise<SubmitEntityModel> =>
        operations.submitEntity(client, parameters),
      deleteEntityByProperty: (parameters: DeleteEntityByProperty): Promise<void> =>
        operations.deleteEntityByProperty(client, parameters),
      getIncidentById: (parameters: GetIncidentById): Promise<GetIncidentByIdModel> =>
        operations.getIncidentById(client, parameters),
      deleteIncidentById: (parameters: DeleteIncidentById): Promise<void> =>
        operations.deleteIncidentById(client, parameters),
      getReviewById: (parameters: GetReviewById): Promise<GetReviewByIdModel> =>
        operations.getReviewById(client, parameters),
      deleteReviewById: (parameters: DeleteReviewById): Promise<void> =>
        operations.deleteReviewById(client, parameters),
    },
    devopsComponents: {
      submitComponents: (parameters: SubmitComponents): Promise<SubmitComponentsModel> =>
        devopsComponents.submitComponents(client, parameters),
      deleteComponentsByProperty: (parameters: DeleteComponentsByProperty): Promise<void> =>
        devopsComponents.deleteComponentsByProperty(client, parameters),
      getComponentById: (parameters: GetComponentById): Promise<GetComponentByIdModel> =>
        devopsComponents.getComponentById(client, parameters),
      deleteComponentById: (parameters: DeleteComponentById): Promise<void> =>
        devopsComponents.deleteComponentById(client, parameters),
    },
  };
}

export type AgileClient = ReturnType<typeof createAgileClient>;
