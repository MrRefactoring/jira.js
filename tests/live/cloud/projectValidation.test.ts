import { beforeAll, describe, expect, it } from 'vitest';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { TEST_PROJECT_KEY } from '../setup/fixtures';

/**
 * Live suite for the `projectKeyAndNameValidation` and `groupAndUserPicker` APIs.
 *
 * Both are pure read helpers with no write half at all — they exist to answer a question a form asks while the user
 * is still typing, which is why they are grouped here.
 *
 * The behaviour worth pinning is that validation does not throw. `validateProjectKey` answers 200 with a list of
 * complaints, and `getValidProjectKey` goes further and *invents* a different key rather than refusing — so a caller
 * who ignores the response and uses their own key is not creating the project they think they are.
 */
describe('Jira Cloud — project validation and pickers (live, read-only)', () => {
  let client: CloudClient;

  beforeAll(() => {
    client = getCloudClient();
  });

  it('reports validation complaints rather than throwing', async () => {
    const result = await client.projectKeyAndNameValidation.validateProjectKey({ key: 'lowercase' });

    // 200, not 400. The verdict is in the payload, so a caller wrapping this in
    // try/catch learns nothing — the same trap as `parseJqlQueries` and
    // `analyseExpression`.
    expect(result.errorMessages ?? result.errors).toBeDefined();
  });

  it('accepts a key that is genuinely valid', async () => {
    const result = await client.projectKeyAndNameValidation.validateProjectKey({ key: 'JJSVALID' });

    const complaints = [...(result.errorMessages ?? []), ...Object.values(result.errors ?? {})];

    expect(complaints).toEqual([]);
  });

  it('rejects a key already taken by an existing project', async () => {
    const result = await client.projectKeyAndNameValidation.validateProjectKey({ key: TEST_PROJECT_KEY });

    const complaints = [...(result.errorMessages ?? []), ...Object.values(result.errors ?? {})];

    // Uniqueness is checked here rather than at creation — the reason this
    // endpoint exists at all.
    expect(complaints.length).toBeGreaterThan(0);
  });

  it('invents a usable key rather than refusing an unusable one', async () => {
    const suggested = await client.projectKeyAndNameValidation.getValidProjectKey({ key: TEST_PROJECT_KEY });

    // Not the key that was asked for. The endpoint silently substitutes a free
    // one, so code that calls it and then ignores the answer creates a project
    // under a key it never chose.
    expect(typeof suggested).toBe('string');
    expect(suggested).not.toBe(TEST_PROJECT_KEY);
  });

  it('invents a usable name the same way', async () => {
    const project = await client.projects.getProject({ projectIdOrKey: TEST_PROJECT_KEY });

    const suggested = await client.projectKeyAndNameValidation.getValidProjectName({ name: project.name! });

    expect(typeof suggested).toBe('string');
    expect(suggested).not.toBe(project.name);
  });

  it('finds users and groups in one call, each with a total', async () => {
    const result = await client.groupAndUserPicker.findUsersAndGroups({ query: '', maxResults: 5 });

    expect(typeof result.users?.total).toBe('number');
    expect(typeof result.groups?.total).toBe('number');
    // Both halves are capped independently by `maxResults`, so a query matching
    // many groups and no users still returns a short user list rather than
    // borrowing the budget.
    expect(result.users?.users?.length ?? 0).toBeLessThanOrEqual(5);
    expect(result.groups?.groups?.length ?? 0).toBeLessThanOrEqual(5);
  });

  it('answers an unmatched picker query with empty halves, not an error', async () => {
    const result = await client.groupAndUserPicker.findUsersAndGroups({ query: 'nobodymatchesthisatall' });

    expect(result.users?.users ?? []).toEqual([]);
    expect(result.groups?.groups ?? []).toEqual([]);
  });

  it('lists the avatars available to a project', async () => {
    const avatars = await client.projectAvatars.getAllProjectAvatars({ projectIdOrKey: TEST_PROJECT_KEY });

    expect(Array.isArray(avatars.system)).toBe(true);
    expect(avatars.system!.length).toBeGreaterThan(0);
  });

  it('fails typed on project creation from a template, without ever creating one', async () => {
    // A project consumes a licence slot and often cannot be deleted by the
    // token that made it — the reason the fixtures work inside a standing
    // project instead. Only the error channel is exercised.
    const error = await client.projectTemplates
      .createProjectWithCustomTemplate({ details: { key: 'lowercase', name: '', leadAccountId: '' } })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });
});
