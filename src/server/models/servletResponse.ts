import { z } from 'zod';
import { apiObject } from '#/core';
import { ServletOutputStreamSchema } from './servletOutputStream';

export const ServletResponseSchema = apiObject({
  bufferSize: z.number().optional(),
  characterEncoding: z.string().optional(),
  committed: z.boolean().optional(),
  contentLength: z.number().optional(),
  contentLengthLong: z.number().optional(),
  contentType: z.string().optional(),
  locale: apiObject({
    country: z.string().optional(),
    displayCountry: z.string().optional(),
    displayLanguage: z.string().optional(),
    displayName: z.string().optional(),
    displayScript: z.string().optional(),
    displayVariant: z.string().optional(),
    extensionKeys: z.array(z.string()).optional(),
    iso3Country: z.string().optional(),
    iso3Language: z.string().optional(),
    language: z.string().optional(),
    script: z.string().optional(),
    unicodeLocaleAttributes: z.array(z.string()).optional(),
    unicodeLocaleKeys: z.array(z.string()).optional(),
    variant: z.string().optional(),
  }).optional(),
  outputStream: ServletOutputStreamSchema.optional(),
  writer: z.record(z.string(), z.any()).optional(),
});

export type ServletResponse = z.infer<typeof ServletResponseSchema>;
