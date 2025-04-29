import { z } from 'zod';
import { AxiosError } from 'axios';
import { HttpException } from './clients';

// Authentication schemas
// const JWTSchema = z.object({
//   issuer: z.string(),
//   secret: z.string(),
//   expiryTimeSeconds: z.number().optional()
// });

export const BasicAuthSchema = z
  .object({
    email: z.string(),
    apiToken: z.string(),
  })
  .strict();

export type BasicAuth = z.infer<typeof BasicAuthSchema>;

export const OAuth2Schema = z
  .object({
    accessToken: z.string(),
  })
  .strict();

export type OAuth2 = z.infer<typeof OAuth2Schema>;

// Middlewares schemas
export const MiddlewaresSchema = z
  .object({
    onError: z.function().args(z.any()).returns(z.void()).optional(),
    onResponse: z.function().args(z.any()).returns(z.void()).optional(),
  })
  .strict();

export type Middlewares = z.infer<typeof MiddlewaresSchema>;

export const ConfigSchema = z
  .object({
    host: z.string().url(),
    strictGDPR: z.boolean().optional(),
    /** Adds `'X-Atlassian-Token': 'no-check'` to each request header */
    noCheckAtlassianToken: z.boolean().optional(),
    baseRequestConfig: z.any().optional(),
    authentication: z.union([z.object({ basic: BasicAuthSchema }), z.object({ oauth2: OAuth2Schema })]).optional(),
    middlewares: MiddlewaresSchema.optional(),
  })
  .strict();

export type Config = z.infer<typeof ConfigSchema>;

export type JiraError = AxiosError | HttpException;
