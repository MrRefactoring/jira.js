import { beforeAll, describe, expect, it } from 'vitest';
import type { AssetsServerClient } from '#/assetsServer/createAssetsServerClient';
import { assets } from './setup/client';

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
