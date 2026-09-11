import type { z } from 'zod';
import { apiObject } from '#/core';

export const UserPickerResultsSchema = apiObject({});

export type UserPickerResults = z.infer<typeof UserPickerResultsSchema>;
