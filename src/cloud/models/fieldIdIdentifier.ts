import type { z } from 'zod';
import { apiObject } from '#/core';

export const FieldIdIdentifierSchema = apiObject({});

export type FieldIdIdentifier = z.infer<typeof FieldIdIdentifierSchema>;
