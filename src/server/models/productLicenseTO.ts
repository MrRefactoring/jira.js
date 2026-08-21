import { z } from 'zod';
import { apiObject } from '#/core';

export const ProductLicenseTOSchema = apiObject({
  isUnlimitedNumberOfUsers: z.boolean().optional(),
  licenseKey: z.string().optional(),
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
  numberOfUsers: z.number().optional(),
  productDisplayName: z.string().optional(),
  productKey: z.string().optional(),
});

export type ProductLicenseTO = z.infer<typeof ProductLicenseTOSchema>;
