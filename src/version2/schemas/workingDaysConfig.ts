import { z } from 'zod';
import { NonWorkingDaySchema } from './nonWorkingDay';

/** Working days configuration */
export const WorkingDaysConfigSchema = z.object({
  friday: z.boolean().optional(),
  id: z.number().int().optional(),
  monday: z.boolean().optional(),
  nonWorkingDays: z.array(NonWorkingDaySchema).optional(),
  saturday: z.boolean().optional(),
  sunday: z.boolean().optional(),
  thursday: z.boolean().optional(),
  timezoneId: z.string().optional(),
  tuesday: z.boolean().optional(),
  wednesday: z.boolean().optional(),
});

export type WorkingDaysConfig = z.infer<typeof WorkingDaysConfigSchema>;
