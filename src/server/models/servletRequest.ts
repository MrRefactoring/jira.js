import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { AsyncContextSchema, type AsyncContext } from './asyncContext';
import { ServletInputStreamSchema, type ServletInputStream } from './servletInputStream';
import { ServletConnectionSchema, type ServletConnection } from './servletConnection';
import { ServletContextSchema, type ServletContext } from './servletContext';

export interface ServletRequest {
  asyncContext?: AsyncContext;
  asyncStarted?: boolean;
  asyncSupported?: boolean;
  attributeNames?: Record<string, unknown>;
  characterEncoding?: string;
  contentLength?: number;
  contentLengthLong?: number;
  contentType?: string;
  dispatcherType?: 'FORWARD' | 'INCLUDE' | 'REQUEST' | 'ASYNC' | 'ERROR' | (string & {});
  inputStream?: ServletInputStream;
  localAddr?: string;
  localName?: string;
  localPort?: number;
  locale?: {
    country?: string;
    displayCountry?: string;
    displayLanguage?: string;
    displayName?: string;
    displayScript?: string;
    displayVariant?: string;
    extensionKeys?: string[];
    iso3Country?: string;
    iso3Language?: string;
    language?: string;
    script?: string;
    unicodeLocaleAttributes?: string[];
    unicodeLocaleKeys?: string[];
    variant?: string;
  };
  locales?: Record<string, unknown>;
  parameterMap?: Record<string, unknown>;
  parameterNames?: Record<string, unknown>;
  protocol?: string;
  protocolRequestId?: string;
  reader?: Record<string, unknown>;
  remoteAddr?: string;
  remoteHost?: string;
  remotePort?: number;
  requestId?: string;
  scheme?: string;
  secure?: boolean;
  serverName?: string;
  serverPort?: number;
  servletConnection?: ServletConnection;
  servletContext?: ServletContext;
}

export const ServletRequestSchema: z.ZodType<ServletRequest> = apiObject({
  asyncContext: z.lazy(() => AsyncContextSchema).optional(),
  asyncStarted: z.boolean().optional(),
  asyncSupported: z.boolean().optional(),
  attributeNames: z.record(z.string(), z.any()).optional(),
  characterEncoding: z.string().optional(),
  contentLength: z.number().optional(),
  contentLengthLong: z.number().optional(),
  contentType: z.string().optional(),
  dispatcherType: openEnum(['FORWARD', 'INCLUDE', 'REQUEST', 'ASYNC', 'ERROR']).optional(),
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
  parameterMap: z.record(z.string(), z.any()).optional(),
  parameterNames: z.record(z.string(), z.any()).optional(),
  protocol: z.string().optional(),
  protocolRequestId: z.string().optional(),
  reader: z.record(z.string(), z.any()).optional(),
  remoteAddr: z.string().optional(),
  remoteHost: z.string().optional(),
  remotePort: z.number().optional(),
  requestId: z.string().optional(),
  scheme: z.string().optional(),
  secure: z.boolean().optional(),
  serverName: z.string().optional(),
  serverPort: z.number().optional(),
  servletConnection: ServletConnectionSchema.optional(),
  servletContext: ServletContextSchema.optional(),
});
