import { z } from 'zod';
import { ManageabilityRuleSimpleSchema } from './manageabilityRuleSimple';
/** Describes your permissions to change the object. Each key should be a valid JSON path of the target object.* */

export const ManageabilityRuleObjectMutabilitySchema = z.record(z.string(), ManageabilityRuleSimpleSchema);

export type ManageabilityRuleObjectMutability = z.infer<typeof ManageabilityRuleObjectMutabilitySchema>;
