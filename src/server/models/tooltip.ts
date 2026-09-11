import { z } from 'zod';
import { apiObject } from '#/core';

export const TooltipSchema = apiObject({
  id: z.string().optional(),
});

export type Tooltip = z.infer<typeof TooltipSchema>;
