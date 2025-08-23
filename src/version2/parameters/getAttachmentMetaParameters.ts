import { z } from 'zod';

export const GetAttachmentMetaParametersSchema = z.object({});

export type GetAttachmentMetaParameters = z.infer<typeof GetAttachmentMetaParametersSchema>;
