import { z } from 'zod';
import { apiObject } from '#/core';
import { LinkGroupSchema, type LinkGroup, type LinkGroupInput } from './linkGroup';

export const OpsbarSchema = apiObject({
  linkGroups: z.array(LinkGroupSchema as z.ZodType<LinkGroup, LinkGroupInput>).optional(),
});

export type Opsbar = z.infer<typeof OpsbarSchema>;
