import { beforeAll, describe, expect, inject, it } from 'vitest';
import type { AssetsServerClient } from '#/assetsServer/createAssetsServerClient';
import { assets } from './setup/client';
import { assetName, schemaKey } from './setup/naming';
import type { Fixtures } from './setup/fixtures';

/**
 * The structure an Assets object lives in: the schema, its object types, and the attributes those declare.
 *
 * The fixture schema is read here. Anything written to is made and removed by the test that needs it, so a failure
 * leaves the fixtures intact for the files that run after.
 */
describe('assets schemas and types', () => {
  let api: AssetsServerClient;
  let fixtures: Fixtures;

  beforeAll(() => {
    api = assets();
    fixtures = inject('jsmFixtures');
  });

  it('lists the schemas on the instance', async () => {
    const schemas = await api.objectSchemas.findSchemas();

    expect(schemas.objectschemas?.some(schema => schema.id === fixtures.schemaId)).toBe(true);
  });

  it('loads one schema', async () => {
    const schema = await api.objectSchemas.loadSchema({ id: String(fixtures.schemaId) });

    expect(schema.id).toBe(fixtures.schemaId);
  });

  it('lists the object types of a schema, flat', async () => {
    const types = await api.objectSchemas.findObjectTypeFlatList({ id: String(fixtures.schemaId) });

    expect(types.some(type => type.id === fixtures.objectTypeId)).toBe(true);
  });

  it('creates, updates and deletes a schema', async () => {
    const created = await api.objectSchemas.createSchema({
      name: assetName('spare schema'),
      objectSchemaKey: `${schemaKey()}X`.slice(0, 10),
      description: 'Created and removed by one test.',
    });

    try {
      const updated = await api.objectSchemas.updateSchema({
        id: String(created.id),
        body: { ...created, description: 'Updated by one test.' },
      });

      expect(updated.description).toBe('Updated by one test.');
    } finally {
      await api.objectSchemas.deleteSchema({ id: String(created.id) });
    }
  });

  it('loads one object type', async () => {
    const type = await api.objectTypes.loadObjectType({ id: String(fixtures.objectTypeId) });

    expect(type.id).toBe(fixtures.objectTypeId);
  });

  it('lists the attributes of an object type', async () => {
    const attributes = await api.objectTypes.findObjectTypeAttributes({ id: String(fixtures.objectTypeId) });

    expect(attributes.some(attribute => attribute.id === fixtures.nameAttributeId)).toBe(true);
  });

  it('creates, updates, repositions and deletes an object type', async () => {
    const created = await api.objectTypes.createObjectType({
      name: assetName('spare type'),
      objectSchemaId: fixtures.schemaId,
      iconId: fixtures.iconId,
      description: 'Created and removed by one test.',
    });

    try {
      const updated = await api.objectTypes.updateObjectType({
        id: String(created.id),
        body: { name: assetName('renamed type'), objectSchemaId: fixtures.schemaId, iconId: fixtures.iconId },
      });

      expect(updated.name).toContain('renamed type');

      await api.objectTypes.changeOrderObjectType({
        affectedId: String(created.id),
        toObjectTypeId: fixtures.objectTypeId,
        position: 0,
      });
    } finally {
      await api.objectTypes.deleteObjectType({ id: String(created.id) });
    }
  });

  /**
   * Setting an attribute on an object one attribute at a time, rather than through the whole object.
   *
   * The endpoint is `create`, and it updates: the pair of an object and an object type attribute is the identity, so
   * calling it twice on the same pair replaces the value instead of adding a second one.
   */
  it('writes one attribute of an object on its own', async () => {
    const written = await api.objectAttributes.createObjectAttribute({
      objectId: fixtures.objectId,
      objectTypeAttributeId: fixtures.nameAttributeId,
      objectAttributeValues: [{ value: assetName('written directly') }],
    });

    expect(written.objectTypeAttributeId).toBe(fixtures.nameAttributeId);
  });

  it('creates, updates and deletes an attribute on an object type', async () => {
    const created = await api.objectTypeAttributes.storeObjectTypeAttribute({
      objectTypeId: String(fixtures.objectTypeId),
      name: assetName('spare attribute'),
      type: 0,
      defaultTypeId: 0,
      description: 'Created and removed by one test.',
    });

    try {
      const updated = await api.objectTypeAttributes.updateObjectTypeAttribute({
        objectTypeId: String(fixtures.objectTypeId),
        id: String(created.id),
        body: { name: assetName('renamed attribute'), type: 0, defaultTypeId: 0 },
      });

      expect(updated.name).toContain('renamed attribute');
    } finally {
      await api.objectTypeAttributes.deleteObjectTypeAttribute({ id: String(created.id) });
    }
  });
});
