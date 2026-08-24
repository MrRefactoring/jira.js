import { z } from 'zod';
import { apiObject } from '#/core';

export const MembershipFetchPayloadSchema = apiObject({
  /** Pagination cursor, only members after the cursor will be returned */
  after: z.string().nullish(),
  /** Maximum number of members to be returned */
  first: z.number().optional(),
});

export type MembershipFetchPayload = z.infer<typeof MembershipFetchPayloadSchema>;
