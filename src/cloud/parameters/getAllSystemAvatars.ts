import { z } from 'zod';
import { openEnum } from '#/core';

export const GetAllSystemAvatarsSchema = z.object({
  /** The avatar type. */
  type: openEnum(['issuetype', 'project', 'user', 'priority']),
});

export type GetAllSystemAvatars = z.input<typeof GetAllSystemAvatarsSchema>;
