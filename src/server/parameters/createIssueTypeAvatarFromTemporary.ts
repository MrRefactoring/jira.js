import { z } from 'zod';
import { AvatarCroppingSchema } from '../models';

export const CreateIssueTypeAvatarFromTemporarySchema = z.object(AvatarCroppingSchema.shape).extend({
  /** The issue type id. */
  id: z.string(),
});

export type CreateIssueTypeAvatarFromTemporary = z.input<typeof CreateIssueTypeAvatarFromTemporarySchema>;
