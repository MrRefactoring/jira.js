import { type ClientConfig, type Client, type RequestOptions, createClient, type Buffer } from '#/core';
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
      getIcon: (parameters: GetIcon, options?: RequestOptions): Promise<Icon> =>
        icons.getIcon(client, parameters, options),
      getIconImage: (parameters: GetIconImage, options?: RequestOptions): Promise<Buffer> =>
        icons.getIconImage(client, parameters, options),
      findGlobalIcons: (options?: RequestOptions): Promise<Icon[]> => icons.findGlobalIcons(client, options),
    },
    imports: {
      startImport: (parameters: StartImport, options?: RequestOptions): Promise<Progress> =>
        imports.startImport(client, parameters, options),
    },
    importSources: {
      getImportSource: (parameters: GetImportSource, options?: RequestOptions): Promise<ImportSourceResponse> =>
        importSources.getImportSource(client, parameters, options),
      submitSchemaAndMapping: (parameters: SubmitSchemaAndMapping, options?: RequestOptions): Promise<void> =>
        importSources.submitSchemaAndMapping(client, parameters, options),
      updateSchemaAndMapping: (parameters: UpdateSchemaAndMapping, options?: RequestOptions): Promise<void> =>
        importSources.updateSchemaAndMapping(client, parameters, options),
      getSchemaAndMappingProgress: (parameters: GetSchemaAndMappingProgress, options?: RequestOptions): Promise<void> =>
        importSources.getSchemaAndMappingProgress(client, parameters, options),
      getImportConfigurationStatus: (
        parameters: GetImportConfigurationStatus,
        options?: RequestOptions,
      ): Promise<void> => importSources.getImportConfigurationStatus(client, parameters, options),
      getSchemaAndMapping: (
        parameters: GetSchemaAndMapping,
        options?: RequestOptions,
      ): Promise<ImportSchemaAndMapping> => importSources.getSchemaAndMapping(client, parameters, options),
      startImportExecution: (parameters: StartImportExecution, options?: RequestOptions): Promise<void> =>
        importSources.startImportExecution(client, parameters, options),
      cancelImportExecution: (parameters: CancelImportExecution, options?: RequestOptions): Promise<void> =>
        importSources.cancelImportExecution(client, parameters, options),
      submitImportExecutionProgress: (
        parameters: SubmitImportExecutionProgress,
        options?: RequestOptions,
      ): Promise<void> => importSources.submitImportExecutionProgress(client, parameters, options),
      submitImportExecutionData: (parameters: SubmitImportExecutionData, options?: RequestOptions): Promise<void> =>
        importSources.submitImportExecutionData(client, parameters, options),
      getImportExecutionStatus: (parameters: GetImportExecutionStatus, options?: RequestOptions): Promise<void> =>
        importSources.getImportExecutionStatus(client, parameters, options),
      getLatestImportExecutionStatus: (
        parameters: GetLatestImportExecutionStatus,
        options?: RequestOptions,
      ): Promise<void> => importSources.getLatestImportExecutionStatus(client, parameters, options),
      createFailedImportHistory: (parameters: CreateFailedImportHistory, options?: RequestOptions): Promise<void> =>
        importSources.createFailedImportHistory(client, parameters, options),
      generateImportSourceToken: (parameters: GenerateImportSourceToken, options?: RequestOptions): Promise<void> =>
        importSources.generateImportSourceToken(client, parameters, options),
      getImportScheduleLinks: (
        parameters: GetImportScheduleLinks,
        options?: RequestOptions,
      ): Promise<GetImportScheduleLinksModel> => importSources.getImportScheduleLinks(client, parameters, options),
      createImportSchedule: (
        parameters: CreateImportSchedule,
        options?: RequestOptions,
      ): Promise<ImportScheduleResponse> => importSources.createImportSchedule(client, parameters, options),
      getImportSchedule: (parameters: GetImportSchedule, options?: RequestOptions): Promise<ImportScheduleResponse> =>
        importSources.getImportSchedule(client, parameters, options),
      updateImportSchedule: (
        parameters: UpdateImportSchedule,
        options?: RequestOptions,
      ): Promise<ImportScheduleResponse> => importSources.updateImportSchedule(client, parameters, options),
      deleteImportSchedule: (parameters: DeleteImportSchedule, options?: RequestOptions): Promise<void> =>
        importSources.deleteImportSchedule(client, parameters, options),
    },
    objects: {
      loadObject: (parameters: LoadObject, options?: RequestOptions): Promise<AssetObject> =>
        objects.loadObject(client, parameters, options),
      updateObject: (parameters: UpdateObject, options?: RequestOptions): Promise<AssetObject> =>
        objects.updateObject(client, parameters, options),
      deleteObject: (parameters: DeleteObject, options?: RequestOptions): Promise<unknown> =>
        objects.deleteObject(client, parameters, options),
      findObjectAttributes: (parameters: FindObjectAttributes, options?: RequestOptions): Promise<ObjectAttribute[]> =>
        objects.findObjectAttributes(client, parameters, options),
      findObjectHistory: (parameters: FindObjectHistory, options?: RequestOptions): Promise<ObjectHistory[]> =>
        objects.findObjectHistory(client, parameters, options),
      findObjectReferenceInfo: (
        parameters: FindObjectReferenceInfo,
        options?: RequestOptions,
      ): Promise<ObjectReferenceTypeInfo[]> => objects.findObjectReferenceInfo(client, parameters, options),
      createObject: (parameters: CreateObject, options?: RequestOptions): Promise<AssetObject> =>
        objects.createObject(client, parameters, options),
      findObjectsByAql: (
        parameters: FindObjectsByAql,
        options?: RequestOptions,
      ): Promise<ObjectListInclTypeAttributesEntryResult> => objects.findObjectsByAql(client, parameters, options),
      countObjectsByAql: (
        parameters: CountObjectsByAql,
        options?: RequestOptions,
      ): Promise<ObjectAQLTotalCountResult> => objects.countObjectsByAql(client, parameters, options),
    },
    connectedTickets: {
      findObjectTickets: (parameters: FindObjectTickets, options?: RequestOptions): Promise<Tickets> =>
        connectedTickets.findObjectTickets(client, parameters, options),
    },
    objectSchemas: {
      findSchemas: (parameters?: FindSchemas, options?: RequestOptions): Promise<ObjectSchemaList> =>
        objectSchemas.findSchemas(client, parameters, options),
      createSchema: (parameters: CreateSchema, options?: RequestOptions): Promise<ObjectSchema> =>
        objectSchemas.createSchema(client, parameters, options),
      loadSchema: (parameters: LoadSchema, options?: RequestOptions): Promise<ObjectSchema> =>
        objectSchemas.loadSchema(client, parameters, options),
      updateSchema: (parameters: UpdateSchema, options?: RequestOptions): Promise<ObjectSchema> =>
        objectSchemas.updateSchema(client, parameters, options),
      deleteSchema: (parameters: DeleteSchema, options?: RequestOptions): Promise<ObjectSchema> =>
        objectSchemas.deleteSchema(client, parameters, options),
      findSchemaAttributes: (
        parameters: FindSchemaAttributes,
        options?: RequestOptions,
      ): Promise<ObjectTypeAttribute[]> => objectSchemas.findSchemaAttributes(client, parameters, options),
      findSchemaObjectTypes: (parameters: FindSchemaObjectTypes, options?: RequestOptions): Promise<ObjectType[]> =>
        objectSchemas.findSchemaObjectTypes(client, parameters, options),
      findSchemaObjectTypesFlat: (
        parameters: FindSchemaObjectTypesFlat,
        options?: RequestOptions,
      ): Promise<ObjectType[]> => objectSchemas.findSchemaObjectTypesFlat(client, parameters, options),
    },
    objectTypes: {
      loadObjectType: (parameters: LoadObjectType, options?: RequestOptions): Promise<ObjectType> =>
        objectTypes.loadObjectType(client, parameters, options),
      updateObjectType: (parameters: UpdateObjectType, options?: RequestOptions): Promise<ObjectType> =>
        objectTypes.updateObjectType(client, parameters, options),
      deleteObjectType: (parameters: DeleteObjectType, options?: RequestOptions): Promise<ObjectType> =>
        objectTypes.deleteObjectType(client, parameters, options),
      findObjectTypeAttributes: (
        parameters: FindObjectTypeAttributes,
        options?: RequestOptions,
      ): Promise<ObjectTypeAttribute[]> => objectTypes.findObjectTypeAttributes(client, parameters, options),
      changeObjectTypePosition: (parameters: ChangeObjectTypePosition, options?: RequestOptions): Promise<ObjectType> =>
        objectTypes.changeObjectTypePosition(client, parameters, options),
      createObjectType: (parameters: CreateObjectType, options?: RequestOptions): Promise<ObjectType> =>
        objectTypes.createObjectType(client, parameters, options),
    },
    objectTypeAttributes: {
      createObjectTypeAttribute: (
        parameters: CreateObjectTypeAttribute,
        options?: RequestOptions,
      ): Promise<ObjectTypeAttribute> => objectTypeAttributes.createObjectTypeAttribute(client, parameters, options),
      updateObjectTypeAttribute: (
        parameters: UpdateObjectTypeAttribute,
        options?: RequestOptions,
      ): Promise<ObjectTypeAttribute> => objectTypeAttributes.updateObjectTypeAttribute(client, parameters, options),
      deleteObjectTypeAttribute: (parameters: DeleteObjectTypeAttribute, options?: RequestOptions): Promise<void> =>
        objectTypeAttributes.deleteObjectTypeAttribute(client, parameters, options),
    },
    progress: {
      getImportProgress: (parameters: GetImportProgress, options?: RequestOptions): Promise<Progress> =>
        progress.getImportProgress(client, parameters, options),
    },
    statusTypes: {
      findStatusTypes: (parameters?: FindStatusTypes, options?: RequestOptions): Promise<Status[]> =>
        statusTypes.findStatusTypes(client, parameters, options),
      createStatusType: (parameters: CreateStatusType, options?: RequestOptions): Promise<Status> =>
        statusTypes.createStatusType(client, parameters, options),
      getStatusType: (parameters: GetStatusType, options?: RequestOptions): Promise<Status> =>
        statusTypes.getStatusType(client, parameters, options),
      updateStatusType: (parameters: UpdateStatusType, options?: RequestOptions): Promise<Status> =>
        statusTypes.updateStatusType(client, parameters, options),
      deleteStatusType: (parameters: DeleteStatusType, options?: RequestOptions): Promise<void> =>
        statusTypes.deleteStatusType(client, parameters, options),
    },
    referenceTypes: {
      findReferenceTypes: (parameters?: FindReferenceTypes, options?: RequestOptions): Promise<ReferenceType[]> =>
        referenceTypes.findReferenceTypes(client, parameters, options),
      createReferenceType: (parameters: CreateReferenceType, options?: RequestOptions): Promise<ReferenceType> =>
        referenceTypes.createReferenceType(client, parameters, options),
    },
    globalConfig: {
      updateGlobalConfiguration: (parameters: UpdateGlobalConfiguration, options?: RequestOptions): Promise<void> =>
        globalConfig.updateGlobalConfiguration(client, parameters, options),
    },
    usage: {
      getTenantUsageInfo: (options?: RequestOptions): Promise<TenantUsageResponse> =>
        usage.getTenantUsageInfo(client, options),
    },
  };
}

export type AssetsClient = ReturnType<typeof createAssetsClient>;
