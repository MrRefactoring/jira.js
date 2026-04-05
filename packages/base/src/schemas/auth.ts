import { z } from 'zod';

export const authBasicSchema = z.object({
  type: z.literal('basic'),
  email: z.string().email(),
  apiToken: z.string().min(1),
});

export const authBearerTokenSchema = z.object({
  type: z.literal('bearer'),
  token: z.string().min(1),
});

export const authBearerProviderSchema = z.object({
  type: z.literal('bearer'),
  getToken: z.custom<() => Promise<string>>(val => typeof val === 'function', {
    message: 'getToken must be a function',
  }),
});

export const authBearerSchema = z.union([authBearerTokenSchema, authBearerProviderSchema]);

export const authSchema = z.union([authBasicSchema, authBearerSchema]);

export type AuthBasic = z.infer<typeof authBasicSchema>;

export type AuthBearerToken = z.infer<typeof authBearerTokenSchema>;

export type AuthBearerProvider = z.infer<typeof authBearerProviderSchema>;

export type AuthBearer = z.infer<typeof authBearerSchema>;

export type Auth = z.infer<typeof authSchema>;
