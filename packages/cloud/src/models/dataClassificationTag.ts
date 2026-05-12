import { z } from 'zod';

/** The data classification. */
export const DataClassificationTagSchema = z.object({
  /** The color of the data classification object. */
  color: z.string().optional(),
  /** The description of the data classification object. */
  description: z.string().optional(),
  /** The guideline of the data classification object. */
  guideline: z.string().optional(),
  /** The guideline in ADF (Atlassian Document Format) for rich text rendering. */
  guidelineADF: z.string().optional(),
  /** The ID of the data classification object. */
  id: z.string(),
  /** The name of the data classification object. */
  name: z.string().optional(),
  /** The rank of the data classification object. */
  rank: z.number().optional(),
  /** The status of the data classification object. */
  status: z.string(),
});

export type DataClassificationTag = z.infer<typeof DataClassificationTagSchema>;
