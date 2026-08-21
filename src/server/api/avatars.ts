import { AvatarSchema, type Avatar } from '../models/avatar';
import { GetAvatarsSchema, type GetAvatars } from '../models/getAvatars';
import { AvatarCroppingSchema, type AvatarCropping } from '../models/avatarCropping';
import type { GetAllSystemAvatars } from '../parameters/getAllSystemAvatars';
import type { GetAvatars as GetAvatarsParameters } from '../parameters/getAvatars';
import type { CreateAvatarFromTemporary } from '../parameters/createAvatarFromTemporary';
import type { DeleteAvatar } from '../parameters/deleteAvatar';
import type { StoreTemporaryAvatarUsingMultiPart } from '../parameters/storeTemporaryAvatarUsingMultiPart';
import { type Client, type SendRequestOptions, toFormDataFile } from '#/core';

/** Returns all system avatars of the given type. */
export async function getAllSystemAvatars(client: Client, parameters: GetAllSystemAvatars): Promise<Avatar> {
  const config: SendRequestOptions<Avatar> = {
    url: `/rest/api/2/avatar/${parameters.type}/system`,
    method: 'GET',
    schema: AvatarSchema,
  };

  return await client.sendRequest(config);
}

/** Returns a list of all avatars */
export async function getAvatars(client: Client, parameters: GetAvatarsParameters): Promise<GetAvatars> {
  const config: SendRequestOptions<GetAvatars> = {
    url: `/rest/api/2/universal_avatar/type/${parameters.type}/owner/${parameters.owningObjectId}`,
    method: 'GET',
    schema: GetAvatarsSchema,
  };

  return await client.sendRequest(config);
}

/** Creates avatar from temporary */
export async function createAvatarFromTemporary(
  client: Client,
  parameters: CreateAvatarFromTemporary,
): Promise<Avatar> {
  const config: SendRequestOptions<Avatar> = {
    url: `/rest/api/2/universal_avatar/type/${parameters.type}/owner/${parameters.owningObjectId}/avatar`,
    method: 'POST',
    body: {
      cropperOffsetX: parameters.cropperOffsetX,
      cropperOffsetY: parameters.cropperOffsetY,
      cropperWidth: parameters.cropperWidth,
      needsCropping: parameters.needsCropping,
      url: parameters.url,
    },
    schema: AvatarSchema,
  };

  return await client.sendRequest(config);
}

/** Deletes avatar */
export async function deleteAvatar(client: Client, parameters: DeleteAvatar): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/universal_avatar/type/${parameters.type}/owner/${parameters.owningObjectId}/avatar/${parameters.id}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/** Creates temporary avatar */
export async function storeTemporaryAvatarUsingMultiPart(
  client: Client,
  parameters: StoreTemporaryAvatarUsingMultiPart,
): Promise<AvatarCropping> {
  const formData = new FormData();
  const items = Array.isArray(parameters.avatar) ? parameters.avatar : [parameters.avatar];

  for (const attachment of items) {
    formData.append('avatar', await toFormDataFile(attachment), attachment.filename);
  }

  const config: SendRequestOptions<AvatarCropping> = {
    url: `/rest/api/2/universal_avatar/type/${parameters.type}/owner/${parameters.owningObjectId}/temp`,
    method: 'POST',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    body: formData,
    schema: AvatarCroppingSchema,
  };

  return await client.sendRequest(config);
}
