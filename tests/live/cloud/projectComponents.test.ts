import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestIssue, TEST_PROJECT_KEY, type TestIssue } from '../setup/fixtures';
import { testName } from '../helpers/naming';

/**
 * Live suite for the `projectComponents` API (`createComponent`, `getComponent`, `updateComponent`,
 * `deleteComponent`, `getProjectComponents`, `getProjectComponentsPaginated`, `findComponentsForProjects`,
 * `getComponentRelatedIssues`).
 *
 * A full write cycle. Components are project-scoped and deletable by their creator, so unlike most configuration in
 * Jira they can be exercised end to end without leaving anything behind.
 *
 * The part that needs a live site is deletion semantics: a component can be attached to issues, and removing it has
 * to leave those issues intact. Nothing in the types says so.
 */
describe('Jira Cloud — projectComponents (live)', () => {
  const tracker = new ResourceTracker();
  let client: CloudClient;
  let componentId: string;
  let issue: TestIssue;
  const name = testName('component').replace(/[[\]]/g, '');

  beforeAll(async () => {
    client = getCloudClient();
  });

  afterAll(() => tracker.cleanup());

  it('creates a component owned by the test project', async () => {
    const component = await client.projectComponents.createComponent({
      name,
      description: 'created by the live suite',
      project: TEST_PROJECT_KEY,
      assigneeType: 'PROJECT_DEFAULT',
    });

    expect(component.id).toMatch(/^\d+$/);
    expect(component.name).toBe(name);
    expect(component.project).toBe(TEST_PROJECT_KEY);
    expect(component.self).toMatch(/^https:\/\//);

    componentId = component.id!;
    tracker.defer(async () => {
      await client.projectComponents.deleteComponent({ id: componentId });
    });
  });

  it('reads the component back by id', async () => {
    const component = await client.projectComponents.getComponent({ id: componentId });

    expect(component.id).toBe(componentId);
    expect(component.description).toBe('created by the live suite');
    expect(component.assigneeType).toBe('PROJECT_DEFAULT');
    expect(component.isAssigneeTypeValid).toBe(true);
  });

  it('lists the component among the project components', async () => {
    const all = await client.projectComponents.getProjectComponents({ projectIdOrKey: TEST_PROJECT_KEY });

    expect(all.map(component => component.id)).toContain(componentId);
  });

  it('pages and orders the paginated listing', async () => {
    const page = await client.projectComponents.getProjectComponentsPaginated({
      projectIdOrKey: TEST_PROJECT_KEY,
      maxResults: 1,
      orderBy: 'name',
    });

    expect(page.values?.length).toBeLessThanOrEqual(1);
    expect(page.maxResults).toBe(1);
    expect(typeof page.isLast).toBe('boolean');
  });

  it('changes the description on update', async () => {
    await client.projectComponents.updateComponent({ id: componentId, body: { description: 'edited' } });

    const component = await client.projectComponents.getComponent({ id: componentId });

    expect(component.description).toBe('edited');
    expect(component.name).toBe(name);
  });

  it('counts the issues attached to it', async () => {
    issue = await createTestIssue(client, tracker);

    await client.issues.editIssue({ issueIdOrKey: issue.key, fields: { components: [{ id: componentId }] } });

    const related = await client.projectComponents.getComponentRelatedIssues({ id: componentId });

    expect(related.issueCount).toBe(1);
  });

  it('finds the component through the cross-project search', async () => {
    const found = await client.projectComponents.findComponentsForProjects({
      projectIdsOrKeys: [TEST_PROJECT_KEY],
      query: name,
    });

    expect(found.values?.map(component => component.id)).toContain(componentId);
  });

  it('rejects a component whose name collides with an existing one', async () => {
    const error = await client.projectComponents
      .createComponent({ name, project: TEST_PROJECT_KEY })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBe(400);
  });

  it('leaves the attached issue intact when the component is deleted', async () => {
    await client.projectComponents.deleteComponent({ id: componentId });

    const error = await client.projectComponents.getComponent({ id: componentId }).catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);

    const fetched = await client.issues.getIssue({ issueIdOrKey: issue.key, fields: ['components'] });

    expect((fetched.fields as { components?: unknown[] }).components).toEqual([]);
  });

  it('surfaces an unknown component as a typed NotFoundError', async () => {
    const error = await client.projectComponents.getComponent({ id: '99999999' }).catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);
  });
});
