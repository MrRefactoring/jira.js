import { z } from 'zod';
import { apiObject } from '#/core';

export interface Option {
  childOptions?: Option[];
  id?: number;
  name?: string;
  optionId?: number;
  value?: string;
  [key: string]: unknown;
}

export interface OptionInput {
  childOptions?: OptionInput[];
  id?: number;
  name?: string;
  optionId?: number;
  value?: string;
}

export const OptionSchema = apiObject({
  childOptions: z
    .array(z.lazy((): z.ZodType<Option, OptionInput> => OptionSchema) as z.ZodType<Option, OptionInput>)
    .optional(),
  id: z.number().optional(),
  name: z.string().optional(),
  optionId: z.number().optional(),
  value: z.string().optional(),
}) satisfies z.ZodType<Option, OptionInput>;
