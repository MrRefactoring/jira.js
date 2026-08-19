import { z } from 'zod';
import { apiObject } from '#/core';
import { GroupSchema } from './group';
import { UserSchema } from './user';
import { BoardLocationSchema } from './boardLocation';

export const PageBoardSchema = apiObject({
  isLast: z.boolean().optional(),
  maxResults: z.number().optional(),
  startAt: z.number().optional(),
  total: z.number().optional(),
  values: z
    .array(
      apiObject({
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
        /** The container that the board is located in. */
        location: BoardLocationSchema.optional(),
        /** The name of the board. */
        name: z.string().optional(),
        /** The URL of the board. */
        self: z.url().optional(),
        /** The type the board. */
        type: z.string().optional(),
      }),
    )
    .optional(),
});

export type PageBoard = z.infer<typeof PageBoardSchema>;
