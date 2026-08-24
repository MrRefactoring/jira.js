import { z } from 'zod';
/** The organisation to which the user belongs* */

export const OrganizationSchema = z.string();

export type Organization = z.infer<typeof OrganizationSchema>;
