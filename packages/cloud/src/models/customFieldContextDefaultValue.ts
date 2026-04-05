import { z } from 'zod';

export const CustomFieldContextDefaultValueSchema = z.object({});

export type CustomFieldContextDefaultValue = z.infer<typeof CustomFieldContextDefaultValueSchema>;
