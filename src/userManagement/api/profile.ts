import { GetProfileSchema, type GetProfile } from '../models/getProfile';
import { UpdateProfileSchema, type UpdateProfile } from '../models/updateProfile';
import type { GetProfile as GetProfileParameters } from '../parameters/getProfile';
import type { UpdateProfile as UpdateProfileParameters } from '../parameters/updateProfile';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/** Returns information about a single Atlassian account by ID */
export async function getProfile(
  client: Client,
  parameters: GetProfileParameters,
  options?: RequestOptions,
): Promise<GetProfile> {
  const config: SendRequestOptions<GetProfile> = {
    url: `/users/${parameters.accountId}/manage/profile`,
    method: 'GET',
    schema: GetProfileSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Updates fields in a user account. The `profile.write` privilege details which fields you can change. */
export async function updateProfile(
  client: Client,
  parameters: UpdateProfileParameters,
  options?: RequestOptions,
): Promise<UpdateProfile> {
  const config: SendRequestOptions<UpdateProfile> = {
    url: `/users/${parameters.accountId}/manage/profile`,
    method: 'PATCH',
    schema: UpdateProfileSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
