import type { z } from 'zod';
import { apiObject } from '#/core';

export const ListWrapperCallbackGroupJsonSchema = apiObject({});

export type ListWrapperCallbackGroupJson = z.infer<typeof ListWrapperCallbackGroupJsonSchema>;
