import { type ClientConfig, type RequestOptions, createClient } from '#/core';
import type { AuthBearer } from '#/core';
import * as orgs from './api/orgs';
import * as users from './api/users';
import * as groups from './api/groups';
import * as directory from './api/directory';
import * as domains from './api/domains';
import * as events from './api/events';
import * as policies from './api/policies';
import * as workspaces from './api/workspaces';
import type {
  GetOrgs,
  GetOrgById,
  SearchDirectoryUsers,
  GetUsers,
  InviteUsers,
  GetUserRoleAssignments,
  GrantUserAccess,
  RevokeUserAccess,
  SuspendDirectoryUser,
  RestoreDirectoryUser,
  GetDirectoryUserDetails,
  RemoveDirectoryUser,
  AssignOrganizationRole,
  RevokeOrganizationRole,
  GetDirectoryUsersCount,
  GetUserStats,
  GetUserLastActiveDates,
  GetDirectoryUsers,
  SearchDirectoryGroups,
  GetGroupRoleAssignments,
  GrantGroupAccess,
  RevokeGroupAccess,
  AddUserToGroup,
  RemoveUserFromGroup,
  GetGroup,
  DeleteGroup,
  GetGroupsCount,
  GetGroupsStats,
  GetGroups,
  CreateGroup,
  GetDirectoriesForOrg,
  GetDomains,
  GetDomainById,
  GetEvents,
  PollEvents,
  GetEventById,
  GetEventActions,
  GetPolicies,
  CreatePolicy,
  GetPolicyById,
  UpdatePolicy,
  DeletePolicy,
  AddResourceToPolicy,
  UpdatePolicyResource,
  DeletePolicyResource,
  ValidatePolicy,
  QueryWorkspaces,
} from './parameters';
import type {
  OrgPage,
  Org,
  MultiDirectoryUserSearchPage,
  UserPage,
  MultidirectoryInviteSuccessResponse,
  MultiDirectoryUserRoleAssignmentPage,
  MultiDirectoryUserDetails,
  GetDirectoryUsersCount as GetDirectoryUsersCountModel,
  MultiDirectoryUserStats,
  UserProductAccessActivityPage,
  MultiDirectoryUserPage,
  MultiDirectoryGroupSearchPage,
  MultiDirectoryGroupRoleAssignmentPage,
  MultiDirectoryGroupDetails,
  GetGroupsCount as GetGroupsCountModel,
  MultiDirectoryGroupStats,
  MultiDirectoryGroupPage,
  MultiDirectoryUserDirectoryPage,
  DomainPage,
  Domain,
  EventPage,
  PollingEventPage,
  Event,
  EventActions,
  PolicyPage,
  Policy,
  PageDataResponseV2,
} from './models';

const ATLASSIAN_GATEWAY = 'https://api.atlassian.com';

export type AdminClientConfig = Omit<ClientConfig, 'auth' | 'host'> & {
  /**
   * An organization API key, created under Settings in the organization's own administration.
   *
   * Nothing else reaches this API. A site API token answers 401 — measured — and so does OAuth 2.0 (3LO), whose scopes
   * are granted by a user for a site rather than by an organization for itself.
   */
  auth: AuthBearer;

  /**
   * The Atlassian gateway, which is where this API answers rather than on any site's host.
   *
   * Defaults to `https://api.atlassian.com`. There is nowhere else to point it; the field exists for a proxy.
   */
  host?: string;
};

export function createAdminClient(config: AdminClientConfig) {
  const client = createClient({ ...config, host: config.host ?? ATLASSIAN_GATEWAY });

  return {
    orgs: {
      getOrgs: (parameters?: GetOrgs, options?: RequestOptions): Promise<OrgPage> =>
        orgs.getOrgs(client, parameters, options),
      getOrgById: (parameters: GetOrgById, options?: RequestOptions): Promise<Org> =>
        orgs.getOrgById(client, parameters, options),
    },
    users: {
      searchDirectoryUsers: (
        parameters: SearchDirectoryUsers,
        options?: RequestOptions,
      ): Promise<MultiDirectoryUserSearchPage> => users.searchDirectoryUsers(client, parameters, options),
      getUsers: (parameters: GetUsers, options?: RequestOptions): Promise<UserPage> =>
        users.getUsers(client, parameters, options),
      inviteUsers: (parameters: InviteUsers, options?: RequestOptions): Promise<MultidirectoryInviteSuccessResponse> =>
        users.inviteUsers(client, parameters, options),
      getUserRoleAssignments: (
        parameters: GetUserRoleAssignments,
        options?: RequestOptions,
      ): Promise<MultiDirectoryUserRoleAssignmentPage> => users.getUserRoleAssignments(client, parameters, options),
      grantUserAccess: (parameters: GrantUserAccess, options?: RequestOptions): Promise<void> =>
        users.grantUserAccess(client, parameters, options),
      revokeUserAccess: (parameters: RevokeUserAccess, options?: RequestOptions): Promise<void> =>
        users.revokeUserAccess(client, parameters, options),
      suspendDirectoryUser: (parameters: SuspendDirectoryUser, options?: RequestOptions): Promise<void> =>
        users.suspendDirectoryUser(client, parameters, options),
      restoreDirectoryUser: (parameters: RestoreDirectoryUser, options?: RequestOptions): Promise<void> =>
        users.restoreDirectoryUser(client, parameters, options),
      getDirectoryUserDetails: (
        parameters: GetDirectoryUserDetails,
        options?: RequestOptions,
      ): Promise<MultiDirectoryUserDetails> => users.getDirectoryUserDetails(client, parameters, options),
      removeDirectoryUser: (parameters: RemoveDirectoryUser, options?: RequestOptions): Promise<void> =>
        users.removeDirectoryUser(client, parameters, options),
      assignOrganizationRole: (parameters: AssignOrganizationRole, options?: RequestOptions): Promise<void> =>
        users.assignOrganizationRole(client, parameters, options),
      revokeOrganizationRole: (parameters: RevokeOrganizationRole, options?: RequestOptions): Promise<void> =>
        users.revokeOrganizationRole(client, parameters, options),
      getDirectoryUsersCount: (
        parameters: GetDirectoryUsersCount,
        options?: RequestOptions,
      ): Promise<GetDirectoryUsersCountModel> => users.getDirectoryUsersCount(client, parameters, options),
      getUserStats: (parameters: GetUserStats, options?: RequestOptions): Promise<MultiDirectoryUserStats> =>
        users.getUserStats(client, parameters, options),
      getUserLastActiveDates: (
        parameters: GetUserLastActiveDates,
        options?: RequestOptions,
      ): Promise<UserProductAccessActivityPage> => users.getUserLastActiveDates(client, parameters, options),
      getDirectoryUsers: (parameters: GetDirectoryUsers, options?: RequestOptions): Promise<MultiDirectoryUserPage> =>
        users.getDirectoryUsers(client, parameters, options),
    },
    groups: {
      searchDirectoryGroups: (
        parameters: SearchDirectoryGroups,
        options?: RequestOptions,
      ): Promise<MultiDirectoryGroupSearchPage> => groups.searchDirectoryGroups(client, parameters, options),
      getGroupRoleAssignments: (
        parameters: GetGroupRoleAssignments,
        options?: RequestOptions,
      ): Promise<MultiDirectoryGroupRoleAssignmentPage> => groups.getGroupRoleAssignments(client, parameters, options),
      grantGroupAccess: (parameters: GrantGroupAccess, options?: RequestOptions): Promise<void> =>
        groups.grantGroupAccess(client, parameters, options),
      revokeGroupAccess: (parameters: RevokeGroupAccess, options?: RequestOptions): Promise<void> =>
        groups.revokeGroupAccess(client, parameters, options),
      addUserToGroup: (parameters: AddUserToGroup, options?: RequestOptions): Promise<void> =>
        groups.addUserToGroup(client, parameters, options),
      removeUserFromGroup: (parameters: RemoveUserFromGroup, options?: RequestOptions): Promise<void> =>
        groups.removeUserFromGroup(client, parameters, options),
      getGroup: (parameters: GetGroup, options?: RequestOptions): Promise<MultiDirectoryGroupDetails> =>
        groups.getGroup(client, parameters, options),
      deleteGroup: (parameters: DeleteGroup, options?: RequestOptions): Promise<void> =>
        groups.deleteGroup(client, parameters, options),
      getGroupsCount: (parameters: GetGroupsCount, options?: RequestOptions): Promise<GetGroupsCountModel> =>
        groups.getGroupsCount(client, parameters, options),
      getGroupsStats: (parameters: GetGroupsStats, options?: RequestOptions): Promise<MultiDirectoryGroupStats> =>
        groups.getGroupsStats(client, parameters, options),
      getGroups: (parameters: GetGroups, options?: RequestOptions): Promise<MultiDirectoryGroupPage> =>
        groups.getGroups(client, parameters, options),
      createGroup: (parameters: CreateGroup, options?: RequestOptions): Promise<void> =>
        groups.createGroup(client, parameters, options),
    },
    directory: {
      getDirectoriesForOrg: (
        parameters: GetDirectoriesForOrg,
        options?: RequestOptions,
      ): Promise<MultiDirectoryUserDirectoryPage> => directory.getDirectoriesForOrg(client, parameters, options),
    },
    domains: {
      getDomains: (parameters: GetDomains, options?: RequestOptions): Promise<DomainPage> =>
        domains.getDomains(client, parameters, options),
      getDomainById: (parameters: GetDomainById, options?: RequestOptions): Promise<Domain> =>
        domains.getDomainById(client, parameters, options),
    },
    events: {
      getEvents: (parameters: GetEvents, options?: RequestOptions): Promise<EventPage> =>
        events.getEvents(client, parameters, options),
      pollEvents: (parameters: PollEvents, options?: RequestOptions): Promise<PollingEventPage> =>
        events.pollEvents(client, parameters, options),
      getEventById: (parameters: GetEventById, options?: RequestOptions): Promise<Event> =>
        events.getEventById(client, parameters, options),
      getEventActions: (parameters: GetEventActions, options?: RequestOptions): Promise<EventActions> =>
        events.getEventActions(client, parameters, options),
    },
    policies: {
      getPolicies: (parameters: GetPolicies, options?: RequestOptions): Promise<PolicyPage> =>
        policies.getPolicies(client, parameters, options),
      createPolicy: (parameters: CreatePolicy, options?: RequestOptions): Promise<Policy> =>
        policies.createPolicy(client, parameters, options),
      getPolicyById: (parameters: GetPolicyById, options?: RequestOptions): Promise<Policy> =>
        policies.getPolicyById(client, parameters, options),
      updatePolicy: (parameters: UpdatePolicy, options?: RequestOptions): Promise<Policy> =>
        policies.updatePolicy(client, parameters, options),
      deletePolicy: (parameters: DeletePolicy, options?: RequestOptions): Promise<void> =>
        policies.deletePolicy(client, parameters, options),
      addResourceToPolicy: (parameters: AddResourceToPolicy, options?: RequestOptions): Promise<Policy> =>
        policies.addResourceToPolicy(client, parameters, options),
      updatePolicyResource: (parameters: UpdatePolicyResource, options?: RequestOptions): Promise<Policy> =>
        policies.updatePolicyResource(client, parameters, options),
      deletePolicyResource: (parameters: DeletePolicyResource, options?: RequestOptions): Promise<void> =>
        policies.deletePolicyResource(client, parameters, options),
      validatePolicy: (parameters: ValidatePolicy, options?: RequestOptions): Promise<void> =>
        policies.validatePolicy(client, parameters, options),
    },
    workspaces: {
      queryWorkspaces: (parameters: QueryWorkspaces, options?: RequestOptions): Promise<PageDataResponseV2> =>
        workspaces.queryWorkspaces(client, parameters, options),
    },
  };
}

export type AdminClient = ReturnType<typeof createAdminClient>;
