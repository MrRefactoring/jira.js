import { beforeAll, describe, expect, it } from 'vitest';
import type { AssetsServerClient } from '#/assetsServer/createAssetsServerClient';
import { assets } from './setup/client';

/**
 * The Assets index, which this file is allowed to take away from everything else.
 *
 * A reindex holds the index for as long as it runs and answers stale until it finishes, so the sequencer in
 * `vitest.config.jsm.ts` puts this file last by name. Nothing that reads an object should run after it.
 */
describe('assets index', () => {
  let api: AssetsServerClient;

  beforeAll(() => {
    api = assets();
  });

  it('reports where the index lives', async () => {
    const path = await api.indexConfiguration.getIndexPath();

    expect(path.path).toContain('insight');
  });

  it('checks the integrity of the index on this node', async () => {
    const integrity = await api.indexConfiguration.checkIndexIntegrity();

    expect(integrity).toBeTypeOf('object');
  });

  it('writes the index to disk', async () => {
    const persisted = await api.indexConfiguration.persistIndexToFile();

    expect(persisted).toBeTypeOf('object');
  });

  it('reindexes this node', async () => {
    const progress = await api.indexConfiguration.startReindexCurrentNode();

    expect(progress).toBeTypeOf('object');
  });

  it('reindexes the whole of Assets', async () => {
    const progress = await api.indexConfiguration.startReindexInsight({ clean: 'false' });

    expect(progress).toBeTypeOf('object');
  });
});
