import { z } from 'zod';

export const SetIssueNavigatorDefaultColumnsFormSchema = z.object({
  columns: z.array(z.string()).optional(),
});

export type SetIssueNavigatorDefaultColumnsForm = z.input<typeof SetIssueNavigatorDefaultColumnsFormSchema>;
