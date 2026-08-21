import type { z } from 'zod';
import { apiObject } from '#/core';

export const TypeParameterSchema = apiObject({});

export type TypeParameter = z.infer<typeof TypeParameterSchema>;
