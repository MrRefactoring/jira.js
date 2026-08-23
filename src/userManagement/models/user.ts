import type { z } from 'zod';
import { apiObject } from '#/core';
import { AccountIdSchema } from './accountId';
import { AccountTypeSchema } from './accountType';
import { AccountStatusSchema } from './accountStatus';
import { NameSchema } from './name';
import { AvatarSchema } from './avatar';
import { EmailSchema } from './email';
import { AccountCharacteristicsSchema } from './accountCharacteristics';

export const UserSchema = apiObject({
  account_id: AccountIdSchema,
  account_type: AccountTypeSchema,
  account_status: AccountStatusSchema,
  name: NameSchema,
  picture: AvatarSchema,
  email: EmailSchema.optional(),
  characteristics: AccountCharacteristicsSchema.optional(),
});

export type User = z.infer<typeof UserSchema>;
