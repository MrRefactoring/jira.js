import { z } from 'zod';
import { apiObject } from '#/core';
import { CustomFieldReplacementSchema } from './customFieldReplacement';

export const DeleteAndReplaceVersionSchema = apiObject({
  customFieldReplacementList: z.array(CustomFieldReplacementSchema).optional(),
  moveAffectedIssuesTo: z.number().optional(),
  moveFixIssuesTo: z.number().optional(),
});

export type DeleteAndReplaceVersion = z.infer<typeof DeleteAndReplaceVersionSchema>;
