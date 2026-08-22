import { z } from 'zod';

export const GetAllVersionsSchema = z.object({
  /** The maximum number of versions to return per page. Default: 50. */
  maxResults: z.number().optional(),
  /** The Id of the board that contains the requested versions. */
  boardId: z.number(),
  /** Filters results to versions that are either released or unreleased. Valid values: true, false. */
  released: z.string().optional(),
  /** The starting index of the returned versions. Base index: 0. */
  startAt: z.number().optional(),
});

export type GetAllVersions = z.input<typeof GetAllVersionsSchema>;
