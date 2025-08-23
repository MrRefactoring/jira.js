import { z } from 'zod';

export const UserNavPropertyJsonBeanSchema = z.object({
  key: z.string().optional(),
  value: z.string().optional(),
});

export type UserNavPropertyJsonBean = z.infer<typeof UserNavPropertyJsonBeanSchema>;
