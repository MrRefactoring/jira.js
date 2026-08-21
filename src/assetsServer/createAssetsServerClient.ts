import { type ClientConfig, type Client, createClient, type Buffer } from '#/core';
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
  ArchiveObjectsByIds,
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
  AssetObject,
  ProgressOut,
  ObjectAttribute,
  ObjectHistory,
  ReferenceTypeObjectInfo,
  Attachment,
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
      getSchemaAnalytics: (): Promise<SchemaStats> => analytics.getSchemaAnalytics(client),
    },
    aql: {
      findObjects: (parameters?: FindObjects): Promise<ObjectListResult> => aql.findObjects(client, parameters),
    },
    objects: {
      getArchivedObjects: (parameters?: GetArchivedObjects): Promise<AssetObject> =>
        objects.getArchivedObjects(client, parameters),
      archiveObject: (parameters: ArchiveObject): Promise<AssetObject> => objects.archiveObject(client, parameters),
      archiveObjectsByFilter: (parameters: ArchiveObjectsByFilter): Promise<ProgressOut> =>
        objects.archiveObjectsByFilter(client, parameters),
      archiveObjectsByIds: (parameters: ArchiveObjectsByIds): Promise<ProgressOut> =>
        objects.archiveObjectsByIds(client, parameters),
      restoreObject: (parameters: RestoreObject): Promise<AssetObject> => objects.restoreObject(client, parameters),
      restoreObjectsByFilter: (parameters: RestoreObjectsByFilter): Promise<ProgressOut> =>
        objects.restoreObjectsByFilter(client, parameters),
      restoreObjectsByIds: (parameters: RestoreObjectsByIds): Promise<ProgressOut> =>
        objects.restoreObjectsByIds(client, parameters),
      restoreObjectsByKeys: (parameters: RestoreObjectsByKeys): Promise<ProgressOut> =>
        objects.restoreObjectsByKeys(client, parameters),
      bulkSetObjectImportSource: (parameters: BulkSetObjectImportSource): Promise<void> =>
        objects.bulkSetObjectImportSource(client, parameters),
      getObjectImportSource: (parameters: GetObjectImportSource): Promise<void> =>
        objects.getObjectImportSource(client, parameters),
      clearObjectImportSource: (parameters: ClearObjectImportSource): Promise<void> =>
        objects.clearObjectImportSource(client, parameters),
      createObject: (parameters: CreateObject): Promise<AssetObject> => objects.createObject(client, parameters),
      loadObject: (parameters: LoadObject): Promise<AssetObject> => objects.loadObject(client, parameters),
      updateObject: (parameters: UpdateObject): Promise<AssetObject> => objects.updateObject(client, parameters),
      deleteObject: (parameters: DeleteObject): Promise<AssetObject> => objects.deleteObject(client, parameters),
      findObject: (parameters: FindObject): Promise<ObjectListResult> => objects.findObject(client, parameters),
      findObjectAttributes: (parameters: FindObjectAttributes): Promise<ObjectAttribute> =>
        objects.findObjectAttributes(client, parameters),
      findObjectHistory: (parameters: FindObjectHistory): Promise<ObjectHistory> =>
        objects.findObjectHistory(client, parameters),
      findObjectReferenceInfo: (parameters: FindObjectReferenceInfo): Promise<ReferenceTypeObjectInfo> =>
        objects.findObjectReferenceInfo(client, parameters),
    },
    attachments: {
      getAttachments: (parameters: GetAttachments): Promise<Attachment[]> =>
        attachments.getAttachments(client, parameters),
      addAttachments: (parameters: AddAttachments): Promise<Attachment[]> =>
        attachments.addAttachments(client, parameters),
      deleteAttachment: (parameters: DeleteAttachment): Promise<Attachment> =>
        attachments.deleteAttachment(client, parameters),
    },
    comments: {
      createComment: (parameters: CreateComment): Promise<Comment> => comments.createComment(client, parameters),
      getComments: (parameters: GetComments): Promise<Comment> => comments.getComments(client, parameters),
    },
    icons: {
      findGlobalIcons: (): Promise<Icon> => icons.findGlobalIcons(client),
      findIcons: (parameters: FindIcons): Promise<Icon> => icons.findIcons(client, parameters),
      getIcon: (parameters: GetIcon): Promise<Icon> => icons.getIcon(client, parameters),
    },
    indexConfiguration: {
      checkIndexIntegrity: (): Promise<IndexIntegrityOut> => indexConfiguration.checkIndexIntegrity(client),
      getIndexPath: (): Promise<IndexPath> => indexConfiguration.getIndexPath(client),
      persistIndexToFile: (): Promise<IndexPersistResponse> => indexConfiguration.persistIndexToFile(client),
      startReindexCurrentNode: (): Promise<ProgressOut> => indexConfiguration.startReindexCurrentNode(client),
      startReindexInsight: (parameters: StartReindexInsight): Promise<ProgressOut> =>
        indexConfiguration.startReindexInsight(client, parameters),
    },
    objectAttributes: {
      createObjectAttribute: (parameters: CreateObjectAttribute): Promise<ObjectAttribute> =>
        objectAttributes.createObjectAttribute(client, parameters),
    },
    objectSchemas: {
      createSchema: (parameters: CreateSchema): Promise<ObjectSchema> => objectSchemas.createSchema(client, parameters),
      loadSchema: (parameters: LoadSchema): Promise<ObjectSchema> => objectSchemas.loadSchema(client, parameters),
      updateSchema: (parameters: UpdateSchema): Promise<ObjectSchema> => objectSchemas.updateSchema(client, parameters),
      deleteSchema: (parameters: DeleteSchema): Promise<ObjectSchema> => objectSchemas.deleteSchema(client, parameters),
      findSchemas: (parameters?: FindSchemas): Promise<ObjectSchemaList> =>
        objectSchemas.findSchemas(client, parameters),
      findObjectTypeFlatList: (parameters: FindObjectTypeFlatList): Promise<ObjectType> =>
        objectSchemas.findObjectTypeFlatList(client, parameters),
    },
    connectedTickets: {
      findObjectTickets: (parameters: FindObjectTickets): Promise<Tickets> =>
        connectedTickets.findObjectTickets(client, parameters),
    },
    objectTypes: {
      changeOrderObjectType: (parameters: ChangeOrderObjectType): Promise<ObjectType> =>
        objectTypes.changeOrderObjectType(client, parameters),
      createObjectType: (parameters: CreateObjectType): Promise<ObjectType> =>
        objectTypes.createObjectType(client, parameters),
      loadObjectType: (parameters: LoadObjectType): Promise<ObjectType> =>
        objectTypes.loadObjectType(client, parameters),
      updateObjectType: (parameters: UpdateObjectType): Promise<ObjectType> =>
        objectTypes.updateObjectType(client, parameters),
      deleteObjectType: (parameters: DeleteObjectType): Promise<ObjectType> =>
        objectTypes.deleteObjectType(client, parameters),
      findObjectTypeAttributes: (parameters: FindObjectTypeAttributes): Promise<ObjectTypeAttribute> =>
        objectTypes.findObjectTypeAttributes(client, parameters),
    },
    objectTypeAttributes: {
      deleteObjectTypeAttribute: (parameters: DeleteObjectTypeAttribute): Promise<void> =>
        objectTypeAttributes.deleteObjectTypeAttribute(client, parameters),
      storeObjectTypeAttribute: (parameters: StoreObjectTypeAttribute): Promise<ObjectTypeAttribute> =>
        objectTypeAttributes.storeObjectTypeAttribute(client, parameters),
      updateObjectTypeAttribute: (parameters: UpdateObjectTypeAttribute): Promise<ObjectTypeAttribute> =>
        objectTypeAttributes.updateObjectTypeAttribute(client, parameters),
    },
    progress: {
      getProgressForCategoryAndResourceId: (parameters: GetProgressForCategoryAndResourceId): Promise<ProgressOut> =>
        progress.getProgressForCategoryAndResourceId(client, parameters),
    },
    qrCode: {
      getObjectQrCode: (parameters: GetObjectQrCode): Promise<Buffer> => qrCode.getObjectQrCode(client, parameters),
    },
    statusTypes: {
      getStatusType: (parameters: GetStatusType): Promise<StatusType> => statusTypes.getStatusType(client, parameters),
      updateStatusType: (parameters: UpdateStatusType): Promise<StatusType> =>
        statusTypes.updateStatusType(client, parameters),
      deleteStatusType: (parameters: DeleteStatusType): Promise<void> =>
        statusTypes.deleteStatusType(client, parameters),
      findStatusTypes: (parameters?: FindStatusTypes): Promise<StatusType> =>
        statusTypes.findStatusTypes(client, parameters),
      storeStatusType: (parameters: StoreStatusType): Promise<StatusType> =>
        statusTypes.storeStatusType(client, parameters),
    },
  };
}

export type AssetsServerClient = ReturnType<typeof createAssetsServerClient>;
