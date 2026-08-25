/**
 * Projects and everything hung off one: categories, roles, components, versions and avatars.
 *
 * The suite creates a project of its own and deletes it at the end, because half of what is under test here changes
 * the project itself — its type, its permission scheme, its actors — and the fixture project is what the crawl and
 * every other suite read.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { ServerClient } from '#/server/createServerClient';
import { connect } from './setup/client';
import { serverTestEnv } from './setup/env';
import { touch } from './setup/touch';
import { projectKey as newProjectKey, testName } from '../helpers/naming';

describe('projects', () => {
  const { username } = serverTestEnv();
  const jira: ServerClient = connect();
  const key = newProjectKey('P');

  let versionId: string;
  let componentId: string;

  beforeAll(async () => {
    await jira.projects.createProject({
      key,
      name: testName('projects suite'),
      lead: username,
      projectTypeKey: 'business',
      projectTemplateKey: 'com.atlassian.jira-core-project-templates:jira-core-project-management',
    });
  });

  afterAll(async () => {
    await touch(() => jira.projects.deleteProject({ projectIdOrKey: key }));
  });

  it('reads the project it created, and what belongs to it', async () => {
    const project = await jira.projects.getProject({ projectIdOrKey: key });

    expect(project.key).toBe(key);

    const statuses = await jira.projects.getAllStatuses({ projectIdOrKey: key });

    expect(statuses.length).toBeGreaterThan(0);

    const roles = await jira.projects.getProjectRoles({ projectIdOrKey: key });

    expect(Object.keys(roles).length).toBeGreaterThan(0);
  });

  it('updates the project and its type', async () => {
    const name = testName('renamed project');

    await jira.projects.updateProject({ projectIdOrKey: key, name, description: 'changed by the suite' });

    const project = await jira.projects.getProject({ projectIdOrKey: key });

    expect(project.name).toBe(name);

    await touch(() => jira.projects.updateProjectType({ projectIdOrKey: key, newProjectTypeKey: 'software' }));
  });

  it('assigns the schemes a project can hold', async () => {
    const permissionSchemes = await jira.permissionSchemes.getPermissionSchemes();
    const scheme = permissionSchemes.permissionSchemes?.[0];

    expect(scheme?.id).toBeDefined();

    await jira.projects.assignPermissionScheme({ projectKeyOrId: key, id: scheme!.id });

    const assigned = await jira.projects.getAssignedPermissionScheme({ projectKeyOrId: key });

    expect(assigned.id).toBe(scheme!.id);

    const prioritySchemes = await jira.prioritySchemes.getPrioritySchemes();
    const priorityScheme = prioritySchemes.schemes?.[0];

    if (priorityScheme?.id !== undefined) {
      await touch(() => jira.projects.assignPriorityScheme({ projectKeyOrId: key, id: priorityScheme.id }));
      await touch(() => jira.projects.unassignPriorityScheme({ projectKeyOrId: key, schemeId: priorityScheme.id! }));
    }
  });

  it('stores a property on the project', async () => {
    await jira.projects.setProjectProperty({ projectIdOrKey: key, propertyKey: 'suite', body: { written: true } });

    const property = await jira.projects.getProjectProperty({ projectIdOrKey: key, propertyKey: 'suite' });

    expect(property.value).toEqual({ written: true });

    await jira.projects.deleteProjectProperty({ projectIdOrKey: key, propertyKey: 'suite' });
  });

  it('puts actors in a role and takes them out', async () => {
    const roles = await jira.projects.getProjectRoles({ projectIdOrKey: key });
    const roleId = Number(Object.values(roles)[0]?.toString().split('/').pop());

    expect(Number.isNaN(roleId)).toBe(false);

    await touch(() => jira.projects.addActorUsers({ projectIdOrKey: key, id: roleId, user: [username] }));
    await touch(() =>
      jira.projects.setActors({
        projectIdOrKey: key,
        id: roleId,
        body: { categorisedActors: { 'atlassian-user-role-actor': [username] } },
      }));

    const actors = await jira.projects.getProjectRole({ projectIdOrKey: key, id: roleId });

    expect(actors.id).toBe(roleId);

    await touch(() => jira.projects.deleteActor({ projectIdOrKey: key, id: roleId, user: username }));
  });

  it('keeps a category', async () => {
    const category = await jira.projectCategories.createProjectCategory({
      name: testName('category'),
      description: 'created by the suite',
    });

    expect(category.id).toBeDefined();

    await jira.projectCategories.updateProjectCategory({
      id: Number(category.id),
      body: { name: testName('renamed category') },
    });

    const read = await jira.projectCategories.getProjectCategoryById({ id: Number(category.id) });

    expect(read.id).toBe(category.id);

    await jira.projectCategories.removeProjectCategory({ id: Number(category.id) });
  });

  it('keeps a component', async () => {
    const component = await jira.projectComponents.createComponent({
      name: testName('component'),
      project: key,
      description: 'created by the suite',
    });

    componentId = String(component.id);

    await jira.projectComponents.updateComponent({ id: componentId, body: { description: 'changed by the suite' } });

    const read = await jira.projectComponents.getComponent({ id: componentId });

    expect(read.description).toBe('changed by the suite');

    const related = await jira.projectComponents.getComponentRelatedIssues({ id: componentId });

    expect(related.issueCount).toBe(0);

    await jira.projectComponents.deleteComponent({ id: componentId });
  });

  it('keeps a version, moves it and merges it away', async () => {
    const version = await jira.projectVersions.createVersion({ name: testName('v1'), project: key });

    versionId = String(version.id);

    await jira.projectVersions.updateVersion({ id: versionId, body: { description: 'changed by the suite' } });

    const read = await jira.projectVersions.getVersion({ id: versionId });

    expect(read.description).toBe('changed by the suite');

    await jira.projectVersions.moveVersion({ id: versionId, position: 'First' });

    const unresolved = await jira.projectVersions.getVersionUnresolvedIssues({ id: versionId });

    expect(unresolved.issuesUnresolvedCount).toBe(0);

    const related = await jira.projectVersions.getVersionRelatedIssues({ id: versionId });

    expect(related.self).toBeDefined();

    const other = await jira.projectVersions.createVersion({ name: testName('v2'), project: key });

    await jira.projectVersions.merge({ id: versionId, moveIssuesTo: String(other.id) });
    await touch(() => jira.projectVersions.deleteVersionAndSwap({ id: String(other.id) }));
  });

  it('keeps remote links on a version', async () => {
    const version = await jira.projectVersions.createVersion({ name: testName('v3'), project: key });

    await jira.projectVersions.createOrUpdateRemoteVersionLink({
      versionId: String(version.id),
      link: 'https://example.com/one',
    });

    await jira.projectVersions.createOrUpdateRemoteVersionLinkByGlobalId({
      versionId: String(version.id),
      globalId: 'suite-version-link',
      link: 'https://example.com/two',
    });

    const links = await jira.projectVersions.getRemoteVersionLinksByVersionId({ versionId: String(version.id) });

    expect(links.links?.length).toBeGreaterThan(0);

    await jira.projectVersions.deleteRemoteVersionLink({
      versionId: String(version.id),
      globalId: 'suite-version-link',
    });

    await jira.projectVersions.deleteRemoteVersionLinksByVersionId({ versionId: String(version.id) });
  });

  it('archives and restores', async () => {
    await touch(() => jira.projects.archiveProject({ projectIdOrKey: key }));
    await touch(() => jira.projects.restoreProject({ projectIdOrKey: key }));
  });

  it('uploads an avatar and puts it back', async () => {
    const png = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
      'base64',
    );

    const temporary = await touch(() =>
      jira.projects.storeTemporaryProjectAvatarUsingMultiPart({
        projectIdOrKey: key,
        avatar: { filename: 'avatar.png', content: png },
      }));

    if (temporary) {
      await touch(() => jira.projects.createProjectAvatarFromTemporary({ projectIdOrKey: key, cropperWidth: 1 }));
    }

    const avatars = await jira.projects.getAllProjectAvatars({ projectIdOrKey: key });

    expect(avatars.system?.length).toBeGreaterThan(0);

    const system = avatars.system?.[0];

    if (system?.id !== undefined) {
      await touch(() => jira.projects.updateProjectAvatar({ projectIdOrKey: key, id: String(system.id) }));
      await touch(() => jira.projects.deleteProjectAvatar({ projectIdOrKey: key, id: Number(system.id) }));
    }
  });

  it('keeps a project role of its own', async () => {
    const role = await jira.projectRoles.createProjectRole({
      name: testName('role'),
      description: 'created by the suite',
    });

    expect(role.id).toBeDefined();

    await jira.projectRoles.partialUpdateProjectRole({ id: role.id!, description: 'changed by the suite' });
    await jira.projectRoles.fullyUpdateProjectRole({
      id: role.id!,
      name: testName('renamed role'),
      description: 'replaced by the suite',
    });

    await touch(() => jira.projectRoles.addProjectRoleActorsToRole({ id: role.id!, user: [username] }));
    await touch(() => jira.projectRoles.deleteProjectRoleActorsFromRole({ id: role.id!, user: username }));
    await jira.projectRoles.deleteProjectRole({ id: role.id! });
  });
});
