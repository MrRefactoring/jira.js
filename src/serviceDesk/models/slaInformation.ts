import { z } from 'zod';
import { apiObject } from '#/core';
import { SelfLinkSchema } from './selfLink';
import { SlaInformationCompletedCycleSchema } from './slaInformationCompletedCycle';
import { SlaInformationOngoingCycleSchema } from './slaInformationOngoingCycle';

export const SlaInformationSchema = apiObject({
  _links: SelfLinkSchema.optional(),
  /** List of completed cycles for the SLA. */
  completedCycles: z.array(SlaInformationCompletedCycleSchema).optional(),
  /** ID of the Service Level Agreement (SLA). */
  id: z.string().optional(),
  /** Description of the SLA. */
  name: z.string().optional(),
  ongoingCycle: SlaInformationOngoingCycleSchema.optional(),
  /** Format in which SLA is to be displayed in the UI */
  slaDisplayFormat: z.string().optional(),
});

export type SlaInformation = z.infer<typeof SlaInformationSchema>;
