import { z } from 'zod';
import { RemoteEntityLinkJsonSchema } from '../models';

export const CreateOrUpdateRemoteVersionLinkByGlobalIdSchema = z.object(RemoteEntityLinkJsonSchema.shape).extend({
  /** ID of the version. */
  versionId: z.string(),
  /** The id of the remote issue link to be created or updated. */
  globalId: z.string(),
});

export type CreateOrUpdateRemoteVersionLinkByGlobalId = z.input<typeof CreateOrUpdateRemoteVersionLinkByGlobalIdSchema>;
