import { z } from 'zod';

/** The data classification. */
export const DataClassificationTagBeanSchema = z.object({
  /** The color of the data classification object. */
  color: z.string().optional(),
  /** The description of the data classification object. */
  description: z.string().optional(),
  /** The guideline of the data classification object. */
  guideline: z.string().optional(),
  /** The ID of the data classification object. */
  id: z.string(),
  /** The name of the data classification object. */
  name: z.string().optional(),
  /** The rank of the data classification object. */
  rank: z.number().int().optional(),
  /** The status of the data classification object. */
  status: z.string(),
});

export type DataClassificationTagBean = z.infer<typeof DataClassificationTagBeanSchema>;
