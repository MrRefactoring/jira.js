import { z } from 'zod';

export const GetStatusCategoriesParametersSchema = z.object({});

export type GetStatusCategoriesParameters = z.infer<typeof GetStatusCategoriesParametersSchema>;
