import { type ClientConfig, type Client, createClient, type Buffer } from '#/core';
import * as icons from './api/icons';
import * as imports from './api/imports';
import * as importSources from './api/importSources';
import * as objects from './api/objects';
import * as connectedTickets from './api/connectedTickets';
import * as objectSchemas from './api/objectSchemas';
import * as objectTypes from './api/objectTypes';
import * as objectTypeAttributes from './api/objectTypeAttributes';
import * as progress from './api/progress';
import * as statusTypes from './api/statusTypes';
import * as referenceTypes from './api/referenceTypes';
import * as globalConfig from './api/globalConfig';
import * as usage from './api/usage';
import type {
  GetIcon,
  GetIconImage,
  StartImport,
  GetImportSource,
  SubmitSchemaAndMapping,
  UpdateSchemaAndMapping,
  GetSchemaAndMappingProgress,
  GetImportConfigurationStatus,
  GetSchemaAndMapping,
  StartImportExecution,
  CancelImportExecution,
  SubmitImportExecutionProgress,
  SubmitImportExecutionData,
  GetImportExecutionStatus,
  GetLatestImportExecutionStatus,
  CreateFailedImportHistory,
  GenerateImportSourceToken,
  GetImportScheduleLinks,
  CreateImportSchedule,
  GetImportSchedule,
  UpdateImportSchedule,
  DeleteImportSchedule,
  LoadObject,
  UpdateObject,
  DeleteObject,
  FindObjectAttributes,
  FindObjectHistory,
  FindObjectReferenceInfo,
  CreateObject,
  FindObjectsByAql,
  CountObjectsByAql,
  FindObjectTickets,
  FindSchemas,
  CreateSchema,
  LoadSchema,
  UpdateSchema,
  DeleteSchema,
  FindSchemaAttributes,
  FindSchemaObjectTypes,
  FindSchemaObjectTypesFlat,
  LoadObjectType,
  UpdateObjectType,
  DeleteObjectType,
  FindObjectTypeAttributes,
  ChangeObjectTypePosition,
  CreateObjectType,
  CreateObjectTypeAttribute,
  UpdateObjectTypeAttribute,
  DeleteObjectTypeAttribute,
  GetImportProgress,
  FindStatusTypes,
  CreateStatusType,
  GetStatusType,
  UpdateStatusType,
  DeleteStatusType,
  FindReferenceTypes,
  CreateReferenceType,
  UpdateGlobalConfiguration,
} from './parameters';
import type {
  Icon,
  Progress,
  ImportSourceResponse,
  ImportSchemaAndMapping,
  GetImportScheduleLinks as GetImportScheduleLinksModel,
  ImportScheduleResponse,
  AssetObject,
  ObjectAttribute,
  ObjectHistory,
  ObjectReferenceTypeInfo,
  ObjectListInclTypeAttributesEntryResult,
  ObjectAQLTotalCountResult,
  Tickets,
  ObjectSchemaList,
  ObjectSchema,
  ObjectTypeAttribute,
  ObjectType,
  Status,
  ReferenceType,
  TenantUsageResponse,
} from './models';

const ASSETS_GATEWAY = 'https://api.atlassian.com';

export type AssetsClientConfig = Omit<ClientConfig, 'host'> & {
  /**
   * The Assets workspace this client talks to.
   *
   * A site has one, and `serviceDesk.assets.getAssetsWorkspaces()` is what returns it.
   */
  workspaceId: string;

  /**
   * The Atlassian gateway, which is where Assets answers rather than on the site's own host.
   *
   * Defaults to `https://api.atlassian.com`. Under OAuth 2.0 it is left unset and the client derives
   * `https://api.atlassian.com/ex/jira/{cloudId}` itself, as it does for every other surface.
   */
  host?: string;
};

/** The client every Assets operation is given: the configured one, with the workspace prefixed to each request. */
function createWorkspaceClient({ workspaceId, host, ...config }: AssetsClientConfig): Client {
  const client = createClient(
    config.auth?.type === 'oauth2'
      ? { ...config, auth: config.auth, host }
      : { ...config, auth: config.auth, host: host ?? ASSETS_GATEWAY },
  );
  const prefix = `/jsm/assets/workspace/${workspaceId}/v1`;

  return { sendRequest: options => client.sendRequest({ ...options, url: prefix + options.url }) };
}

export function createAssetsClient(config: AssetsClientConfig) {
  const client = createWorkspaceClient(config);

  return {
    icons: {
      getIcon: (parameters: GetIcon): Promise<Icon> => icons.getIcon(client, parameters),
      getIconImage: (parameters: GetIconImage): Promise<Buffer> => icons.getIconImage(client, parameters),
      findGlobalIcons: (): Promise<Icon[]> => icons.findGlobalIcons(client),
    },
    imports: {
      startImport: (parameters: StartImport): Promise<Progress> => imports.startImport(client, parameters),
    },
    importSources: {
      getImportSource: (parameters: GetImportSource): Promise<ImportSourceResponse> =>
        importSources.getImportSource(client, parameters),
      submitSchemaAndMapping: (parameters: SubmitSchemaAndMapping): Promise<void> =>
        importSources.submitSchemaAndMapping(client, parameters),
      updateSchemaAndMapping: (parameters: UpdateSchemaAndMapping): Promise<void> =>
        importSources.updateSchemaAndMapping(client, parameters),
      getSchemaAndMappingProgress: (parameters: GetSchemaAndMappingProgress): Promise<void> =>
        importSources.getSchemaAndMappingProgress(client, parameters),
      getImportConfigurationStatus: (parameters: GetImportConfigurationStatus): Promise<void> =>
        importSources.getImportConfigurationStatus(client, parameters),
      getSchemaAndMapping: (parameters: GetSchemaAndMapping): Promise<ImportSchemaAndMapping> =>
        importSources.getSchemaAndMapping(client, parameters),
      startImportExecution: (parameters: StartImportExecution): Promise<void> =>
        importSources.startImportExecution(client, parameters),
      cancelImportExecution: (parameters: CancelImportExecution): Promise<void> =>
        importSources.cancelImportExecution(client, parameters),
      submitImportExecutionProgress: (parameters: SubmitImportExecutionProgress): Promise<void> =>
        importSources.submitImportExecutionProgress(client, parameters),
      submitImportExecutionData: (parameters: SubmitImportExecutionData): Promise<void> =>
        importSources.submitImportExecutionData(client, parameters),
      getImportExecutionStatus: (parameters: GetImportExecutionStatus): Promise<void> =>
        importSources.getImportExecutionStatus(client, parameters),
      getLatestImportExecutionStatus: (parameters: GetLatestImportExecutionStatus): Promise<void> =>
        importSources.getLatestImportExecutionStatus(client, parameters),
      createFailedImportHistory: (parameters: CreateFailedImportHistory): Promise<void> =>
        importSources.createFailedImportHistory(client, parameters),
      generateImportSourceToken: (parameters: GenerateImportSourceToken): Promise<void> =>
        importSources.generateImportSourceToken(client, parameters),
      getImportScheduleLinks: (parameters: GetImportScheduleLinks): Promise<GetImportScheduleLinksModel> =>
        importSources.getImportScheduleLinks(client, parameters),
      createImportSchedule: (parameters: CreateImportSchedule): Promise<ImportScheduleResponse> =>
        importSources.createImportSchedule(client, parameters),
      getImportSchedule: (parameters: GetImportSchedule): Promise<ImportScheduleResponse> =>
        importSources.getImportSchedule(client, parameters),
      updateImportSchedule: (parameters: UpdateImportSchedule): Promise<ImportScheduleResponse> =>
        importSources.updateImportSchedule(client, parameters),
      deleteImportSchedule: (parameters: DeleteImportSchedule): Promise<void> =>
        importSources.deleteImportSchedule(client, parameters),
    },
    objects: {
      loadObject: (parameters: LoadObject): Promise<AssetObject> => objects.loadObject(client, parameters),
      updateObject: (parameters: UpdateObject): Promise<AssetObject> => objects.updateObject(client, parameters),
      deleteObject: (parameters: DeleteObject): Promise<unknown> => objects.deleteObject(client, parameters),
      findObjectAttributes: (parameters: FindObjectAttributes): Promise<ObjectAttribute[]> =>
        objects.findObjectAttributes(client, parameters),
      findObjectHistory: (parameters: FindObjectHistory): Promise<ObjectHistory[]> =>
        objects.findObjectHistory(client, parameters),
      findObjectReferenceInfo: (parameters: FindObjectReferenceInfo): Promise<ObjectReferenceTypeInfo[]> =>
        objects.findObjectReferenceInfo(client, parameters),
      createObject: (parameters: CreateObject): Promise<AssetObject> => objects.createObject(client, parameters),
      findObjectsByAql: (parameters: FindObjectsByAql): Promise<ObjectListInclTypeAttributesEntryResult> =>
        objects.findObjectsByAql(client, parameters),
      countObjectsByAql: (parameters: CountObjectsByAql): Promise<ObjectAQLTotalCountResult> =>
        objects.countObjectsByAql(client, parameters),
    },
    connectedTickets: {
      findObjectTickets: (parameters: FindObjectTickets): Promise<Tickets> =>
        connectedTickets.findObjectTickets(client, parameters),
    },
    objectSchemas: {
      findSchemas: (parameters?: FindSchemas): Promise<ObjectSchemaList> =>
        objectSchemas.findSchemas(client, parameters),
      createSchema: (parameters: CreateSchema): Promise<ObjectSchema> => objectSchemas.createSchema(client, parameters),
      loadSchema: (parameters: LoadSchema): Promise<ObjectSchema> => objectSchemas.loadSchema(client, parameters),
      updateSchema: (parameters: UpdateSchema): Promise<ObjectSchema> => objectSchemas.updateSchema(client, parameters),
      deleteSchema: (parameters: DeleteSchema): Promise<ObjectSchema> => objectSchemas.deleteSchema(client, parameters),
      findSchemaAttributes: (parameters: FindSchemaAttributes): Promise<ObjectTypeAttribute[]> =>
        objectSchemas.findSchemaAttributes(client, parameters),
      findSchemaObjectTypes: (parameters: FindSchemaObjectTypes): Promise<ObjectType[]> =>
        objectSchemas.findSchemaObjectTypes(client, parameters),
      findSchemaObjectTypesFlat: (parameters: FindSchemaObjectTypesFlat): Promise<ObjectType[]> =>
        objectSchemas.findSchemaObjectTypesFlat(client, parameters),
    },
    objectTypes: {
      loadObjectType: (parameters: LoadObjectType): Promise<ObjectType> =>
        objectTypes.loadObjectType(client, parameters),
      updateObjectType: (parameters: UpdateObjectType): Promise<ObjectType> =>
        objectTypes.updateObjectType(client, parameters),
      deleteObjectType: (parameters: DeleteObjectType): Promise<ObjectType> =>
        objectTypes.deleteObjectType(client, parameters),
      findObjectTypeAttributes: (parameters: FindObjectTypeAttributes): Promise<ObjectTypeAttribute[]> =>
        objectTypes.findObjectTypeAttributes(client, parameters),
      changeObjectTypePosition: (parameters: ChangeObjectTypePosition): Promise<ObjectType> =>
        objectTypes.changeObjectTypePosition(client, parameters),
      createObjectType: (parameters: CreateObjectType): Promise<ObjectType> =>
        objectTypes.createObjectType(client, parameters),
    },
    objectTypeAttributes: {
      createObjectTypeAttribute: (parameters: CreateObjectTypeAttribute): Promise<ObjectTypeAttribute> =>
        objectTypeAttributes.createObjectTypeAttribute(client, parameters),
      updateObjectTypeAttribute: (parameters: UpdateObjectTypeAttribute): Promise<ObjectTypeAttribute> =>
        objectTypeAttributes.updateObjectTypeAttribute(client, parameters),
      deleteObjectTypeAttribute: (parameters: DeleteObjectTypeAttribute): Promise<void> =>
        objectTypeAttributes.deleteObjectTypeAttribute(client, parameters),
    },
    progress: {
      getImportProgress: (parameters: GetImportProgress): Promise<Progress> =>
        progress.getImportProgress(client, parameters),
    },
    statusTypes: {
      findStatusTypes: (parameters?: FindStatusTypes): Promise<Status[]> =>
        statusTypes.findStatusTypes(client, parameters),
      createStatusType: (parameters: CreateStatusType): Promise<Status> =>
        statusTypes.createStatusType(client, parameters),
      getStatusType: (parameters: GetStatusType): Promise<Status> => statusTypes.getStatusType(client, parameters),
      updateStatusType: (parameters: UpdateStatusType): Promise<Status> =>
        statusTypes.updateStatusType(client, parameters),
      deleteStatusType: (parameters: DeleteStatusType): Promise<void> =>
        statusTypes.deleteStatusType(client, parameters),
    },
    referenceTypes: {
      findReferenceTypes: (parameters?: FindReferenceTypes): Promise<ReferenceType[]> =>
        referenceTypes.findReferenceTypes(client, parameters),
      createReferenceType: (parameters: CreateReferenceType): Promise<ReferenceType> =>
        referenceTypes.createReferenceType(client, parameters),
    },
    globalConfig: {
      updateGlobalConfiguration: (parameters: UpdateGlobalConfiguration): Promise<void> =>
        globalConfig.updateGlobalConfiguration(client, parameters),
    },
    usage: {
      getTenantUsageInfo: (): Promise<TenantUsageResponse> => usage.getTenantUsageInfo(client),
    },
  };
}

export type AssetsClient = ReturnType<typeof createAssetsClient>;
