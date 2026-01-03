import type { SaveProjectTemplateRequest } from './saveProjectTemplateRequest';

/** Request to save a custom template */
export interface SaveTemplateRequest {
  /** The description of the template */
  templateDescription?: string;
  templateFromProjectRequest?: SaveProjectTemplateRequest;
  /** The name of the template */
  templateName?: string;
}
