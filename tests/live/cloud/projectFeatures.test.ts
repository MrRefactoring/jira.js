import { beforeAll, describe, expect, it } from 'vitest';
import { isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { TEST_PROJECT_KEY } from '../setup/fixtures';

/**
 * Live suite for the `projectFeatures` API (`getFeaturesForProject`, `toggleFeatureForProject`).
 *
 * Read-only. Toggling a feature changes what a project's users see — turning off the backlog or the board removes it
 * from their navigation — and the change is not scoped to anything smaller than the project. The test project is the
 * one every other live suite runs in, so a failed restore would break them all.
 *
 * What the read half is worth: it explains why several other suites find what they find. Whether a project has a
 * board, a backlog or sprints at all is a per-project feature toggle, not a property of the site.
 */
describe('Jira Cloud — projectFeatures (live, read-only)', () => {
  let client: CloudClient;

  beforeAll(() => {
    client = getCloudClient();
  });

  it('lists the features of the test project, each with a state', async () => {
    const features = await client.projectFeatures.getFeaturesForProject({ projectIdOrKey: TEST_PROJECT_KEY });

    expect(Array.isArray(features.features)).toBe(true);
    expect(features.features!.length).toBeGreaterThan(0);

    for (const feature of features.features!) {
      expect(typeof feature.feature).toBe('string');
      expect(['ENABLED', 'DISABLED', 'COMING_SOON']).toContain(feature.state);
      expect(Array.isArray(feature.prerequisites)).toBe(true);
      expect(typeof feature.toggleLocked).toBe('boolean');
    }
  });

  it('records which features cannot be toggled at all', async () => {
    const features = await client.projectFeatures.getFeaturesForProject({ projectIdOrKey: TEST_PROJECT_KEY });
    const locked = features.features!.filter(feature => feature.toggleLocked);

    for (const feature of locked) expect(typeof feature.feature).toBe('string');
  });

  it('names prerequisites as feature keys that exist on the same project', async () => {
    const features = await client.projectFeatures.getFeaturesForProject({ projectIdOrKey: TEST_PROJECT_KEY });
    const keys = new Set(features.features!.map(feature => feature.feature));

    for (const feature of features.features!) {
      for (const prerequisite of feature.prerequisites ?? []) expect(keys.has(prerequisite)).toBe(true);
    }
  });

  it('resolves the project by id as well as by key', async () => {
    const project = await client.projects.getProject({ projectIdOrKey: TEST_PROJECT_KEY });

    const byId = await client.projectFeatures.getFeaturesForProject({ projectIdOrKey: project.id! });
    const byKey = await client.projectFeatures.getFeaturesForProject({ projectIdOrKey: TEST_PROJECT_KEY });

    expect(byId.features?.length).toBe(byKey.features?.length);
  });

  it('surfaces an unknown project as a typed NotFoundError', async () => {
    const error = await client.projectFeatures
      .getFeaturesForProject({ projectIdOrKey: 'NOSUCHPROJECT' })
      .catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);
  });

  it('fails typed on the toggle, without ever aiming it at a real feature', async () => {
    const error = await client.projectFeatures
      .toggleFeatureForProject({ projectIdOrKey: TEST_PROJECT_KEY, featureKey: 'no.such.feature.jjs', state: 'ENABLED' })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });
});
