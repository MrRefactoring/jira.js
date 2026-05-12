import { z } from 'zod';
import { AnnouncementBannerConfigurationUpdateSchema } from '../models';

export const SetBannerSchema = z.object({}).extend(AnnouncementBannerConfigurationUpdateSchema.shape);

export type SetBanner = z.input<typeof SetBannerSchema>;
