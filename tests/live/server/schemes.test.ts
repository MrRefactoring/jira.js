/**
 * The configuration half of Jira: issue types, link types, screens, and the four kinds of scheme.
 *
 * These are the endpoints a self-hosted administrator reaches for and a Cloud one cannot have, and they are also the
 * least exercised part of the Data Center document — most of them answer with a body it does not describe. Everything
 * created here is deleted again, so the instance is left as the other suites expect to find it.
 */
import { describe, expect, inject, it } from 'vitest';
import type { ServerClient } from '#/server/createServerClient';
import { connect } from './setup/client';
import { touch } from './setup/touch';
import { testName } from '../helpers/naming';

describe('schemes and screens', () => {
  const jira: ServerClient = connect();
  const fixtures = inject('serverFixtures');

  it('keeps an issue type', async () => {
    const issueType = await jira.issueTypes.createIssueType({
      name: testName('type').slice(0, 60),
      description: 'created by the suite',
      type: 'standard',
    });

    expect(issueType.id).toBeDefined();

    await jira.issueTypes.updateIssueType({ id: issueType.id!, description: 'changed by the suite' });

    const read = await jira.issueTypes.getIssueType({ id: issueType.id! });

    expect(read.description).toBe('changed by the suite');

    const alternatives = await jira.issueTypes.getAlternativeIssueTypes({ id: issueType.id! });

    expect(Array.isArray(alternatives)).toBe(true);

    await jira.issueTypes.setIssueTypeProperty({
      issueTypeId: issueType.id!,
      propertyKey: 'suite',
      body: { written: true },
    });

    const property = await jira.issueTypes.getIssueTypeProperty({ issueTypeId: issueType.id!, propertyKey: 'suite' });

    expect(property.value).toEqual({ written: true });

    await jira.issueTypes.deleteIssueTypeProperty({ issueTypeId: issueType.id!, propertyKey: 'suite' });
    await jira.issueTypes.deleteIssueType({ id: issueType.id! });
  });

  it('keeps an issue link type', async () => {
    const linkType = await jira.issueLinkTypes.createIssueLinkType({
      name: testName('link'),
      inward: 'is blocked by',
      outward: 'blocks',
    });

    expect(linkType.id).toBeDefined();

    await jira.issueLinkTypes.updateIssueLinkType({
      issueLinkTypeId: linkType.id!,
      name: testName('link2'),
      inward: 'depends on',
      outward: 'is depended on by',
    });

    const read = await jira.issueLinkTypes.getIssueLinkType({ issueLinkTypeId: linkType.id! });

    expect(read.inward).toBe('depends on');

    await touch(() => jira.issueLinkTypes.moveIssueLinkType({ issueLinkTypeId: linkType.id!, newPosition: 0 }));
    await touch(() => jira.issueLinkTypes.resetOrder({}));
    await jira.issueLinkTypes.deleteIssueLinkType({ issueLinkTypeId: linkType.id! });
  });

  it('keeps an issue type scheme and its project associations', async () => {
    const types = await jira.issueTypes.getIssueAllTypes();
    const standard = types.find(type => type.subtask === false) ?? types[0]!;

    const scheme = await jira.issueTypeSchemes.createIssueTypeScheme({
      name: testName('its'),
      description: 'created by the suite',
      defaultIssueTypeId: String(standard.id),
      issueTypeIds: [String(standard.id)],
    });

    expect(scheme.id).toBeDefined();

    await jira.issueTypeSchemes.updateIssueTypeScheme({
      schemeId: String(scheme.id),
      name: testName('its2'),
      issueTypeIds: [String(standard.id)],
    });

    const read = await jira.issueTypeSchemes.getIssueTypeScheme({ schemeId: String(scheme.id) });

    expect(read.id).toBe(scheme.id);

    await touch(() =>
      jira.issueTypeSchemes.addProjectAssociationsToScheme({ schemeId: String(scheme.id), idsOrKeys: [] }));
    await touch(() =>
      jira.issueTypeSchemes.setProjectAssociationsForScheme({ schemeId: String(scheme.id), idsOrKeys: [] }));
    await touch(() => jira.issueTypeSchemes.removeProjectAssociation({ schemeId: String(scheme.id), projIdOrKey: 'JJS' }));
    await touch(() => jira.issueTypeSchemes.removeAllProjectAssociations({ schemeId: String(scheme.id) }));
    await jira.issueTypeSchemes.deleteIssueTypeScheme({ schemeId: String(scheme.id) });
  });

  it('keeps a permission scheme and a grant in it', async () => {
    const scheme = await jira.permissionSchemes.createPermissionScheme({
      body: { name: testName('perm'), description: 'created by the suite' },
    });

    expect(scheme.id).toBeDefined();

    await jira.permissionSchemes.updatePermissionScheme({
      schemeId: scheme.id!,
      body: { name: testName('perm2'), description: 'changed by the suite' },
    });

    const grant = await jira.permissionSchemes.createPermissionGrant({
      schemeId: scheme.id!,
      permission: 'BROWSE_PROJECTS',
      holder: { type: 'anyone' },
    });

    expect(grant.id).toBeDefined();

    const grants = await jira.permissionSchemes.getPermissionSchemeGrants({ schemeId: scheme.id! });

    expect(grants.permissions?.length).toBeGreaterThan(0);

    await jira.permissionSchemes.setSchemeAttribute({ permissionSchemeId: scheme.id!, key: 'suite', body: 'true' });

    const attribute = await jira.permissionSchemes.getSchemeAttribute({
      permissionSchemeId: scheme.id!,
      attributeKey: 'suite',
    });

    expect(attribute.value).toBe('true');

    await jira.permissionSchemes.deletePermissionSchemeEntity({ schemeId: scheme.id!, permissionId: grant.id! });
    await jira.permissionSchemes.deletePermissionScheme({ schemeId: scheme.id! });
  });

  it('keeps a priority scheme', async () => {
    const priorities = await jira.issuePriorities.getPriorities();

    const scheme = await touch(() =>
      jira.prioritySchemes.createPriorityScheme({
        name: testName('prio'),
        description: 'created by the suite',
        defaultOptionId: priorities[0]!.id,
        optionIds: priorities.map(priority => priority.id!),
      }));

    if (!scheme?.id) return;

    await touch(() =>
      jira.prioritySchemes.updatePriorityScheme({
        schemeId: scheme.id!,
        name: testName('prio2'),
        optionIds: priorities.map(priority => priority.id!),
      }));

    const read = await jira.prioritySchemes.getPriorityScheme({ schemeId: scheme.id! });

    expect(read.id).toBe(scheme.id);

    await jira.prioritySchemes.deletePriorityScheme({ schemeId: scheme.id! });
  });

  it('keeps a workflow scheme, its draft and its mappings', async () => {
    const scheme = await jira.workflowSchemes.createScheme({
      name: testName('wf'),
      description: 'created by the suite',
    });

    expect(scheme.id).toBeDefined();

    const workflows = await jira.workflows.getAllWorkflows();
    const workflow = workflows[0]!.name!;

    await jira.workflowSchemes.updateWorkflowScheme({
      id: scheme.id!,
      body: { name: testName('wf2'), description: 'changed by the suite' },
    });

    await jira.workflowSchemes.updateDefault({ id: scheme.id!, workflow });

    const byId = await jira.workflowSchemes.getById({ id: scheme.id! });

    expect(byId.id).toBe(scheme.id);

    const types = await jira.issueTypes.getIssueAllTypes();
    const issueType = String(types[0]!.id);

    await jira.workflowSchemes.setIssueType({
      id: scheme.id!,
      issueType,
      body: { issueType, workflow, updateDraftIfNeeded: true },
    });

    const mapping = await jira.workflowSchemes.getWorkflowSchemeIssueType({ id: scheme.id!, issueType });

    expect(mapping.workflow).toBe(workflow);

    await jira.workflowSchemes.updateWorkflowMapping({ id: scheme.id!, workflowName: workflow, workflow });

    // Naming a workflow narrows the answer to that one mapping; leaving it out lists them all. The endpoint returns
    // both shapes and the type says so.
    const forWorkflow = await jira.workflowSchemes.getWorkflow({ id: scheme.id!, workflowName: workflow });

    expect(Array.isArray(forWorkflow) ? forWorkflow[0]?.workflow : forWorkflow.workflow).toBe(workflow);

    const allMappings = await jira.workflowSchemes.getWorkflow({ id: scheme.id! });

    expect(Array.isArray(allMappings)).toBe(true);

    await touch(() => jira.workflowSchemes.deleteWorkflowSchemeIssueType({ id: scheme.id!, issueType }));
    await touch(() => jira.workflowSchemes.deleteWorkflowMapping({ id: scheme.id!, workflowName: workflow }));
    await touch(() => jira.workflowSchemes.deleteDefault({ id: scheme.id! }));

    // A draft only exists once the scheme is in use by a project; every one of these is a legitimate refusal on a
    // scheme that is not.
    await touch(() => jira.workflowSchemes.createDraftForParent({ id: scheme.id! }));
    await touch(() => jira.workflowSchemes.getDraftById({ id: scheme.id! }));
    await touch(() => jira.workflowSchemes.updateDraft({ id: scheme.id!, body: { name: testName('wf3') } }));
    await touch(() => jira.workflowSchemes.updateDraftDefault({ id: scheme.id!, workflow }));
    await touch(() => jira.workflowSchemes.getDraftDefault({ id: scheme.id! }));
    await touch(() =>
      jira.workflowSchemes.setDraftIssueType({ id: scheme.id!, issueType, body: { issueType, workflow } }));
    await touch(() => jira.workflowSchemes.getDraftIssueType({ id: scheme.id!, issueType }));
    await touch(() => jira.workflowSchemes.updateDraftWorkflowMapping({ id: scheme.id!, workflowName: workflow, workflow }));
    await touch(() => jira.workflowSchemes.getDraftWorkflow({ id: scheme.id! }));
    await touch(() => jira.workflowSchemes.deleteDraftIssueType({ id: scheme.id!, issueType }));
    await touch(() => jira.workflowSchemes.deleteDraftWorkflowMapping({ id: scheme.id!, workflowName: workflow }));
    await touch(() => jira.workflowSchemes.deleteDraftDefault({ id: scheme.id! }));
    await touch(() => jira.workflowSchemes.deleteDraftById({ id: scheme.id! }));

    await jira.workflowSchemes.deleteScheme({ id: scheme.id! });
  });

  it('adds a tab to a screen and takes it away', async () => {
    const screens = await jira.screens.getAllScreens();
    const screenId = Number(screens[0]?.id ?? 1);

    const tab = await jira.screens.addTab({ screenId, name: testName('tab').slice(0, 30) });

    expect(tab.id).toBeDefined();

    await jira.screens.renameTab({ screenId, tabId: tab.id!, name: testName('tab2').slice(0, 30) });
    await touch(() => jira.screens.moveTab({ screenId, tabId: tab.id!, pos: 0 }));

    const available = await jira.screens.getFieldsToAdd({ screenId });
    const field = available[0];

    if (field?.id) {
      await touch(() => jira.screens.addField({ screenId, tabId: tab.id!, fieldId: field.id }));
      await touch(() => jira.screens.moveField({ screenId, tabId: tab.id!, id: field.id!, position: 'First' }));
      await touch(() =>
        jira.screens.updateShowWhenEmptyIndicator({ screenId, tabId: tab.id!, id: field.id!, newValue: true }));
      await touch(() => jira.screens.removeField({ screenId, tabId: tab.id!, id: field.id! }));
    }

    await touch(() => jira.screens.addFieldToDefaultScreen({ fieldId: fixtures.customFieldId }));
    await jira.screens.deleteTab({ screenId, tabId: tab.id! });
  });

  it('deletes a custom field in bulk', async () => {
    const field = await jira.issueFields.createCustomField({
      name: testName('bulk field'),
      description: 'created by the suite',
      type: 'com.atlassian.jira.plugin.system.customfieldtypes:textfield',
      searcherKey: 'com.atlassian.jira.plugin.system.customfieldtypes:textsearcher',
    });

    expect(field.id).toBeDefined();

    await touch(() => jira.issueFields.bulkDeleteCustomFields({ ids: field.id! }));
  });
});
