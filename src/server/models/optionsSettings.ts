import { z } from 'zod';
import { apiObject } from '#/core';
import { IssueContextParamSchema } from './issueContextParam';
import { OptionSchema, type Option, type OptionInput } from './option';

export const OptionsSettingsSchema = apiObject({
  issueContext: IssueContextParamSchema.optional(),
  options: z.array(OptionSchema as z.ZodType<Option, OptionInput>).optional(),
});

export type OptionsSettings = z.infer<typeof OptionsSettingsSchema>;
