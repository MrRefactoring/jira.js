import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { isApiError, type ApiError } from '#/core';
import type { TeamsClient } from '#/teams/createTeamsClient';
import { getOrgId, getTeamsClient } from '../setup/client';
import { RESOURCE_MARKER, testName } from '../helpers/naming';

/**
 * Live suite for the Teams API.
 *
 * Unlike every other suite here, its fixtures are organization-level rather than project-level: a team is not scoped
 * to a project and cannot be swept by the issue purge in global setup. So this suite cleans up after itself twice —
 * `afterAll` deletes what it created, and the same hook removes any marker-named team an earlier crashed run left
 * behind, which is the only place that debris would ever be noticed.
 */
describe('Teams (live)', () => {
  let client: TeamsClient;
  let orgId: string;

  const created: string[] = [];

  async function createTeam(label: string) {
    const team = await client.teams.createTeam({
      orgId,
      displayName: testName(label),
      description: 'Created by the jira.js live suite.',
      teamType: 'MEMBER_INVITE',
    });

    created.push(team.teamId);

    return team;
  }

  beforeAll(async () => {
    client = getTeamsClient();
    orgId = await getOrgId();
  });

  afterAll(async () => {
    const { entities } = await client.teams.queryTeams({ orgId, size: 300 }).catch(() => ({ entities: [] }));
    const debris = entities
      .filter(team => team.displayName.startsWith(`[${RESOURCE_MARKER}:`))
      .map(team => team.teamId);

    for (const teamId of new Set([...created, ...debris])) {
      await client.teams.deleteTeam({ orgId, teamId }).catch(() => undefined);
    }
  });

  it('creates a team, and puts the creating account in it', async () => {
    const team = await createTeam('create');

    expect(team.teamId).toMatch(/^[0-9a-f-]{36}$/);
    expect(team.organizationId).toBe(orgId);
    expect(team.state).toBe('ACTIVE');
    expect(team.teamType).toBe('MEMBER_INVITE');
    expect(team.members.length).toBeGreaterThan(0);
    expect(team.userPermissions.DELETE_TEAM).toBe(true);
  });

  it('reads one back by id', async () => {
    const { teamId, displayName } = await createTeam('read');

    const team = await client.teams.getTeam({ orgId, teamId });

    expect(team.teamId).toBe(teamId);
    expect(team.displayName).toBe(displayName);
  });

  it('lists the organization teams, cursor and all', async () => {
    const { teamId } = await createTeam('list');

    const page = await client.teams.queryTeams({ orgId, size: 300 });

    expect(Array.isArray(page.entities)).toBe(true);
    expect(page.entities.map(team => team.teamId)).toContain(teamId);
  });

  it('renames one, and the change survives a re-read', async () => {
    const { teamId } = await createTeam('update');
    const renamed = testName('update renamed');

    const updated = await client.teams.updateTeam({ orgId, teamId, displayName: renamed });

    expect(updated.displayName).toBe(renamed);
    expect((await client.teams.getTeam({ orgId, teamId })).displayName).toBe(renamed);
  });

  it('archives and unarchives in bulk, and the state follows', async () => {
    const { teamId } = await createTeam('archive');

    await client.teams.archiveTeams({ orgId, teamIds: [teamId] });
    expect((await client.teams.getTeam({ orgId, teamId })).state).toBe('ARCHIVED');

    await client.teams.unarchiveTeams({ orgId, teamIds: [teamId] });
    expect((await client.teams.getTeam({ orgId, teamId })).state).toBe('ACTIVE');
  });

  it('pages the members, which come back under a cursor of their own', async () => {
    const { teamId } = await createTeam('members');

    const page = await client.teamMembers.fetchMembers({ orgId, teamId, first: 10 });

    expect(page.results.length).toBeGreaterThan(0);
    expect(typeof page.results[0].accountId).toBe('string');
    expect(typeof page.pageInfo.hasNextPage).toBe('boolean');
  });

  it('deletes one, and the API then reports it gone rather than missing', async () => {
    const { teamId } = await createTeam('delete');

    await client.teams.deleteTeam({ orgId, teamId });

    const error = await client.teams.getTeam({ orgId, teamId }).catch((e: unknown) => e);

    expect(isApiError(error)).toBe(true);
    expect((error as ApiError).status).toBe(410);
  });
});
