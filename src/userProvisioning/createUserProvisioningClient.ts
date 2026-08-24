import { type ClientConfig, type RequestOptions, createClient } from '#/core';
import type { AuthBearer } from '#/core';
import * as groups from './api/groups';
import * as schemas from './api/schemas';
import * as serviceProviderConfiguration from './api/serviceProviderConfiguration';
import * as users from './api/users';
import * as scimLinks from './api/scimLinks';
import type {
  GetGroup,
  ReplaceGroup,
  DeleteGroup,
  PatchGroup,
  GetGroups,
  CreateGroup,
  GetSchemas,
  GetUserSchemas,
  GetGroupSchemas,
  GetExtensionUserSchemas,
  GetResourceTypes,
  GetUserResourceType,
  GetGroupResourceType,
  GetServiceProviderConfig,
  GetUser,
  ReplaceUser,
  DeleteUser,
  PatchUser,
  GetUsers,
  CreateUser,
  GetScimLinks,
  GetScimLinksByEmail,
  UnlinkScimUser,
  DeleteProvisioningRecord,
} from './parameters';
import type {
  ScimGroup,
  ScimGroupListResponse,
  ScimUser,
  ScimUserListResponse,
  GetScimLinksForAaIdInAnOrgResponse,
  GetScimLinksForEmailResponse,
} from './models';

const ATLASSIAN_GATEWAY = 'https://api.atlassian.com';

export type UserProvisioningClientConfig = Omit<ClientConfig, 'auth' | 'host'> & {
  /**
   * The API key of the SCIM directory this client provisions into, taken from its identity provider configuration.
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

export function createUserProvisioningClient(config: UserProvisioningClientConfig) {
  const client = createClient({ ...config, host: config.host ?? ATLASSIAN_GATEWAY });

  return {
    groups: {
      getGroup: (parameters: GetGroup, options?: RequestOptions): Promise<ScimGroup> =>
        groups.getGroup(client, parameters, options),
      replaceGroup: (parameters: ReplaceGroup, options?: RequestOptions): Promise<ScimGroup> =>
        groups.replaceGroup(client, parameters, options),
      deleteGroup: (parameters: DeleteGroup, options?: RequestOptions): Promise<void> =>
        groups.deleteGroup(client, parameters, options),
      patchGroup: (parameters: PatchGroup, options?: RequestOptions): Promise<ScimGroup> =>
        groups.patchGroup(client, parameters, options),
      getGroups: (parameters: GetGroups, options?: RequestOptions): Promise<ScimGroupListResponse> =>
        groups.getGroups(client, parameters, options),
      createGroup: (parameters: CreateGroup, options?: RequestOptions): Promise<ScimGroup> =>
        groups.createGroup(client, parameters, options),
    },
    schemas: {
      getSchemas: (parameters: GetSchemas, options?: RequestOptions): Promise<string> =>
        schemas.getSchemas(client, parameters, options),
      getUserSchemas: (parameters: GetUserSchemas, options?: RequestOptions): Promise<string> =>
        schemas.getUserSchemas(client, parameters, options),
      getGroupSchemas: (parameters: GetGroupSchemas, options?: RequestOptions): Promise<string> =>
        schemas.getGroupSchemas(client, parameters, options),
      getExtensionUserSchemas: (parameters: GetExtensionUserSchemas, options?: RequestOptions): Promise<string> =>
        schemas.getExtensionUserSchemas(client, parameters, options),
    },
    serviceProviderConfiguration: {
      getResourceTypes: (parameters: GetResourceTypes, options?: RequestOptions): Promise<string> =>
        serviceProviderConfiguration.getResourceTypes(client, parameters, options),
      getUserResourceType: (parameters: GetUserResourceType, options?: RequestOptions): Promise<string> =>
        serviceProviderConfiguration.getUserResourceType(client, parameters, options),
      getGroupResourceType: (parameters: GetGroupResourceType, options?: RequestOptions): Promise<string> =>
        serviceProviderConfiguration.getGroupResourceType(client, parameters, options),
      getServiceProviderConfig: (parameters: GetServiceProviderConfig, options?: RequestOptions): Promise<string> =>
        serviceProviderConfiguration.getServiceProviderConfig(client, parameters, options),
    },
    users: {
      getUser: (parameters: GetUser, options?: RequestOptions): Promise<ScimUser> =>
        users.getUser(client, parameters, options),
      replaceUser: (parameters: ReplaceUser, options?: RequestOptions): Promise<ScimUser> =>
        users.replaceUser(client, parameters, options),
      deleteUser: (parameters: DeleteUser, options?: RequestOptions): Promise<void> =>
        users.deleteUser(client, parameters, options),
      patchUser: (parameters: PatchUser, options?: RequestOptions): Promise<ScimUser> =>
        users.patchUser(client, parameters, options),
      getUsers: (parameters: GetUsers, options?: RequestOptions): Promise<ScimUserListResponse> =>
        users.getUsers(client, parameters, options),
      createUser: (parameters: CreateUser, options?: RequestOptions): Promise<ScimUser> =>
        users.createUser(client, parameters, options),
    },
    scimLinks: {
      getScimLinks: (parameters: GetScimLinks, options?: RequestOptions): Promise<GetScimLinksForAaIdInAnOrgResponse> =>
        scimLinks.getScimLinks(client, parameters, options),
      getScimLinksByEmail: (
        parameters: GetScimLinksByEmail,
        options?: RequestOptions,
      ): Promise<GetScimLinksForEmailResponse> => scimLinks.getScimLinksByEmail(client, parameters, options),
      unlinkScimUser: (parameters: UnlinkScimUser, options?: RequestOptions): Promise<void> =>
        scimLinks.unlinkScimUser(client, parameters, options),
      deleteProvisioningRecord: (parameters: DeleteProvisioningRecord, options?: RequestOptions): Promise<void> =>
        scimLinks.deleteProvisioningRecord(client, parameters, options),
    },
  };
}

export type UserProvisioningClient = ReturnType<typeof createUserProvisioningClient>;
