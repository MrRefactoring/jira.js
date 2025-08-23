import { z } from 'zod';

/** Details of an issue priority. */
export const UpdatePriorityDetailsSchema = z.object({
  /** The ID for the avatar for the priority. This parameter is nullable and both iconUrl and avatarId cannot be defined. */
  avatarId: z.number().int().optional(),
  /** The description of the priority. */
  description: z.string().optional(),
  /**
   * The URL of an icon for the priority. Accepted protocols are HTTP and HTTPS. Built in icons can also be used. Both
   * iconUrl and avatarId cannot be defined.
   */
  iconUrl: z
    .enum([
      '/images/icons/priorities/blocker.png',
      '/images/icons/priorities/critical.png',
      '/images/icons/priorities/high.png',
      '/images/icons/priorities/highest.png',
      '/images/icons/priorities/low.png',
      '/images/icons/priorities/lowest.png',
      '/images/icons/priorities/major.png',
      '/images/icons/priorities/medium.png',
      '/images/icons/priorities/minor.png',
      '/images/icons/priorities/trivial.png',
      '/images/icons/priorities/blocker_new.png',
      '/images/icons/priorities/critical_new.png',
      '/images/icons/priorities/high_new.png',
      '/images/icons/priorities/highest_new.png',
      '/images/icons/priorities/low_new.png',
      '/images/icons/priorities/lowest_new.png',
      '/images/icons/priorities/major_new.png',
      '/images/icons/priorities/medium_new.png',
      '/images/icons/priorities/minor_new.png',
      '/images/icons/priorities/trivial_new.png',
    ])
    .optional(),
  /** The name of the priority. Must be unique. */
  name: z.string().optional(),
  /** The status color of the priority in 3-digit or 6-digit hexadecimal format. */
  statusColor: z.string().optional(),
});

export type UpdatePriorityDetails = z.infer<typeof UpdatePriorityDetailsSchema>;
