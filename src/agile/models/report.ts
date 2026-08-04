import type { z } from 'zod';
import { apiObject } from '#/core';

export const ReportSchema = apiObject({});

export type Report = z.infer<typeof ReportSchema>;
