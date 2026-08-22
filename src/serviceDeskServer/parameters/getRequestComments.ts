import { z } from 'zod';

export const GetRequestCommentsSchema = z.object({
  /** Specifies whether to return internal comments or not. Default: true. */
  internal: z.string().optional(),
  /** Specifies whether to return public comments or not. Default: true. */
  public: z.string().optional(),
  /** The id or key of the customer request. */
  issueIdOrKey: z.string(),
  /** The starting index of the returned objects. Base index: 0. */
  start: z.number().optional(),
  /** The maximum number of items to return per page. Default: 50. */
  limit: z.number().optional(),
});

export type GetRequestComments = z.input<typeof GetRequestCommentsSchema>;
