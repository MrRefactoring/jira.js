import type { CustomTemplateOptions } from './customTemplateOptions';

/** The request details to generate template from a project */
export interface SaveProjectTemplateRequest {
  /** The ID of the target project */
  projectId?: number;
  templateGenerationOptions?: CustomTemplateOptions;
  /** The type of the template: LIVE | SNAPSHOT */
  templateType?: 'LIVE' | 'SNAPSHOT' | string;
}
