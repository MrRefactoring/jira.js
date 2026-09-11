import { z } from 'zod';
import { apiObject } from '#/core';

export const JspPropertyGroupDescriptorSchema = apiObject({
  buffer: z.string().optional(),
  defaultContentType: z.string().optional(),
  deferredSyntaxAllowedAsLiteral: z.string().optional(),
  elIgnored: z.string().optional(),
  errorOnELNotFound: z.string().optional(),
  errorOnUndeclaredNamespace: z.string().optional(),
  includeCodas: z.array(z.string()).optional(),
  includePreludes: z.array(z.string()).optional(),
  isXml: z.string().optional(),
  pageEncoding: z.string().optional(),
  scriptingInvalid: z.string().optional(),
  trimDirectiveWhitespaces: z.string().optional(),
  urlPatterns: z.array(z.string()).optional(),
});

export type JspPropertyGroupDescriptor = z.infer<typeof JspPropertyGroupDescriptorSchema>;
