import { z } from 'zod';

/** Field mapping for mandatory fields in target */
export const targetMandatoryFieldsSchema = z.object({
  /** Contains the value of mandatory fields */
  fields: z.record(z.string(), z.any()),
});

export type targetMandatoryFields = z.infer<typeof targetMandatoryFieldsSchema>;
