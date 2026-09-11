import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const ProjectUpdateSchema = apiObject({
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
});

export type ProjectUpdate = z.infer<typeof ProjectUpdateSchema>;
