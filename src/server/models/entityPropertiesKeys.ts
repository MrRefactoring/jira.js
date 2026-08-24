import { z } from 'zod';
import { apiObject } from '#/core';
import { EntityPropertyKeySchema } from './entityPropertyKey';

export const EntityPropertiesKeysSchema = apiObject({
  keys: z.array(EntityPropertyKeySchema).optional(),
});

export type EntityPropertiesKeys = z.infer<typeof EntityPropertiesKeysSchema>;
