import { z } from 'zod';
import { apiObject } from '#/core';

export const SearchWorkspacesOperandSchema = apiObject({
  /** Returns workspaces, which partially contain the specified text in workspace name or url. */
  searchWorkspaces: z.string().optional(),
  value: z.string().optional(),
});

export type SearchWorkspacesOperand = z.infer<typeof SearchWorkspacesOperandSchema>;
