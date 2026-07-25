import { beforeAll, describe, expect, it } from 'vitest';
import type { AgileClient } from '#/agile/createAgileClient';
import { getAgileClient } from '../setup/client';

/**
 * Live suite for the Agile DevOps modules: `builds`, `deployments`, `featureFlags`, `devopsComponents`,
 * `remoteLinks`, `securityInformation`, `operations` and `developmentInformation`.
 *
 * Eight modules in one file, deliberately. They are not eight APIs so much as one shape repeated: an app pushes
 * entities into Jira with `submit*`, reads one back by its own key, and deletes by key or by property. None of them
 * has a listing endpoint, and none is reachable with user credentials — they authenticate as the app that owns the
 * data, so a user token has nothing to identify.
 *
 * Written per-module the file would be eight near-identical assertions that a 4xx arrives. What is actually worth
 * pinning is the shape they share and the two consequences of it: the entity ids are the *provider's* ids rather than
 * Jira's, and every one of these endpoints is a write into someone's delivery pipeline data.
 */
describe('Jira Software — DevOps modules (live, app-only)', () => {
  let agile: AgileClient;

  beforeAll(() => {
    agile = getAgileClient();
  });

  /** Every read in this family is addressed by the provider's own identifiers, never by a Jira id. */
  const reads: [string, () => Promise<unknown>][] = [
    ['builds.getBuildByKey', () => agile.builds.getBuildByKey({ pipelineId: 'jjs-pipeline', buildNumber: 1 })],
    [
      'deployments.getDeploymentByKey',
      () =>
        agile.deployments.getDeploymentByKey({
          pipelineId: 'jjs-pipeline',
          environmentId: 'jjs-env',
          deploymentSequenceNumber: 1,
        }),
    ],
    ['featureFlags.getFeatureFlagById', () => agile.featureFlags.getFeatureFlagById({ featureFlagId: 'jjs-flag' })],
    ['devopsComponents.getComponentById', () => agile.devopsComponents.getComponentById({ componentId: 'jjs-comp' })],
    ['remoteLinks.getRemoteLinkById', () => agile.remoteLinks.getRemoteLinkById({ remoteLinkId: 'jjs-link' })],
  ];

  it.each(reads)('refuses %s for user credentials', async (_name, call) => {
    const error = await call().catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    // 4xx, never a 5xx and never an empty success: the request is rejected for
    // want of an app identity, not because the entity is missing.
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
    expect((error as { status?: number }).status).toBeLessThan(500);
  });

  it('refuses the submits, so nothing is ever pushed into pipeline data', async () => {
    // Each of these writes into an app's delivery data. Attempted with
    // deliberately empty payloads so that even a permissive server has nothing
    // to store.
    const builds = await agile.builds.submitBuilds({ builds: [] }).catch((e: unknown) => e);
    const deployments = await agile.deployments.submitDeployments({ deployments: [] }).catch((e: unknown) => e);
    const flags = await agile.featureFlags.submitFeatureFlags({ flags: [] }).catch((e: unknown) => e);

    for (const result of [builds, deployments, flags]) {
      expect(result).toBeInstanceOf(Error);
      expect((result as { status?: number }).status).toBeGreaterThanOrEqual(400);
    }
  });

  it('refuses the delete-by-property variants', async () => {
    // The bulk deletes take a property filter rather than ids — an app removing
    // everything it recorded for, say, one repository. Broad by design.
    const error = await agile.builds.deleteBuildsByProperty({ accountId: 'absent-account' }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });

  it('refuses the development information reads', async () => {
    const error = await agile.developmentInformation
      .getRepository({ repositoryId: 'jjs-repo' })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });

  it('refuses the security and operations workspace reads', async () => {
    const security = await agile.securityInformation.getLinkedWorkspaces().catch((e: unknown) => e);
    const operations = await agile.operations.getWorkspaces().catch((e: unknown) => e);

    expect(security).toBeInstanceOf(Error);
    expect(operations).toBeInstanceOf(Error);
  });

  it('fails typed and promptly, which is the part the library owns', async () => {
    const error = await agile.builds.getBuildByKey({ pipelineId: 'jjs', buildNumber: 1 }).catch((e: unknown) => e);

    // Whatever Jira decides about app identity, the error arriving typed with a
    // status a caller can branch on is this library's responsibility — and it
    // stays true if these ever become reachable through an app token.
    expect(typeof (error as { status?: number }).status).toBe('number');
  });
});
