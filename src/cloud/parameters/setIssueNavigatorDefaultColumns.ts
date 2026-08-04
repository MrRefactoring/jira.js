import { z } from 'zod';

export const SetIssueNavigatorDefaultColumnsSchema = z.object({
  body: z.record(z.string(), z.any()),
});

export type SetIssueNavigatorDefaultColumns = z.input<typeof SetIssueNavigatorDefaultColumnsSchema>;
