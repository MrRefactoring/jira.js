import { describe, expect, inject, it } from 'vitest';
import { serviceDesk } from './setup/client';
import { deskFixtures, raiseRequest } from './serviceDeskHelpers';
import { assetName } from './setup/naming';
import { z } from 'zod';

describe.runIf(inject('jsmFixtures').serviceDeskLicensed)('licensed service desk queues', () => {
  const api = serviceDesk();

  it('creates, reads, updates and deletes a queue containing an existing request', async () => {
    const { serviceDeskId, projectKey } = deskFixtures();
    const issueIdOrKey = await raiseRequest('queued request');
    const created = await api.queues.createQueue({
      serviceDeskId,
      name: assetName('queue'),
      jql: `project = ${projectKey}`,
      fields: ['issuekey', 'summary'],
    });
    expect(created.id).toMatch(/^\d+$/);
    const queueId = created.id!;
    try {
      const listed = await api.queues.getQueues({ serviceDeskId });
      expect(listed.values).toContainEqual(expect.objectContaining({ id: queueId }));
      const loaded = await api.queues.getQueue({ serviceDeskId, queueId });
      expect(loaded.name).toBe(created.name);
      const populated = await api.queues.getIssuesInQueue({ serviceDeskId, queueId });
      expect(populated.values).toContainEqual(
        expect.objectContaining({
          key: issueIdOrKey,
          fields: expect.objectContaining({ summary: assetName('queued request') }),
        }),
      );
      const name = assetName('renamed queue');
      const updated = await api.queues.updateQueue({
        serviceDeskId,
        queueId,
        name,
        jql: `key = ${issueIdOrKey}`,
        fields: ['issuekey'],
      });
      expect(updated.name).toBe(name);
      const issues = await api.queues.getIssuesInQueue({ serviceDeskId, queueId });
      expect(issues.values).toContainEqual(expect.objectContaining({ key: issueIdOrKey, fields: null }));
    } finally {
      await api.queues.deleteQueue({ serviceDeskId, queueId });
    }
    const remaining = await api.queues.getQueues({ serviceDeskId });
    expect(remaining.values).not.toContainEqual(expect.objectContaining({ id: queueId }));
  });

  it('reorders the projects queues and restores the original order', async () => {
    const { serviceDeskId } = deskFixtures();
    const listed = await api.queues.getQueues({ serviceDeskId });
    const original = listed.values?.map(queue => Number(queue.id));
    expect(original?.length).toBeGreaterThan(1);
    expect(original?.every(Number.isFinite)).toBe(true);
    const reversed = [...original!].reverse();
    try {
      await api.queues.reorderQueues({ serviceDeskId, body: reversed });
      const changed = await api.queues.getQueues({ serviceDeskId });
      expect(changed.values?.map(queue => Number(queue.id))).toEqual(reversed);
    } finally {
      await api.queues.reorderQueues({ serviceDeskId, body: original! });
    }
    const restored = await api.queues.getQueues({ serviceDeskId });
    expect(restored.values?.map(queue => Number(queue.id))).toEqual(original);
  });

  it('changes global and project queue count settings and restores their defaults', async () => {
    const { projectKey } = deskFixtures();
    const settings = z.object({
      queueCount: z.object({ includeQueueCount: z.boolean(), useCachedQueueCount: z.boolean() }),
    });
    const read = async () =>
      settings.parse(await api.queueSettings.getQueueSettingsOnProject({ projectKey })).queueCount;
    const original = await read();
    try {
      await api.queueSettings.setShouldQueuesIncludeCountGlobally({ body: true });
      await api.queueSettings.setShouldQueuesUseCountCacheGlobally({ body: true });
      await api.queueSettings.setShouldQueuesIncludeCountOnProject({ projectKey, body: true });
      await api.queueSettings.setShouldQueuesUseCountCacheOnProject({ projectKey, body: true });
      expect(await read()).toEqual({ includeQueueCount: true, useCachedQueueCount: true });
      await api.queueSettings.setShouldQueuesIncludeCountOnProject({ projectKey, body: false });
      expect((await read()).includeQueueCount).toBe(false);
      await api.queueSettings.setShouldQueuesIncludeCountOnProject({ projectKey, body: true });
      await api.queueSettings.setShouldQueuesUseCountCacheOnProject({ projectKey, body: false });
      expect((await read()).useCachedQueueCount).toBe(false);
      await api.queueSettings.setShouldQueuesUseCountCacheOnProject({ projectKey, body: true });
      await api.queueSettings.setShouldQueuesIncludeCountGlobally({ body: false });
      expect((await read()).includeQueueCount).toBe(false);
      await api.queueSettings.setShouldQueuesIncludeCountGlobally({ body: true });
      await api.queueSettings.setShouldQueuesUseCountCacheGlobally({ body: false });
      expect((await read()).useCachedQueueCount).toBe(false);
    } finally {
      await api.queueSettings.setShouldQueuesIncludeCountGlobally({ body: true });
      await api.queueSettings.setShouldQueuesUseCountCacheGlobally({ body: false });
      await api.queueSettings.setShouldQueuesIncludeCountOnProject({ projectKey, body: original.includeQueueCount });
      await api.queueSettings.setShouldQueuesUseCountCacheOnProject({ projectKey, body: original.useCachedQueueCount });
    }
    expect(await read()).toEqual(original);
  });
});
