import type { CustomTemplatesProjectDetails } from './customTemplatesProjectDetails';
import type { CustomTemplateRequest } from './customTemplateRequest';

/** Request to create a project using a custom template */
export interface ProjectCustomTemplateCreateRequest {
  details?: CustomTemplatesProjectDetails;
  template?: CustomTemplateRequest;
}
