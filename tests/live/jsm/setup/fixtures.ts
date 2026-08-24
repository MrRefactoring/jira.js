/**
 * Everything the Service Management suites need to exist before they run.
 *
 * The container is thrown away after each run, so this creates rather than makes sure. A fresh Assets has no schema at
 * all, and most of the surface is unreachable until one is there to point at: an object schema with one object type,
 * one attribute and one object opens the objects, attributes, comments, attachments and history endpoints together.
 */
import type { AssetsServerClient } from '#/assetsServer/createAssetsServerClient';
import { assetName, schemaKey } from './naming';

export interface Fixtures {
  /** Whether Service Desk answers at all. A Jira Software licence sets the instance up and opens Assets but not this. */
  serviceDeskLicensed: boolean;
  schemaId: number;
  objectTypeId: number;
  /** The `Name` attribute every object type is created with, and the only one an object can be given a value for. */
  nameAttributeId: number;
  objectId: number;
  objectKey: string;
  /** A global icon, which Assets ships a few dozen of and every object type needs one of. */
  iconId: number;
}

/** The first attribute of an object type that a caller may write to. Assets makes Key, Created and Updated itself. */
function editableAttributeId(attributes: Array<{ id?: number; name?: string; editable?: boolean }>): number {
  const attribute = attributes.find(candidate => candidate.editable === true);

  if (attribute?.id === undefined) {
    throw new Error(`The object type has no editable attribute: ${attributes.map(a => a.name).join(', ')}`);
  }

  return attribute.id;
}

export async function createFixtures(assets: AssetsServerClient, serviceDeskLicensed: boolean): Promise<Fixtures> {
  const icons = await assets.icons.findGlobalIcons();
  const iconId = icons[0]?.id;

  if (iconId === undefined) throw new Error('The instance ships no global icons, so no object type can be created.');

  const schema = await assets.objectSchemas.createSchema({
    name: assetName('schema'),
    objectSchemaKey: schemaKey(),
    description: 'Created by the jira.js Service Management live suite.',
  });

  if (schema.id === undefined) throw new Error('Creating the object schema returned no id.');

  const objectType = await assets.objectTypes.createObjectType({
    name: assetName('object type'),
    objectSchemaId: schema.id,
    iconId,
    description: 'Created by the jira.js Service Management live suite.',
  });

  if (objectType.id === undefined) throw new Error('Creating the object type returned no id.');

  const attributes = await assets.objectTypes.findObjectTypeAttributes({ id: String(objectType.id) });
  const nameAttributeId = editableAttributeId(attributes);

  const object = await assets.objects.createObject({
    objectTypeId: objectType.id,
    attributes: [{ objectTypeAttributeId: nameAttributeId, objectAttributeValues: [{ value: assetName('object') }] }],
  });

  if (object.id === undefined || object.objectKey === undefined) {
    throw new Error('Creating the object returned no id or key.');
  }

  return {
    serviceDeskLicensed,
    schemaId: schema.id,
    objectTypeId: objectType.id,
    nameAttributeId,
    objectId: object.id,
    objectKey: object.objectKey,
    iconId,
  };
}
