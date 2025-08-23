import { z } from 'zod';

export const GetAllAvailableDashboardGadgetsParametersSchema = z.object({});

export type GetAllAvailableDashboardGadgetsParameters = z.infer<typeof GetAllAvailableDashboardGadgetsParametersSchema>;
