import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const ProjectInputSchema = apiObject({
  assigneeType: openEnum(['PROJECT_LEAD', 'UNASSIGNED']).optional(),
  avatarId: z.number().optional(),
  categoryId: z.number().optional(),
  description: z.string().optional(),
  issueSecurityScheme: z.number().optional(),
  key: z.string().optional(),
  lead: z.string().optional(),
  name: z.string().optional(),
  notificationScheme: z.number().optional(),
  permissionScheme: z.number().optional(),
  projectTemplateKey: z.string().optional(),
  projectTypeKey: z.string().optional(),
  url: z.string().optional(),
  workflowSchemeId: z.number().optional(),
});

export type ProjectInput = z.infer<typeof ProjectInputSchema>;
