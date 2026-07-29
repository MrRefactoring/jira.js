import { z } from 'zod';
import { MandatoryFieldValueSchema } from './mandatoryFieldValue';
import { MandatoryFieldValueForADFSchema } from './mandatoryFieldValueForADF';
/** Can contain multiple field values of following types depending on `type` key */

export const MandatoryFieldValuesSchema = z.union([MandatoryFieldValueSchema, MandatoryFieldValueForADFSchema]);

export type MandatoryFieldValues = z.infer<typeof MandatoryFieldValuesSchema>;
