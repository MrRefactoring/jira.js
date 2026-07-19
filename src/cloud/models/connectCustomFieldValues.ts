import { z } from 'zod';
import { apiObject } from '#/core';
import { ConnectCustomFieldValueSchema } from './connectCustomFieldValue';
/** Details of updates for a custom field. */

export const ConnectCustomFieldValuesSchema = apiObject({
  /** The list of custom field update details. */
  updateValueList: z.array(ConnectCustomFieldValueSchema).optional(),
});

export type ConnectCustomFieldValues = z.infer<typeof ConnectCustomFieldValuesSchema>;
