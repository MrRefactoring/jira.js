import { z } from 'zod';
import { apiObject } from '#/core';

export const AccountCharacteristicsSchema = apiObject({
  not_mentionable: z.boolean().optional(),
});

export type AccountCharacteristics = z.infer<typeof AccountCharacteristicsSchema>;
