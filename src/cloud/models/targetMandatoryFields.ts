import { z } from 'zod';
import { apiObject } from '#/core';
import { MandatoryFieldValuesSchema } from './mandatoryFieldValues';

/** Field mapping for mandatory fields in target */
export const TargetMandatoryFieldsSchema = apiObject({
  /** Contains the value of mandatory fields */
  fields: z.record(z.string(), MandatoryFieldValuesSchema),
});

export type TargetMandatoryFields = z.infer<typeof TargetMandatoryFieldsSchema>;

/**
 * @deprecated Renamed to `TargetMandatoryFieldsSchema`, which describes the same shape. This alias is removed in the
 *   next major version.
 */
export const targetMandatoryFieldsSchema = TargetMandatoryFieldsSchema;

/**
 * @deprecated Renamed to `TargetMandatoryFields`, which describes the same shape. This alias is removed in the next
 *   major version.
 */
export type targetMandatoryFields = TargetMandatoryFields;
