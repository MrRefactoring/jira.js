import { z } from 'zod';

export const EpicUpdateSchema = z.object({
  color: z
    .object({
      key: z
        .enum([
          'color_1',
          'color_2',
          'color_3',
          'color_4',
          'color_5',
          'color_6',
          'color_7',
          'color_8',
          'color_9',
          'color_10',
          'color_11',
          'color_12',
          'color_13',
          'color_14',
        ])
        .optional(),
    })
    .optional(),
  done: z.boolean().optional(),
  name: z.string().optional(),
  summary: z.string().optional(),
});

export type EpicUpdate = z.infer<typeof EpicUpdateSchema>;
