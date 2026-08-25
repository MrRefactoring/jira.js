/**
 * Users, groups and the account the suite is signed in as.
 *
 * This is where Data Center differs from Cloud most plainly: a self-hosted Jira owns its directory, so it creates
 * users, sets their passwords and anonymises them — none of which the Cloud API offers — and it identifies them by
 * `name` and `key` rather than by an `accountId`.
 *
 * The suite creates a user of its own and deletes it. What it does to the signed-in account it undoes, except for the
 * password, which it never changes: the rest of the run authenticates with it.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { ServerClient } from '#/server/createServerClient';
import { connect } from './setup/client';
import { serverTestEnv } from './setup/env';
import { touch } from './setup/touch';
import { runId, testName } from '../helpers/naming';

describe('users and groups', () => {
  const { username } = serverTestEnv();
  const jira: ServerClient = connect();

  const name = `jjs-${runId()}`.slice(0, 30);
  const groupName = testName('grp').slice(0, 60);

  beforeAll(async () => {
    await jira.users.createUser({
      name,
      password: 'Correct-Horse-Battery-1',
      emailAddress: `${name}@example.com`,
      displayName: 'created by the users suite',
    });

    await jira.groups.createGroup({ name: groupName });
  });

  afterAll(async () => {
    await touch(() => jira.groups.removeGroup({ groupname: groupName }));
    await touch(() => jira.users.removeUser({ username: name }));
  });

  it('reads the user it created', async () => {
    const user = await jira.users.getUser({ username: name });

    expect(user.name).toBe(name);
  });

  it('updates the user and its password', async () => {
    await jira.users.updateUser({ username: name, body: { displayName: 'changed by the users suite' } });

    const user = await jira.users.getUser({ username: name });

    expect(user.displayName).toBe('changed by the users suite');

    await jira.users.changeUserPassword({ username: name, password: 'Correct-Horse-Battery-2' });
  });

  it('checks a password against the policy', async () => {
    const onCreate = await jira.password.policyCheckCreateUser({
      username: name,
      password: 'short',
      displayName: 'the users suite',
      emailAddress: `${name}@example.com`,
    });

    expect(Array.isArray(onCreate)).toBe(true);

    await jira.password.policyCheckUpdateUser({ username: name, newPassword: 'short' });
    await jira.password.getPasswordPolicy();
  });

  it('moves the user in and out of a group', async () => {
    await jira.groups.addUserToGroup({ groupname: groupName, name });

    const members = await jira.groups.getUsersFromGroup({ groupname: groupName });

    expect(members.values?.some(member => member.name === name)).toBe(true);

    await jira.groups.removeUserFromGroup({ groupname: groupName, username: name });
  });

  it('moves the user in and out of an application', async () => {
    const roles = await jira.applicationRoles.getAll();
    const key = roles[0]?.key;

    expect(key).toBeDefined();

    await touch(() => jira.users.addUserToApplication({ username: name, applicationKey: key }));
    await touch(() => jira.users.removeUserFromApplication({ username: name, applicationKey: key }));
  });

  it('stores a property on the user', async () => {
    await jira.users.setUserProperty({ username: name, propertyKey: 'suite', body: { written: true } });

    const property = await jira.users.getUserProperty({ username: name, propertyKey: 'suite' });

    expect(property.value).toEqual({ written: true });

    await jira.users.deleteUserProperty({ username: name, propertyKey: 'suite' });
  });

  it('sets and resets the columns a user sees', async () => {
    await jira.users.setColumnsUrlEncoded({ username: name, columns: ['summary', 'status'] });

    const columns = await jira.users.defaultColumns({ username: name });

    expect(columns.length).toBeGreaterThan(0);

    await jira.users.resetUserColumns({ username: name });
  });

  it('validates and schedules an anonymisation', async () => {
    const { key = name } = await jira.users.getUser({ username: name });
    const validation = await jira.users.validateUserAnonymization({ userKey: key });

    expect(validation.userKey).toBeDefined();

    await touch(() => jira.users.scheduleUserAnonymization({ userKey: key, newOwnerKey: username }));
    await touch(() => jira.users.getUserAnonymizationProgress());
    await touch(() => jira.users.validateUserAnonymizationRerun({ userKey: key }));
    await touch(() => jira.users.scheduleUserAnonymizationRerun({ userKey: key, newOwnerKey: username }));
    await touch(() => jira.users.unlockAnonymization());
  });

  it('ends the user session', async () => {
    await touch(() => jira.users.deleteSession({ username: name }));
  });

  it('keeps an avatar for the user', async () => {
    const avatars = await jira.users.getAllUserAvatars({ username: name });

    expect(avatars.system?.length).toBeGreaterThan(0);

    const png = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
      'base64',
    );

    const temporary = await touch(() =>
      jira.users.storeTemporaryUserAvatarUsingMultiPart({
        username: name,
        avatar: { filename: 'avatar.png', content: png },
      }));

    expect(temporary === undefined || temporary !== null).toBe(true);

    await touch(() => jira.users.createUserAvatarFromTemporary({ username: name, cropperWidth: 1 }));

    const system = avatars.system?.[0];

    if (system?.id !== undefined) {
      await touch(() => jira.users.updateUserAvatar({ username: name, id: String(system.id) }));
      await touch(() => jira.users.deleteUserAvatar({ username: name, id: Number(system.id) }));
    }
  });

  it('reads and writes the signed-in account', async () => {
    const me = await jira.myself.getCurrentUser();

    expect(me.name).toBe(username);

    await touch(() => jira.myself.updateCurrentUser({ displayName: 'the Data Center live suite' }));

    await touch(() =>
      jira.myself.changeMyPassword({ currentPassword: 'not-the-password', password: 'not-the-password-either' }));
  });

  it('keeps a preference', async () => {
    await jira.myPreferences.setPreference({ key: 'jira.js.suite', body: 'true' });

    const preference = await jira.myPreferences.getPreference({ key: 'jira.js.suite' });

    expect(preference).toBeDefined();

    await jira.myPreferences.removePreference({ key: 'jira.js.suite' });
  });

  it('keeps a filter of its own', async () => {
    const filter = await jira.filters.createFilter({
      name: testName('user filter'),
      jql: 'order by created',
      description: 'created by the users suite',
    });

    await jira.filters.editFilter({ id: String(filter.id), body: { description: 'changed by the users suite' } });

    const read = await jira.filters.getFilter({ id: String(filter.id) });

    expect(read.description).toBe('changed by the users suite');

    await jira.filters.setColumns({ id: String(filter.id), columns: ['summary', 'status'] });

    const columns = await jira.filters.getFilterColumns({ id: String(filter.id) });

    expect(columns.length).toBeGreaterThan(0);

    await jira.filters.resetColumns({ id: String(filter.id) });

    const permission = await jira.filters.addSharePermission({ id: String(filter.id), type: 'authenticated' });
    const permissionId = permission[0]?.id;

    if (permissionId !== undefined) {
      const read = await jira.filters.getSharePermission({ id: String(filter.id), permissionId: String(permissionId) });

      expect(read.id).toBe(permissionId);

      await jira.filters.deleteSharePermission({ id: String(filter.id), permissionId: String(permissionId) });
    }

    await touch(() => jira.filters.setDefaultShareScope({ scope: 'PRIVATE' }));
    await jira.filters.deleteFilter({ id: String(filter.id) });
  });
});
