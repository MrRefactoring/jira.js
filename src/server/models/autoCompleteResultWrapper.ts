import type { z } from 'zod';
import { apiObject } from '#/core';

export const AutoCompleteResultWrapperSchema = apiObject({});

export type AutoCompleteResultWrapper = z.infer<typeof AutoCompleteResultWrapperSchema>;
