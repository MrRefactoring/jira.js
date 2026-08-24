import type { AssetsServerClient } from '#/assetsServer/createAssetsServerClient';
import { assetName, schemaKey } from './naming';

export interface Fixtures {
  serviceDeskLicensed: boolean;
  schemaId: number;
  objectTypeId: number;
  nameAttributeId: number;
  objectId: number;
  objectKey: string;
  iconId: number;
}

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
