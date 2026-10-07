import { describe, expect, expectTypeOf, it } from 'vitest';
import type { AssignIssue } from '#/cloud/parameters/assignIssue';
import type { BulkSetIssuePropertiesByIssue } from '#/cloud/parameters/bulkSetIssuePropertiesByIssue';
import type { BulkSetIssuesPropertiesList } from '#/cloud/parameters/bulkSetIssuesPropertiesList';
import { FindUsersWithBrowsePermissionSchema } from '#/cloud/parameters/findUsersWithBrowsePermission';
import type { StatusPayload, TaskProgressJsonNode, User } from '#/cloud/models';
import { AvatarSchema, UserSchema } from '#/cloud/models';
import type { FormAnswer } from '#/serviceDesk/models';
import {
  WorkspaceModelSchema,
  type WorkspaceModel,
  type PolicyModelV2,
  type EntitlementModelV2,
  type FeatureModelV2,
} from '#/admin/models';
import { ImportSourceResponseSchema } from '#/assets/models';

function request<T>(parameters: T): T {
  return parameters;
}

describe('the shapes Atlassian documents', () => {
  it('writes any JSON value as an issue property, in both bulk writes', () => {
    const list = request<BulkSetIssuesPropertiesList>({
      entitiesIds: [10001],
      properties: { approval: { approved: true }, flag: 'on', count: 3 },
    });
    const byIssue = request<BulkSetIssuePropertiesByIssue>({
      issues: [{ issueID: 10001, properties: { approval: { approved: true }, flag: 'on' } }],
    });

    expect(list.properties?.flag).toBe('on');
    expect(byIssue.issues?.[0]?.properties?.approval).toEqual({ approved: true });
  });

  it('reads a task result and a form answer document as unknown JSON', () => {
    expectTypeOf<TaskProgressJsonNode['result']>().toEqualTypeOf<unknown>();
    expectTypeOf<FormAnswer['adf']>().toEqualTypeOf<unknown>();
  });

  it('unassigns an issue with accountId: null', () => {
    expect(request<AssignIssue>({ issueIdOrKey: 'X-1', accountId: null }).accountId).toBeNull();
  });

  it('reads a hidden email address and locale as null', () => {
    const user = UserSchema.parse({ accountId: 'abc', emailAddress: null, locale: null });

    expectTypeOf<User['emailAddress']>().toEqualTypeOf<string | null | undefined>();
    expect(user.emailAddress).toBeNull();
    expect(user.locale).toBeNull();
  });

  it('reads the relative paths Jira answers with as avatar urls', () => {
    const avatar = AvatarSchema.parse({
      id: '10400',
      isSystemAvatar: true,
      urls: { '16x16': '/secure/viewavatar?size=xsmall&avatarId=10400&avatarType=project' },
    });

    expect(avatar.urls?.['16x16']).toBe('/secure/viewavatar?size=xsmall&avatarId=10400&avatarType=project');
  });

  it('leaves a status project-scoped with scope: null', () => {
    expect(request<StatusPayload>({ name: 'Done', scope: null }).scope).toBeNull();
  });

  it('reads workspace relationships as arrays of the resource their name selects', () => {
    const workspace = WorkspaceModelSchema.parse({
      relationships: {
        policy: [{ id: 'policy', type: 'policies', attributes: { enabled: true } }],
        entitlement: [{ id: 'entitlement', type: 'entitlements', attributes: { key: 'jira-software' } }],
        feature: [{ id: 'feature', type: 'features', attributes: { limit: 5 } }],
      },
    });

    expect(workspace.relationships?.policy).toHaveLength(1);
    expect(workspace.relationships?.entitlement?.[0]?.attributes?.key).toBe('jira-software');
    expect(() => WorkspaceModelSchema.parse({ relationships: { policy: { id: 'policy' } } })).toThrow();
    expectTypeOf<NonNullable<WorkspaceModel['relationships']>['policy']>().toEqualTypeOf<PolicyModelV2[] | undefined>();
    expectTypeOf<NonNullable<WorkspaceModel['relationships']>['entitlement']>().toEqualTypeOf<
      EntitlementModelV2[] | undefined
    >();
    expectTypeOf<NonNullable<WorkspaceModel['relationships']>['feature']>().toEqualTypeOf<
      FeatureModelV2[] | undefined
    >();
  });

  it('keeps undocumented Assets invalidity values permissive', () => {
    const source = ImportSourceResponseSchema.parse({
      importStatus: { reasonForInvalidity: { configuration: { missing: true } } },
      importSourceOTEntries: [{ importStatus: { reasonForInvalidity: { selector: false } } }],
    });

    expect(source.importStatus?.reasonForInvalidity?.configuration).toEqual({ missing: true });
    expect(source.importSourceOTEntries?.[0]?.importStatus?.reasonForInvalidity?.selector).toBe(false);
    expectTypeOf(source.importStatus?.reasonForInvalidity).toEqualTypeOf<
      Record<string, any> | null | undefined
    >();
  });

  it('counts astral characters as Unicode code points at string-length boundaries', () => {
    expect(FindUsersWithBrowsePermissionSchema.safeParse({ accountId: '😀'.repeat(128) }).success).toBe(true);
    expect(FindUsersWithBrowsePermissionSchema.safeParse({ accountId: '😀'.repeat(129) }).success).toBe(false);
  });
});
