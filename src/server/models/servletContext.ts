import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { JspConfigDescriptorSchema } from './jspConfigDescriptor';
import { SessionCookieConfigSchema } from './sessionCookieConfig';

export const ServletContextSchema = apiObject({
  attributeNames: z.record(z.string(), z.any()).optional(),
  classLoader: apiObject({
    defaultAssertionStatus: z.boolean().optional(),
    definedPackages: z
      .array(
        apiObject({
          name: z.string().optional(),
          specificationTitle: z.string().optional(),
          specificationVersion: z.string().optional(),
          specificationVendor: z.string().optional(),
          implementationTitle: z.string().optional(),
          implementationVersion: z.string().optional(),
          implementationVendor: z.string().optional(),
          annotations: z.array(z.record(z.string(), z.any())).optional(),
          declaredAnnotations: z.array(z.record(z.string(), z.any())).optional(),
          sealed: z.boolean().optional(),
        }),
      )
      .optional(),
    name: z.string().optional(),
    parent: apiObject({
      defaultAssertionStatus: z.boolean().optional(),
      definedPackages: z
        .array(
          apiObject({
            name: z.string().optional(),
            specificationTitle: z.string().optional(),
            specificationVersion: z.string().optional(),
            specificationVendor: z.string().optional(),
            implementationTitle: z.string().optional(),
            implementationVersion: z.string().optional(),
            implementationVendor: z.string().optional(),
            annotations: z.array(z.record(z.string(), z.any())).optional(),
            declaredAnnotations: z.array(z.record(z.string(), z.any())).optional(),
            sealed: z.boolean().optional(),
          }),
        )
        .optional(),
      name: z.string().optional(),
      registeredAsParallelCapable: z.boolean().optional(),
      unnamedModule: apiObject({
        annotations: z.array(z.record(z.string(), z.any())).optional(),
        declaredAnnotations: z.array(z.record(z.string(), z.any())).optional(),
        descriptor: apiObject({
          automatic: z.boolean().optional(),
          open: z.boolean().optional(),
        }).optional(),
        layer: z.record(z.string(), z.any()).optional(),
        name: z.string().optional(),
        named: z.boolean().optional(),
        nativeAccessEnabled: z.boolean().optional(),
        packages: z.array(z.string()).optional(),
      }).optional(),
    }).optional(),
    registeredAsParallelCapable: z.boolean().optional(),
    unnamedModule: apiObject({
      annotations: z.array(z.record(z.string(), z.any())).optional(),
      declaredAnnotations: z.array(z.record(z.string(), z.any())).optional(),
      descriptor: apiObject({
        automatic: z.boolean().optional(),
        open: z.boolean().optional(),
      }).optional(),
      layer: z.record(z.string(), z.any()).optional(),
      name: z.string().optional(),
      named: z.boolean().optional(),
      nativeAccessEnabled: z.boolean().optional(),
      packages: z.array(z.string()).optional(),
    }).optional(),
  }).optional(),
  contextPath: z.string().optional(),
  defaultSessionTrackingModes: z.array(openEnum(['COOKIE', 'URL', 'SSL'])).optional(),
  effectiveMajorVersion: z.number().optional(),
  effectiveMinorVersion: z.number().optional(),
  effectiveSessionTrackingModes: z.array(openEnum(['COOKIE', 'URL', 'SSL'])).optional(),
  filterRegistrations: z.record(z.string(), z.any()).optional(),
  initParameterNames: z.record(z.string(), z.any()).optional(),
  jspConfigDescriptor: JspConfigDescriptorSchema.optional(),
  majorVersion: z.number().optional(),
  minorVersion: z.number().optional(),
  requestCharacterEncoding: z.string().optional(),
  responseCharacterEncoding: z.string().optional(),
  serverInfo: z.string().optional(),
  servletContextName: z.string().optional(),
  servletRegistrations: z.record(z.string(), z.any()).optional(),
  sessionCookieConfig: SessionCookieConfigSchema.optional(),
  sessionTimeout: z.number().optional(),
  sessionTrackingModes: z.array(openEnum(['COOKIE', 'URL', 'SSL'])).optional(),
  virtualServerName: z.string().optional(),
});

export type ServletContext = z.infer<typeof ServletContextSchema>;
