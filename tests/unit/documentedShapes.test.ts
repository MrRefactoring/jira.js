import { describe, expect, expectTypeOf, it } from 'vitest';
import type { AssignIssue } from '#/cloud/parameters/assignIssue';
import type { BulkSetIssuePropertiesByIssue } from '#/cloud/parameters/bulkSetIssuePropertiesByIssue';
import type { BulkSetIssuesPropertiesList } from '#/cloud/parameters/bulkSetIssuesPropertiesList';
import { FindUsersWithBrowsePermissionSchema } from '#/cloud/parameters/findUsersWithBrowsePermission';
import type { StatusPayload, TaskProgressJsonNode, User } from '#/cloud/models';
import { UserSchema } from '#/cloud/models';
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

  it('leaves a status project-scoped with scope: null', () => {
    expect(request<StatusPayload>({ name: 'Done', scope: null }).scope).toBeNull();
  });

  it('reads workspace relationships as arrays of administration resources', () => {
    const workspace = WorkspaceModelSchema.parse({
      relationships: {
        policies: [{ id: 'policy', type: 'policies', attributes: { fields: { enabled: true } } }],
      },
    });

    expect(workspace.relationships?.policies).toHaveLength(1);
    expect(() => WorkspaceModelSchema.parse({ relationships: { policies: { id: 'policy' } } })).toThrow();
    expectTypeOf<NonNullable<WorkspaceModel['relationships']>[string]>().toEqualTypeOf<
      Array<PolicyModelV2 | EntitlementModelV2 | FeatureModelV2>
    >();
  });

  it('keeps undocumented Assets invalidity values unknown', () => {
    const source = ImportSourceResponseSchema.parse({
      importStatus: { reasonForInvalidity: { configuration: { missing: true } } },
      importSourceOTEntries: [{ importStatus: { reasonForInvalidity: { selector: false } } }],
    });

    expect(source.importStatus?.reasonForInvalidity?.configuration).toEqual({ missing: true });
    expect(source.importSourceOTEntries?.[0]?.importStatus?.reasonForInvalidity?.selector).toBe(false);
    expectTypeOf(source.importStatus?.reasonForInvalidity).toEqualTypeOf<Record<string, unknown> | null | undefined>();
  });

  it('counts astral characters as Unicode code points at string-length boundaries', () => {
    expect(FindUsersWithBrowsePermissionSchema.safeParse({ accountId: '😀'.repeat(128) }).success).toBe(true);
    expect(FindUsersWithBrowsePermissionSchema.safeParse({ accountId: '😀'.repeat(129) }).success).toBe(false);
  });
});
