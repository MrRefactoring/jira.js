import { z } from 'zod';
import { apiObject } from '#/core';
import { SelfLinkSchema } from './selfLink';
import { SlaInformationCompletedCycleSchema } from './slaInformationCompletedCycle';
import { SlaInformationOngoingCycleSchema } from './slaInformationOngoingCycle';

export const SlaInformationSchema = apiObject({
  id: z.string().optional(),
  name: z.string().optional(),
  _links: SelfLinkSchema.optional(),
  completedCycles: z.array(SlaInformationCompletedCycleSchema).optional(),
  ongoingCycle: SlaInformationOngoingCycleSchema.optional(),
});

export type SlaInformation = z.infer<typeof SlaInformationSchema>;
