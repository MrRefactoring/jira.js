import { z } from 'zod';
import { apiObject } from '#/core';

export const SchemaStatsSchema = apiObject({
  schemaId: z.number().optional(),
  totalObjectCount: z.number().optional(),
  totalObjectTypeCount: z.number().optional(),
  totalAttributeCount: z.number().optional(),
  numberOfObjectsLinkedToIssues: z.number().optional(),
  numberOfObjectsWithUniqueAttribute: z.number().optional(),
  numberOfArchivedObjects: z.number().optional(),
  totalAttributeValueCount: z.number().optional(),
  numberOfAutomationRules: z.number().optional(),
  numberOfAutomationIfs: z.number().optional(),
  numberOfAutomationWhens: z.number().optional(),
  numberOfAutomationThens: z.number().optional(),
  maxNumberOfObjectsByObjectType: z.number().optional(),
  averageNumberOfObjectsByObjectType: z.number().optional(),
});

export type SchemaStats = z.infer<typeof SchemaStatsSchema>;
