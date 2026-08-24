import { z } from 'zod';
import { RemoteEntityLinkJsonSchema } from '../models';

export const CreateOrUpdateRemoteVersionLinkSchema = z.object(RemoteEntityLinkJsonSchema.shape).extend({
  /** ID of the version. */
  versionId: z.string(),
});

export type CreateOrUpdateRemoteVersionLink = z.input<typeof CreateOrUpdateRemoteVersionLinkSchema>;
