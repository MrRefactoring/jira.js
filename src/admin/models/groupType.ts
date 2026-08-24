import type { z } from 'zod';
import { openEnum } from '#/core';
/** The group type. */

export const GroupTypeSchema = openEnum(['TEAM', 'GROUP', 'USERBASE_GROUP']);

export type GroupType = z.infer<typeof GroupTypeSchema>;
