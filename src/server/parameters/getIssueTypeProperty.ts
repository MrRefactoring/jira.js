import { z } from 'zod';

export const GetIssueTypePropertySchema = z.object({
  /** The key of the property to return. */
  propertyKey: z.string(),
  /** The issue type from which the property will be returned. */
  issueTypeId: z.string(),
});

export type GetIssueTypeProperty = z.input<typeof GetIssueTypePropertySchema>;
