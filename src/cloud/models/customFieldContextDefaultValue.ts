import type { z } from 'zod';
import { apiObject } from '#/core';

export const CustomFieldContextDefaultValueSchema = apiObject({});

export type CustomFieldContextDefaultValue = z.infer<typeof CustomFieldContextDefaultValueSchema>;
