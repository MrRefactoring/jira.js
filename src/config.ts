import { z } from 'zod';
import { AxiosError } from 'axios';
import { HttpException } from './clients';

// Authentication schemas
// const JWTSchema = z.object({
//   issuer: z.string(),
//   secret: z.string(),
//   expiryTimeSeconds: z.number().optional()
// });

const BasicAuthSchema = z.object({
  email: z.string(),
  apiToken: z.string(),
});

export type BasicAuth = z.infer<typeof BasicAuthSchema>;

const OAuth2Schema = z.object({
  accessToken: z.string(),
});

export type OAuth2 = z.infer<typeof OAuth2Schema>;

// Middlewares schemas
const MiddlewaresSchema = z.object({
  onError: z.function().args(z.any()).returns(z.void()).optional(),
  onResponse: z.function().args(z.any()).returns(z.void()).optional(),
});

export type Middlewares = z.infer<typeof MiddlewaresSchema>;

export const ConfigSchema = z.object({
  host: z.string(),
  strictGDPR: z.boolean().optional(),
  /** Adds `'X-Atlassian-Token': 'no-check'` to each request header */
  noCheckAtlassianToken: z.boolean().optional(),
  baseRequestConfig: z.any().optional(),
  authentication: z.union([z.object({ basic: BasicAuthSchema }), z.object({ oauth2: OAuth2Schema })]).optional(),
  middlewares: MiddlewaresSchema.optional(),
});

export type Config = z.infer<typeof ConfigSchema>;

export type JiraError = AxiosError | HttpException;
