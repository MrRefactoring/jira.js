import { z } from 'zod';

export const GetAllVersionsSchema = z.object({
  /** The ID of the board that contains the requested versions. */
  boardId: z.number(),
  /**
   * The starting index of the returned versions. Base index: 0. See the 'Pagination' section at the top of this page
   * for more details.
   */
  startAt: z.number().optional(),
  /**
   * The maximum number of versions to return per page. See the 'Pagination' section at the top of this page for more
   * details.
   */
  maxResults: z.number().optional(),
  /** Filters results to versions that are either released or unreleased. Valid values: true, false. */
  released: z.string().optional(),
});

export type GetAllVersions = z.input<typeof GetAllVersionsSchema>;
