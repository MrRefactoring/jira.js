import { z } from 'zod';

export const GetAllProjectCategoriesParametersSchema = z.object({});

export type GetAllProjectCategoriesParameters = z.infer<typeof GetAllProjectCategoriesParametersSchema>;
