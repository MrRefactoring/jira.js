import { z } from 'zod';
import { apiObject } from '#/core';
/** Field mapping for mandatory fields in target */

export const targetMandatoryFieldsSchema = apiObject({
  /** Contains the value of mandatory fields */
  fields: z.record(z.string(), z.any()),
});

export type targetMandatoryFields = z.infer<typeof targetMandatoryFieldsSchema>;
