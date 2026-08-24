import { z } from 'zod';
import { apiObject } from '#/core';
/** The body was not parsed successfully.* */

export const BodyParseFailureResponseSchema = apiObject({
  key: z.string(),
});

export type BodyParseFailureResponse = z.infer<typeof BodyParseFailureResponseSchema>;
