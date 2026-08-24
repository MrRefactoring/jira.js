import { z } from 'zod';

export const GetReindexInfoSchema = z.object({
  /**
   * The id of an indexing task you wish to obtain details on. If omitted, then defaults to the standard behaviour and
   * returns information on the active reindex task, or the last task to run if no reindex is taking place.
   */
  taskId: z.number().optional(),
});

export type GetReindexInfo = z.input<typeof GetReindexInfoSchema>;
