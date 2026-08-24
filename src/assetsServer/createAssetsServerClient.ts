import { type ClientConfig, type Client, type RequestOptions, createClient, type Buffer } from '#/core';
import * as analytics from './api/analytics';
import * as aql from './api/aql';
import * as objects from './api/objects';
import * as attachments from './api/attachments';
import * as comments from './api/comments';
import * as icons from './api/icons';
import * as indexConfiguration from './api/indexConfiguration';
import * as objectAttributes from './api/objectAttributes';
import * as objectSchemas from './api/objectSchemas';
import * as connectedTickets from './api/connectedTickets';
import * as objectTypes from './api/objectTypes';
import * as objectTypeAttributes from './api/objectTypeAttributes';
import * as progress from './api/progress';
import * as qrCode from './api/qrCode';
import * as statusTypes from './api/statusTypes';
import type {
  FindObjects,
  GetArchivedObjects,
  ArchiveObject,
  ArchiveObjectsByFilter,
  ArchiveObjectsByKeys,
  RestoreObject,
  RestoreObjectsByFilter,
  RestoreObjectsByIds,
  RestoreObjectsByKeys,
  BulkSetObjectImportSource,
  GetObjectImportSource,
  ClearObjectImportSource,
  CreateObject,
  LoadObject,
  UpdateObject,
  DeleteObject,
  FindObject,
  FindObjectAttributes,
  FindObjectHistory,
  FindObjectReferenceInfo,
  GetAttachments,
  AddAttachments,
  DeleteAttachment,
  CreateComment,
  GetComments,
  FindIcons,
  GetIcon,
  StartReindexInsight,
  CreateObjectAttribute,
  CreateSchema,
  LoadSchema,
  UpdateSchema,
  DeleteSchema,
  FindSchemas,
  FindObjectTypeFlatList,
  FindObjectTickets,
  ChangeOrderObjectType,
  CreateObjectType,
  LoadObjectType,
  UpdateObjectType,
  DeleteObjectType,
  FindObjectTypeAttributes,
  DeleteObjectTypeAttribute,
  StoreObjectTypeAttribute,
  UpdateObjectTypeAttribute,
  GetProgressForCategoryAndResourceId,
  GetObjectQrCode,
  GetStatusType,
  UpdateStatusType,
  DeleteStatusType,
  FindStatusTypes,
  StoreStatusType,
} from './parameters';
import type {
  SchemaStats,
  ObjectListResult,
  ArchivedObjectsPage,
  AssetObject,
  ProgressOut,
  ObjectAttribute,
  ObjectHistory,
  ReferenceTypeObjectInfo,
  Attachment,
  UploadedAttachment,
  Comment,
  Icon,
  IndexIntegrityOut,
  IndexPath,
  IndexPersistResponse,
  ObjectSchema,
  ObjectSchemaList,
  ObjectType,
  Tickets,
  ObjectTypeAttribute,
  StatusType,
} from './models';

export function createAssetsServerClient(clientConfig: ClientConfig | Client) {
  const client = createClient(clientConfig);

  return {
    analytics: {
      getSchemaAnalytics: (options?: RequestOptions): Promise<SchemaStats[]> =>
        analytics.getSchemaAnalytics(client, options),
    },
    aql: {
      findObjects: (parameters?: FindObjects, options?: RequestOptions): Promise<ObjectListResult> =>
        aql.findObjects(client, parameters, options),
    },
    objects: {
      getArchivedObjects: (parameters?: GetArchivedObjects, options?: RequestOptions): Promise<ArchivedObjectsPage> =>
        objects.getArchivedObjects(client, parameters, options),
      archiveObject: (parameters: ArchiveObject, options?: RequestOptions): Promise<AssetObject> =>
        objects.archiveObject(client, parameters, options),
      archiveObjectsByFilter: (parameters: ArchiveObjectsByFilter, options?: RequestOptions): Promise<ProgressOut> =>
        objects.archiveObjectsByFilter(client, parameters, options),
      archiveObjectsByKeys: (parameters: ArchiveObjectsByKeys, options?: RequestOptions): Promise<ProgressOut> =>
        objects.archiveObjectsByKeys(client, parameters, options),
      restoreObject: (parameters: RestoreObject, options?: RequestOptions): Promise<AssetObject> =>
        objects.restoreObject(client, parameters, options),
      restoreObjectsByFilter: (parameters: RestoreObjectsByFilter, options?: RequestOptions): Promise<ProgressOut> =>
        objects.restoreObjectsByFilter(client, parameters, options),
      restoreObjectsByIds: (parameters: RestoreObjectsByIds, options?: RequestOptions): Promise<ProgressOut> =>
        objects.restoreObjectsByIds(client, parameters, options),
      restoreObjectsByKeys: (parameters: RestoreObjectsByKeys, options?: RequestOptions): Promise<ProgressOut> =>
        objects.restoreObjectsByKeys(client, parameters, options),
      bulkSetObjectImportSource: (parameters: BulkSetObjectImportSource, options?: RequestOptions): Promise<void> =>
        objects.bulkSetObjectImportSource(client, parameters, options),
      getObjectImportSource: (parameters: GetObjectImportSource, options?: RequestOptions): Promise<void> =>
        objects.getObjectImportSource(client, parameters, options),
      clearObjectImportSource: (parameters: ClearObjectImportSource, options?: RequestOptions): Promise<void> =>
        objects.clearObjectImportSource(client, parameters, options),
      createObject: (parameters: CreateObject, options?: RequestOptions): Promise<AssetObject> =>
        objects.createObject(client, parameters, options),
      loadObject: (parameters: LoadObject, options?: RequestOptions): Promise<AssetObject> =>
        objects.loadObject(client, parameters, options),
      updateObject: (parameters: UpdateObject, options?: RequestOptions): Promise<AssetObject> =>
        objects.updateObject(client, parameters, options),
      deleteObject: (parameters: DeleteObject, options?: RequestOptions): Promise<AssetObject> =>
        objects.deleteObject(client, parameters, options),
      findObject: (parameters: FindObject, options?: RequestOptions): Promise<ObjectListResult> =>
        objects.findObject(client, parameters, options),
      findObjectAttributes: (parameters: FindObjectAttributes, options?: RequestOptions): Promise<ObjectAttribute[]> =>
        objects.findObjectAttributes(client, parameters, options),
      findObjectHistory: (parameters: FindObjectHistory, options?: RequestOptions): Promise<ObjectHistory[]> =>
        objects.findObjectHistory(client, parameters, options),
      findObjectReferenceInfo: (
        parameters: FindObjectReferenceInfo,
        options?: RequestOptions,
      ): Promise<ReferenceTypeObjectInfo[]> => objects.findObjectReferenceInfo(client, parameters, options),
    },
    attachments: {
      getAttachments: (parameters: GetAttachments, options?: RequestOptions): Promise<Attachment[]> =>
        attachments.getAttachments(client, parameters, options),
      addAttachments: (parameters: AddAttachments, options?: RequestOptions): Promise<UploadedAttachment[]> =>
        attachments.addAttachments(client, parameters, options),
      deleteAttachment: (parameters: DeleteAttachment, options?: RequestOptions): Promise<Attachment> =>
        attachments.deleteAttachment(client, parameters, options),
    },
    comments: {
      createComment: (parameters: CreateComment, options?: RequestOptions): Promise<Comment> =>
        comments.createComment(client, parameters, options),
      getComments: (parameters: GetComments, options?: RequestOptions): Promise<Comment[]> =>
        comments.getComments(client, parameters, options),
    },
    icons: {
      findGlobalIcons: (options?: RequestOptions): Promise<Icon[]> => icons.findGlobalIcons(client, options),
      findIcons: (parameters: FindIcons, options?: RequestOptions): Promise<Icon[]> =>
        icons.findIcons(client, parameters, options),
      getIcon: (parameters: GetIcon, options?: RequestOptions): Promise<Icon> =>
        icons.getIcon(client, parameters, options),
    },
    indexConfiguration: {
      checkIndexIntegrity: (options?: RequestOptions): Promise<IndexIntegrityOut> =>
        indexConfiguration.checkIndexIntegrity(client, options),
      getIndexPath: (options?: RequestOptions): Promise<IndexPath> => indexConfiguration.getIndexPath(client, options),
      persistIndexToFile: (options?: RequestOptions): Promise<IndexPersistResponse> =>
        indexConfiguration.persistIndexToFile(client, options),
      startReindexCurrentNode: (options?: RequestOptions): Promise<ProgressOut> =>
        indexConfiguration.startReindexCurrentNode(client, options),
      startReindexInsight: (parameters: StartReindexInsight, options?: RequestOptions): Promise<ProgressOut> =>
        indexConfiguration.startReindexInsight(client, parameters, options),
    },
    objectAttributes: {
      createObjectAttribute: (parameters: CreateObjectAttribute, options?: RequestOptions): Promise<ObjectAttribute> =>
        objectAttributes.createObjectAttribute(client, parameters, options),
    },
    objectSchemas: {
      createSchema: (parameters: CreateSchema, options?: RequestOptions): Promise<ObjectSchema> =>
        objectSchemas.createSchema(client, parameters, options),
      loadSchema: (parameters: LoadSchema, options?: RequestOptions): Promise<ObjectSchema> =>
        objectSchemas.loadSchema(client, parameters, options),
      updateSchema: (parameters: UpdateSchema, options?: RequestOptions): Promise<ObjectSchema> =>
        objectSchemas.updateSchema(client, parameters, options),
      deleteSchema: (parameters: DeleteSchema, options?: RequestOptions): Promise<ObjectSchema> =>
        objectSchemas.deleteSchema(client, parameters, options),
      findSchemas: (parameters?: FindSchemas, options?: RequestOptions): Promise<ObjectSchemaList> =>
        objectSchemas.findSchemas(client, parameters, options),
      findObjectTypeFlatList: (parameters: FindObjectTypeFlatList, options?: RequestOptions): Promise<ObjectType[]> =>
        objectSchemas.findObjectTypeFlatList(client, parameters, options),
    },
    connectedTickets: {
      findObjectTickets: (parameters: FindObjectTickets, options?: RequestOptions): Promise<Tickets> =>
        connectedTickets.findObjectTickets(client, parameters, options),
    },
    objectTypes: {
      changeOrderObjectType: (parameters: ChangeOrderObjectType, options?: RequestOptions): Promise<ObjectType> =>
        objectTypes.changeOrderObjectType(client, parameters, options),
      createObjectType: (parameters: CreateObjectType, options?: RequestOptions): Promise<ObjectType> =>
        objectTypes.createObjectType(client, parameters, options),
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
    },
    objectTypeAttributes: {
      deleteObjectTypeAttribute: (parameters: DeleteObjectTypeAttribute, options?: RequestOptions): Promise<void> =>
        objectTypeAttributes.deleteObjectTypeAttribute(client, parameters, options),
      storeObjectTypeAttribute: (
        parameters: StoreObjectTypeAttribute,
        options?: RequestOptions,
      ): Promise<ObjectTypeAttribute> => objectTypeAttributes.storeObjectTypeAttribute(client, parameters, options),
      updateObjectTypeAttribute: (
        parameters: UpdateObjectTypeAttribute,
        options?: RequestOptions,
      ): Promise<ObjectTypeAttribute> => objectTypeAttributes.updateObjectTypeAttribute(client, parameters, options),
    },
    progress: {
      getProgressForCategoryAndResourceId: (
        parameters: GetProgressForCategoryAndResourceId,
        options?: RequestOptions,
      ): Promise<ProgressOut> => progress.getProgressForCategoryAndResourceId(client, parameters, options),
    },
    qrCode: {
      getObjectQrCode: (parameters: GetObjectQrCode, options?: RequestOptions): Promise<Buffer> =>
        qrCode.getObjectQrCode(client, parameters, options),
    },
    statusTypes: {
      getStatusType: (parameters: GetStatusType, options?: RequestOptions): Promise<StatusType> =>
        statusTypes.getStatusType(client, parameters, options),
      updateStatusType: (parameters: UpdateStatusType, options?: RequestOptions): Promise<StatusType> =>
        statusTypes.updateStatusType(client, parameters, options),
      deleteStatusType: (parameters: DeleteStatusType, options?: RequestOptions): Promise<void> =>
        statusTypes.deleteStatusType(client, parameters, options),
      findStatusTypes: (parameters?: FindStatusTypes, options?: RequestOptions): Promise<StatusType[]> =>
        statusTypes.findStatusTypes(client, parameters, options),
      storeStatusType: (parameters: StoreStatusType, options?: RequestOptions): Promise<StatusType> =>
        statusTypes.storeStatusType(client, parameters, options),
    },
  };
}

export type AssetsServerClient = ReturnType<typeof createAssetsServerClient>;
