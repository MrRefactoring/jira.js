import type { z } from 'zod';
import { apiObject } from '#/core';

export const ServerInfoSchema = apiObject({});

export type ServerInfo = z.infer<typeof ServerInfoSchema>;
