import { z } from 'zod';
import { apiObject } from '#/core';

export interface RequestTypeFieldValue {
  /** List of child fields. */
  children?: RequestTypeFieldValue[];
  /** Label for the field. */
  label?: string;
  /** Value of the field. */
  value?: string;
  [key: string]: unknown;
}

export interface RequestTypeFieldValueInput {
  /** List of child fields. */
  children?: RequestTypeFieldValueInput[];
  /** Label for the field. */
  label?: string;
  /** Value of the field. */
  value?: string;
}

export const RequestTypeFieldValueSchema = apiObject({
  /** List of child fields. */
  children: z
    .array(
      z.lazy(
        (): z.ZodType<RequestTypeFieldValue, RequestTypeFieldValueInput> => RequestTypeFieldValueSchema,
      ) as z.ZodType<RequestTypeFieldValue, RequestTypeFieldValueInput>,
    )
    .optional(),
  /** Label for the field. */
  label: z.string().optional(),
  /** Value of the field. */
  value: z.string().optional(),
}) satisfies z.ZodType<RequestTypeFieldValue, RequestTypeFieldValueInput>;
