import { z } from 'zod';
import { apiObject } from '#/core';

export const GetAllBoardsSchema = apiObject({
  isLast: z.boolean().optional(),
  maxResults: z.number().optional(),
  startAt: z.number().optional(),
  total: z.number().optional(),
  values: z
    .array(
      apiObject({
        /** The users and groups who own the board. */
        admins: apiObject({
          groups: z
            .array(
              apiObject({
                name: z.string().optional(),
                self: z.string().url().optional(),
              }),
            )
            .optional(),
          users: z
            .array(
              apiObject({
                /**
                 * The account ID of the user, which uniquely identifies the user across all Atlassian products. For
                 * example, _5b10ac8d82e05b22cc7d4ef5_.
                 */
                accountId: z.string().max(128, 'accountId must be at most 128 characters').optional(),
                /** Whether the user is active. */
                active: z.boolean().optional(),
                avatarUrls: apiObject({
                  /** The URL of the user's 16x16 pixel avatar. */
                  '16x16': z.string().url().optional(),
                  /** The URL of the user's 24x24 pixel avatar. */
                  '24x24': z.string().url().optional(),
                  /** The URL of the user's 32x32 pixel avatar. */
                  '32x32': z.string().url().optional(),
                  /** The URL of the user's 48x48 pixel avatar. */
                  '48x48': z.string().url().optional(),
                }).optional(),
                /**
                 * The display name of the user. Depending on the user’s privacy setting, this may return an alternative
                 * value.
                 */
                displayName: z.string().optional(),
                /** The URL of the user. */
                self: z.string().url().optional(),
              }),
            )
            .optional(),
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
        location: apiObject({
          avatarURI: z.string().url().optional(),
          displayName: z.string().optional(),
          name: z.string().optional(),
          projectId: z.number().optional(),
          projectKey: z.string().optional(),
          projectName: z.string().optional(),
          projectTypeKey: z.string().optional(),
          userAccountId: z.string().optional(),
          userId: z.number().optional(),
        }).optional(),
        /** The name of the board. */
        name: z.string().optional(),
        /** The URL of the board. */
        self: z.string().url().optional(),
        /** The type the board. */
        type: z.string().optional(),
      }),
    )
    .optional(),
});

export type GetAllBoards = z.infer<typeof GetAllBoardsSchema>;
