import { z } from 'zod';

export const ExpandForMachinesSchema = z.object({
  /** The id of the attachment to expand. */
  id: z.string(),
});

export type ExpandForMachines = z.input<typeof ExpandForMachinesSchema>;
