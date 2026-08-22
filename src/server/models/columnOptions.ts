import type { z } from 'zod';
import { apiObject } from '#/core';

export const ColumnOptionsSchema = apiObject({});

export type ColumnOptions = z.infer<typeof ColumnOptionsSchema>;
