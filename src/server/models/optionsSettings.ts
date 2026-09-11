import { z } from 'zod';
import { apiObject } from '#/core';
import { IssueContextParamSchema } from './issueContextParam';
import { OptionSchema } from './option';

export const OptionsSettingsSchema = apiObject({
  issueContext: IssueContextParamSchema.optional(),
  options: z.array(OptionSchema).optional(),
});

export type OptionsSettings = z.infer<typeof OptionsSettingsSchema>;
