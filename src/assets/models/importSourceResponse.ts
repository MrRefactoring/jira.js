import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { ScheduledImportDetailsSchema } from './scheduledImportDetails';

export const ImportSourceResponseSchema = apiObject({
  /** Import source ID */
  id: z.string().optional(),
  /** Collection (object schema) ID */
  collectionId: z.string().optional(),
  /** Import source name */
  name: z.string().optional(),
  /** Timestamp when the import source was created */
  created: z.coerce.date().optional(),
  /** Timestamp when the import source was last updated */
  updated: z.coerce.date().optional(),
  /** Import source description */
  description: z.string().nullish(),
  /** Object schema ID */
  objectSchemaId: z.string().optional(),
  /**
   * Import module type. CSV: rlabs-import-type-csv, JSON: rlabs-import-type-json, External: rlabs-import-type-external,
   * Discovery: insight-discovery-import, DataManager: rlabs-import-type-dm-csv
   */
  importSourceModuleKey: openEnum([
    'rlabs-import-type-csv',
    'rlabs-import-type-json',
    'rlabs-import-type-external',
    'insight-discovery-import',
    'rlabs-import-type-dm-csv',
  ]).optional(),
  /** Default concatenator for multi-value attributes */
  defaultConcatenator: z.string().optional(),
  /** How to handle empty values */
  defaultHandleEmptyValues: z.string().optional(),
  /** How to handle unknown values */
  defaultHandleUnknownValues: z.string().optional(),
  /** Date format pattern */
  dateFormat: z.string().optional(),
  /** Date-time format pattern */
  dateTimeFormat: z.string().optional(),
  /** Import status information */
  importStatus: apiObject({
    /** Configuration status type - whether the import source is enabled or disabled */
    configurationStatusType: openEnum(['DISABLED', 'ENABLED']).nullish(),
    /** Validation status type - system-evaluated status (not user-changeable) */
    validationStatusType: openEnum(['VALID', 'INVALID_CONFIGURATION', 'MODULE_UNINSTALLED']).nullish(),
    /** Map of reasons for invalidity */
    reasonForInvalidity: z.record(z.string(), z.any()).nullish(),
    /** Status name (computed from configurationStatusType) */
    name: z.string().optional(),
    /** Validation status name (computed) */
    validation: z.string().optional(),
    /** AUI lozenge CSS class for configuration status */
    configurationAuiLozenge: z.string().optional(),
    /** AUI lozenge CSS class for validation status */
    validationAuiLozenge: z.string().optional(),
  }).nullish(),
  /** Import-specific configuration as JSON string */
  importSpecificConfiguration: z.string().optional(),
  /** List of object type mappings for this import source */
  importSourceOTEntries: z
    .array(
      apiObject({
        /** Import source object type ID */
        id: z.string().optional(),
        /** Parent import source object type ID */
        parentImportSourceOTId: z.string().nullish(),
        /** Associated import source ID */
        importSourceId: z.string().nullish(),
        /** Creation timestamp */
        created: z.coerce.date().nullish(),
        /** Last update timestamp */
        updated: z.coerce.date().nullish(),
        /** Description */
        description: z.string().nullish(),
        /** Target object type configuration */
        objectType: apiObject({
          /** Object type ID */
          id: z.string().optional(),
          /** Object type name */
          name: z.string().optional(),
        }).nullish(),
        /** Selector QL query */
        selectorQlQuery: z.string().nullish(),
        /** Selector IQL query */
        selectorIQL: z.string().nullish(),
        /** The selector used in JSON imports to find the objects */
        selector: z.string().nullish(),
        /** How to handle empty values */
        emptyValues: z.string().nullish(),
        /** How to handle unknown values */
        unknownValues: z.string().nullish(),
        /** Import status for this object type */
        importStatus: apiObject({
          /** Configuration status type */
          configurationStatusType: openEnum(['DISABLED', 'ENABLED']).optional(),
          /** Validation status type */
          validationStatusType: openEnum(['VALID', 'INVALID_CONFIGURATION', 'MODULE_UNINSTALLED']).optional(),
          /** Reasons for invalidity */
          reasonForInvalidity: z.record(z.string(), z.any()).optional(),
        }).nullish(),
        /** List of object type attribute mappings */
        importSourceOTAttrEntries: z
          .array(
            apiObject({
              /** Attribute mapping ID */
              id: z.string().optional(),
            }),
          )
          .nullish(),
        /** Whether to ignore case when matching identifiers */
        matchIdentifierIgnoreCase: z.boolean().nullish(),
      }),
    )
    .nullish(),
  /** Whether a token has been generated for this import source */
  tokenGenerated: z.boolean().nullish(),
  /** Import source URL (if applicable) */
  url: z.url().nullish(),
  /** Integrated import type ID */
  integratedImportTypeId: z.number().nullish(),
  /** Integrated import type extension ID */
  integratedImportTypeExtensionId: z.string().nullish(),
  /** How to handle computed issue values (DataManager config) */
  defaultHandleComputeIssueValues: z.string().nullish(),
  /** How to handle null values (DataManager config) */
  defaultHandleNullValues: z.string().nullish(),
  /** How to handle not mapped values (DataManager config) */
  defaultHandleNotMappedValues: z.string().nullish(),
  /** Whether scheduled import is enabled for this source */
  isImportSourceSchedulingEnabled: z.boolean().nullish(),
  /** Type of import execution */
  importExecutionType: z.string().nullish(),
  scheduledImportDetails: ScheduledImportDetailsSchema.nullish(),
});

export type ImportSourceResponse = z.infer<typeof ImportSourceResponseSchema>;
