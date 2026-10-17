import { describe, expect, inject, it } from 'vitest';
import { isApiError } from '#/core';
import type { ServerClient } from '#/server/createServerClient';
import type { Avatar } from '#/server/models/avatar';
import { AvatarCroppingSchema } from '#/server/models/avatarCropping';
import { connect, connectWithSession } from './setup/client';
import { serverTestEnv } from './setup/env';
import { touch } from './setup/touch';
import { pngBytes } from '../helpers/image';

const NOT_CLUSTERED = 'This Jira instance is not clustered.';

async function clustered<T>(run: () => Promise<T>): Promise<T | undefined> {
  try {
    return await touch(run);
  } catch (error) {
    if (isApiError(error) && error.status === 405 && JSON.stringify(error.body).includes(NOT_CLUSTERED)) {
      return undefined;
    }

    throw error;
  }
}

async function verifyAvatar(
  jira: ServerClient,
  owner: { type: string; owningObjectId: string },
  avatar: Avatar,
): Promise<void> {
  expect(avatar.id).toMatch(/^\d+$/);

  const stored = expect.objectContaining({ id: avatar.id });

  try {
    const avatars = await jira.avatars.getAvatars(owner);

    expect(avatars.custom).toEqual(expect.arrayContaining([stored]));
  } finally {
    await jira.avatars.deleteAvatar({ ...owner, id: Number(avatar.id) });
  }

  const avatars = await jira.avatars.getAvatars(owner);

  expect(avatars.custom).toEqual(expect.not.arrayContaining([stored]));
}

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
    const nodes = await clustered(() => jira.cluster.getAllNodes());
    const nodeId = nodes?.[0]?.nodeId ?? 'no-such-node';

    await clustered(() => jira.cluster.changeNodeStateToOffline({ nodeId }));
    await clustered(() => jira.cluster.deleteNode({ nodeId }));
    await clustered(() => jira.cluster.setReadyToUpgrade());
    await clustered(() => jira.cluster.approveUpgrade());
    await clustered(() => jira.cluster.acknowledgeErrors());
    await clustered(() => jira.cluster.cancelUpgrade());
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
    const jira = await connectWithSession();
    const owner = { type: 'project', owningObjectId: fixtures.projectId };
    const temporary = await jira.avatars.storeTemporaryAvatarUsingMultiPart({
      ...owner,
      avatar: { filename: 'avatar.png', content: pngBytes(96) },
    });

    expect(temporary.needsCropping).toBe(true);

    const avatar = await jira.avatars.createAvatarFromTemporary({ ...temporary, ...owner });

    await verifyAvatar(jira, owner, avatar);
  });

  it('keeps an avatar through the issue type endpoints', async () => {
    const jira = await connectWithSession();
    const temporary = AvatarCroppingSchema.parse(
      await jira.issueTypes.storeTemporaryIssueTypeAvatarUsingMultiPart({
        id: fixtures.issueTypeId,
        avatar: { filename: 'avatar.png', content: pngBytes(96) },
      }),
    );

    expect(temporary.needsCropping).toBe(true);

    const avatar = await jira.issueTypes.createIssueTypeAvatarFromTemporary({ ...temporary, id: fixtures.issueTypeId });

    await verifyAvatar(jira, { type: 'issuetype', owningObjectId: fixtures.issueTypeId }, avatar);
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
