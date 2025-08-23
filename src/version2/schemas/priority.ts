import { z } from 'zod';

/** An issue priority. */
export const PrioritySchema = z.object({
  /**
   * The avatarId of the avatar for the issue priority. This parameter is nullable and when set, this avatar references
   * the universal avatar APIs.
   */
  avatarId: z.number().int().optional(),
  /** The description of the issue priority. */
  description: z.string().optional(),
  /** The URL of the icon for the issue priority. */
  iconUrl: z.string().optional(),
  /** The ID of the issue priority. */
  id: z.string().optional(),
  /** Whether this priority is the default. */
  isDefault: z.boolean().optional(),
  /** The name of the issue priority. */
  name: z.string().optional(),
  /** Priority schemes associated with the issue priority. */
  schemes: z.unknown().optional(),
  /** The URL of the issue priority. */
  self: z.string().optional(),
  /** The color used to indicate the issue priority. */
  statusColor: z.string().optional(),
});

export type Priority = z.infer<typeof PrioritySchema>;
