import { z } from 'zod';
import { apiObject } from '#/core';
import { OptionStringSchema } from './optionString';

export const GrantToPermissionInputSchema = apiObject({
  securityType: z.string().optional(),
  value: OptionStringSchema.optional(),
});

export type GrantToPermissionInput = z.infer<typeof GrantToPermissionInputSchema>;
