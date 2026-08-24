import { z } from 'zod';

export const FindObjectTypeFlatListSchema = z.object({
  /**
   * The Object Type role to filter the list of object types. Valid values: `OBJECT_TYPE_USER`, `OBJECT_TYPE_DEVELOPER`,
   * `OBJECT_TYPE_MANAGER`
   */
  role: z.string().optional(),
  /** Query to filter on available object types */
  query: z.string().optional(),
  /** Exclude object types with this name */
  exclude: z.string().optional(),
  /** The ID of the object schema to retrieve object types from */
  id: z.string(),
});

export type FindObjectTypeFlatList = z.input<typeof FindObjectTypeFlatListSchema>;
