import { z } from 'zod';
/** The job title of the user* */

export const JobTitleSchema = z.string();

export type JobTitle = z.infer<typeof JobTitleSchema>;
