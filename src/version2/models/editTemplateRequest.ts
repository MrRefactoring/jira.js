import type { CustomTemplateOptions } from './customTemplateOptions';

/** Request to edit a custom template */
export interface EditTemplateRequest {
  /** The description of the template */
  templateDescription?: string;
  templateGenerationOptions?: CustomTemplateOptions;
  /** The unique identifier of the template */
  templateKey?: string;
  /** The name of the template */
  templateName?: string;
}
