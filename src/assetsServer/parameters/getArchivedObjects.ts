import { z } from 'zod';

export const GetArchivedObjectsSchema = z.object({
  /** The id of the object schema to search for. */
  objectSchemaId: z.string().optional(),
  /**
   * Timestamp in ISO Offset Date Time format e.g. 2021-12-03T10:15:30+01:00. Only objects archived at or after this
   * time will be displayed. Optional.
   */
  archivedFromDate: z.string().optional(),
  /** The offset of the first object to return. Optional. */
  offset: z.string().optional(),
  /**
   * A list of object type ids to search for. Optional. If not set, all object types within the schema will be searched
   * for.
   */
  objectTypeIds: z.string().optional(),
  /** The maximum number of objects to return. Optional. */
  limit: z.string().optional(),
  /**
   * Timestamp in ISO Offset Date Time format e.g. 2021-12-03T10:15:30+01:00. Only objects archived before this time
   * will be displayed. Must be after archivedFromDate, if both are set. Optional.
   */
  archivedToDate: z.string().optional(),
  /** A list of users that archived the objects. Optional. If not set, all users will be searched for. */
  archivedBy: z.string().optional(),
});

export type GetArchivedObjects = z.input<typeof GetArchivedObjectsSchema>;
