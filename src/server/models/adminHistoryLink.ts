import type { z } from 'zod';
import { apiObject } from '#/core';

export const AdminHistoryLinkSchema = apiObject({});

export type AdminHistoryLink = z.infer<typeof AdminHistoryLinkSchema>;
