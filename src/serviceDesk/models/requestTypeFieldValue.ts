import { z } from 'zod';
import { apiObject } from '#/core';

export type RequestTypeFieldValue = {
  children?: RequestTypeFieldValue[];
  label?: string;
  value?: string;
};

export const RequestTypeFieldValueSchema: z.ZodType<RequestTypeFieldValue> = apiObject({
  /** List of child fields. */
  children: z.array(z.lazy(() => RequestTypeFieldValueSchema)).optional(),
  /** Label for the field. */
  label: z.string().optional(),
  /** Value of the field. */
  value: z.string().optional(),
});
