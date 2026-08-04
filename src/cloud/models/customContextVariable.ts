import { z } from 'zod';
import { UserContextVariableSchema } from './userContextVariable';
import { IssueContextVariableSchema } from './issueContextVariable';
import { JsonContextVariableSchema } from './jsonContextVariable';

export const CustomContextVariableSchema = z.discriminatedUnion('type', [
  UserContextVariableSchema,
  IssueContextVariableSchema,
  JsonContextVariableSchema,
]);

export type CustomContextVariable = z.infer<typeof CustomContextVariableSchema>;
