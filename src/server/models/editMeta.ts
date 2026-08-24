import type { z } from 'zod';
import { apiObject } from '#/core';

export const EditMetaSchema = apiObject({});

export type EditMeta = z.infer<typeof EditMetaSchema>;
