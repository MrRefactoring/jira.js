import { z } from 'zod';

export const GetDuplicatedUsersMappingSchema = z.object({
  /** If set to true forces cache flush, user must be sysadmin for this parameter to have an effect. */
  flush: z.boolean().optional(),
});

export type GetDuplicatedUsersMapping = z.input<typeof GetDuplicatedUsersMappingSchema>;
