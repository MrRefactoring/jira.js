import { beforeAll, describe, expect, inject, it } from 'vitest';
import type { AssetsServerClient } from '#/assetsServer/createAssetsServerClient';
import { assets } from './setup/client';
import { assetName } from './setup/naming';
import type { Fixtures } from './setup/fixtures';

/**
 * The objects an Assets instance is for, and everything hung off one.
 *
 * The fixture object is read here and written to; anything these tests create for themselves they also remove, so a
 * developer iterating on one file does not accumulate a schema full of debris.
 */
describe('assets objects', () => {
  let api: AssetsServerClient;
  let fixtures: Fixtures;

  beforeAll(() => {
    api = assets();
    fixtures = inject('jsmFixtures');
  });

  const withNewObject = async (label: string, body: (id: number) => Promise<void>): Promise<void> => {
    const created = await api.objects.createObject({
      objectTypeId: fixtures.objectTypeId,
      attributes: [
        { objectTypeAttributeId: fixtures.nameAttributeId, objectAttributeValues: [{ value: assetName(label) }] },
      ],
    });

    try {
      await body(created.id!);
    } finally {
      await api.objects.deleteObject({ id: String(created.id) });
    }
  };

  it('loads the object the fixtures made', async () => {
    const object = await api.objects.loadObject({ id: String(fixtures.objectId) });

    expect(object.id).toBe(fixtures.objectId);
    expect(object.objectKey).toBe(fixtures.objectKey);
  });

  it('lists the attributes of an object', async () => {
    const attributes = await api.objects.findObjectAttributes({ id: String(fixtures.objectId) });

    expect(Array.isArray(attributes)).toBe(true);
    expect(attributes.length).toBeGreaterThan(0);
  });

  it('reports the history of an object', async () => {
    const history = await api.objects.findObjectHistory({ id: String(fixtures.objectId) });

    expect(Array.isArray(history)).toBe(true);
  });

  it('reports what an object references', async () => {
    const references = await api.objects.findObjectReferenceInfo({ id: String(fixtures.objectId) });

    expect(Array.isArray(references)).toBe(true);
  });

  it('reports the Jira issues connected to an object', async () => {
    const tickets = await api.connectedTickets.findObjectTickets({ id: String(fixtures.objectId) });

    expect(Array.isArray(tickets.tickets)).toBe(true);
  });

  it('creates, updates and deletes an object', async () => {
    await withNewObject('created', async id => {
      const renamed = await api.objects.updateObject({
        id: String(id),
        objectTypeId: fixtures.objectTypeId,
        attributes: [
          {
            objectTypeAttributeId: fixtures.nameAttributeId,
            objectAttributeValues: [{ value: assetName('renamed') }],
          },
        ],
      });

      expect(renamed.label).toContain('renamed');
    });
  });

  it('archives an object and restores it', async () => {
    await withNewObject('archived', async id => {
      await api.objects.archiveObject({ objectIdentifier: String(id) });

      const archived = await api.objects.getArchivedObjects({ objectSchemaId: String(fixtures.schemaId) });

      expect(archived.results?.some(entry => entry.id === id)).toBe(true);

      await api.objects.restoreObject({ objectIdentifier: String(id) });
    });
  });

  it('archives in bulk by key and restores by id', async () => {
    await withNewObject('bulk archived', async id => {
      const object = await api.objects.loadObject({ id: String(id) });

      await api.objects.archiveObjectsByKeys({ body: [object.objectKey!] });
      await api.objects.restoreObjectsByIds({ body: [id] });
      await api.objects.restoreObjectsByKeys({ body: [object.objectKey!] });
    });
  });

  /**
   * `qlQuerySearch` is a flag rather than the query — the query goes in `qlQueryParams`. The document has this right
   * and the shape reads backwards, so it is worth pinning: passing the query where the flag goes earns a 400 about
   * deserialising a Boolean.
   */
  it('archives by filter and restores by filter', async () => {
    await withNewObject('filtered', async id => {
      const object = await api.objects.loadObject({ id: String(id) });

      const archiving = await api.objects.archiveObjectsByFilter({
        typeId: String(fixtures.objectTypeId),
        objectSchemaId: fixtures.schemaId,
        qlQuerySearch: true,
        qlQueryParams: { qlQuery: `objectKey = "${object.objectKey}"` },
      });

      expect(archiving.category).toBe('archive-objects');

      const progress = await api.progress.getProgressForCategoryAndResourceId({
        category: archiving.category!,
        resourceid: archiving.resourceId!,
      });

      expect(progress.resourceId).toBe(archiving.resourceId);

      await api.objects.restoreObjectsByFilter({ objectSchemaId: String(fixtures.schemaId) });
    });
  });

  it('finds objects by AQL', async () => {
    const found = await api.aql.findObjects({ qlQuery: `objectSchemaId = ${fixtures.schemaId}` });

    expect(found.objectEntries?.some(entry => entry.id === fixtures.objectId)).toBe(true);
  });

  it('sets, reports and clears the import source of an object', async () => {
    await api.objects.bulkSetObjectImportSource({ body: { objectIds: [fixtures.objectId], importSource: 'jira.js' } });
    await api.objects.getObjectImportSource({ id: String(fixtures.objectId) });
    await api.objects.clearObjectImportSource({ id: String(fixtures.objectId) });
  });

  /** The navigator list, which takes the object type as a string and the schema as a number beside it. */
  it('finds objects through the navigator list', async () => {
    const found = await api.objects.findObject({
      objectTypeId: fixtures.objectTypeId,
      objectSchemaId: fixtures.schemaId,
      page: 1,
      resultsPerPage: 25,
      includeAttributes: true,
    });

    expect(found.objectEntries?.some(entry => entry.id === fixtures.objectId)).toBe(true);
  });
});
