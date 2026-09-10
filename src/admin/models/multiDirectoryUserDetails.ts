import type { z } from 'zod';
import { apiObject } from '#/core';
import { MultiDirectoryUserDetailsDataSchema } from './multiDirectoryUserDetailsData';

export const MultiDirectoryUserDetailsSchema = apiObject({
  data: MultiDirectoryUserDetailsDataSchema.optional(),
});

export type MultiDirectoryUserDetails = z.infer<typeof MultiDirectoryUserDetailsSchema>;
