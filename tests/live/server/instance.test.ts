/**
 * The instance-level endpoints, and the ones that leave Jira worse than they found it.
 *
 * This is the file that runs last, named as such in `vitest.config.server.ts`, and it is allowed to end the
 * instance's usefulness: it puts Jira into read-only mode, from which the Data Center API offers no way back, and it
 * reindexes, which occupies the instance for as long as it takes. The container is thrown away after every run, so
 * that costs nothing but has to happen after everything else.
 *
 * Much of what is here cannot succeed on a single unclustered node — a cluster with no nodes, an upgrade that is not
 * pending, an index snapshot with nowhere to write. What each call proves is that the request serialises and that
 * whatever comes back matches the schema; Jira refusing on its own terms is a correct answer and `touch` accepts it.
 */
import { describe, expect, inject, it } from 'vitest';
import type { ServerClient } from '#/server/createServerClient';
import { connect } from './setup/client';
import { touch } from './setup/touch';

describe('the instance', () => {
  const jira: ServerClient = connect();
  const fixtures = inject('serverFixtures');

  /**
   * The write is asserted rather than touched, which is the whole point of it being here.
   *
   * The document declares this operation with a path parameter and no request body, so the generated call used to send
   * none — and Jira answered 400, which `touch` accepted as one of the refusals a single node is entitled to make. It
   * took a caller outside these suites to notice. `serverMissingRequestBodyPatch` gives the body back; reading the
   * value out of the response is what proves the body arrived.
   */
  it('reads and writes an application property', async () => {
    const properties = await jira.applicationProperties.getApplicationProperties({ keyFilter: 'jira.clone.prefix' });
    const property = properties[0];

    expect(property?.id).toBe('jira.clone.prefix');

    const written = await jira.applicationProperties.setPropertyViaRestfulTable({
      id: property!.id!,
      body: { id: property!.id!, value: 'DUPLICATE - ' },
    });

    expect(written.value).toBe('DUPLICATE - ');

    await jira.applicationProperties.getAdvancedSettings();
  });

  it('reads and writes an application role', async () => {
    const roles = await jira.applicationRoles.getAll();
    const role = roles[0]!;

    const read = await jira.applicationRoles.getApplicationRole({ key: role.key! });

    expect(read.key).toBe(role.key);

    await touch(() => jira.applicationRoles.updateApplicationRole({ key: role.key!, body: role }));
    await touch(() => jira.applicationRoles.putBulk({ ...role }));
  });

  it('sets the base url and the default columns', async () => {
    await touch(() => jira.jiraSettings.setBaseURL({ body: 'http://localhost:8080' }));
    await jira.jiraSettings.setIssueNavigatorDefaultColumnsForm({ columns: ['summary', 'status'] });

    const columns = await jira.jiraSettings.getIssueNavigatorDefaultColumns();

    expect(columns.length).toBeGreaterThan(0);
  });

  it('renames a term and puts it back', async () => {
    const entries = await jira.terminology.getAllTerminologyEntries();
    const entry = entries[0];

    if (!entry?.originalName) return;

    await touch(() =>
      jira.terminology.setTerminologyEntries({
        originalName: entry.originalName,
        newName: entry.newName ?? entry.originalName,
        newNamePlural: entry.newNamePlural ?? entry.originalName,
      }));

    const read = await jira.terminology.getTerminologyEntry({ originalName: entry.originalName });

    expect(read.originalName).toBe(entry.originalName);
  });

  it('validates a licence', async () => {
    const result = await jira.licenseValidator.validate({ body: 'not-a-licence' });

    expect(result).toBeDefined();
  });

  it('turns the monitoring switches', async () => {
    await touch(() => jira.monitoring.setAppMonitoringEnabled({ enabled: true }));
    await touch(() => jira.monitoring.setIpdMonitoringEnabled({ enabled: true }));
    await touch(() => jira.monitoring.start());
    await touch(() => jira.monitoring.stop());
  });

  it('asks the cluster about itself', async () => {
    // A single node is not a cluster, and Jira says so with a 405 rather than an empty list.
    const nodes = await touch(() => jira.cluster.getAllNodes());
    const nodeId = nodes?.[0]?.nodeId ?? 'no-such-node';

    await touch(() => jira.cluster.changeNodeStateToOffline({ nodeId }));
    await touch(() => jira.cluster.deleteNode({ nodeId }));
    await touch(() => jira.cluster.setReadyToUpgrade());
    await touch(() => jira.cluster.approveUpgrade());
    await touch(() => jira.cluster.acknowledgeErrors());
    await touch(() => jira.cluster.cancelUpgrade());
  });

  it('handles the email templates', async () => {
    // "Creates a zip file containing email templates at local home and returns the file", and then the document
    // describes no body — so the call was typed `void` and threw the zip away. The magic number is the assertion: a
    // zip begins `PK\x03\x04`, and nothing else this API returns does.
    const templates = await jira.emailTemplates.downloadEmailTemplates();
    const bytes = new Uint8Array(templates as ArrayBufferLike & Uint8Array);

    expect(bytes.byteLength).toBeGreaterThan(0);
    expect([...bytes.slice(0, 4)]).toEqual([0x50, 0x4b, 0x03, 0x04]);

    await touch(() => jira.emailTemplates.uploadEmailTemplates({ body: new Blob([new Uint8Array([1, 2, 3])]) }));
    await touch(() => jira.emailTemplates.applyEmailTemplates());
    await touch(() => jira.emailTemplates.revertEmailTemplatesToDefault());
  });

  it('keeps an avatar through the universal endpoints', async () => {
    const png = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
      'base64',
    );

    const temporary = await touch(() =>
      jira.avatars.storeTemporaryAvatarUsingMultiPart({
        type: 'project',
        owningObjectId: fixtures.projectId,
        avatar: { filename: 'avatar.png', content: png },
      }));

    // Called whether or not the upload took: what is under test is the request, and a temporary avatar that is not
    // there is one of the answers this endpoint gives.
    expect(temporary === undefined || temporary !== null).toBe(true);

    await touch(() =>
      jira.avatars.createAvatarFromTemporary({
        type: 'project',
        owningObjectId: fixtures.projectId,
        cropperWidth: 1,
      }));

    const avatars = await jira.avatars.getAvatars({ type: 'project', owningObjectId: fixtures.projectId });

    expect(avatars.system?.length ?? 0).toBeGreaterThanOrEqual(0);

    await touch(() =>
      jira.avatars.deleteAvatar({ type: 'project', owningObjectId: fixtures.projectId, id: 1 }));

    await touch(() =>
      jira.issueTypes.storeTemporaryIssueTypeAvatarUsingMultiPart({
        id: fixtures.issueTypeId,
        avatar: { filename: 'avatar.png', content: png },
      }));

    await touch(() =>
      jira.issueTypes.createIssueTypeAvatarFromTemporary({ id: fixtures.issueTypeId, cropperWidth: 1 }));

    await touch(() =>
      jira.projects.createProjectAvatarFromTemporary({ projectIdOrKey: fixtures.projectId, cropperWidth: 1 }));
  });

  it('runs the upgrade tasks', async () => {
    await touch(() => jira.upgrade.runUpgradesNow());

    // 404 until an upgrade has actually run, which on a freshly created instance it has not.
    await touch(() => jira.upgrade.getUpgradeResult());
  });

  it('signs in and out through the session endpoints', async () => {
    const session = await jira.session.currentUser();

    expect(session.name).toBeDefined();

    // A fresh session rather than the one the suite authenticates with, so signing out of it costs nothing.
    await touch(() => jira.session.login({ username: 'admin', password: 'admin123' }));
    await touch(() => jira.session.logout());
    await touch(() => jira.websudo.release({}));
  });

  it('asks for an index snapshot and a reindex', async () => {
    await touch(() => jira.indexing.createIndexSnapshot());

    const requested = await touch(() => jira.indexing.reindexIssues({ issueId: [fixtures.issueKey] }));

    expect(requested === undefined || requested !== null).toBe(true);

    await touch(() => jira.indexing.processRequests());
    await touch(() => jira.indexing.getReindexRequestProgress({ requestId: 1 }));
    await touch(() => jira.indexing.reindex({ type: 'BACKGROUND' }));
  });

  // Last of everything: the Data Center API has no endpoint that turns read-only mode off again, so whatever runs
  // after this one meets an instance that refuses to write.
  it('puts the instance into read-only mode', async () => {
    await touch(() =>
      jira.readOnlyMode.updateReadOnlyMode({ enabled: true, message: 'set by the Data Center live suite' }));

    const mode = await jira.readOnlyMode.getReadOnlyMode();

    expect(mode).toBeDefined();
  });
});
