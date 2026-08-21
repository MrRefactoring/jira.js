import { z } from 'zod';
import { apiObject } from '#/core';

export interface Option {
  childOptions?: Option[];
  id?: number;
  name?: string;
  optionId?: number;
  value?: string;
}

export const OptionSchema: z.ZodType<Option> = apiObject({
  childOptions: z.array(z.lazy(() => OptionSchema)).optional(),
  id: z.number().optional(),
  name: z.string().optional(),
  optionId: z.number().optional(),
  value: z.string().optional(),
});
