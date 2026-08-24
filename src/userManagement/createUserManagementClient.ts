import { type ClientConfig, type RequestOptions, createClient } from '#/core';
import type { AuthBearer } from '#/core';
import * as manage from './api/manage';
import * as profile from './api/profile';
import * as email from './api/email';
import * as apiTokens from './api/apiTokens';
import * as lifecycle from './api/lifecycle';
import type {
  GetManagementPermissions,
  GetProfile,
  UpdateProfile,
  SetEmail,
  GetApiTokens,
  DeleteApiToken,
  DeactivateUser,
  ActivateUser,
  DeleteAccount,
  CancelAccountDeletion,
} from './parameters';
import type {
  GetManagementPermissions as GetManagementPermissionsModel,
  GetProfile as GetProfileModel,
  UpdateProfile as UpdateProfileModel,
  ApiTokenModel,
} from './models';

const ATLASSIAN_GATEWAY = 'https://api.atlassian.com';

export type UserManagementClientConfig = Omit<ClientConfig, 'auth' | 'host'> & {
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

export function createUserManagementClient(config: UserManagementClientConfig) {
  const client = createClient({ ...config, host: config.host ?? ATLASSIAN_GATEWAY });

  return {
    manage: {
      getManagementPermissions: (
        parameters: GetManagementPermissions,
        options?: RequestOptions,
      ): Promise<GetManagementPermissionsModel> => manage.getManagementPermissions(client, parameters, options),
    },
    profile: {
      getProfile: (parameters: GetProfile, options?: RequestOptions): Promise<GetProfileModel> =>
        profile.getProfile(client, parameters, options),
      updateProfile: (parameters: UpdateProfile, options?: RequestOptions): Promise<UpdateProfileModel> =>
        profile.updateProfile(client, parameters, options),
    },
    email: {
      setEmail: (parameters: SetEmail, options?: RequestOptions): Promise<void> =>
        email.setEmail(client, parameters, options),
    },
    apiTokens: {
      getApiTokens: (parameters: GetApiTokens, options?: RequestOptions): Promise<ApiTokenModel[]> =>
        apiTokens.getApiTokens(client, parameters, options),
      deleteApiToken: (parameters: DeleteApiToken, options?: RequestOptions): Promise<void> =>
        apiTokens.deleteApiToken(client, parameters, options),
    },
    lifecycle: {
      deactivateUser: (parameters: DeactivateUser, options?: RequestOptions): Promise<void> =>
        lifecycle.deactivateUser(client, parameters, options),
      activateUser: (parameters: ActivateUser, options?: RequestOptions): Promise<void> =>
        lifecycle.activateUser(client, parameters, options),
      deleteAccount: (parameters: DeleteAccount, options?: RequestOptions): Promise<void> =>
        lifecycle.deleteAccount(client, parameters, options),
      cancelAccountDeletion: (parameters: CancelAccountDeletion, options?: RequestOptions): Promise<void> =>
        lifecycle.cancelAccountDeletion(client, parameters, options),
    },
  };
}

export type UserManagementClient = ReturnType<typeof createUserManagementClient>;
