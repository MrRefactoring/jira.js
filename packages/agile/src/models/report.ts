import { z } from 'zod';

export const ReportSchema = z.object({});

export type Report = z.infer<typeof ReportSchema>;
