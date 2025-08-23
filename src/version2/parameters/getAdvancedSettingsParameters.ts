import { z } from 'zod';

export const GetAdvancedSettingsParametersSchema = z.object({});

export type GetAdvancedSettingsParameters = z.infer<typeof GetAdvancedSettingsParametersSchema>;
