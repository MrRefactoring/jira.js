import { z } from 'zod';
import { apiObject } from '#/core';
import { IconSchema } from './icon';
import { StatusSchema } from './status';

export const RemoteObjectSchema = apiObject({
  icon: IconSchema.optional(),
  status: StatusSchema.optional(),
  summary: z.string().optional(),
  title: z.string().optional(),
  url: z.string().optional(),
});

export type RemoteObject = z.infer<typeof RemoteObjectSchema>;
