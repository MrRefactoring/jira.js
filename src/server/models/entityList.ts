import { z } from 'zod';
import { apiObject } from '#/core';
import { EntityRefSchema } from './entityRef';

export const EntityListSchema = apiObject({
  entities: z.array(EntityRefSchema).optional(),
});

export type EntityList = z.infer<typeof EntityListSchema>;
