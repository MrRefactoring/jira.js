import { z } from 'zod';
import { apiObject } from '#/core';
/**
 * The submitted JSON entity had one or more invalid properties.* For each invalid field, a set of violated constraint
 * keys are returned.*
 */

export const FieldConstraintsViolatedResponseSchema = apiObject({
  key: z.string(),
  context: apiObject({
    fieldViolations: z.array(
      apiObject({
        /** The JSON path to the field with an invalid value */
        field: z.string(),
        violations: z.array(
          apiObject({
            /**
             * The key for a constraint that the submitted value has violated. See documentation for any submittable
             * model for a set of constraint keys and definitions.
             */
            key: z.string(),
          }),
        ),
      }),
    ),
  }),
});

export type FieldConstraintsViolatedResponse = z.infer<typeof FieldConstraintsViolatedResponseSchema>;
