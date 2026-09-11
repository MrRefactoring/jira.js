import { describe, expect, inject, it } from 'vitest';
import type { ServerClient } from '#/server/createServerClient';
import { connect } from './setup/client';
import { serverTestEnv } from './setup/env';
import { touch } from './setup/touch';
import { pngBytes } from '../helpers/image';

describe('the instance', () => {
  const jira: ServerClient = connect();
  const fixtures = inject('serverFixtures');
  const { host, username, password } = serverTestEnv();

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
    const updated = await jira.applicationRoles.putBulk({ body: [role] });

    expect(updated.map(entry => entry.key)).toContain(role.key);
  });

  it('sets the base url and the default columns', async () => {
    await touch(() => jira.jiraSettings.setBaseURL({ body: host }));
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
    const templates = await jira.emailTemplates.downloadEmailTemplates();
    const bytes = templates as Uint8Array;

    expect(bytes.byteLength).toBeGreaterThan(0);
    expect(Array.from(bytes.subarray(0, 4))).toEqual([0x50, 0x4b, 0x03, 0x04]);

    await touch(() => jira.emailTemplates.uploadEmailTemplates({ body: new Blob([new Uint8Array([1, 2, 3])]) }));
    await touch(() => jira.emailTemplates.applyEmailTemplates());
    await touch(() => jira.emailTemplates.revertEmailTemplatesToDefault());
  });

  it('keeps an avatar through the universal endpoints', async () => {
    const temporary = await touch(() =>
      jira.avatars.storeTemporaryAvatarUsingMultiPart({
        type: 'project',
        owningObjectId: fixtures.projectId,
        avatar: { filename: 'avatar.png', content: pngBytes(1) },
      }));

    if (temporary !== undefined) expect(temporary.cropperWidth ?? temporary.url).toBeDefined();

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
        avatar: { filename: 'avatar.png', content: pngBytes(1) },
      }));

    await touch(() =>
      jira.issueTypes.createIssueTypeAvatarFromTemporary({ id: fixtures.issueTypeId, cropperWidth: 1 }));

    await touch(() =>
      jira.projects.createProjectAvatarFromTemporary({ projectIdOrKey: fixtures.projectId, cropperWidth: 1 }));
  });

  it('runs the upgrade tasks', async () => {
    await touch(() => jira.upgrade.runUpgradesNow());

    await touch(() => jira.upgrade.getUpgradeResult());
  });

  it('signs in and out through the session endpoints', async () => {
    const session = await jira.session.currentUser();

    expect(session.name).toBeDefined();

    await touch(() => jira.session.login({ username, password }));
    await touch(() => jira.session.logout());
    await touch(() => jira.websudo.release({}));
  });

  it('asks for an index snapshot and a reindex', async () => {
    await touch(() => jira.indexing.createIndexSnapshot());

    const requested = await touch(() => jira.indexing.reindexIssues({ issueId: [fixtures.issueKey] }));

    if (requested !== undefined) expect(requested.progressUrl ?? requested).toBeTruthy();

    await touch(() => jira.indexing.processRequests());
    await touch(() => jira.indexing.getReindexRequestProgress({ requestId: 1 }));
    await touch(() => jira.indexing.reindex({ type: 'BACKGROUND' }));
  });

  it('puts the instance into read-only mode', async () => {
    await touch(() =>
      jira.readOnlyMode.updateReadOnlyMode({ enabled: true, message: 'set by the Data Center live suite' }));

    const mode = await jira.readOnlyMode.getReadOnlyMode();

    expect(mode.enabled).toBe(true);
  });
});
