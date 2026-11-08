import { z } from 'zod';
import { apiObject } from '#/core';
import { DevelopmentStatusDetailItemSchema } from './developmentStatusDetailItem';

export const DevelopmentStatusDetailSchema = apiObject({
  errors: z.array(z.unknown()),
  detail: z.array(DevelopmentStatusDetailItemSchema),
});

export type DevelopmentStatusDetail = z.infer<typeof DevelopmentStatusDetailSchema>;
