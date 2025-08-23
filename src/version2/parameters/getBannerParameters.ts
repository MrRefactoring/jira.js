import { z } from 'zod';

export const GetBannerParametersSchema = z.object({});

export type GetBannerParameters = z.infer<typeof GetBannerParametersSchema>;
