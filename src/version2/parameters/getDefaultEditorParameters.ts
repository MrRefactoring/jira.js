import { z } from 'zod';

export const GetDefaultEditorParametersSchema = z.object({});

export type GetDefaultEditorParameters = z.infer<typeof GetDefaultEditorParametersSchema>;
