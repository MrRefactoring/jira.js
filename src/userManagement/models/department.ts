import { z } from 'zod';
/** The department in which the user works* */

export const DepartmentSchema = z.string();

export type Department = z.infer<typeof DepartmentSchema>;
