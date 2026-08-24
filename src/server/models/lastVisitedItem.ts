import type { z } from 'zod';
import { apiObject } from '#/core';

export const LastVisitedItemSchema = apiObject({});

export type LastVisitedItem = z.infer<typeof LastVisitedItemSchema>;
