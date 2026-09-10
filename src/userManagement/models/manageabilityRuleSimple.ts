import { z } from 'zod';
import { ManageabilityAllowedSchema } from './manageabilityAllowed';
import { ManageabilityUnallowedSchema } from './manageabilityUnallowed';

export const ManageabilityRuleSimpleSchema = z.union([ManageabilityAllowedSchema, ManageabilityUnallowedSchema]);

export type ManageabilityRuleSimple = z.infer<typeof ManageabilityRuleSimpleSchema>;
