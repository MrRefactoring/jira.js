import { beforeAll, describe, expect, inject, it } from 'vitest';
import type { AssetsServerClient } from '#/assetsServer/createAssetsServerClient';
import { assets } from './setup/client';
import { assetName } from './setup/naming';
import type { Fixtures } from './setup/fixtures';

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
      await api.objects.deleteObject({ id: String(created.id) }).catch(() => {});
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

      const deleted = await api.objects.deleteObject({ id: String(id) });

      expect(deleted.id).toBe(id);
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

      const isArchived = async (): Promise<boolean> => {
        const archived = await api.objects.getArchivedObjects({ objectSchemaId: String(fixtures.schemaId) });

        return archived.results?.some(entry => entry.id === id) ?? false;
      };

      await api.objects.archiveObjectsByKeys({ body: [object.objectKey!] });

      expect(await isArchived()).toBe(true);

      await api.objects.restoreObjectsByIds({ body: [id] });

      expect(await isArchived()).toBe(false);

      await api.objects.archiveObjectsByKeys({ body: [object.objectKey!] });
      await api.objects.restoreObjectsByKeys({ body: [object.objectKey!] });

      expect(await isArchived()).toBe(false);
    });
  });

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

    const reported: unknown = await api.objects.getObjectImportSource({ id: String(fixtures.objectId) });

    expect(reported).toBeDefined();

    await api.objects.clearObjectImportSource({ id: String(fixtures.objectId) });
  });

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
