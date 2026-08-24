import { z } from 'zod';
import { apiObject } from '#/core';
import { LinkGroupSchema } from './linkGroup';

export const OpsbarSchema = apiObject({
  linkGroups: z.array(LinkGroupSchema).optional(),
});

export type Opsbar = z.infer<typeof OpsbarSchema>;
