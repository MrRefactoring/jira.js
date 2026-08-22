import { z } from 'zod';
import { apiObject } from '#/core';

export const IssueInvolvementSchema = apiObject({
  id: z.string().optional(),
  label: z.string().optional(),
});

export type IssueInvolvement = z.infer<typeof IssueInvolvementSchema>;
