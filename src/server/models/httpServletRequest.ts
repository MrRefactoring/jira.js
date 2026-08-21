import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { AsyncContextSchema } from './asyncContext';
import { CookieSchema } from './cookie';
import { HttpServletMappingSchema } from './httpServletMapping';
import { ServletInputStreamSchema } from './servletInputStream';
import { PartSchema } from './part';
import { ServletConnectionSchema } from './servletConnection';
import { ServletContextSchema } from './servletContext';
import { HttpSessionSchema } from './httpSession';

export const HttpServletRequestSchema = apiObject({
  asyncContext: AsyncContextSchema.optional(),
  asyncStarted: z.boolean().optional(),
  asyncSupported: z.boolean().optional(),
  attributeNames: z.record(z.string(), z.any()).optional(),
  authType: z.string().optional(),
  characterEncoding: z.string().optional(),
  contentLength: z.number().optional(),
  contentLengthLong: z.number().optional(),
  contentType: z.string().optional(),
  contextPath: z.string().optional(),
  cookies: z.array(CookieSchema).optional(),
  dispatcherType: openEnum(['FORWARD', 'INCLUDE', 'REQUEST', 'ASYNC', 'ERROR']).optional(),
  headerNames: z.record(z.string(), z.any()).optional(),
  httpServletMapping: HttpServletMappingSchema.optional(),
  inputStream: ServletInputStreamSchema.optional(),
  localAddr: z.string().optional(),
  localName: z.string().optional(),
  localPort: z.number().optional(),
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
  locales: z.record(z.string(), z.any()).optional(),
  method: z.string().optional(),
  parameterMap: z.record(z.string(), z.any()).optional(),
  parameterNames: z.record(z.string(), z.any()).optional(),
  parts: z.array(PartSchema).optional(),
  pathInfo: z.string().optional(),
  pathTranslated: z.string().optional(),
  protocol: z.string().optional(),
  protocolRequestId: z.string().optional(),
  queryString: z.string().optional(),
  reader: z.record(z.string(), z.any()).optional(),
  remoteAddr: z.string().optional(),
  remoteHost: z.string().optional(),
  remotePort: z.number().optional(),
  remoteUser: z.string().optional(),
  requestId: z.string().optional(),
  requestURI: z.string().optional(),
  requestURL: apiObject({
    empty: z.boolean().optional(),
    length: z.number().optional(),
  }).optional(),
  requestedSessionId: z.string().optional(),
  requestedSessionIdFromCookie: z.boolean().optional(),
  requestedSessionIdFromURL: z.boolean().optional(),
  requestedSessionIdValid: z.boolean().optional(),
  scheme: z.string().optional(),
  secure: z.boolean().optional(),
  serverName: z.string().optional(),
  serverPort: z.number().optional(),
  servletConnection: ServletConnectionSchema.optional(),
  servletContext: ServletContextSchema.optional(),
  servletPath: z.string().optional(),
  session: HttpSessionSchema.optional(),
  trailerFields: z.record(z.string(), z.any()).optional(),
  trailerFieldsReady: z.boolean().optional(),
  userPrincipal: apiObject({
    name: z.string().optional(),
  }).optional(),
});

export type HttpServletRequest = z.infer<typeof HttpServletRequestSchema>;
