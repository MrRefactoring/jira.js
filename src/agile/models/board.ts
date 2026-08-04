import { z } from 'zod';
import { apiObject } from '#/core';
import { GroupSchema } from './group';
import { UserSchema } from './user';
import { BoardLocationSchema } from './boardLocation';
/** Details about a board. */

export const BoardSchema = apiObject({
  /** The users and groups who own the board. */
  admins: apiObject({
    groups: z.array(GroupSchema).optional(),
    users: z.array(UserSchema).optional(),
  }).optional(),
  /** Whether the board can be edited. */
  canEdit: z.boolean().optional(),
  /** Whether the board is selected as a favorite. */
  favourite: z.boolean().optional(),
  /** The ID of the board. */
  id: z.number().optional(),
  /** Whether the board is private. */
  isPrivate: z.boolean().optional(),
  location: BoardLocationSchema.optional(),
  /** The name of the board. */
  name: z.string().optional(),
  /** The URL of the board. */
  self: z.url().optional(),
  /** The type the board. */
  type: z.enum(['scrum', 'kanban', 'simple']).optional(),
});

export type Board = z.infer<typeof BoardSchema>;
